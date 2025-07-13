import { order_init } from "./order.js";
import { prefillFields } from "./order.js";
document.addEventListener("DOMContentLoaded", () => {
    console.log("practice compiling ts");
    prefillFields();
    order_init();
});
