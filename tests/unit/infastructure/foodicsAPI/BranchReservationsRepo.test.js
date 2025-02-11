import BranchReservationsRepo from '@/infrastructure/foodicsAPI/BranchReservationsRepo';

describe('BranchReservationsRepo', () => {
    let repo;
    const mockApiKey = 'test-api-key';

    beforeEach(() => {
        // Create a new instance for each test
        repo = new BranchReservationsRepo();
        repo.apiKey = mockApiKey;

        // Setup fetch mock
        global.fetch = jest.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: [],
                    meta: { current_page: 1, total: 0 },
                    links: { next: null }
                })
            })
        );
    });

    it('should call fetch with correct URL and headers', async () => {
        const mockDto = {
            getQueryString: () => '?page=1',
            doesAllowReservation: true,
            targetPage: 1
        };

        await repo.getBranches(mockDto);

        expect(fetch).toHaveBeenCalledWith(
            '/api/v5/branches?page=1',
            expect.objectContaining({
                headers: {
                    'Authorization': `Bearer ${mockApiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': 'window.location.origin'
                }
            })
        );
    });
});