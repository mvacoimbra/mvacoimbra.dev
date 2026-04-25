import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`projects_locales\` (
    \`title\` text NOT NULL,
    \`subtitle\` text,
    \`description\` text NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`_locale\` text NOT NULL,
    \`_parent_id\` integer NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(
    sql`CREATE UNIQUE INDEX \`projects_locales_locale_parent_id_unique\` ON \`projects_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(
    sql`INSERT INTO \`projects_locales\` (\`_locale\`, \`_parent_id\`, \`title\`, \`subtitle\`, \`description\`) SELECT 'en', \`id\`, \`title\`, \`subtitle\`, \`description\` FROM \`projects\`;`,
  )

  await db.run(sql`CREATE TABLE \`work_roles_locales\` (
    \`title\` text NOT NULL,
    \`description\` text,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`_locale\` text NOT NULL,
    \`_parent_id\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_roles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(
    sql`CREATE UNIQUE INDEX \`work_roles_locales_locale_parent_id_unique\` ON \`work_roles_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(
    sql`INSERT INTO \`work_roles_locales\` (\`_locale\`, \`_parent_id\`, \`title\`, \`description\`) SELECT 'en', \`id\`, \`title\`, \`description\` FROM \`work_roles\`;`,
  )

  await db.run(sql`CREATE TABLE \`education_locales\` (
    \`degree\` text NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`_locale\` text NOT NULL,
    \`_parent_id\` integer NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`education\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(
    sql`CREATE UNIQUE INDEX \`education_locales_locale_parent_id_unique\` ON \`education_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(
    sql`INSERT INTO \`education_locales\` (\`_locale\`, \`_parent_id\`, \`degree\`) SELECT 'en', \`id\`, \`degree\` FROM \`education\`;`,
  )

  await db.run(sql`CREATE TABLE \`profile_locales\` (
    \`description\` text NOT NULL,
    \`about\` text NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`_locale\` text NOT NULL,
    \`_parent_id\` integer NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`profile\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  await db.run(
    sql`CREATE UNIQUE INDEX \`profile_locales_locale_parent_id_unique\` ON \`profile_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(
    sql`INSERT INTO \`profile_locales\` (\`_locale\`, \`_parent_id\`, \`description\`, \`about\`) SELECT 'en', \`id\`, \`description\`, \`about\` FROM \`profile\`;`,
  )

  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`subtitle\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`description\`;`)

  await db.run(sql`ALTER TABLE \`work_roles\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`work_roles\` DROP COLUMN \`description\`;`)

  await db.run(sql`ALTER TABLE \`education\` DROP COLUMN \`degree\`;`)

  await db.run(sql`ALTER TABLE \`profile\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`profile\` DROP COLUMN \`about\`;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // SQLite ALTER TABLE ADD COLUMN cannot enforce NOT NULL without a DEFAULT,
  // so restored columns are nullable. The original schema had NOT NULL on
  // title/description/degree — accept this rollback-only weakening.
  await db.run(sql`ALTER TABLE \`projects\` ADD COLUMN \`title\` text;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD COLUMN \`subtitle\` text;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD COLUMN \`description\` text;`)
  await db.run(
    sql`UPDATE \`projects\` SET \`title\` = (SELECT \`title\` FROM \`projects_locales\` WHERE \`projects_locales\`.\`_parent_id\` = \`projects\`.\`id\` AND \`_locale\` = 'en'), \`subtitle\` = (SELECT \`subtitle\` FROM \`projects_locales\` WHERE \`projects_locales\`.\`_parent_id\` = \`projects\`.\`id\` AND \`_locale\` = 'en'), \`description\` = (SELECT \`description\` FROM \`projects_locales\` WHERE \`projects_locales\`.\`_parent_id\` = \`projects\`.\`id\` AND \`_locale\` = 'en');`,
  )

  await db.run(sql`ALTER TABLE \`work_roles\` ADD COLUMN \`title\` text;`)
  await db.run(sql`ALTER TABLE \`work_roles\` ADD COLUMN \`description\` text;`)
  await db.run(
    sql`UPDATE \`work_roles\` SET \`title\` = (SELECT \`title\` FROM \`work_roles_locales\` WHERE \`work_roles_locales\`.\`_parent_id\` = \`work_roles\`.\`id\` AND \`_locale\` = 'en'), \`description\` = (SELECT \`description\` FROM \`work_roles_locales\` WHERE \`work_roles_locales\`.\`_parent_id\` = \`work_roles\`.\`id\` AND \`_locale\` = 'en');`,
  )

  await db.run(sql`ALTER TABLE \`education\` ADD COLUMN \`degree\` text;`)
  await db.run(
    sql`UPDATE \`education\` SET \`degree\` = (SELECT \`degree\` FROM \`education_locales\` WHERE \`education_locales\`.\`_parent_id\` = \`education\`.\`id\` AND \`_locale\` = 'en');`,
  )

  await db.run(sql`ALTER TABLE \`profile\` ADD COLUMN \`description\` text;`)
  await db.run(sql`ALTER TABLE \`profile\` ADD COLUMN \`about\` text;`)
  await db.run(
    sql`UPDATE \`profile\` SET \`description\` = (SELECT \`description\` FROM \`profile_locales\` WHERE \`profile_locales\`.\`_parent_id\` = \`profile\`.\`id\` AND \`_locale\` = 'en'), \`about\` = (SELECT \`about\` FROM \`profile_locales\` WHERE \`profile_locales\`.\`_parent_id\` = \`profile\`.\`id\` AND \`_locale\` = 'en');`,
  )

  await db.run(sql`DROP TABLE \`projects_locales\`;`)
  await db.run(sql`DROP TABLE \`work_roles_locales\`;`)
  await db.run(sql`DROP TABLE \`education_locales\`;`)
  await db.run(sql`DROP TABLE \`profile_locales\`;`)
}
