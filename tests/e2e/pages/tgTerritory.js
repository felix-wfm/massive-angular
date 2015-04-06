var tgTerritoryPage = function () {
    this.pageHeader = element(by.css('.page-header'));
    this.exampleContainer = element(by.css('.bs-example'));
    this.territoryContainer = element(by.css('.tg-territory__input-container'));
    this.model = element(by.model('__territory.model1'));
    this.globe = element(by.css('.tg-territory__globe-button'));

    this.popup = element(by.css('.tg-territory__popup'));
    this.popupCountryList = element.all(by.css('.tg-territory__popup-header')).get(1);
    this.popupHeaders = element.all(by.css('.tg-territory__cluster-header'));
    this.popupCountries = element.all(by.css('.tg-territory__cluster-country'));

    this.get = function () {
        browser.get('#/components/tgTerritory');
    };
};

module.exports = tgTerritoryPage;