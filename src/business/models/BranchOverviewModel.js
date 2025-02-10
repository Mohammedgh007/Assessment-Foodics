

/**
 * This is the model for the branch overview.
 */
class BranchOverviewModel {

    /**
     * @param {string} id
     * @param {string} name
     * @param {string} reference
     * @param {Array<BranchTableModel>} tables
     * @param {number} reservationsDuration
     * @param {boolean} isReservationsEnabled
     * @param {ReservationsScheduleModel?} reservationsSchedule null if reservations are disabled
     */
    constructor(id, name, reference, tables, reservationsDuration, isReservationsEnabled, reservationsSchedule) {
        this.id = id;
        this.name = name;
        this.reference = reference;
        this.tables = tables;
        this.reservationsDuration = reservationsDuration;
        this.isReservationsEnabled = isReservationsEnabled;
        this.reservationsSchedule = reservationsSchedule;
    }

    /**
     * @param {BranchOverviewModel} branch - The branch to compare
     * @returns {boolean} - True if the branches are equal, false otherwise
     */
    equals(branch) {
        return this.reference === branch.reference;
    }
}

export default BranchOverviewModel;
