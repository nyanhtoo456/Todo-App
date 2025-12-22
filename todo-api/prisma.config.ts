// Prisma CLI / Migrate config: move connection URL here (used by Migrate)
// Adjust or extend this object if you use multiple datasources or different environments.
export default {
  migrations: {
    datasourceUrl: process.env.DATABASE_URL,
  },
};
