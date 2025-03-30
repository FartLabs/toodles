import { SECTION } from "@fartlabs/htx";

export interface SectionProps {
  class?: string;
  children?: string[];
}

export function Section(props: SectionProps) {
  const className = `fart-section${props.class ? ` ${props.class}` : ""}`;
  return <SECTION class={className}>{...(props.children ?? [])}</SECTION>;
}
