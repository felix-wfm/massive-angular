describe('Unit: tgTerritoryService', function () {
    var $httpBackend,
        tgTerritoryService;

    beforeEach(inject(function (_$httpBackend_, _tgTerritoryService_) {
        $httpBackend = _$httpBackend_;
        tgTerritoryService = _tgTerritoryService_;
    }));

    it('should be instantiated', function () {
        expect(tgTerritoryService).toBeTruthy();
    });

    it('should return all territories', function () {
        tgTerritoryService.get()
            .then(function (response) {
                expect(response).toBeTruthy();
                expect(response.data).toBeTruthy();

                expect(response.data.clusters).toBeTruthy();
                expect(response.data.clusters.length).toBe(6);

                expect(response.data.true_clusters).toBeTruthy();
                expect(response.data.true_clusters.length).toBe(17);

                expect(response.data.countries).toBeTruthy();
                expect(response.data.countries.length).toBe(200);

                expect(response.data.quickpicks).toBeTruthy();
                expect(response.data.quickpicks.length).toBe(14);

                expect(response.data.worldwide).toBeTruthy();
                expect(response.data.worldwide.length).toBe(1);
            });

        specHelper.flushHttpBackend();
    });
});
