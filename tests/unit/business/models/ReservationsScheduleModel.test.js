import ReservationsScheduleModel from '@/business/models/ReservationsScheduleModel';

describe('ReservationsScheduleModel', () => {
    const createValidTimeSlots = (count) => {
        return Array(count).fill().map((_, index) => ({
            start: `0${index + 9}:00`,
            end: `${index + 10}:00`
        }));
    };

    it('should create instance with valid time slots', () => {
        const schedule = new ReservationsScheduleModel(
            createValidTimeSlots(2), // saturday
            createValidTimeSlots(1), // sunday
            createValidTimeSlots(3), // monday
            createValidTimeSlots(2), // tuesday
            createValidTimeSlots(1), // wednesday
            createValidTimeSlots(2), // thursday
            createValidTimeSlots(1)  // friday
        );

        expect(schedule.saturday).toHaveLength(2);
        expect(schedule.sunday).toHaveLength(1);
        expect(schedule.monday).toHaveLength(3);
        expect(schedule.tuesday).toHaveLength(2);
        expect(schedule.wednesday).toHaveLength(1);
        expect(schedule.thursday).toHaveLength(2);
        expect(schedule.friday).toHaveLength(1);
    });

    it('should throw error when any day exceeds 3 slots', () => {
        expect(() => {
            new ReservationsScheduleModel(
                createValidTimeSlots(4), // saturday - exceeds limit
                createValidTimeSlots(1),
                createValidTimeSlots(1),
                createValidTimeSlots(1),
                createValidTimeSlots(1),
                createValidTimeSlots(1),
                createValidTimeSlots(1)
            );
        }).toThrow('Each day cannot have more than 3 time slots');
    });

    it('should throw error when multiple days exceed 3 slots', () => {
        expect(() => {
            new ReservationsScheduleModel(
                createValidTimeSlots(4), // saturday - exceeds limit
                createValidTimeSlots(1),
                createValidTimeSlots(4), // monday - exceeds limit
                createValidTimeSlots(1),
                createValidTimeSlots(1),
                createValidTimeSlots(1),
                createValidTimeSlots(1)
            );
        }).toThrow('Each day cannot have more than 3 time slots');
    });

    it('should store time slots in the provided order', () => {
        const mondaySlots = [
            { start: '14:00', end: '15:00' },
            { start: '09:00', end: '10:00' },
            { start: '11:00', end: '12:00' }
        ];

        const schedule = new ReservationsScheduleModel(
            [], [], mondaySlots, [], [], [], []
        );

        expect(schedule.monday).toEqual(mondaySlots);
        // Verify the order is preserved, not automatically sorted
        expect(schedule.monday[0].start).toBe('14:00');
        expect(schedule.monday[1].start).toBe('09:00');
        expect(schedule.monday[2].start).toBe('11:00');
    });
});