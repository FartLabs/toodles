import { BODY, DIV, HEAD, HTML, LINK, META, SCRIPT } from "@fartlabs/htx";

export interface SwaggerUIProps {
  url: string;
}

export function SwaggerUI(props: SwaggerUIProps) {
  return (
    <HTML lang="en">
      <HEAD>
        <META charset="UTF-8" />
        <META
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <LINK
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css"
        />
        <SCRIPT src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js">
        </SCRIPT>
        <SCRIPT src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-standalone-preset.js">
        </SCRIPT>
        <SCRIPT>
          {`window.addEventListener('load', function() {
  const ui = SwaggerUIBundle({
    url: "${props.url}",
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIBundle.SwaggerUIStandalonePreset,
    ],
  });
});`}
        </SCRIPT>
      </HEAD>
      <BODY>
        <DIV id="swagger-ui"></DIV>
      </BODY>
    </HTML>
  );
}
