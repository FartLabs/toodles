import { Get, Router } from "@fartlabs/rtx";
import { TodosPage } from "#/components/todos-page/todos-page.tsx";

const router = (
  <Router default={() => new Response("Not found", { status: 404 })}>
    <Get
      pattern="/"
      handle={() => {
        return new Response(
          <TodosPage />,
          { headers: { "content-type": "text/html" } },
        );
      }}
    />
  </Router>
);

if (import.meta.main) {
  Deno.serve((request) => {
    return router.fetch(request);
  });
}
