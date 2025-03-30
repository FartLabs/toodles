// https://www.ag-grid.com/javascript-data-grid/getting-started/

// Grid Options: Contains all of the Data Grid configurations
const gridOptions = {
  // Row Data: The data to be displayed.
  rowData: [
    { species: "Lion", category: "Mammal", class: "Felidae" },
    { species: "Tiger", category: "Mammal", class: "Felidae" },
    { species: "Leopard", category: "Mammal", class: "Felidae" },
    { species: "Jaguar", category: "Mammal", class: "Felidae" },
    { species: "Cheetah", category: "Mammal", class: "Felidae" },
    { species: "Hyena", category: "Mammal", class: "Hyaenidae" },
    { species: "Elephant", category: "Mammal", class: "Elephantidae" },
    { species: "Giraffe", category: "Mammal", class: "Giraffidae" },
    { species: "Zebra", category: "Mammal", class: "Equidae" },
    { species: "Horse", category: "Mammal", class: "Equidae" },
    { species: "Donkey", category: "Mammal", class: "Equidae" },
    { species: "Monkey", category: "Mammal", class: "Cercopithecidae" },
    { species: "Gorilla", category: "Mammal", class: "Hominidae" },
    { species: "Crocodile", category: "Reptile", class: "Crocodylidae" },
    { species: "Snake", category: "Reptile", class: "Serpentes" },
    { species: "Lizard", category: "Reptile", class: "Squamata" },
    { species: "Turtle", category: "Reptile", class: "Testudines" },
    { species: "Alligator", category: "Reptile", class: "Alligatoridae" },
    { species: "Ostrich", category: "Bird", class: "Struthionidae" },
    { species: "Eagle", category: "Bird", class: "Accipitridae" },
    { species: "Vulture", category: "Bird", class: "Accipitridae" },
    { species: "Chicken", category: "Bird", class: "Phasianidae" },
    { species: "Duck", category: "Bird", class: "Anatidae" },
    { species: "Fish", category: "Fish", class: "Actinopterygii" },
  ],
  columnDefs: [
    { headerName: "Species", field: "species" },
    { headerName: "Category", field: "category" },
    { headerName: "Class", field: "class" },
  ],
  defaultColDef: { sortable: true, filter: true, editable: true },
  pagination: true,
  paginationPageSize: 6,
};

// Your Javascript code to create the Data Grid
const myGridElement = document.querySelector("#todos");
agGrid.createGrid(myGridElement, gridOptions);
