// static/client/client.gen.ts
import { createClient, createConfig } from "@hey-api/client-fetch";
var client = createClient(createConfig());

// static/client/sdk.gen.ts
var getApiTodos = (options) => {
  return (options?.client ?? client).get({
    url: "/api/todos",
    ...options
  });
};
var postApiTodos = (options) => {
  return (options?.client ?? client).post({
    url: "/api/todos",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
};
var deleteApiTodosById = (options) => {
  return (options.client ?? client).delete({
    url: "/api/todos/{id}",
    ...options
  });
};
var getApiTodosById = (options) => {
  return (options.client ?? client).get({
    url: "/api/todos/{id}",
    ...options
  });
};
var postApiTodosById = (options) => {
  return (options.client ?? client).post({
    url: "/api/todos/{id}",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
};
export {
  deleteApiTodosById,
  getApiTodos,
  getApiTodosById,
  postApiTodos,
  postApiTodosById
};
