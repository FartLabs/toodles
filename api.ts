import { openapi } from "@fartlabs/declarative/common/openapi";
import { Todo } from "./todo.ts";

@openapi({ resources: [Todo] })
export class ToodlesAPI {}
