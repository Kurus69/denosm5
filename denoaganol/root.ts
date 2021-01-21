import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  index,
  signup,
  saveuser,
  inbox,
  task,
  uploadstory,
} from "./controler/control.ts";

const router = new Router();

router
  .get("/", index)
  .get("/beranda", index)
  .get("/login", signup)
  .get("/task", task)
  .get("/inbox", inbox)
  .post("/simpanuser", saveuser)
  .post("/", uploadstory)
  .post("/beranda", uploadstory)
  .get("/Pengaturan", (context) => {
    context.response.body = "Ini halaman Peraturan";
  })
  .get("/News", (context) => {
    context.response.body = "Ini halaman News";
  })
  .get("/About", (context) => {
    context.response.body = "Ini halaman About";
  });

export default router;
