import { operator_init } from "./operator.js";
import { order_init } from "./order.js";
import { prefillFields } from "./order.js";
import { status_init } from "./status.js";

document.addEventListener("DOMContentLoaded", () => {
    prefillFields();
    order_init();
    status_init();
    operator_init();
});