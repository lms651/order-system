import { getOrders } from "./status.js";
import { Order } from "./interfaces.js";

let currentOrderID: number | null = null;

document.addEventListener("DOMContentLoaded", () => {
  operator_init();

  // Attach modal listeners once here:
  const cancelBtn = document.getElementById("cancelEdit");
  const saveBtn = document.getElementById("save-edit");

  console.log("Cancel button found?", cancelBtn);
  console.log("Save button found?", saveBtn);

  if (cancelBtn) cancelBtn.addEventListener("click", hideEditModal);
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      console.log("Save button clicked!");
      if (currentOrderID !== null) {
        updateOrder(currentOrderID);
        renderOrdersOperator();
        hideEditModal();
      }
    });
  }
});

function operator_init() {
  renderOrdersOperator();
}

function setupModalListeners() {
  const cancelEdtBtn = document.getElementById("cancelEdit") as HTMLButtonElement | null;
  if (cancelEdtBtn) {
    cancelEdtBtn.addEventListener("click", hideEditModal);
  }

  console.log("Trying to get Save button with id 'save-edit'");

  const saveEdtBtn = document.getElementById("save-edit") as HTMLButtonElement | null;
  console.log("Save button element:", saveEdtBtn);

  if (saveEdtBtn) {
    saveEdtBtn.addEventListener("click", () => {
          console.log("✅ Save button clicked!");

      if (currentOrderID !== null) {
        updateOrder(currentOrderID);
        renderOrdersOperator();
        hideEditModal();
      }
    });
  }
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

function showEditModal(orderId: number) {
  console.log("Edit order", orderId);
  currentOrderID = orderId;

  const edtModal = document.getElementById("edit-modal") as HTMLElement;
  edtModal.classList.remove("hidden");
}

function updateOrder(orderId: number) {
  // Use same getOrders helper
  const ordersMap: Map<number, Order> = getOrders();

  const currentOrder = ordersMap.get(orderId);
  if (!currentOrder) return;

  // Get selected status
  const statusInput = document.querySelector("input[name='editStatus']:checked") as HTMLInputElement;
  if (statusInput) {
    currentOrder.status = statusInput.value;
    console.log("Updated status:", currentOrder.status);
  }

  // Get quantity input
  const quantityInput = document.getElementById("edit-quantity") as HTMLInputElement | null;
  if (quantityInput && quantityInput.value.trim() !== "") {
    const qty = parseInt(quantityInput.value);
    if (!isNaN(qty)) {
      currentOrder.quantity = qty;
      console.log("Updated quantity:", currentOrder.quantity);
    }
  }

  // Save back
  ordersMap.set(orderId, currentOrder);
  localStorage.setItem("orders", JSON.stringify(Array.from(ordersMap.entries())));
}
function hideEditModal() {
  const edtModal = document.getElementById("edit-modal") as HTMLElement;
  edtModal.classList.add("hidden");
  currentOrderID = null; // clear after hide
}

function handleDelete(orderId: number) {
  // Load orders from localStorage
  const ordersJSON = localStorage.getItem("orders");
  const ordersMap: Map<number, Order> = ordersJSON
    ? new Map<number, Order>(JSON.parse(ordersJSON))
    : new Map();

  // Remove order by ID
  ordersMap.delete(orderId);

  // Save back to localStorage
  localStorage.setItem("orders", JSON.stringify(Array.from(ordersMap.entries())));

  // Re-render table
  renderOrdersOperator();
}

export {
    operator_init
}