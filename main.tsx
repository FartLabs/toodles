import { serveDir } from "@std/http/file-server";
import { Get, Route, Router } from "@fartlabs/rtx";
import { TodosPage } from "#/components/todos-page/todos-page.tsx";
import { SwaggerUI } from "#/components/swagger-ui/swagger-ui.tsx";
import { server } from "./server.ts";

const router = (
  <Router default={() => new Response("Not found", { status: 404 })}>
    <Get
      pattern="/"
      handle={() => {
        return new Response(
          <TodosPage />,
          { headers: { "Content-Type": "text/html" } },
        );
      }}
    />
    <Get
      pattern="/static/*"
      handle={({ request }) => {
        return serveDir(request);
      }}
    />
    <Get
      pattern="/openapi.json"
      handle={() => {
        return new Response(JSON.stringify(server.specification), {
          headers: { "Content-Type": "application/json" },
        });
      }}
    />
    <Get
      pattern="/swagger-ui"
      handle={() => {
        return new Response(
          <SwaggerUI url="/openapi.json" />,
          { headers: { "Content-Type": "text/html" } },
        );
      }}
    />
    <Route
      pattern={new URLPattern({ pathname: "/api/*" })}
      handler={({ request }) => {
        return server.fetch(request);
      }}
    />
  </Router>
);

if (import.meta.main) {
  Deno.serve(async (request) => {
    const response = await router.fetch(request);
    console.log(server.db); // TODO: Manually test the API.
    return response;
  });
}

// var SwaggerUIBundle = require('swagger-ui-dist').SwaggerUIBundle

// const ui = SwaggerUIBundle({
//     url: "https://petstore.swagger.io/v2/swagger.json",
//     dom_id: '#swagger-ui',
//     presets: [
//       SwaggerUIBundle.presets.apis,
//       SwaggerUIBundle.SwaggerUIStandalonePreset
//     ],
//     layout: "StandaloneLayout"
//   })
