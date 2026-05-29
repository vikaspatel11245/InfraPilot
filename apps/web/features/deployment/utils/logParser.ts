export function parseAnsiLogs(log: string): string {
  // Simple regex replacement for basic ANSI codes to html styling
  let parsed = log
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // ANSI color replacement
  const colors: Record<string, string> = {
    "\\x1b\\[30m": "<span class='text-zinc-600'>",
    "\\x1b\\[31m": "<span class='text-red-400 font-medium'>",
    "\\x1b\\[32m": "<span class='text-emerald-400'>",
    "\\x1b\\[33m": "<span class='text-amber-400'>",
    "\\x1b\\[34m": "<span class='text-blue-400'>",
    "\\x1b\\[35m": "<span class='text-purple-400'>",
    "\\x1b\\[36m": "<span class='text-cyan-400'>",
    "\\x1b\\[37m": "<span class='text-zinc-200'>",
    "\\x1b\\[1m": "<span class='font-bold text-white'>",
    "\\x1b\\[0m": "</span>",
    "\\[30m": "<span class='text-zinc-600'>",
    "\\[31m": "<span class='text-red-400 font-medium'>",
    "\\[32m": "<span class='text-emerald-400'>",
    "\\[33m": "<span class='text-amber-400'>",
    "\\[34m": "<span class='text-blue-400'>",
    "\\[35m": "<span class='text-purple-400'>",
    "\\[36m": "<span class='text-cyan-400'>",
    "\\[37m": "<span class='text-zinc-200'>",
    "\\[1m": "<span class='font-bold text-white'>",
    "\\[0m": "</span>",
    "\\x1b\\[m": "</span>",
  };

  Object.entries(colors).forEach(([ansi, html]) => {
    const regex = new RegExp(ansi, "g");
    parsed = parsed.replace(regex, html);
  });

  return parsed;
}
