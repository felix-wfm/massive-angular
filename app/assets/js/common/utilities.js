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
                    }

                    if (it2 && isArray(it2)) {
                        r = r.concat(it2);
                    }

                    return r;
                });
            }
        }

        function empty(arr) {
            return (!isArray(arr) || arr.length === 0);
        }

        function has(arr, val) {
            return (!empty(arr) && arr.indexOf(val) > -1);
        }

        function naturalJoin(list, token, lastToken) {
            if (!empty(list)) {
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
            if (!empty(arr) && isFunction(fn)) {
                arr.sort(function (it1, it2) {
                    var r = fn(it1, it2);

                    return (r > 0) ? 1 : ((r < 0) ? -1 : 0);
                });
            }
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
            sort: sort
        };
    }
})();
