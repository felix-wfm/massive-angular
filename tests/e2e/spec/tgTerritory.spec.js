var territoryPage = require('../pages/tgTerritory.js');

describe('tgTerritory', function () {
    var tgTerritoryPage = new territoryPage();

    tgTerritoryPage.get();  // hit the tgTypeahead URL

    it('should start with North America selected', function () {
        expect(tgTerritoryPage.model.getText()).toEqual('North America');
    });

    // POPUP TESTS
    describe('popup', function () {
        it('should show a popup', function () {
            tgTerritoryPage.popupButton.click();

            expect((tgTerritoryPage.popup).isDisplayed()).toBeTruthy();
        });

        it('should show all North American countries', function () {
            tgTerritoryPage.getPopupHeader('North America').click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(24);

            tgTerritoryPage.getPopupHeader('North America').click();
        });

        it('should show all European countries', function () {
            tgTerritoryPage.getPopupHeader('Europe').click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(45);

            tgTerritoryPage.getPopupHeader('Europe').click();
        });

        it('should show all South American countries', function () {
            tgTerritoryPage.getPopupHeader('South America').click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(12);

            tgTerritoryPage.getPopupHeader('South America').click();
        });

        it('should show all African countries', function () {
            tgTerritoryPage.getPopupHeader('Africa').click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(55);

            tgTerritoryPage.getPopupHeader('Africa').click();
        });

        it('should show all Asian countries', function () {
            tgTerritoryPage.getPopupHeader('Asia').click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(48);

            tgTerritoryPage.getPopupHeader('Asia').click();
        });

        it('should show all Australian and Oceania countries', function () {
            tgTerritoryPage.getPopupHeader('Australia and Oceania').click();

            expect(tgTerritoryPage.popupCountries.count()).toEqual(16);

            tgTerritoryPage.getPopupHeader('Australia and Oceania').click();
        });

        it('should add a single country', function () {
            tgTerritoryPage.getPopupHeader('North America').click();

            tgTerritoryPage.getPopupCountry('Antigua and Barbuda').click();

            expect(tgTerritoryPage.popupCountryList.getText()).toEqual('Antigua and Barbuda');
        });

        it('should remove a single country', function () {
            tgTerritoryPage.getPopupCountry('Antigua and Barbuda').click();

            expect(tgTerritoryPage.popupCountryList.getText()).toEqual('');

            tgTerritoryPage.getPopupHeader('North America').click();
            tgTerritoryPage.pageHeader.click();
        });
    });

    // CONTROL TESTS
    describe('control', function () {
        it('should add a single country from popup', function () {
            tgTerritoryPage.popupButton.click();
            tgTerritoryPage.getPopupHeader('North America').click();
            tgTerritoryPage.getPopupCountry('Antigua and Barbuda').click();
            tgTerritoryPage.getPopupHeader('North America').click();

            tgTerritoryPage.pageHeader.click();

            expect(tgTerritoryPage.model.getText()).toEqual('Antigua and Barbuda');
        });

        it('should remove a single country from popup', function () {
            tgTerritoryPage.popupButton.click();
            tgTerritoryPage.getPopupHeader('North America').click();
            tgTerritoryPage.getPopupCountry('Antigua and Barbuda').click();

            tgTerritoryPage.pageHeader.click();

            expect(tgTerritoryPage.model.getText()).toEqual('');
        });
    });
});