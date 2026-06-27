import { applyD1Migrations, env } from "cloudflare:test";

// Runs once per test worker before the suite: builds the schema in local D1.
await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
