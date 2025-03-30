import { H1, P } from "@fartlabs/htx";
import { Layout } from "#/components/layout/layout.tsx";
import { Section } from "#/components/section/section.tsx";

export function TODOsPage() {
  return (
    <Layout>
      <Section>
        <H1>Toodles</H1>
        <P>Your TODO list manager.</P>
      </Section>

      {/* TODO: Add TODOs manager. */}
    </Layout>
  );
}
