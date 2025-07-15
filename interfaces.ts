class Order {
  id: number;
  name: string;
  quantity: number;
  createdAt: string;
  status: string;

  constructor(
    id: number,
    name: string,
    quantity: number,
    createdAt: string,
    status: string = "Coming Soon"
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.status = status;
  }

  toJson(): object {
    return {
      id: this.id,
      name: this.name,
      quantity: this.quantity,
      createdAt: this.createdAt,
      status: this.status,
    };
  }
}

export {
  Order
}