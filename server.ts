import { OpenAPIServer } from "@fartlabs/declarative/registry/common/openapi";
import { Todo } from "./todo.ts";

export const server = new OpenAPIServer();
server.register(Todo, { path: "/api/todos" });
