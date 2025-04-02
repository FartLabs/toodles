import {
  jsonSchemaDecoratorFactoryOfFile,
  jsonSchemaOf,
} from "@fartlabs/declarative/common/json-schema";
import { jsonld } from "@fartlabs/declarative/common/jsonld";

const jsonSchema = await jsonSchemaDecoratorFactoryOfFile(import.meta.url);

@jsonld({
  context: "https://www.w3.org/2002/12/cal/ical#",
  type: "Vtodo",
})
@jsonSchema({
  properties: {
    summary: { title: "Summary" },
    completed: { title: "Completed" },
  },
})
export class Todo {
  public constructor(public summary?: string, public completed?: string) {}
}

export const jsonSchemaTodo = jsonSchemaOf(Todo);
