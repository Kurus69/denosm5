import { renderFileToString } from "https://deno.land/x/dejs/mod.ts";
import {
  menusidebar,
  viewposting,
  insertposting,
  multiselect,
} from "../model/server_model.ts";
import querysql from "../sql/sql.ts";

const index = async ({ response }: { response: any }) => {
  const datatabel = await multiselect(
    [
      { text: querysql["allsidebar"] },
      { text: querysql["sidebarlogin"] },
      { text: querysql["sidebaritem"] },
    ],
  );

  const html = await renderFileToString("./views/layout.ejs", {
    data: {
      menu: await menusidebar(
        {
          text: datatabel[0],
          args: [''],
        },
      ),
      posting: await viewposting(),
      username: "Mahasiswa",
    },
    subview: "./views/conten/feed.ejs",
  });
  response.body = new TextEncoder().encode(html);
};

const task = async ({ response }: { response: any }) => {
  const html = await renderFileToString("./views/layout.ejs", {
    data: {
      menu: await menusidebar(
        {
          text: querysql["sidebaritem"],
          args: ["1", "2"],
        },
      ),
      username: "Mahasiswa",
    },
    subview: "./views/conten/task.ejs",
  });
  response.body = new TextEncoder().encode(html);
};

const inbox = async ({ response }: { response: any }) => {
  const html = await renderFileToString("./views/layout.ejs", {
    data: {
      menu: await menusidebar(
        {
          text: querysql["allsidebar"],
          args: [''],
        },
      ),
      username: "Mahasiswa",
    },
    subview: "./views/conten/inbox.ejs",
  });
  response.body = new TextEncoder().encode(html);
};

const signup = async ({ response }: { response: any }) => {
  const html = await renderFileToString("./views/layout.ejs", {
    subview: "./views/login.ejs",
    data: {
      menu: await menusidebar(
        {
          text: querysql["sidebarlogin"],
          args: [''],
        },
      ),
      username: "Mahasiswa",
    },
  });
  response.body = new TextEncoder().encode(html);
};

const saveuser = async (
  { request, response }: { request: any; response: any },
) => {
  const form = await request.body().value;
  const dataform = new URLSearchParams(form);

  const fullname = dataform.get("username");
  const password = dataform.get("password");

  response.body = `Data yang akan di POST ${fullname}, ${password}`;
};

const uploadstory = async (
  { request, response }: { request: any; response: any },
) => {
  const form = await request.body().value;
  const dataform = new URLSearchParams(form);

  const teks: string | null = dataform.get("story");
  try {
    await insertposting(teks);
  } catch (error) {
    console.log(error);
  }
  response.redirect("/beranda");
};

export { index, signup, saveuser, task, inbox, uploadstory };
