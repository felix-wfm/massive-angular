(function (global) {
    'use strict';

    global.territoryServiceSetup = {
        setupTerritoriesResponses: function () {
            beforeEach(function () {
                global.specHelper.setupBackendResponse('GET', 'api/territories.json', 'territories/territories.json');
            });
        }
    };
})(this);
