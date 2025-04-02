import { generateSource } from "oazapfts";
import { server } from "./server.ts";

if (import.meta.main) {
  const result = await generateSource(
    server.specification as unknown as string,
    { optimistic: true },
  );

  await Deno.writeTextFile("./client.ts", result);
}
