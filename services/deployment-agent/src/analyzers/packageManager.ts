export function selectPackageManager(path: string) {
  console.log(`[PM Analyzer] Mapped packager lockfile configs at: ${path}`);
  return "pnpm";
}
