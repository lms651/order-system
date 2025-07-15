import { getOrders } from "./status.js";
function operator_init() {
    renderOrdersOperator();
}
function renderOrdersOperator() {
    const orders = getOrders();
    const tbody = document.querySelector("#operator-table tbody");
    tbody.innerHTML = ""; // clears any existing rows
    orders.forEach((order) => {
        const tr = document.createElement("tr");
        tr.className = "*:text-gray-900 *:first:font-medium";
        const tdId = document.createElement("td");
        tdId.className = "px-3 py-2 whitespace-nowrap";
        tdId.textContent = order.id.toString();
        tr.appendChild(tdId);
        const tdName = document.createElement("td");
        tdName.className = "px-3 py-2 whitespace-nowrap";
        tdName.textContent = order.name;
        tr.appendChild(tdName);
        const tdActions = document.createElement("td");
        tdName.className = "px-3 py-2 whitespace-nowrap";
        const edtBtn = document.createElement("button");
        edtBtn.textContent = '✎';
        edtBtn.className = "bg-green-500 text-white px-2 py-1 rounded mr-2";
        edtBtn.addEventListener("click", () => showEditModal(order.id));
        tdActions.appendChild(edtBtn);
        const dltBtn = document.createElement("button");
        dltBtn.textContent = "✘";
        dltBtn.className = "bg-red-500 text-white px-2 py-1 rounded";
        dltBtn.addEventListener("click", () => handleDelete(order.id));
        tdActions.appendChild(dltBtn);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdActions);
        tbody.appendChild(tr);
    });
}
function showEditModal(orderId) {
    console.log("Edit order", orderId);
    const edtModal = document.getElementById("edit-modal");
    edtModal.classList.remove("hidden");
}
function hideEditModal() {
    const edtModal = document.getElementById("editModal");
    edtModal.classList.add("hidden");
}
function handleDelete(orderId) {
    // Load orders from localStorage
    const ordersJSON = localStorage.getItem("orders");
    const ordersMap = ordersJSON
        ? new Map(JSON.parse(ordersJSON))
        : new Map();
    // Remove order by ID
    ordersMap.delete(orderId);
    // Save back to localStorage
    localStorage.setItem("orders", JSON.stringify(Array.from(ordersMap.entries())));
    // Re-render table
    renderOrdersOperator();
}
export { operator_init };
