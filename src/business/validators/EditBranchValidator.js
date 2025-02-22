/**
 * @classdesc This class is used to validate the branch data when edited.
 */
export default class EditBranchValidator {
    
    /**
     * @param {string} input represents the value as provided by the user
     * @param {Function} t
     * @returns {string}
     */
    static validateDuration(input, t) {
        if (input === null || input === undefined || input === '') {
            return t('This field is required');
        }

        // Convert to string for regex test if it's a number
        const stringInput = String(input);
        if (!/^\d+$/.test(stringInput)) {
            return t('The duration must be a valid number');
        }

        // Convert to number for comparison
        const numericInput = Number(input);
        if (numericInput < 0) {
            return t('Invalid duration value');
        }

        return '';
    }

    /**
     * Validates a reservation schedule
     * @param {ReservationsScheduleModel} schedule The schedule to validate
     * @param {Function} t Translation function
     * @returns {Object.<string, string>} Validation errors by day, empty if valid
     */
    static validateSchedule(schedule, t) {
        const errors = {};
        
        if (!schedule) {
            return errors;
        }

        const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        
        for (const day of days) {
            // Initialize empty array if day doesn't exist in schedule
            const slots = schedule[day] || [];
            
            if (slots.length > 3) {
                errors[day] = t('Maximum 3 time slots allowed per day');
                continue;
            }

            if (slots.length === 0) {
                continue;
            }

            // Sort slots by start time to make overlap checking easier
            const sortedSlots = [...slots].sort((a, b) => a.start.localeCompare(b.start));
            
            for (let i = 0; i < sortedSlots.length - 1; i++) {
                const currentSlot = sortedSlots[i];
                const nextSlot = sortedSlots[i + 1];
                
                if (currentSlot.end > nextSlot.start) {
                    errors[day] = t('Time slots cannot overlap');
                    break;
                }
            }

            for (const slot of slots) {
                if (slot.start >= slot.end) {
                    errors[day] = t('End time must be after start time');
                    break;
                }
            }
        }

        return errors;
    }
}
