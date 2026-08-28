import { defineRailway, github, preserve, project, service } from "railway/iac";

// This repository manages only the OpenConnector service inside Daxow's
// shared staging project. The partial boundary prevents this file from
// adopting or deleting Daxow's web, worker, or database resources.
export const partial = "openconnector";

export default defineRailway(() => {
  const connector = service("openconnector", {
    source: github("daxowapp/open-connector", { branch: "main" }),
    healthcheck: "/health",
    healthcheckTimeout: 300,
    // Keep staging secrets and connector policy values in Railway. IaC owns
    // their presence, but never copies plaintext values into Git.
    env: {
      HOST: preserve(),
      NODE_ENV: preserve(),
      OOMOL_CONNECT_ADMIN_TOKEN: preserve(),
      OOMOL_CONNECT_ALLOWED_ACTIONS: preserve(),
      OOMOL_CONNECT_ALLOW_PRIVATE_NETWORK: preserve(),
      OOMOL_CONNECT_BLOCKED_PROXIES: preserve(),
      OOMOL_CONNECT_DATABASE_CONNECT_TIMEOUT_MS: preserve(),
      OOMOL_CONNECT_DATABASE_POOL_MAX: preserve(),
      OOMOL_CONNECT_DATABASE_URL: preserve(),
      OOMOL_CONNECT_ENCRYPTION_KEY: preserve(),
      OOMOL_CONNECT_ORIGIN: preserve(),
      OOMOL_CONNECT_RUNTIME_TOKEN: preserve(),
      OOMOL_CONNECT_RUN_LIMIT: preserve(),
      RAILWAY_DOCKERFILE_PATH: preserve(),
    },
  });

  return project("daxow-staging", {
    resources: [connector],
  });
});
