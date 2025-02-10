import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Migrate } from '@prisma/migrate';

export class DatabaseContainer {
  private container: StartedPostgreSqlContainer | undefined;
  private migrate: Migrate | undefined;

  async start() {
    this.container = await new PostgreSqlContainer().start();
    process.env.DATABASE_URL = this.container.getConnectionUri();
    this.migrate = new Migrate('prisma/schema.prisma');
  }

  async restore() {
    await this.migrate?.reset();
    await this.migrate?.applyMigrations();
  }

  async stop() {
    this.migrate?.stop();
    await this.container?.stop();
  }
}
