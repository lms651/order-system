import { getOrders } from "./status.js";
import { Order } from "./interfaces";

function operator_init() {
    renderOrdersOperator();
}

function renderOrdersOperator() {
    const orders: Map<number, Order> = getOrders();

    const tbody = document.querySelector("#operator-table tbody") as HTMLTableSectionElement;
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
    edtBtn.innerText = '✎';
    edtBtn.className = "bg-green-500 text-white px-2 py-1 rounded mr-2";
    tdActions.appendChild(edtBtn);


    const dltBtn = document.createElement("button");
    dltBtn.textContent = "✘";
    dltBtn.className = "bg-red-500 text-white px-2 py-1 rounded";
    tdActions.appendChild(dltBtn);

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

export {
    operator_init
}