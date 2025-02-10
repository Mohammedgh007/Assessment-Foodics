
/**
 * @class ReservationTimeSlotModel
 * @classdesc Represents a time slot for a reservation
 */
export default class ReservationTimeSlotModel {

    /**
     * @param {string} start
     * @param {string} end
     */
    constructor(start, end) {
        Object.defineProperties(this, {
            start: {
                value: start,
                writable: false,
                enumerable: true,
                configurable: false
            },
            end: {
                value: end, 
                writable: false,
                enumerable: true,
                configurable: false
            }
        });
        
        // Freeze the object to prevent adding new properties
        Object.freeze(this);
    }
}