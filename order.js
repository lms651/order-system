function order_init() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const idInput = document.getElementById("order-id");
        const createdAtInput = document.getElementById("date-time");
        // Take User Input
        const nameInput = document.getElementById("order-name");
        const quantityInput = document.getElementById("quantity");
        // Load orders from localStorage, parse as array of entries, then convert to Map
        const ordersJSON = localStorage.getItem("orders");
        const ordersMap = ordersJSON
            ? new Map(JSON.parse(ordersJSON))
            : new Map();
        // Create new order
        const newOrder = {
            id: parseInt(idInput.value),
            name: nameInput.value,
            quantity: parseInt(quantityInput.value),
            createdAt: createdAtInput.value
        };
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
    const idInput = document.getElementById("order-id");
    const createdAtInput = document.getElementById("date-time");
    // Load orders from localStorage, parse as array of entries, then convert to Map
    const ordersJSON = localStorage.getItem("orders");
    const ordersMap = ordersJSON
        ? new Map(JSON.parse(ordersJSON))
        : new Map();
    // Generate new ID: Find Max Key in Map. Use Spread Operator to pass each individual key argument (order ID's) from array of keys into Math.max()
    const maxId = ordersMap.size > 0 ? Math.max(...ordersMap.keys()) : 0;
    const newId = maxId + 1;
    // Fill readonly Values
    idInput.value = newId.toString();
    createdAtInput.value = new Date().toLocaleString();
}
export { order_init, prefillFields };
