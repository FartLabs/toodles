import { OpenAPIServer } from "@fartlabs/declarative/registry/common/openapi";
import { DenoKvOpenAPIServerStorage } from "@fartlabs/declarative/registry/common/openapi/storage";
import { Todo } from "./todo.ts";

export const server = new OpenAPIServer(
  new DenoKvOpenAPIServerStorage(await Deno.openKv("./db.kv")),
);
server.register(Todo, { path: "/api/todos" });
