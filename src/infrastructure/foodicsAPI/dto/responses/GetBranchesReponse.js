import BranchOverviewModel from "@/business/models/BranchOverviewModel";
import BranchTableModel from "@/business/models/BranchTableModel";
import ReservationTimeSlotModel from "@/business/models/ReservationTimeSlotModel";
import ReservationsScheduleModel from "@/business/models/ReservationsScheduleModel";
export default class GetBranchesResponse {

    /**
     * @type {Array<BranchOverviewModel>}
     */
    branches;

    /**
     * @type {number}
     */
    pagesCount;

    /**
     * @param {Object} jsonMap
     * @param {boolean} doesAllowReservation
     */
    constructor(jsonMap, doesAllowReservation, currPge){ 
        this.branches = jsonMap.data.filter((branch) => branch.accepts_reservations === doesAllowReservation).map((branch) => this.mapToBranchOverviewModel(branch));
        this.pagesCount = ((jsonMap.links.next != null && jsonMap.links.next.includes('page=2')) || currPge == 1) 
            ? 2 
            : 1; // branches do not include last page info in meta unlike what is specified in pagination section, so we assume there is only one or two pages.
    }

    /**
     * @param {Object} jsonBranch
     * @returns {BranchOverviewModel}
     */
    mapToBranchOverviewModel(jsonBranch){
        const tables = this.mapToTables(jsonBranch);
        const reservationsSchedule = this.mapToReservationsSchedule(jsonBranch);
        return new BranchOverviewModel(jsonBranch.id, jsonBranch.name, jsonBranch.reference, tables, jsonBranch.reservation_duration, jsonBranch.accepts_reservations, reservationsSchedule);
    }

    /**
     * It is a helper function to map the tables from the json to the BranchTableModel
     * @param {Object} jsonBranch
     * @returns {Array<BranchTableModel>}
     */
    mapToTables(jsonBranch){
        return jsonBranch.sections.map((section) => section.tables.map((table) => 
            new BranchTableModel(section.name, section.id, table.name, table.id, table.accepts_reservations))).flat();
    }

    /** 
     * @param {Object} jsonBranch
     * @returns {ReservationsScheduleModel}
     */
    mapToReservationsSchedule(jsonBranch){ 
        if (jsonBranch.reservation_times == null || jsonBranch.reservation_times === undefined || Object.keys(jsonBranch.reservation_times).length === 0) {
            return null;
        } else {
            return new ReservationsScheduleModel(this.mapToReservationsDay(jsonBranch.reservation_times.saturday), this.mapToReservationsDay(jsonBranch.reservation_times.sunday), this.mapToReservationsDay(jsonBranch.reservation_times.monday), this.mapToReservationsDay(jsonBranch.reservation_times.tuesday), this.mapToReservationsDay(jsonBranch.reservation_times.wednesday), this.mapToReservationsDay(jsonBranch.reservation_times.thursday), this.mapToReservationsDay(jsonBranch.reservation_times.friday));
        }
    }

    /**
     * It is a helper method for mapToReservationsSchedule(). It maps the data for a day to an array of ReservationTimeSlotModel
     * @param {Array<Object>} jsonDay
     * @returns {Array<ReservationTimeSlotModel>}
     */
    mapToReservationsDay(jsonDay){
        const isEmpty = jsonDay == null || jsonDay.length === 0;
        return isEmpty ? [] : jsonDay.map((period) => new ReservationTimeSlotModel(period[0], period[1]));
    }

}