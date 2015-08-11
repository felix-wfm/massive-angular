(function () {
    'use strict';

    angular.module('tg.common')
        .directive('hljs', highlightCode);

    highlightCode.$inject = ['$timeout'];

    function highlightCode($timeout) {
        return {
            restrict: 'A',
            compile: function (tElement, tAttrs) {
                function postLink(scope, element, attrs) {
                    $timeout(function () {
                        hljs.lineNumbersBlock(element.find('code.hljs')[0]);
                    });
                }

                return {
                    pre: undefined,
                    post: postLink
                };
            }
        };
    }
})();
