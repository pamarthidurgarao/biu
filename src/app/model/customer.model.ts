export class CustomerDTO {
    _id: string;
    fullname: string;
    phone: number;
    email: string;
    dob: string;
    gender: string;
}

export class CustomerResponse {
    data: CustomerDTO[];
}
