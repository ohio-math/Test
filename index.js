import http from "node:http";
import { createBareServer } from "@tomphttp/bare-server-node";

const BASE_PATH = "/bare/";

const bare = createBareServer(BASE_PATH);

// Create HTTP server
const server = http.createServer((req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Bare server running on port ${PORT}`);
});
