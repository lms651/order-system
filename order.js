import { Order } from "./interfaces.js";
function order_init() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const idInput = document.getElementById("order-id");
        const createdAtInput = document.getElementById("date-time");
        // Take User Input
        const nameInput = document.getElementById("order-name");
        const quantityInput = document.getElementById("quantity");
        const ordersJSON = localStorage.getItem("orders");
        const ordersMap = new Map();
        if (ordersJSON) {
            const entries = JSON.parse(ordersJSON);
            for (const [key, obj] of entries) {
                // Recreate Order instances so can use toJson
                const orderInstance = new Order(obj.id, obj.name, obj.quantity, obj.createdAt, obj.status);
                ordersMap.set(Number(key), orderInstance);
            }
        }
        // Create new order
        const newOrder = new Order(parseInt(idInput.value), nameInput.value, parseInt(quantityInput.value), createdAtInput.value);
        // Store as JSON
        ordersMap.set(newOrder.id, newOrder);
        const serializedEntries = Array.from(ordersMap.entries()).map(([key, order]) => {
            return [key, order.toJson()];
        });
        // Save Map back to localStorage as array of entries
        localStorage.setItem("orders", JSON.stringify(serializedEntries));
        // Clears form on submit
        form.reset();
        prefillFields();
        console.log('trying to prefill');
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
export { order_init, prefillFields, };
