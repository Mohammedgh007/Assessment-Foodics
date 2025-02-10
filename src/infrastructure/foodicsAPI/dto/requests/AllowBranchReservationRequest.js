

/**
 * @classdesc DTO for the request of allowing a branch reservation
 */
export default class AllowBranchReservationRequest {

    branchId;

    /**
     * @type {string} branchId
     */
    constructor(branchId){
        this.branchId = branchId;
    }


    getRequestBody(){
        return {
            accepts_reservations: true
        }
    }
}