var tgTerritoryPage = function () {
    this.container = element(by.css('.tg-territory__input-container'));
    this.control = element(by.model('__territory.model1'));
    this.globe = element(by.css('.tg-territory__globe-button'));

    this.popup = element(by.css('.tg-territory__popup'));
    this.popupHeaders = element.all(by.css('.tg-territory__cluster-header'));
    this.popupCountries = element.all(by.css('.tg-territory__cluster-country'));

    this.get = function () {
        browser.get('#/components/tgTerritory');
    };
};

module.exports = tgTerritoryPage;