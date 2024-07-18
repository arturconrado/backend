export class CreateScheduleDto {
    title!: string;
    description!: string;
    date!: Date;
    userId!: string;
    serviceId!: number;
    professionalId?: number;
}
