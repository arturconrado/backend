export class CreateScheduleDto {
    title!: string;
    description!: string;
    date!: Date;
    userId!: number;
    serviceId!: number;
    professionalId?: number;
}
