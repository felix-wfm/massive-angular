var tgTerritoryPage = function () {
    this.pageHeader = element(by.css('.page-header'));
    this.exampleContainer = element(by.css('.bs-example'));
    this.territoryContainer = element(by.css('.tg-territory__input-container'));
    this.model = element(by.model('__territory.model1'));

    this.popup = element(by.css('.tg-territory__popup'));
    this.popupButton = element(by.css('.tg-territory__globe-button'));
    this.popupCountryList = element.all(by.css('.tg-territory__popup-header')).get(1);
    this.popupHeaders = element.all(by.css('.tg-territory__cluster-header'));
    this.popupCountries = element.all(by.css('.tg-territory__cluster-country'));

    this.get = function () {
        browser.get('#/components/tgTerritory');
    };

    this.getPopupHeader = function (continent) {
        return element(by.cssContainingText('.tg-territory__cluster-header', continent));
    };

    this.getPopupCountry = function (country) {
        return element(by.cssContainingText('li', country));
    }
};

module.exports = tgTerritoryPage;