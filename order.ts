interface Order {
  id: number;
  name: string;
  quantity: number;
  createdAt: string;
}


function order_init() {
  const form = document.querySelector("form") as HTMLFormElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const idInput = document.getElementById("order-id") as HTMLInputElement;
    const createdAtInput = document.getElementById("date-time") as HTMLInputElement;

    // Take User Input
    const nameInput = document.getElementById("order-name") as HTMLInputElement;
    const quantityInput = document.getElementById("quantity") as HTMLInputElement;

    // Load orders from localStorage, parse as array of entries, then convert to Map
    const ordersJSON = localStorage.getItem("orders");
    const ordersMap: Map<number, Order> = ordersJSON
      ? new Map<number, Order>(JSON.parse(ordersJSON))
      : new Map();

    // Create new order
    const newOrder: Order = {
      id: parseInt(idInput.value),
      name: nameInput.value,
      quantity: parseInt(quantityInput.value),
      createdAt: createdAtInput.value
    }

    // Add new order to Map
    ordersMap.set(parseInt(idInput.value), newOrder);

    // Save Map back to localStorage as array of entries
    localStorage.setItem("orders", JSON.stringify(Array.from(ordersMap.entries())));

    // Clears form on submit
    form.reset();

    alert("Order submitted successfully!");
  });
}

function prefillFields() {

    const idInput = document.getElementById("order-id") as HTMLInputElement;
    const createdAtInput = document.getElementById("date-time") as HTMLInputElement;

    // Load orders from localStorage, parse as array of entries, then convert to Map
    const ordersJSON = localStorage.getItem("orders");
    const ordersMap: Map<number, Order> = ordersJSON
      ? new Map<number, Order>(JSON.parse(ordersJSON))
      : new Map();

    // Generate new ID: Find Max Key in Map. Use Spread Operator to pass each individual key argument (order ID's) from array of keys into Math.max()
    const maxId = ordersMap.size > 0 ? Math.max(...ordersMap.keys()) : 0;
    const newId = maxId + 1;

    // Fill readonly Values
    idInput.value = newId.toString();
    createdAtInput.value = new Date().toLocaleString();

}


export {
    order_init,
    prefillFields
}