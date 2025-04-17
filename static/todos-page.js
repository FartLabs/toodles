import {
  AllCommunityModule,
  createGrid,
  ModuleRegistry,
} from "ag-grid-community";
import * as client from "./client/index.js";

// https://www.ag-grid.com/javascript-data-grid/modules/#bundles
ModuleRegistry.registerModules([AllCommunityModule]);

// Grid Options: Contains all of the Data Grid configurations.
// https://github.com/ag-grid/ag-grid#setup
const gridOptions = {
  defaultColDef: { sortable: true, filter: true, editable: true },
  pagination: true,
  paginationPageSize: 20,
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

// https://www.ag-grid.com/javascript-data-grid/getting-started/
const myGridElement = document.querySelector("#todos");
const myGrid = createGrid(myGridElement, gridOptions);

globalThis.addEventListener("resize", () => {
  myGrid.sizeColumnsToFit();
});

const addTodoButton = document.createElement("button");
addTodoButton.classList.add("fart-button");
addTodoButton.innerText = "Add TODO";
addTodoButton.addEventListener("click", () => {
  client.postApiTodos({
    body: {
      name: `todos/${crypto.randomUUID()}`,
      summary: "",
      completed: "",
    },
  }).then((result) => {
    console.log({ "Created TODO": result.data });
    myGrid.applyTransactionAsync({ add: [{ ...result.data }], addIndex: 0 });
    myGrid.setGridOption("columnDefs", makeColumnDefs([result.data]));
    myGrid.sizeColumnsToFit();
  }).catch((error) => {
    console.error(error);
    alert(error.message);
  });
});

myGridElement.parentElement.insertBefore(
  addTodoButton,
  myGridElement.nextSibling,
);

// https://www.ag-grid.com/javascript-data-grid/component-loading-cell-renderer
addEventListener("DOMContentLoaded", () => {
  // Load list from API into the AG Grid.
  client.getApiTodos()
    .then(({ data: todos }) => {
      console.table(todos);
      myGrid.setGridOption("rowData", todos);

      // https://www.ag-grid.com/javascript-data-grid/column-properties/#reference-header
      myGrid.setGridOption("columnDefs", makeColumnDefs(todos));
      myGrid.sizeColumnsToFit();
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});

function makeColumnDefs(todos) {
  return [
    ...uniqueKeys(todos).map((key) => {
      return { headerName: key, field: key };
    }),
    {
      headerName: "actions",
      field: "button",
      cellRenderer: (params) => {
        const button = document.createElement("button");
        button.classList.add("fart-button");
        button.innerText = "Delete";
        button.addEventListener("click", () => {
          client.deleteApiTodosByTodo({
            path: { todo: params.data.name },
          }).then((result) => {
            console.log({ "Deleted TODO": result.data });
            myGrid.applyTransactionAsync({ remove: [params.data] });
          });
        });

        return button;
      },
    },
  ];
}

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
