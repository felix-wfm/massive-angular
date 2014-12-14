(function () {
    'use strict';

    var ESCAPE_EXPR = /([.?*+^$[\]\\(){}|-])/g;

    function escapeRegexp(queryToEscape) {
        return queryToEscape.replace(ESCAPE_EXPR, "\\$1");
    }

    angular.module('tg.components')
        .filter('tgHighlight', [function () {
            return function (matchItem, query) {
                if (query) {
                    var rx = new RegExp(escapeRegexp(query), 'gi');

                    return matchItem.replace(rx, '<strong>$&</strong>')
                }

                return matchItem;
            };
        }])
        .directive('tgHighlightHtml', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                scope: false,
                compile: function () {
                    return {
                        pre: angular.noop,
                        post: function (scope, element, attrs) {
                            if (attrs.tgHighlightHtml) {
                                var expr = escapeRegexp(attrs.tgHighlightHtml) + '(?!([^<]+)?>)',
                                    rx = new RegExp(expr, 'gi');

                                $timeout(function () {
                                    element.html(function (index, html) {
                                        return html.replace(rx, '<strong>$&</strong>');
                                    });
                                });
                            }
                        }
                    };
                }
            };
        }]);
})();
