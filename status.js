function status_init() {
    renderOrdersStatus();
}
function getOrders() {
    const ordersJSON = localStorage.getItem("orders");
    const ordersMap = ordersJSON
        ? new Map(JSON.parse(ordersJSON))
        : new Map();
    return ordersMap;
}
function renderOrdersStatus() {
    const orders = getOrders();
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    orders.forEach((order) => {
        const tr = document.createElement("tr");
        tr.className = "*:first:font-medium";
        const tdId = document.createElement("td");
        tdId.className = "px-3 py-2 whitespace-nowrap";
        tdId.textContent = order.id.toString();
        tr.appendChild(tdId);
        const tdName = document.createElement("td");
        tdName.className = "px-3 py-2 whitespace-nowrap";
        tdName.textContent = order.name;
        tr.appendChild(tdName);
        const tdCreatedAt = document.createElement("td");
        tdCreatedAt.className = "px-3 py-2 whitespace-nowrap";
        tdCreatedAt.textContent = order.createdAt;
        tr.appendChild(tdCreatedAt);
        const tdStatus = document.createElement("td");
        tdStatus.className = `px-3 py-2 whitespace-nowrap ${getStatusClass(order.status)}`;
        tdStatus.textContent = order.status;
        tr.appendChild(tdStatus);
        tbody.appendChild(tr);
    });
}
function getStatusClass(status) {
    switch (status) {
        case "Ready":
            return "text-green-600 font-bold";
        case "Coming Soon":
            return "text-yellow-600 font-semibold italic";
        default:
            return "text-gray-600";
    }
}
export { status_init, getOrders };
