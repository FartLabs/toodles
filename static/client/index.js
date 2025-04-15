// static/client/client.gen.ts
import { createClient, createConfig } from "@hey-api/client-fetch";
var client = createClient(createConfig({
  baseUrl: "http://localhost:8000"
}));

// static/client/sdk.gen.ts
var getApiTodos = (options) => {
  return (options?.client ?? client).get({
    url: "/api/todos",
    ...options
  });
};
var postApiTodos = (options) => {
  return (options.client ?? client).post({
    url: "/api/todos",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
};
var deleteApiTodosByTodo = (options) => {
  return (options.client ?? client).delete({
    url: "/api/todos/{todo}",
    ...options
  });
};
var getApiTodosByTodo = (options) => {
  return (options.client ?? client).get({
    url: "/api/todos/{todo}",
    ...options
  });
};
var postApiTodosByTodo = (options) => {
  return (options.client ?? client).post({
    url: "/api/todos/{todo}",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
};
export {
  deleteApiTodosByTodo,
  getApiTodos,
  getApiTodosByTodo,
  postApiTodos,
  postApiTodosByTodo
};
