import { Application, send } from "https://deno.land/x/oak/mod.ts";
import router from "./root.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}`,
  });
});

console.log("Complete");

await app.listen({ port: 3000 });
