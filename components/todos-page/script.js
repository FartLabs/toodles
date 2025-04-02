// deno-lint-ignore-file

import * as client from "/static/client.js";

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
agGrid.createGrid(myGridElement, gridOptions);

// TODO: Manually test the API.
const result = await client.postApiTodos({ id: "0", summary: "Example TODO" });
console.log({ result });
