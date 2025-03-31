import { A, DIV, NAV } from "@fartlabs/htx";
import { Button } from "#/components/button/button.tsx";

export function PageNav() {
  return (
    <NAV>
      <A class="fart-header fart-link-visible-on-hover" href="/">
        Toodles
      </A>

      <DIV class="fart-inline">
        <Button
          content="Source Code"
          href="https://github.com/FartLabs"
          outbound
        />
      </DIV>
    </NAV>
  );
}
