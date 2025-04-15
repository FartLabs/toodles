import { jsonld } from "@fartlabs/declarative/common/jsonld";
import { createStandardMethodsDecoratorFactory } from "@fartlabs/declarative/common/google-aip/methods";
import { createAutoSchemaDecoratorFactoryAt } from "@fartlabs/declarative/common/json-schema/auto-schema";

const autoSchema = await createAutoSchemaDecoratorFactoryAt(import.meta);
const kv = await Deno.openKv(":memory:");
const standardMethods = createStandardMethodsDecoratorFactory(kv);

@standardMethods("/api")
@autoSchema()
@jsonld({
  context: "https://www.w3.org/2002/12/cal/ical#",
  type: "Vtodo",
})
export class Todo {
  public constructor(public summary?: string, public completed?: string) {}
}
