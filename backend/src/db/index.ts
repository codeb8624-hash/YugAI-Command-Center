import type pg from "pg";

let Pool: typeof import("pg").Pool | null = null;
let pool: pg.Pool | null = null;

export function getPool(): pg.Pool | null {
  if (pool) return pool;
  return null;
}

export async function connectDatabase(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || databaseUrl === "postgresql://user:pass@localhost:5432/yugai") {
    console.warn("[DB] DATABASE_URL not configured — running without database");
    return;
  }

  const pgModule = await import("pg");
  Pool = pgModule.Pool;

  pool = new Pool({
    connectionString: databaseUrl,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  try {
    const client = await pool.connect();
    console.log("[DB] Connected to PostgreSQL");
    client.release();

    pool.on("error", (err) => {
      console.error("[DB] Unexpected pool error:", err.message);
    });
  } catch (err) {
    console.error("[DB] Failed to connect:", (err as Error).message);
    pool = null;
  }
}

export async function query(
  text: string,
  params?: unknown[]
): Promise<pg.QueryResult | null> {
  const p = getPool();
  if (!p) return null;
  return p.query(text, params);
}
