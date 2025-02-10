

/**
 * @classdesc Input DTO for the request of editing branch settings
 */
export class EditBranchSettingsRequest {
    /**
     * @type {BranchOverviewModel}
     */
    branch;
    /**
     * @type {string}
     */
    branchId;

    constructor(branch, branchId) {
        this.branch = branch;
        this.branchId = branchId;
        console.log("branchHHHHHHHHH", branch, this.getRequestBody());
    }


    getRequestBody(){
        const isThereReservationsSchedule = this.branch.reservationsSchedule !== null;
        return {
            accepts_reservations: this.branch.isReservationsEnabled,
            reservation_duration: this.branch.reservationsDuration,
            reservation_times: {
                saturday: (isThereReservationsSchedule && this.branch.reservationsSchedule.saturday.length > 0) ? this.branch.reservationsSchedule.saturday.map(slot => [slot.start, slot.end]) : [],
                sunday: (isThereReservationsSchedule && this.branch.reservationsSchedule.sunday.length > 0) ? this.branch.reservationsSchedule.sunday.map(slot => [slot.start, slot.end]) : [],
                monday: (isThereReservationsSchedule && this.branch.reservationsSchedule.monday.length > 0) ? this.branch.reservationsSchedule.monday.map(slot => [slot.start, slot.end]) : [],
                tuesday: (isThereReservationsSchedule && this.branch.reservationsSchedule.tuesday.length > 0) ? this.branch.reservationsSchedule.tuesday.map(slot => [slot.start, slot.end]) : [],
                wednesday: (isThereReservationsSchedule && this.branch.reservationsSchedule.wednesday.length > 0) ? this.branch.reservationsSchedule.wednesday.map(slot => [slot.start, slot.end]) : [],
                thursday: (isThereReservationsSchedule && this.branch.reservationsSchedule.thursday.length > 0) ? this.branch.reservationsSchedule.thursday.map(slot => [slot.start, slot.end]) : [],
                friday: (isThereReservationsSchedule && this.branch.reservationsSchedule.friday.length > 0) ? this.branch.reservationsSchedule.friday.map(slot => [slot.start, slot.end]) : []
            }
        }
    }
}