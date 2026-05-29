import { Deployment, Project } from "../types";

const API_BASE = "http://localhost:4000/api";

export async function fetchDeployments(): Promise<Deployment[]> {
  try {
    const res = await fetch(`${API_BASE}/deployments`);
    if (!res.ok) throw new Error("Failed to fetch deployments");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchDeploymentById(id: string): Promise<Deployment | null> {
  try {
    const res = await fetch(`${API_BASE}/deployments/${id}`);
    if (!res.ok) throw new Error("Failed to fetch deployment details");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function triggerDeployment(repoUrl: string, branch: string = "main"): Promise<Deployment | null> {
  const vercelToken = typeof window !== "undefined" ? localStorage.getItem("infrapilot_vercel_token") || "" : "";
  const railwayToken = typeof window !== "undefined" ? localStorage.getItem("infrapilot_railway_token") || "" : "";
  const geminiKey = typeof window !== "undefined" ? localStorage.getItem("infrapilot_gemini_key") || "" : "";

  try {
    const res = await fetch(`${API_BASE}/deployments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        repoUrl, 
        branch, 
        vercelToken, 
        railwayToken, 
        geminiKey 
      }),
    });
    if (!res.ok) throw new Error("Failed to trigger deployment");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
