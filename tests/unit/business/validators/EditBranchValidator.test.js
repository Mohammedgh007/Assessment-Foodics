import EditBranchValidator from '@/business/validators/EditBranchValidator';

describe('EditBranchValidator', () => {
    // Mock translation function
    const t = jest.fn(str => str);

    describe('validateDuration', () => {
        it('should return error for null/undefined/empty input', () => {
            expect(EditBranchValidator.validateDuration(null, t)).toBe('This field is required');
            expect(EditBranchValidator.validateDuration(undefined, t)).toBe('This field is required');
            expect(EditBranchValidator.validateDuration('', t)).toBe('This field is required');
        });

        it('should return error for non-numeric input', () => {
            expect(EditBranchValidator.validateDuration('abc', t)).toBe('The duration must be a valid number');
            expect(EditBranchValidator.validateDuration('12.34', t)).toBe('The duration must be a valid number');
        });

        it('should return empty string for valid input', () => {
            expect(EditBranchValidator.validateDuration('123', t)).toBe('');
            expect(EditBranchValidator.validateDuration(456, t)).toBe('');
        });
    });

    describe('validateSchedule', () => {
        it('should return empty errors for null/undefined schedule', () => {
            expect(EditBranchValidator.validateSchedule(null, t)).toEqual({});
            expect(EditBranchValidator.validateSchedule(undefined, t)).toEqual({});
        });

        it('should validate maximum slots per day', () => {
            const schedule = {
                monday: [
                    { start: '09:00', end: '10:00' },
                    { start: '11:00', end: '12:00' },
                    { start: '13:00', end: '14:00' },
                    { start: '15:00', end: '16:00' }
                ]
            };
            const errors = EditBranchValidator.validateSchedule(schedule, t);
            expect(errors.monday).toBe('Maximum 3 time slots allowed per day');
        });

        it('should detect overlapping time slots', () => {
            const schedule = {
                tuesday: [
                    { start: '09:00', end: '11:00' },
                    { start: '10:00', end: '12:00' }
                ]
            };
            const errors = EditBranchValidator.validateSchedule(schedule, t);
            expect(errors.tuesday).toBe('Time slots cannot overlap');
        });

        it('should validate start time before end time', () => {
            const schedule = {
                wednesday: [
                    { start: '11:00', end: '10:00' }
                ]
            };
            const errors = EditBranchValidator.validateSchedule(schedule, t);
            expect(errors.wednesday).toBe('End time must be after start time');
        });

        it('should return no errors for valid schedule', () => {
            const schedule = {
                thursday: [
                    { start: '09:00', end: '11:00' },
                    { start: '13:00', end: '15:00' }
                ]
            };
            const errors = EditBranchValidator.validateSchedule(schedule, t);
            expect(errors).toEqual({});
        });
    });
});