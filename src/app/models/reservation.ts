import { Resource } from './resource';
import { SearchDto } from './search-dto';

export class Reservation {
    id: number;
    purpose: string;
    startTime: string;
    endTime: string;
    resource: Resource;
    resourceId: number;
    userId: string;
    cancelled: boolean;
    approved: boolean;
    buildingId: number;
    reminderTime: number;

    constructor() {
    }

    newReservationObject(dto: SearchDto) {
        this.purpose = dto.purpose;
        this.endTime = dto.endTime;
        this.startTime = dto.startTime;
        this.reminderTime = dto.reminderTime;
    }
}