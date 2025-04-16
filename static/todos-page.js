import {
  ClientSideRowModelModule,
  createGrid,
  ModuleRegistry,
} from "ag-grid-community";
import * as client from "./client/index.js";

// https://www.ag-grid.com/javascript-data-grid/errors/200/
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// https://www.ag-grid.com/javascript-data-grid/getting-started/

// Grid Options: Contains all of the Data Grid configurations.
// https://github.com/ag-grid/ag-grid#setup
const gridOptions = {
  defaultColDef: { sortable: true, filter: true, editable: true },
  pagination: true,
  paginationPageSize: 10,
};

const myGridElement = document.querySelector("#todos");
const myGrid = createGrid(myGridElement, gridOptions);

const addRandomTodoButton = document.createElement("button");
addRandomTodoButton.innerText = "Add Random TODO";
addRandomTodoButton.addEventListener("click", async () => {
  await client.postApiTodos({
    body: {
      name: `todos/${crypto.randomUUID()}`,
      summary: "Random TODO",
      completed: new Date().toISOString(),
    },
  });
});
document.body.appendChild(addRandomTodoButton);

// TODO: Load list from API into the AG Grid.
// https://www.ag-grid.com/javascript-data-grid/component-loading-cell-renderer
addEventListener("DOMContentLoaded", () => {
  // Load list from API into the AG Grid.
  client.getApiTodos()
    .then(({ data: todos }) => {
      console.table(todos);
      myGrid.setGridOption("rowData", todos);
      myGrid.setGridOption(
        "columnDefs",
        uniqueKeys(todos).map((key) => {
          return { headerName: key, field: key };
        }),
      );
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});

function uniqueKeys(objs) {
  const keys = [];
  for (const obj of objs) {
    for (const key in obj) {
      if (keys.includes(key)) {
        continue;
      }

      keys.push(key);
    }
  }

  return keys;
}
