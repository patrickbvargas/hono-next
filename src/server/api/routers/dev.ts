import {
  clients,
  contracts,
  revenues,
  fees,
  employees,
  remunerations,
  contractEmployees,
} from "~/server/db/schemas";
import { seedData } from "~/server/db/seed";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const devRouter = createTRPCRouter({
  reset: publicProcedure.query(async ({ ctx: { db } }) => {
    return await db.transaction(async (tx) => {
      // Clear
      await tx.delete(remunerations);
      await tx.delete(fees);
      await tx.delete(revenues);
      await tx.delete(contractEmployees);
      await tx.delete(contracts);
      await tx.delete(clients);
      await tx.delete(employees);

      // Seed
      await tx.insert(employees).values(seedData.employees);
      await tx.insert(clients).values(seedData.clients);
      await tx.insert(contracts).values(seedData.contracts);
      await tx.insert(contractEmployees).values(seedData.contractEmployees);
      await tx.insert(revenues).values(seedData.revenues);
      await tx.insert(fees).values(seedData.fees);
      await tx.insert(remunerations).values(seedData.remunerations);

      return { message: "Database reset with fresh seed!" };
    });
  }),

  check: publicProcedure.query(async ({ ctx: { db } }) => {
    const [
      versionRes,
      sizeRes,
      connRes,
      schemaRes,
      connCountRes,
      lockRes,
      tableRes,
    ] = await Promise.all([
      db.execute(`SELECT version();`),
      db.execute(
        `SELECT pg_database_size(current_database()) / 1024 / 1024 AS size_mb;`,
      ),
      db.execute(`SELECT 1;`),
      db.execute(`
        SELECT schema_name
        FROM information_schema.schemata
        WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        ORDER BY schema_name;
      `),
      db.execute(`
        SELECT COUNT(*) AS active_connections
        FROM pg_stat_activity
        WHERE datname = current_database();
      `),
      db.execute(`
        SELECT COUNT(*) AS pending_locks
        FROM pg_locks
        WHERE NOT granted;
      `),
      db.execute(`
        SELECT COUNT(*) AS user_table_count
        FROM information_schema.tables
        WHERE table_schema NOT IN ('pg_catalog', 'information_schema', 'pg_toast');
      `),
    ]);

    const pingStart = Date.now();
    await db.execute(`SELECT 1;`);
    const pingMs = Date.now() - pingStart;

    return {
      status: "ok",
      version: versionRes[0]?.version ?? "unknown",
      sizeMB: sizeRes[0]?.size_mb ?? "unknown",
      isConnected: !!connRes,
      pingMs,
      schemas: schemaRes.map((s) => s.schema_name),
      activeConnections: Number(connCountRes[0]?.active_connections ?? 0),
      pendingLocks: Number(lockRes[0]?.pending_locks ?? 0),
      userTableCount: Number(tableRes[0]?.user_table_count ?? 0),
    };
  }),
});
