(function () {
    'use strict';

    angular.module('tg.common')
        .directive('codeHighlight', ['$compile',
            function ($compile) {
                return {
                    restrict: 'A',
                    scope: false,
                    priority: 9999,
                    compile: function (tElement, tAttrs) {
                        var targetSelector = tAttrs.codeHighlightSelector,
                            targetLanguage = tAttrs.codeHighlight,
                            html = tElement.get(0).innerHTML;

                        var newHtml = '';

                        for (var i = 0, n = html.length, ch, p = 0, m = 0; i < n; i++) {
                            ch = html.charCodeAt(i);

                            if (ch === 10) {
                                newHtml += '\n';
                                p = 0;
                            } else {
                                if (ch !== 32) {
                                    if (p > 0) {
                                        if (m === 0) {
                                            m = p;
                                        } else {
                                            p -= m;
                                        }

                                        while (p-- > 0) {
                                            newHtml += ' ';
                                        }
                                    }

                                    p = -1;
                                } else {
                                    if (p !== -1) {
                                        p++;
                                    }
                                }

                                if (p === -1) {
                                    newHtml += html[i];
                                }
                            }
                        }

                        html = newHtml.trim();

                        function preLink(scope, element, attrs) {
                            if (targetSelector) {
                                var newScope = scope.$new();
                                newScope.source = html;

                                var target = $(targetSelector);

                                target.attr('hljs', '');
                                target.attr('source', 'source');
                                target.attr('language', targetLanguage || '');

                                $compile(target)(newScope);
                            }
                        }

                        return {
                            pre: preLink,
                            post: null
                        };
                    }
                };
            }
        ]);
})();
