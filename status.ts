
import { Order } from "./interfaces.js";

function status_init() {
    renderOrdersStatus();
}

function getOrders() {
    const ordersJSON = localStorage.getItem("orders");
    const ordersMap: Map<number, Order> = ordersJSON
      ? new Map<number, Order>(JSON.parse(ordersJSON))
      : new Map();

    return ordersMap;
}

function renderOrdersStatus() {
    const orders: Map<number, Order> = getOrders();

    const tbody = document.querySelector("tbody") as HTMLTableSectionElement;
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

    const tdCreatedAt = document.createElement("td");
    tdCreatedAt.className = "px-3 py-2 whitespace-nowrap";
    tdCreatedAt.textContent = order.createdAt;
    tr.appendChild(tdCreatedAt);

    const tdStatus = document.createElement("td");
    tdStatus.className = "px-3 py-2 whitespace-nowrap";
    tdStatus.textContent = order.status;
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);
  });
}

export {
    status_init,
    getOrders
}