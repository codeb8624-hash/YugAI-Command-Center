import type mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool | null {
  return pool;
}

export async function connectDatabase(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || databaseUrl === "mysql://root@127.0.0.1:3306/yugai") {
    console.warn("[DB] DATABASE_URL not configured — running without database");
    return;
  }

  const mysqlModule = await import("mysql2/promise");

  pool = mysqlModule.createPool({
    uri: databaseUrl,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 5000,
  });

  try {
    const connection = await pool.getConnection();
    await connection.ping();
    console.log("[DB] Connected to MariaDB");
    connection.release();

    pool.pool.on("error", (err: Error) => {
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
): Promise<[mysql.QueryResult, mysql.FieldPacket[]] | null> {
  const p = getPool();
  if (!p) return null;
  return p.query(text, params);
}
