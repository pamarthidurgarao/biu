export class ServiceDTO {
    name: string;
    id: string;
    time: number;
    price: number;
    gender: string;
}

export class ServiceTypeDTO {
    _id: string;
    category: string;
    types: ServiceDTO[];
}

export class ServiceResponse {
    data: ServiceTypeDTO[];
}

