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

        function each(obj, fn) {
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
        }

        function select(obj, fnProp, unique) {
            var result = [];

            each(obj, function (val, key) {
                var r = fnProp(val, key, obj);

                if (r !== undefined) {
                    if (isArray(r)) {
                        r.forEach(function (rs) {
                            if (!unique || result.indexOf(rs) === -1) {
                                result.push(rs);
                            }
                        });
                    } else {
                        if (!unique || result.indexOf(r) === -1) {
                            result.push(r);
                        }
                    }
                }
            });

            return result;
        }

        function empty(arr) {
            return (!isArray(arr) || arr.length === 0);
        }

        function has(arr, val) {
            return (!empty(arr) && arr.indexOf(val) > -1);
        }

        return {
            isObject: isObject,
            isArray: isArray,
            isFunction: isFunction,
            forEach: forEach,
            each: each,
            select: select,
            empty: empty,
            has: has
        };
    }
})();
