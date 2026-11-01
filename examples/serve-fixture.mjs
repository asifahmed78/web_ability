import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const html = await readFile(resolve("examples/fixture/index.html"));
const server = createServer((_request, response) => {
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(html);
});
server.listen(3000, "127.0.0.1", () => {
  console.log("WebAbility demo fixture: http://127.0.0.1:3000");
});
