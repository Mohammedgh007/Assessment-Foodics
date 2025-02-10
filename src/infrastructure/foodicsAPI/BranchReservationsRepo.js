import GetBranchesResponse from '@/infrastructure/foodicsAPI/dto/responses/GetBranchesReponse';

/**
 * @classdesc Represents a repository for branch reservations
 */
export default class BranchReservationsRepo {

    /**
     * @type {string}
     */
    apiKey;

    constructor() {
        this.apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4Zjc4NjY2NC0wMDg4LTRhMDMtYmFkMi0zOTQ5OGRjNTViYjMiLCJqdGkiOiJiMjgzOGY4NmMyMjQ3NGMzMmJlMTJjY2JiZGZkYzU5YjEzODUyNzkxNGQyMWVhNWU4OTVjYjkxODQ0ZWZiM2YwNzQ0NjJlYzU3NGIwZDUxNyIsImlhdCI6MTczNzk3NDIwMC4zMzU0MjYsIm5iZiI6MTczNzk3NDIwMC4zMzU0MjYsImV4cCI6MTg5NTc0MDYwMC4yODM5ODYsInN1YiI6IjllMTE1ZDRkLTQ4YzMtNGM0YS1iYTAzLWMxMTFkNWYwZjAyYSIsInNjb3BlcyI6W10sImJ1c2luZXNzIjoiOTdhNTcxNDYtZTBhZC00ZGQ5LWE1NGUtNDk3YTIyY2I2Yzc1IiwicmVmZXJlbmNlIjoiMjg3NDM1In0.hU5wB_6dwzTf4eo-LBUE9TK6B5cuuMMlJfAI1QTJwCJwz1G67kAGP_E_hfkn7Tl0Hz6qG-Yrdd_esYIg_PkLCe1uL1Ejwptk-1QFzHhE0Dz0Fz-hQGW1MIr2FeKorQZvCSOQpBfnCpr1qEnMw1YYNFusGJc4R8Yh59cRjWCvFCID1tzIfA7ZnkSBBLJKeHvy7SuQUXN37rz6TQQyqNsXV9jVaOt0QTg6KE-rcGGxLK49IoBVzuRohg1NGQD_S01BV7UyFJq_mNCjlthQUxV3rH0c0BEgIPODYgJyIX3tLlaccGNbrLxH_TK-bKKL53YzdXfrze6OCsEvZlKITQlb-NjC0RJD3jlwLpeze3ubNXKETUz3GiR2CeyndIYwANzV5tAdUucmc8mMspYwSGDXwsqbDHpE9VLz9p_XdHnLIQ3IT9hroyAX9Fuhce6b_J3iZtmMvSaEwLJk2ubEZzHRm2KFndQQ6AiacxbX6BncfgaNXqeYM59gk91Q1kn7SA2AEo8ta0fubmA5TZ_rqBmRjj90-xom1fJFAir8vsw3Vp0AZksf8CogGUkb7tchhnK-b1gjpwLG5EUtZvwvy9FA7t16HNScveaSbLWMTT-6cItQnEe1wXAkw9zf4HkicjOCYB6iqdWXNS22qnUweFyNS7iVwOknCcIRBclUWY6kNro';
    }

    /**
     * It fetches the list of branches.
     * @param {GetBranchesRequest} dto
     * @returns {Promise<GetBranchesResponse>}
     */
    async getBranches(dto){
        const response = await fetch(`/api/v5/branches${dto.getQueryString()}`, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'window.location.origin'
            }
        });
        const json = await response.json();
        return new GetBranchesResponse(json, dto.doesAllowReservation, dto.targetPage);
    }

    /**
     * It updates the branch reservation status to allow.
     * @param {AllowBranchReservationRequest} dto
     * @returns {Promise<void>}
     */
    async allowBranchReservation(dto) {
        await fetch(`/api/v5/branches/${dto.branchId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'window.location.origin'
            },
            body: JSON.stringify(dto.getRequestBody())
        });

    }

    /**
     * It updates the branch reservation status to disallow.
     * @param {DisAllowBranchReservationRequest} dto
     * @returns {Promise<void>}
     */
    async disAllowBranchReservation(dto){
        await fetch(`/api/v5/branches/${dto.branchId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'window.location.origin'
            },
            body: JSON.stringify(dto.getRequestBody())
        });

    }

    async editBranchSettings(dto){
        const response = await fetch(`/api/v5/branches/${dto.branchId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'window.location.origin'
            },
            body: JSON.stringify(dto.getRequestBody())
        });

        console.log("response", response);
    }
}