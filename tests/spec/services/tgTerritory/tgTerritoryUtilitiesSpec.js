describe('Unit: tgTerritoryUtilities', function () {
    var $httpBackend,
        tgTerritoryUtilities,
        tgTerritoryService;

    beforeEach(inject(function (_$httpBackend_, _tgTerritoryUtilities_, _tgTerritoryService_) {
        $httpBackend = _$httpBackend_;
        tgTerritoryUtilities = _tgTerritoryUtilities_;
        tgTerritoryService = _tgTerritoryService_;
    }));

    it('should be instantiated', function () {
        expect(tgTerritoryUtilities).toBeTruthy();
    });

    it('should return prepared source', function () {
        tgTerritoryService.get()
            .then(function (response) {
                var preparedSource = tgTerritoryUtilities.prepareSource(response.data, ['WORLDWIDE', 'CLUSTER', 'REGION', 'COUNTRY'])

                expect(preparedSource).toBeTruthy();

                expect(preparedSource.all).toBeTruthy();
                expect(preparedSource.all.length).toBe(221);

                expect(preparedSource.clusters).toBeTruthy();
                expect(preparedSource.clusters.length).toBe(6);

                expect(preparedSource.regions).toBeTruthy();
                expect(preparedSource.regions.length).toBe(14);

                expect(preparedSource.territories).toBeTruthy();
                expect(preparedSource.territories.length).toBe(200);

                expect(preparedSource.worldwide).toBeTruthy();
            });

        specHelper.flushHttpBackend();
    });

    it('should return territories labels', function () {
        tgTerritoryService.get()
            .then(function (response) {
                var preparedSource = tgTerritoryUtilities.prepareSource(response.data, ['WORLDWIDE', 'CLUSTER', 'REGION', 'COUNTRY'])

                expect(tgTerritoryUtilities.getTerritoriesLabel()).toBe(undefined);
                expect(tgTerritoryUtilities.getTerritoriesLabel([])).toBe(undefined);
                expect(tgTerritoryUtilities.getTerritoriesLabel([10021])).toBe(undefined);

                expect(tgTerritoryUtilities.getTerritoriesLabel([10021], preparedSource)).toBe('Worldwide');
                expect(tgTerritoryUtilities.getTerritoriesLabel([840], preparedSource)).toBe('United States');
                expect(tgTerritoryUtilities.getTerritoriesLabel([840, 826], preparedSource)).toBe('United Kingdom, United States');

                expect(tgTerritoryUtilities.getTerritoriesLabel([10000, 10003, 10002, 10001, 340, 308, 558, 192, 44, 591, 84, 670, 222, 630, 188, 320, 52, 212, 484, 780, 214, 332, 662, 124, 28, 388, 659, 10004], preparedSource)).toBe('Worldwide excluding United States');
                expect(tgTerritoryUtilities.getTerritoriesLabel([70, 203, 336, 276, 8, 470, 196, 616, 348, 674, 620, 804, 703, 807, 20, 752, 208, 756, 688, 440, 372, 100, 578, 442, 233, 705, 380, 40, 438, 643, 498, 499, 642, 492, 250, 352, 528, 191, 428, 112, 246, 56, 724, 300, 10003, 10002, 10001, 340, 308, 558, 192, 44, 591, 84, 670, 222, 630, 188, 320, 52, 212, 484, 780, 214, 332, 662, 124, 28, 388, 659, 10004], preparedSource)).toBe('Worldwide excluding United Kingdom and United States');

                expect(tgTerritoryUtilities.getTerritoriesLabel([196, 616, 348, 674, 620, 826, 804, 703, 807, 20, 752, 208, 756, 688, 440, 372, 100, 40, 438, 643, 498, 499, 642, 492, 250, 352, 528, 191, 428, 112, 246, 56, 724, 300, 10003, 10002, 10001, 10005, 10004], preparedSource)).toBe('Africa, Asia, Australia and Oceania, North America, South America, Andorra, Austria, Belarus, Belgium, Bulgaria, Croatia, Cyprus, Denmark, Finland, France, Greece, Hungary, Iceland, Ireland, Latvia, Liechtenstein, Lithuania, Macedonia, Moldova, Monaco, Montenegro, Netherlands, Poland, Portugal, Romania, Russian Federation, San Marino, Serbia, Slovakia, Spain, Sweden, Switzerland, Ukraine and United Kingdom');
                expect(tgTerritoryUtilities.getTerritoriesLabel([276, 8, 470, 196, 616, 348, 674, 620, 826, 804, 703, 807, 20, 752, 208, 756, 688, 440, 372, 100, 705, 380, 40, 438, 643, 498, 499, 642, 492, 250, 352, 528, 191, 428, 112, 246, 56, 724, 300, 408, 4, 414, 64, 682, 887, 400, 344, 702, 762, 462, 626, 760, 392, 156, 458, 398, 158, 764, 144, 634, 31, 368, 96, 784, 524, 704, 586, 496, 795, 376, 104, 792, 860, 356, 51, 50, 48, 116, 364, 417, 418, 360, 422, 140, 818, 678, 12, 132, 404, 566, 800, 262, 562, 266, 694, 24, 384, 690, 148, 270, 516, 788, 174, 434, 646, 288, 426, 768, 430, 178, 180, 478, 204, 748, 466, 72, 894, 324, 624, 454, 450, 508, 504, 716, 854, 232, 231, 108, 706, 226, 710, 728, 834, 729, 732, 480, 120, 10001, 10005, 10004], preparedSource)).toBe('Australia and Oceania, North America, South America, Europe excluding Bosnia and Herzegovina, Czech Republic, Estonia, Holy See (Vatican City State), Luxembourg and Norway, Asia excluding Georgia, Oman, Philippines and South Korea, Africa excluding Senegal');
            });

        specHelper.flushHttpBackend();
    });
});
