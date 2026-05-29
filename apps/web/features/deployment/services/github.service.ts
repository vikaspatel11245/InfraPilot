export const githubService = {
  async validateRepo(repoUrl: string): Promise<boolean> {
    try {
      const res = await fetch(`http://localhost:4000/api/github/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await res.json();
      return !!data.valid;
    } catch {
      return repoUrl.includes("github.com/");
    }
  },

  async getBranches(repoUrl: string): Promise<string[]> {
    try {
      const res = await fetch(`http://localhost:4000/api/github/branches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await res.json();
      return data.branches || ["main", "master", "dev"];
    } catch {
      return ["main", "master", "dev"];
    }
  }
};

export default githubService;
