import * as Oazapfts from "@oazapfts/runtime";
const defaults = {
  headers: {},
  baseUrl: "/"
};
const oazapfts = Oazapfts.runtime(defaults);
const servers = {};
function postApiTodos(body, opts) {
  return oazapfts.ok(oazapfts.fetchText("/api/todos", oazapfts.json({
    ...opts,
    method: "POST",
    body
  })));
}
function getApiTodosById(id, opts) {
  return oazapfts.ok(oazapfts.fetchJson(`/api/todos/${encodeURIComponent(id)}`, {
    ...opts
  }));
}
function postApiTodosById(id, body, opts) {
  return oazapfts.ok(oazapfts.fetchText(`/api/todos/${encodeURIComponent(id)}`, oazapfts.json({
    ...opts,
    method: "POST",
    body
  })));
}
function deleteApiTodosById(id, opts) {
  return oazapfts.ok(oazapfts.fetchText(`/api/todos/${encodeURIComponent(id)}`, {
    ...opts,
    method: "DELETE"
  }));
}
export {
  defaults,
  deleteApiTodosById,
  getApiTodosById,
  postApiTodos,
  postApiTodosById,
  servers
};
