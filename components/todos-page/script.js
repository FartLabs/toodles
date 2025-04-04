// deno-lint-ignore-file

import * as client from "/static/client/index.js";

// https://www.ag-grid.com/javascript-data-grid/getting-started/

// Grid Options: Contains all of the Data Grid configurations.
// https://github.com/ag-grid/ag-grid#setup
const gridOptions = {
  // Row Data: The data to be displayed.
  rowData: [],
  columnDefs: [
    { headerName: "Species", field: "species" },
    { headerName: "Category", field: "category" },
    { headerName: "Class", field: "class" },
  ],
  defaultColDef: { sortable: true, filter: true, editable: true },
  pagination: true,
  paginationPageSize: 10,
};

const myGridElement = document.querySelector("#todos");
const myGrid = agGrid.createGrid(myGridElement, gridOptions);

// TODO: Refactor to production-ready.
// TODO: Manually test the API.
const result = await client.getApiTodos();
console.log({ result });

const addRandomTodoButton = document.createElement("button");
addRandomTodoButton.innerText = "Add Random TODO";
addRandomTodoButton.addEventListener("click", async () => {
  await client.postApiTodos({ summary: "Random TODO" });
});

// TODO: wip.
document.body.appendChild(addRandomTodoButton);
