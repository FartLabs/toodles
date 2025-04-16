import * as client from "./client/index.js";

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

const addRandomTodoButton = document.createElement("button");
addRandomTodoButton.innerText = "Add Random TODO";
addRandomTodoButton.addEventListener("click", async () => {
  await client.postApiTodos({ summary: "Random TODO" });
});
document.body.appendChild(addRandomTodoButton);

// TODO: Load list from API into the AG Grid.
// https://www.ag-grid.com/javascript-data-grid/component-loading-cell-renderer
addEventListener("DOMContentLoaded", () => {
  // Load list from API into the AG Grid.
  client.getApiTodos()
    .then((todos) => {
      console.table({ "Loaded TODOs": todos });
      console.log(myGrid);
      // myGrid.api.setRowData(todos);
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});
