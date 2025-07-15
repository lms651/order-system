class Order {
    constructor(id, name, quantity, createdAt, status = "Coming Soon") {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.status = status;
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            quantity: this.quantity,
            createdAt: this.createdAt,
            status: this.status,
        };
    }
}
export { Order };
