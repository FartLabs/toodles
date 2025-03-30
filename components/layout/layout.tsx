import { BODY, HEAD, HR, HTML, LINK, META, TITLE } from "@fartlabs/htx";
import { PageNav } from "./nav.tsx";
import { PageFoot } from "./foot.tsx";

export interface LayoutProps {
  title?: string;
  description?: string;
  headHTML?: string[];
  children?: string[];
}

export const defaultTitle = "Toodles, your TODO list manager.";
export const defaultDescription =
  "Toodles is a full-stack TODO list web application.";

export function Layout(props: LayoutProps) {
  const title = props.title ?? defaultTitle;
  const description = props.description ?? defaultDescription;

  return "<!DOCTYPE html>\n" +
    (
      <HTML lang="en">
        <HEAD>
          <META charset="UTF-8" />
          <META name="theme-color" content="#004021" />
          <META
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <TITLE>{title}</TITLE>
          <META name="description" content={description} />
          <LINK
            rel="stylesheet"
            type="text/css"
            href="https://css.fart.tools/fart.css"
          />
          <Favicon />
          {props.headHTML?.join("") ?? ""}
        </HEAD>
        <BODY>
          <PageNav />
          {props.children?.join("") ?? ""}
          <HR class="fart-break" />
          <PageFoot />
        </BODY>
      </HTML>
    );
}

function Favicon() {
  return <LINK rel="icon" href="https://fartlabs.org/fl-logo.png" />;
}
