(function () {
    'use strict';

    angular.module('tg.components')
        .factory('tgUtilities', tgUtilities);

    tgUtilities.$inject = [];

    function tgUtilities() {
        function isType(obj, typeStr) {
            return (Object.prototype.toString.call(obj) === typeStr);
        }

        function isObject(obj) {
            return isType(obj, '[object Object]');
        }

        function isArray(obj) {
            return isType(obj, '[object Array]');
        }

        function isFunction(obj) {
            return isType(obj, '[object Function]');
        }

        function forEach(obj, fn) {
            if (obj && isFunction(fn)) {
                if (isArray(obj)) {
                    for (var i = 0, n = obj.length; i < n; i++) {
                        fn(obj[i], i, obj);
                    }
                } else if (isObject(obj)) {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            fn(obj[key], key, obj);
                        }
                    }
                }
            }
        }

        function each(obj, fn, defaultValue) {
            if (obj && isFunction(fn)) {
                var result;

                if (isArray(obj)) {
                    for (var i = 0, n = obj.length; i < n; i++) {
                        result = fn(obj[i], i, obj);

                        if (result !== undefined) {
                            return result;
                        }
                    }
                } else if (isObject(obj)) {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            result = fn(obj[key], key, obj);

                            if (result !== undefined) {
                                return result;
                            }
                        }
                    }
                }
            }

            return defaultValue;
        }

        function select(obj, fnProp, unique) {
            var result = [];

            forEach(obj, function (val, key) {
                var r = fnProp(val, key, obj);

                if (r !== undefined) {
                    if (!unique || result.indexOf(r) === -1) {
                        result.push(r);
                    }
                }
            });

            return result;
        }

        function expandArray(arr) {
            if (arr && isArray(arr)) {
                var r = [];

                return arr.reduce(function (it1, it2) {
                    if (it1 && isArray(it1)) {
                        r = it1;
                    } else {
                        r.push(it1);
                    }

                    if (it2 && isArray(it2)) {
                        r = r.concat(it2);
                    } else {
                        r.push(it2);
                    }

                    return r;
                });
            }
        }

        function empty(arr) {
            if (isArray(arr)) {
                return (arr.length === 0);
            }

            return true;
        }

        function has(arr, val) {
            if (isArray(arr)) {
                return (arr.indexOf(val) !== -1);
            }

            return false;
        }

        function naturalJoin(list, token, lastToken) {
            if (empty(list) === false) {
                var joinedList = [];

                list = list.slice();
                token = token || ', ';
                lastToken = lastToken || ' and ';

                var lastItem = list.pop();

                if (list.length) {
                    joinedList.push(list.join(token));
                }

                joinedList.push(lastItem);

                return joinedList.join(lastToken);
            }
        }

        function sort(arr, fn) {
            if (isArray(arr)) {
                if (isFunction(fn)) {
                    arr.sort(function (it1, it2) {
                        var r = fn(it1, it2);

                        return (r > 0) ? 1 : ((r < 0) ? -1 : 0);
                    });
                } else {
                    arr.sort();
                }

                return arr;
            }
        }

        function isApplyInProgress(scope) {
            var phase = scope.$root.$$phase;

            return (phase == '$apply' || phase == '$digest');
        }

        function isPromise(ref) {
            return (ref && isFunction(ref.then));
        }

        return {
            isObject: isObject,
            isArray: isArray,
            isFunction: isFunction,
            forEach: forEach,
            each: each,
            select: select,
            expandArray: expandArray,
            empty: empty,
            has: has,
            naturalJoin: naturalJoin,
            sort: sort,
            isApplyInProgress: isApplyInProgress,
            isPromise: isPromise
        };
    }
})();
