import { Client } from "https://deno.land/x/postgres/mod.ts";
import {
  QueryResult,
  QueryConfig,
} from "https://deno.land/x/postgres/query.ts";

const client = new Client({
  hostname: "localhost",
  port: 5432,
  user: "postgres",
  password: "12345",
  database: "aganol",
});

export async function menusidebar(qry: QueryConfig) {
  await client.connect();
  let sidebar: QueryResult = await client.query(qry);
  await client.end();

  return sidebar.rowsOfObjects();
}

export async function viewposting() {
  await client.connect();
  let showpost: QueryResult = await client.query(
    "select * from posting order by kd_post DESC",
  );
  await client.end();

  return showpost.rowsOfObjects();
}

export async function insertposting(value: string | null) {
  await client.connect();
  await client.query(
    `insert into posting (teks) values ('${value}') `,
  );
  await client.end();
}
export async function multiselect(qry: QueryConfig[]) {
  await client.connect();

  let tables: any =[ ];

  try {

    let hasil: QueryResult[] = await client.multiQuery(qry);
    console.log(hasil);
    hasil.forEach((obj) => {
      tables.push(obj.rowsOfObjects());
    });


  } catch (error) {
    console.log(error);
  }
  
  await client.end();

  return tables;
}
