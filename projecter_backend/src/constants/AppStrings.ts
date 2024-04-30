const appStrings: Record<string, string> = {
  stagEnvFile: ".env.staging",
  prodEnvFile: ".env.production",
  devEnvFile: ".env.development",

  fallbackPort: "8545",
  exposingApp: "Exposing app",
  noRoute: "Route does not exist",
  ngrokError: "Error on ngrok connect",
  cannotFindDbUrl: "Cannot find DB Url",
  serverRunning: "Projecter server is running",
  serverStartFailure: "Failed to start server",
  dbConnectionFail: "Connected to database failed",
  serverStartSuccess: "Server successfully started",
  dbConnectionSuccess: "Connected to database successfully",
} as const;

export { appStrings };
