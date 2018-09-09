export class ServiceDTO {
    serviceType: string;
    subCategoryName: string;
    serviceName: string;
    duration: number;
    price: number;
    gender: string;
}

export class ServiceTypeDTO {
    serviceType: string;
    data: ServiceDTO[];
}

