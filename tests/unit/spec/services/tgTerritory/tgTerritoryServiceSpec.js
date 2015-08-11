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

                expect(response.worldwide).toBeTruthy();

                expect(response.clusters).toBeTruthy();
                expect(response.clusters.length).toBe(6);

                expect(response.regions).toBeTruthy();
                expect(response.regions.length).toBe(14);

                expect(response.countries).toBeTruthy();
                expect(response.countries.length).toBe(200);

                // test clusters order
                expect(response.clusters[0].id).toBe(10005);
                expect(response.clusters[1].id).toBe(10000);
                expect(response.clusters[2].id).toBe(10004);
                expect(response.clusters[3].id).toBe(10002);
                expect(response.clusters[4].id).toBe(10003);
                expect(response.clusters[5].id).toBe(10001);
            });

        specHelper.flushHttpBackend();
    });
});
