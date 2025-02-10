
/**
 * @classdesc Represents a request input to get branches request
 */
export default class GetBranchesRequest {

    /**
     * @param {number} targetPage
     * @param {boolean} doesAllowReservation
     */
    constructor(targetPage, doesAllowReservation){
        this.targetPage = targetPage;
        this.doesAllowReservation = doesAllowReservation;
    }

    /**
     * @returns {string}
     */
    getQueryString(){
        return `?include[0]=sections&include[1]=sections.tables&page=${this.targetPage + 1}`;
    }
}