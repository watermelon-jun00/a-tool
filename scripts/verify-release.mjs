import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { extname } from "node:path";

const rootFiles = ["index.html", "style.css", "app.js", "student-import-template.xlsx"];
const trackedFiles = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);
const issues = [];

const forbiddenFiles = [
  /(^|\/)import-example\.json$/i,
  /(^|\/)(?:exports?|backups?)\//i,
  /(^|\/)\.env(?:\.|$)/i,
  /(^|\/)language-teaching-assistant-.*\.json$/i,
  /(^|\/)student-(?:data|export).*\.(?:json|csv|tsv|xlsx)$/i,
];

for (const file of trackedFiles) {
  if (forbiddenFiles.some((pattern) => pattern.test(file))) {
    issues.push(`不应发布的数据文件：${file}`);
  }
}

const textExtensions = new Set([".html", ".css", ".js", ".mjs", ".md", ".yml", ".yaml", ".json", ".txt", ".command"]);
const secretPatterns = [
  [/(?:sk_live_|ghp_|github_pat_)[A-Za-z0-9_]{16,}/, "疑似平台访问令牌"],
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, "私钥"],
  [/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\b/, "疑似 JWT"],
  [/(?:service_role|SERVICE_ROLE_KEY)\s*[:=]\s*["'][^"']{8,}["']/, "疑似 Supabase service_role 密钥"],
];

for (const file of trackedFiles) {
  if (!textExtensions.has(extname(file).toLowerCase())) {
    continue;
  }
  const content = readFileSync(file, "utf8");
  for (const [pattern, label] of secretPatterns) {
    if (pattern.test(content)) {
      issues.push(`${file}：${label}`);
    }
  }
}

const app = readFileSync("app.js", "utf8");
const html = readFileSync("index.html", "utf8");
if (!app.includes('const DEFAULT_SUPABASE_URL = "";') || !app.includes('const DEFAULT_SUPABASE_ANON_KEY = "";')) {
  issues.push("Supabase 默认地址或默认公开密钥不是空值");
}
if (!app.includes('const STORAGE_KEY = "language-teaching-assistant-v4";') || app.includes("LEGACY_STORAGE_KEYS")) {
  issues.push("旧学生数据迁移仍可能被启用");
}
if (!html.includes('http-equiv="Content-Security-Policy"') || !html.includes("https://*.supabase.co")) {
  issues.push("页面缺少预期的内容安全策略");
}

const htmlIds = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
const referencedIds = new Set([...app.matchAll(/getElementById\("([^"]+)"\)/g)].map((match) => match[1]));
for (const id of referencedIds) {
  if (!htmlIds.has(id)) {
    issues.push(`app.js 引用了不存在的页面元素：#${id}`);
  }
}

for (const file of rootFiles) {
  const root = readFileSync(file);
  const published = readFileSync(`docs/${file}`);
  if (!root.equals(published)) {
    issues.push(`发布目录未同步：docs/${file}`);
  }
}

if (issues.length) {
  console.error("发布检查失败：");
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log(`发布检查通过：${trackedFiles.length} 个跟踪文件，${referencedIds.size} 个页面元素引用。`);
