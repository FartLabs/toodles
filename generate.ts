import { build } from "esbuild";
import { createClient } from "@hey-api/openapi-ts";
import { specificationOf } from "@fartlabs/declarative/common/openapi";
import { ToodlesAPI } from "./api.ts";

if (import.meta.main) {
  await createClient({
    input: specificationOf(ToodlesAPI) as unknown as string,
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
