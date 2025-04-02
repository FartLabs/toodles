/**
 * Example API
 * 1.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "/",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {};
export function postTodo(body?: {
    summary: string;
    completed: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/todo", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
export function getTodoById(id: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            summary: string;
            completed: string;
        };
    }>(`/todo/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
export function postTodoById(id: string, body?: {
    summary: string;
    completed: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/todo/${encodeURIComponent(id)}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
export function deleteTodoById(id: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/todo/${encodeURIComponent(id)}`, {
        ...opts,
        method: "DELETE"
    }));
}
