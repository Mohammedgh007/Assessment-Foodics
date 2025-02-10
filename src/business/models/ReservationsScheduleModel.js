


export default class ReservationsScheduleModel {

    /**
     * @param {Array<ReservationTimeSlotModel>} saturday
     * @param {Array<ReservationTimeSlotModel>} sunday
     * @param {Array<ReservationTimeSlotModel>} monday
     * @param {Array<ReservationTimeSlotModel>} tuesday
     * @param {Array<ReservationTimeSlotModel>} wednesday
     * @param {Array<ReservationTimeSlotModel>} thursday
     * @param {Array<ReservationTimeSlotModel>} friday
     * @preCondition each day array cannot exceed 3 entries
     */
    constructor(saturday, sunday, monday, tuesday, wednesday, thursday, friday) {
        if (saturday.length > 3 || sunday.length > 3 || monday.length > 3 || 
            tuesday.length > 3 || wednesday.length > 3 || thursday.length > 3 || friday.length > 3) {
            throw new Error('Each day cannot have more than 3 time slots');
        }
        this.saturday = saturday;
        this.sunday = sunday;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
    }

}