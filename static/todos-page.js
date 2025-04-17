import {
  AllCommunityModule,
  createGrid,
  ModuleRegistry,
} from "ag-grid-community";
import * as client from "./client/index.js";

// https://www.ag-grid.com/javascript-data-grid/modules/#bundles
ModuleRegistry.registerModules([AllCommunityModule]);

// https://www.ag-grid.com/javascript-data-grid/getting-started/

// Grid Options: Contains all of the Data Grid configurations.
// https://github.com/ag-grid/ag-grid#setup
const gridOptions = {
  defaultColDef: { sortable: true, filter: true, editable: true },
  pagination: true,
  paginationPageSize: 10,
  onCellValueChanged: (event) => {
    client.postApiTodosByTodo({
      path: {
        todo: event.colDef.field === "name" ? event.oldValue : event.data.name,
      },
      body: event.data,
    })
      .then((result) => {
        console.log({ "Updated TODO": result.data });
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);

        // Revert the change.
        const oldValue = event.oldValue;
        event.data[event.colDef.field] = oldValue;
        myGrid.applyTransactionAsync({ update: [event.data] });
      });
  },
};

const myGridElement = document.querySelector("#todos");
const myGrid = createGrid(myGridElement, gridOptions);

// TODO: Ability to delete a TODO.

const addRandomTodoButton = document.createElement("button");
addRandomTodoButton.classList.add("fart-button");
addRandomTodoButton.innerText = "Add Random TODO";
addRandomTodoButton.addEventListener("click", () => {
  client.postApiTodos({
    body: {
      name: `todos/${crypto.randomUUID()}`,
      summary: "Random TODO",
      completed: new Date().toISOString(),
    },
  }).then((result) => {
    console.log({ "Created TODO": result.data });
    myGrid.applyTransactionAsync({ add: [{ ...result.data }], addIndex: 0 });
    myGrid.setGridOption(
      "columnDefs",
      uniqueKeys([result.data]).map((key) => {
        return { headerName: key, field: key };
      }),
    );
  }).catch((error) => {
    console.error(error);
    alert(error.message);
  });
});

myGridElement.parentElement.insertBefore(
  addRandomTodoButton,
  myGridElement.nextSibling,
);

// TODO: Load list from API into the AG Grid.
// https://www.ag-grid.com/javascript-data-grid/component-loading-cell-renderer
addEventListener("DOMContentLoaded", () => {
  // Load list from API into the AG Grid.
  client.getApiTodos()
    .then(({ data: todos }) => {
      console.table(todos);
      myGrid.setGridOption("rowData", todos);

      // https://www.ag-grid.com/javascript-data-grid/column-properties/#reference-header
      myGrid.setGridOption(
        "columnDefs",
        uniqueKeys(todos).map((key) => {
          return { headerName: key, field: key };
        }),
      );
      myGrid.sizeColumnsToFit();
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
