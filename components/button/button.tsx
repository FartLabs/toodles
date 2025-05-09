import { A, SMALL } from "@fartlabs/htx";

export interface PageButtonProps {
  content: string;
  href: string;
  outbound?: boolean;
}

export function Button(props: PageButtonProps) {
  return (
    <A
      class="fart-button"
      href={props.href}
      target={props.outbound ? "_blank" : undefined}
    >
      {props.content}
      {props.outbound && <Outbound />}
    </A>
  );
}

export function Outbound() {
  return <SMALL>&#8599;</SMALL>;
}
