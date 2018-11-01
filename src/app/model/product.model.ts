export class ProductSubDTO {
    name: string;
    brand: string;
    stock: number;
    price: number;
    quantity: string;
}

export class ProductDTO {
    _id: string;
    products: ProductDTO[];
    category: string;
}

export class ProductResponse {
    data: ProductDTO[];
}
