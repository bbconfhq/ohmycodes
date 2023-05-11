export const langmode = {
  html: 'text/html',
  xml: 'text/html',
  scss: 'text/x-scss',
  less: 'text/x-less',
  markdown: 'text/x-markdown',
  c: 'text/x-csrc',
  cpp: 'text/x-c++src',
  csharp: 'text/x-csharp',
  java: 'text/x-java',
  go: 'text/x-go',
  kotlin: 'text/x-kotlin',
  python: 'text/x-python',
  scala: 'text/x-scala',
  rust: 'text/x-rustsrc',
  sql: 'text/x-sql',
  typescript: 'text/typescript'
} as const;

export const supportedLanguages = Object.keys(langmode);