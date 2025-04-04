import { build } from "esbuild";
import { createClient } from "@hey-api/openapi-ts";
import { server } from "./server.ts";

if (import.meta.main) {
  await createClient({
    input: server.specification,
    output: { path: "./static/client", format: "prettier", lint: "eslint" },
    plugins: ["@hey-api/client-fetch"],
  });

  await build({
    entryPoints: ["./static/client/index.ts"],
    outdir: "./static/client",
    packages: "external",
    bundle: true,
    format: "esm",
  });
}
