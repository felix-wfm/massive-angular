angular.module('app')
	.factory('utilities', [
		function () {
			'use strict';

			function each(obj, fn) {
				var result;

				if (angular.isArray(obj)) {
					for (var i = 0, n = obj.length; i < n; i++) {
						result = fn(obj[i], i, obj);

						if (result !== undefined) {
							return result;
						}
					}
				} else if (angular.isObject(obj)) {
					for (var key in obj) {
						result = fn(obj[key], key, obj);

						if (result !== undefined) {
							return result;
						}
					}
				}
			}

			function select(obj, fnProp, unique) {
				var result = [];

				this.each(obj, function (val, key) {
					var r = fnProp(val, key, obj);

					if (r !== undefined) {
						if (!unique || result.indexOf(r) === -1) {
							result.push(r);
						}
					}
				});

				return result;
			}

			function empty(arr) {
				return (!arr || arr.length === 0);
			}

			function has(arr, val) {
				return (arr && arr.indexOf(val) > -1);
			}

			return {
				each: each,
				select: select,
				empty: empty,
				has: has
			};
		}
	]);