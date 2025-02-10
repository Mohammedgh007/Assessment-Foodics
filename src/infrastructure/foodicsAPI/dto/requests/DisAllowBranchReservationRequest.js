

/**
 * @classdesc DTO for the request of disallowing a branch reservation
 */
export default class DisAllowBranchReservationRequest {

    branchId;

    /**
     * @type {string} branchId
     */
    constructor(branchId){
        this.branchId = branchId;
    }

    getRequestBody(){
        return {
            accepts_reservations: false
        }
    }
}