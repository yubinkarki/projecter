import path from "path";

import { PackageJsonType } from "@/constants";

const rootModulePath: string = require.resolve("../../package.json");

const packageJson: PackageJsonType = require(rootModulePath);

const emojis: Record<string, string> = {
  warn: "❗️",
  info: "🚀",
  http: "🔗",
  error: "❌",
  debug: "🐛",
  silly: "🤪",
  verbose: "🔊",
  fallback: "👽",
};

const strings: Record<string, string> = {
  stagEnvFile: ".env.staging",
  prodEnvFile: ".env.production",
  devEnvFile: ".env.development",

  fallbackPort: "8545",
  errorLogFile: "errors.log",
  development: "development",
  exposingApp: "Exposing app",
  customLogDir: "custom_logs",
  appVersion: packageJson.version,
  noRoute: "Route does not exist",
  dateFormat: "YYYY-MM-DD HH:mm:ss",
  ngrokError: "Error on ngrok connect",
  rootDir: path.dirname(rootModulePath),
  cannotFindDbUrl: "Cannot find DB Url",
  serverRunning: "Projecter server is running",
  serverStartFailure: "Failed to start server",
  dbConnectionFail: "Connected to database failed",
  serverStartSuccess: "Server successfully started",
  dbConnectionSuccess: "Connected to database successfully",
} as const;

export { emojis, strings };
