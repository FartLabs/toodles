import { openapi } from "@fartlabs/declarative/common/openapi";
import { Todo } from "./todo.ts";

@openapi({
  specification: { servers: [{ url: "http://localhost:8000" }] },
  resources: [Todo],
})
export class ToodlesAPI {}
