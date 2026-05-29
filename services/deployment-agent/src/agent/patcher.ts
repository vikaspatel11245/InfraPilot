import fs from "fs";
import { askGeminiPatcher } from "../llm/client";

export class Patcher {
  async applyPatch(filePath: string, errorLog: string, customApiKey?: string): Promise<boolean> {
    console.log(`[Agent Patcher] Automated self-healing engaged for failing file: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`[Agent Patcher] File target not found, skipping patch: ${filePath}`);
      return false;
    }

    try {
      const originalContent = fs.readFileSync(filePath, "utf-8");
      
      // Call our Google Generative AI patcher engine
      const patchedContent = await askGeminiPatcher(originalContent, errorLog, customApiKey);
      
      if (patchedContent && patchedContent !== originalContent) {
        fs.writeFileSync(filePath, patchedContent, "utf-8");
        console.log(`[Agent Patcher] Fixed patch successfully applied on: ${filePath}`);
        return true;
      }
      
      console.log(`[Agent Patcher] Gemini suggested no file changes for: ${filePath}`);
      return false;
    } catch (err) {
      console.error("Failed to execute self-healing file patch.", err);
      return false;
    }
  }
}

export default Patcher;
