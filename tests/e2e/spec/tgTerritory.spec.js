var territoryPage = require('../pages/tgTerritory.js');

describe('tgTerritory', function () {
    var tgTerritoryPage = new territoryPage();

    tgTerritoryPage.get();

    it('should start with North America selected', function () {
        expect(tgTerritoryPage.control.getText()).toEqual('North America');
    });

    // pop up tests
    describe('popup', function () {
        it('should show a popup', function () {
            tgTerritoryPage.globe.click();

            expect((tgTerritoryPage.popup).isDisplayed()).toBeTruthy();
        });

        it('should show all North American countries', function () {
            tgTerritoryPage.popupHeaders.get(0).click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(24);
            tgTerritoryPage.popupHeaders.get(0).click();
        });

        it('should show all European countries', function () {
            tgTerritoryPage.popupHeaders.get(1).click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(45);
            tgTerritoryPage.popupHeaders.get(1).click();
        });

        it('should show all South American countries', function () {
            tgTerritoryPage.popupHeaders.get(2).click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(12);
            tgTerritoryPage.popupHeaders.get(2).click();
        });

        it('should show all African countries', function () {
            tgTerritoryPage.popupHeaders.get(3).click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(55);
            tgTerritoryPage.popupHeaders.get(3).click();
        });

        it('should show all Asian countries', function () {
            tgTerritoryPage.popupHeaders.get(4).click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(48);
            tgTerritoryPage.popupHeaders.get(4).click();
        });

        it('should show all Australian and Oceania countries', function () {
            tgTerritoryPage.popupHeaders.get(5).click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(16);
            tgTerritoryPage.popupHeaders.get(5).click();
        });

    });    
});