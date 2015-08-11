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
    this.popupRegions = element.all(by.css('tg-territory__cluster-region'));

    this.get = function () {
        browser.get('#/components/tgTerritory');
    };

    this.getPopupHeader = function (continent) {
        return element(by.cssContainingText('.tg-territory__cluster-header', continent));
    };

    this.getPopupHeaderCheckbox = function (continent) {
        return element(by.cssContainingText('.tg-territory__cluster-header', continent)).all(by.css('i')).last();
    };

    this.getPopupCountry = function (country) {
        return element(by.cssContainingText('li.tg-territory__cluster-country', country));
    };

    this.getPopupRegion = function (region) {
        return element(by.cssContainingText('li.tg-territory__cluster-region', region));
    };
};

module.exports = tgTerritoryPage;