(function () {
    'use strict';

    angular.module('tg.components')
        .directive('tgWhenScrolled', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, elem, attr) {
                    var expr = $parse(attr.tgWhenScrolled);

                    elem.bind('scroll', function (evt) {
                        if (this.scrollTop + this.offsetHeight >= this.scrollHeight) {
                            expr(scope, {
                                $event: evt
                            });

                            scope.$digest();
                        }
                    });
                }
            };
        }]);
})();
