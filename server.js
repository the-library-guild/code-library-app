const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

require("dotenv").config({ path: __dirname + "/.env.local" });

const assertEnvVarIsNotUndefined = (value) => {
  if (process.env[value] == null)
    throw new Error(`FATAL: Environment variable "${value}" is required`);
};
const requiredEnvVars = ["GRAPHQL_URL"];
requiredEnvVars.map(assertEnvVarIsNotUndefined);

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // const parsedUrl = parse(req.url, true);
      // const { pathname, query } = parsedUrl;

      // if (pathname === "/a") {
      //   await app.render(req, res, "/a", query);
      // } else if (pathname === "/b") {
      //   await app.render(req, res, "/b", query);
      // } else {
      //   await handle(req, res, parsedUrl);
      // }
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
