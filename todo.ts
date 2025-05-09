import { jsonld } from "@fartlabs/declarative/common/jsonld";
import { createStandardMethodsDecoratorFactory } from "@fartlabs/declarative/common/google-aip/methods";
import { createAutoSchemaDecoratorFactoryAt } from "@fartlabs/declarative/common/json-schema/auto-schema";
import kv from "./kv.ts";

const autoSchema = await createAutoSchemaDecoratorFactoryAt(import.meta);
const standardMethods = createStandardMethodsDecoratorFactory(kv);

@standardMethods({ parent: "/api" })
@autoSchema()
@jsonld({
  context: "https://www.w3.org/2002/12/cal/ical#",
  type: "Vtodo",
})
export class Todo {
  public constructor(
    public name: string,
    public summary?: string | undefined,
    public completed?: string | undefined,
  ) {}
}
