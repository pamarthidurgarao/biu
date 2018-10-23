export class StaffDTO {
    name: string;
    gender: string;
    mobile: number;
    preferedGender: string;
    position: string;
    preferences: StaffPreferencesDTO[];
    timings: StaffTimingsDTO[];
}
export class StaffPreferencesDTO {
    name: string;
    id: string;
}
export class StaffTimingsDTO {
    day: string;
    from: string;
    to: string;
}
export class StaffResponse {
    data: StaffDTO[];
}
