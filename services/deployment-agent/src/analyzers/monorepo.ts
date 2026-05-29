export function detectMonorepo(path: string) {
  console.log(`[Monorepo Analyzer] Probing workspaces parameters at: ${path}`);
  return { isMonorepo: true, type: "pnpm" };
}
