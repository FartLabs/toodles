import { transform } from "esbuild";
import { generateSource } from "oazapfts";
import { server } from "./server.ts";

if (import.meta.main) {
  const sourceCode = await generateSource(
    server.specification as unknown as string,
    { optimistic: true },
  );

  const result = await transform(sourceCode, { format: "esm", loader: "ts" });
  await Deno.writeTextFile("./static/client.js", result.code);
  await Deno.writeTextFile("./static/client.js.map", result.map);
}
