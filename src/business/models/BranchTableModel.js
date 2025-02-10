

/**
 * @class BranchTableModel
 * @classdesc Represents a table in a branch
 */
export default class BranchTableModel {

    /**
     * @param {string} sectionName
     * @param {string} sectionId
     * @param {string} tableName
     * @param {string} tableId
     * @param {boolean} isReservationAllowed
     */
    constructor(sectionName, sectionId, tableName, tableId, isReservationAllowed) {
        this.sectionName = sectionName;
        this.sectionId = sectionId;
        this.tableName = tableName;
        this.tableId = tableId;
        this.isReservationAllowed = isReservationAllowed;
    }
}