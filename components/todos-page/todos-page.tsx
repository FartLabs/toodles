// deno-lint-ignore-file jsx-key

import { DIV, H1, SCRIPT } from "@fartlabs/htx";
import { Layout } from "#/components/layout/layout.tsx";
import { Section } from "#/components/section/section.tsx";

const js = await Deno.readTextFile(
  new URL(import.meta.resolve("./script.js")),
);

export function TodosPage() {
  return (
    <Layout
      headHTML={[
        <SCRIPT src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js" />,
        <SCRIPT type="module">{js}</SCRIPT>,
        <SCRIPT type="importmap">
          {JSON.stringify({
            imports: {
              "@hey-api/client-fetch": "https://esm.sh/@hey-api/client-fetch",
            },
          })}
        </SCRIPT>,
      ]}
    >
      <Section>
        <H1>TODO List</H1>
      </Section>

      <DIV id="todos" style="height: 500px"></DIV>
    </Layout>
  );
}
