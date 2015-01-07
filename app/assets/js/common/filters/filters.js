(function () {
    'use strict';

    angular.module('tg.common')
        .filter('tgTrustedHtml', TrustedHtml);

    TrustedHtml.$inject = ['$sce'];

    function TrustedHtml($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }
})();
