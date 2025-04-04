// deno-lint-ignore-file

import { serveDir } from "@std/http/file-server";
import { Get, Router, StandardRoute } from "@fartlabs/rtx";
import { TodosPage } from "#/components/todos-page/todos-page.tsx";
import { SwaggerUI } from "#/components/swagger-ui/swagger-ui.tsx";
import { server } from "./server.ts";

const router = <Toodles />;

if (import.meta.main) {
  Deno.serve(async (request) => {
    return await router.fetch(request);
  });
}

export function Toodles() {
  return (
    <Router default={() => new Response("Not found", { status: 404 })}>
      <APIRoutes />
      <Get
        pattern="/"
        handler={() => {
          return new Response(
            <TodosPage />,
            { headers: { "Content-Type": "text/html" } },
          );
        }}
      />
      <Get
        pattern="/static/*"
        handler={({ request }) => {
          return serveDir(request);
        }}
      />
    </Router>
  );
}

function APIRoutes() {
  return (
    <Router>
      {server.routes.map((route) => <StandardRoute {...route} />)}
      <Get
        pattern="/openapi.json"
        handler={() => {
          return new Response(JSON.stringify(server.specification), {
            headers: { "Content-Type": "application/json" },
          });
        }}
      />
      <Get
        pattern="/swagger-ui"
        handler={() => {
          return new Response(
            <SwaggerUI url="/openapi.json" />,
            { headers: { "Content-Type": "text/html" } },
          );
        }}
      />
    </Router>
  );
}
