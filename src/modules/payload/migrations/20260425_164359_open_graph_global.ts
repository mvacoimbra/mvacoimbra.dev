import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`open_graph\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`open_graph_image_idx\` ON \`open_graph\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`open_graph_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`open_graph\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`open_graph_locales_locale_parent_id_unique\` ON \`open_graph_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`open_graph\`;`)
  await db.run(sql`DROP TABLE \`open_graph_locales\`;`)
}
