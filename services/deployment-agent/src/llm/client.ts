import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || "";
let ai: GoogleGenerativeAI | null = null;

if (apiKey) {
  ai = new GoogleGenerativeAI(apiKey);
}

// Structured output schema for architecture recommendations
export const infraSchema = {
  type: SchemaType.OBJECT,
  properties: {
    provider: { type: SchemaType.STRING, description: "vercel | railway | render | flyio" },
    estimatedCost: { type: SchemaType.STRING },
    confidence: { type: SchemaType.NUMBER },
    reasoning: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    suggestedSpecs: {
      type: SchemaType.OBJECT,
      properties: {
        cpu: { type: SchemaType.STRING },
        memory: { type: SchemaType.STRING },
        database: { type: SchemaType.STRING }
      }
    }
  },
  required: ["provider", "estimatedCost", "confidence", "reasoning", "suggestedSpecs"]
};

export async function askGeminiArchitect(codeContext: string) {
  if (!ai) {
    // Return a clean fallback matching schema when API Key is missing (simulated mode)
    return {
      provider: "vercel",
      estimatedCost: "$12.00",
      confidence: 0.98,
      reasoning: [
        "Codebase profile suggests Next.js standard App router structure.",
        "Static and serverless rendering matches optimal Vercel deployment paradigms."
      ],
      suggestedSpecs: {
        cpu: "0.5 Core",
        memory: "512MB RAM",
        database: "Supabase PG"
      }
    };
  }

  try {
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: "You are an expert autonomous cloud systems architect. Analyze the provided codebase metadata and return the optimal cost-effective hosting target."
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Codebase profile context:\n${codeContext}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: infraSchema as any
      }
    });

    return JSON.parse(result.response.text());
  } catch (err) {
    console.error("Gemini Architect call failed, using fallback spec.", err);
    return {
      provider: "railway",
      estimatedCost: "$5.00",
      confidence: 0.85,
      reasoning: ["Encountered fallback analysis loop.", "Generic Node.js environment matched."],
      suggestedSpecs: { cpu: "0.25 Core", memory: "256MB RAM", database: "SQLite" }
    };
  }
}

export async function askGeminiPatcher(fileContent: string, errorLog: string): Promise<string> {
  if (!ai) {
    // Return simulated fix if API key is not supplied
    return fileContent;
  }

  try {
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are an expert autonomous software debugger. Fix the provided source code to resolve the compiler error."
    });

    const prompt = `
      SOURCE CODE:
      ${fileContent}

      COMPILER ERROR LOG:
      ${errorLog}

      Please analyze the error and return the exact fixed file content.
      CRITICAL: Return ONLY the raw fixed file content. Do not include markdown code block fences (e.g. \`\`\`), explanations, or comments.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("Gemini Patcher call failed.", err);
    return fileContent;
  }
}
