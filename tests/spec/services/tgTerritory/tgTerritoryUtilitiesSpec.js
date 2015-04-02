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
                var preparedSource = tgTerritoryUtilities.prepareRawData(response.data, ['WORLDWIDE', 'CLUSTER', 'REGION', 'COUNTRY']);

                expect(preparedSource).toBeTruthy();

                expect(preparedSource.all).toBeTruthy();
                expect(preparedSource.all.length).toBe(221);

                expect(preparedSource.clusters).toBeTruthy();
                expect(preparedSource.clusters.length).toBe(6);

                expect(preparedSource.regions).toBeTruthy();
                expect(preparedSource.regions.length).toBe(14);

                expect(preparedSource.countries).toBeTruthy();
                expect(preparedSource.countries.length).toBe(200);

                expect(preparedSource.worldwide).toBeTruthy();

                // test clusters order
                expect(preparedSource.clusters[0].id).toBe(10005);
                expect(preparedSource.clusters[1].id).toBe(10000);
                expect(preparedSource.clusters[2].id).toBe(10004);
                expect(preparedSource.clusters[3].id).toBe(10002);
                expect(preparedSource.clusters[4].id).toBe(10003);
                expect(preparedSource.clusters[5].id).toBe(10001);
            });

        specHelper.flushHttpBackend();
    });

    it('should return validated territories list', function () {
        tgTerritoryService.get()
            .then(function (response) {
                var preparedSource = tgTerritoryUtilities.prepareRawData(response.data, ['WORLDWIDE', 'CLUSTER', 'REGION', 'COUNTRY']);

                expect(tgTerritoryUtilities.validateTerritories()).toEqual([]);
                expect(tgTerritoryUtilities.validateTerritories([])).toEqual([]);
                expect(tgTerritoryUtilities.validateTerritories([10021])).toEqual([]);

                expect(tgTerritoryUtilities.validateTerritories([10000], preparedSource, true)).toEqual([8, 20, 40, 56, 70, 100, 112, 191, 196, 203, 208, 233, 246, 250, 276, 300, 336, 348, 352, 372, 380, 428, 438, 440, 442, 470, 492, 498, 499, 528, 578, 616, 620, 642, 643, 674, 688, 703, 705, 724, 752, 756, 804, 807, 826]);
                expect(tgTerritoryUtilities.validateTerritories([8, 20, 40, 56, 70, 100, 112, 191, 196, 203, 208, 233, 246, 250, 276, 300, 336, 348, 352, 372, 380, 428, 438, 440, 442, 470, 492, 498, 499, 528, 578, 616, 620, 642, 643, 674, 688, 703, 705, 724, 752, 756, 804, 807, 826], preparedSource)).toEqual([10000]);
                expect(tgTerritoryUtilities.validateTerritories([548, 36, 540, 554, 242, 90], preparedSource)).toEqual([10014]);

                expect(tgTerritoryUtilities.validateTerritories([440, 70, 100, 203, 233, 705, 8, 616, 348, 643, 498, 499, 642, 804, 703, 807, 428, 191, 112, 688], preparedSource)).toEqual([10016]);
            });

        specHelper.flushHttpBackend();
    });

    it('should return territories labels', function () {
        tgTerritoryService.get()
            .then(function (response) {
                var preparedSource = tgTerritoryUtilities.prepareRawData(response.data, ['WORLDWIDE', 'CLUSTER', 'REGION', 'COUNTRY']);

                expect(tgTerritoryUtilities.getTerritoriesLabel()).toBe(undefined);
                expect(tgTerritoryUtilities.getTerritoriesLabel([])).toBe(undefined);
                expect(tgTerritoryUtilities.getTerritoriesLabel([10021])).toBe(undefined);

                expect(tgTerritoryUtilities.getTerritoriesLabel([10021], preparedSource)).toBe('Worldwide');
                expect(tgTerritoryUtilities.getTerritoriesLabel([840], preparedSource)).toBe('United States');
                expect(tgTerritoryUtilities.getTerritoriesLabel([840, 826], preparedSource)).toBe('United Kingdom, United States');

                expect(tgTerritoryUtilities.getTerritoriesLabel([440, 428, 233, 840], preparedSource)).toBe('Baltic States, United States');

                expect(tgTerritoryUtilities.getTerritoriesLabel([32, 68, 76, 152, 170, 218, 328, 600, 604], preparedSource)).toBe('South America excluding Suriname, Uruguay and Venezuela');
                expect(tgTerritoryUtilities.getTerritoriesLabel([32, 68, 76, 152, 170, 218, 328, 600], preparedSource)).toBe('Argentina, Bolivia, Brazil, Chile, Colombia, Ecuador, Guyana, Paraguay');
                expect(tgTerritoryUtilities.getTerritoriesLabel([28, 44, 52, 84, 124, 188, 192, 212, 214, 222, 308, 320, 332], preparedSource)).toBe('Antigua and Barbuda, Bahamas, Barbados, Belize, Canada, Costa Rica, Cuba, Dominica, Dominican Republic, El Salvador, Grenada, Guatemala, Haiti');

                expect(tgTerritoryUtilities.getTerritoriesLabel([70, 203, 336, 276, 8, 470, 196, 616, 348, 620, 807, 20, 208, 440, 372, 100, 578, 442, 233, 380, 40, 438, 498, 499, 642, 492, 250, 352, 528, 191, 428, 112, 246, 56, 300], preparedSource)).toBe('Europe excluding Russian Federation, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Ukraine and United Kingdom');

                expect(tgTerritoryUtilities.getTerritoriesLabel([440, 70, 100, 203, 233, 705, 8, 616, 348, 643, 498, 499, 642, 804, 703, 807, 428, 191, 112, 688, 840], preparedSource)).toBe('Eastern Europe and Balkans, United States');

                expect(tgTerritoryUtilities.getTerritoriesLabel([10000, 10003, 10002, 10001, 340, 308, 558, 192, 44, 591, 84, 670, 222, 630, 188, 320, 52, 212, 484, 780, 214, 332, 662, 124, 28, 388, 659, 10004], preparedSource)).toBe('Worldwide excluding United States');
                expect(tgTerritoryUtilities.getTerritoriesLabel([70, 203, 336, 276, 8, 470, 196, 616, 348, 674, 620, 804, 703, 807, 20, 752, 208, 756, 688, 440, 372, 100, 578, 442, 233, 705, 380, 40, 438, 643, 498, 499, 642, 492, 250, 352, 528, 191, 428, 112, 246, 56, 724, 300, 10003, 10002, 10001, 340, 308, 558, 192, 44, 591, 84, 670, 222, 630, 188, 320, 52, 212, 484, 780, 214, 332, 662, 124, 28, 388, 659, 10004], preparedSource)).toBe('Worldwide excluding United Kingdom and United States');

                expect(tgTerritoryUtilities.getTerritoriesLabel([196, 616, 348, 674, 620, 826, 804, 703, 807, 20, 752, 208, 756, 688, 440, 372, 100, 40, 438, 643, 498, 499, 642, 492, 250, 352, 528, 191, 428, 112, 246, 56, 724, 300, 10003, 10002, 10001, 10005, 10004], preparedSource)).toBe('Africa, Asia, Australia and Oceania, North America, South America, Andorra, Austria, Belarus, Belgium, Bulgaria, Croatia, Cyprus, Denmark, Finland, France, Greece, Hungary, Iceland, Ireland, Latvia, Liechtenstein, Lithuania, Macedonia, Moldova, Monaco, Montenegro, Netherlands, Poland, Portugal, Romania, Russian Federation, San Marino, Serbia, Slovakia, Spain, Sweden, Switzerland, Ukraine, United Kingdom');
                expect(tgTerritoryUtilities.getTerritoriesLabel([276, 8, 470, 196, 616, 348, 674, 620, 826, 804, 703, 807, 20, 752, 208, 756, 688, 440, 372, 100, 705, 380, 40, 438, 643, 498, 499, 642, 492, 250, 352, 528, 191, 428, 112, 246, 56, 724, 300, 408, 4, 414, 64, 682, 887, 400, 344, 702, 762, 462, 626, 760, 392, 156, 458, 398, 158, 764, 144, 634, 31, 368, 96, 784, 524, 704, 586, 496, 795, 376, 104, 792, 860, 356, 51, 50, 48, 116, 364, 417, 418, 360, 422, 140, 818, 678, 12, 132, 404, 566, 800, 262, 562, 266, 694, 24, 384, 690, 148, 270, 516, 788, 174, 434, 646, 288, 426, 768, 430, 178, 180, 478, 204, 748, 466, 72, 894, 324, 624, 454, 450, 508, 504, 716, 854, 232, 231, 108, 706, 226, 710, 728, 834, 729, 732, 480, 120, 10001, 10005, 10004], preparedSource)).toBe('Africa excluding Senegal, Asia excluding Georgia, Oman, Philippines and South Korea, Australia and Oceania, Europe excluding Bosnia and Herzegovina, Czech Republic, Estonia, Holy See (Vatican City State), Luxembourg and Norway, North America, South America');
            });

        specHelper.flushHttpBackend();
    });
});
