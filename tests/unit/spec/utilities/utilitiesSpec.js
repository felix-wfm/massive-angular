describe('Unit: tgUtilities', function () {
    var tgUtilities;

    beforeEach(inject(function (_tgUtilities_) {
        tgUtilities = _tgUtilities_;
    }));

    it('should be instantiated', function () {
        expect(tgUtilities).toBeTruthy();
    });

    it('should be of right type', function () {
        expect(tgUtilities.isObject()).toBeFalsy();
        expect(tgUtilities.isObject({})).toBeTruthy();
        expect(tgUtilities.isObject([])).toBeFalsy();
        expect(tgUtilities.isObject(expect)).toBeFalsy();

        expect(tgUtilities.isArray()).toBeFalsy();
        expect(tgUtilities.isArray({})).toBeFalsy();
        expect(tgUtilities.isArray([])).toBeTruthy();
        expect(tgUtilities.isArray(expect)).toBeFalsy();

        expect(tgUtilities.isFunction()).toBeFalsy();
        expect(tgUtilities.isFunction({})).toBeFalsy();
        expect(tgUtilities.isFunction([])).toBeFalsy();
        expect(tgUtilities.isFunction(expect)).toBeTruthy();
    });

    it('should iterate', function () {
        var objA = [0,1,2,3,4],
            objB = {
                a: 'a',
                b: 'b',
                c: 'c'
            };

        tgUtilities.forEach(objA, function (item, key, obj) {
            expect(item).toBe(key);
            expect(obj).toBe(objA);
        });

        tgUtilities.forEach(objB, function (item, key, obj) {
            expect(item).toBe(key);
            expect(obj).toBe(objB);
        });
    });

    it('should iterate while', function () {
        var objA = [0,1,6,3,4],
            objB = {
                a: 'a',
                b: 'd',
                c: 'c'
            },
            result;

        result = tgUtilities.each(objA, function (item, key, obj) {
            expect(obj).toBe(objA);
        });

        expect(result).toBe(undefined);

        result = tgUtilities.each(objA, function (item, key, obj) {
            expect(obj).toBe(objA);
        }, false);

        expect(result).toBe(false);

        result = tgUtilities.each(objA, function (item, key, obj) {
            expect(obj).toBe(objA);

            if (item !== key) {
                return item;
            }
        });

        expect(result).toBe(6);

        result = tgUtilities.each(objB, function (item, key, obj) {
            expect(obj).toBe(objB);

            if (item !== key) {
                return item;
            }
        });

        expect(result).toBe('d');
    });

    it('should select items', function () {
        var objA = [0,1,4,2,3,4],
            objB = {
                a: 'a',
                b: 'd',
                c: 'c',
                d: 'd'
            },
            result;

        result = tgUtilities.select(objA, function (item, key, obj) {
            expect(obj).toBe(objA);

            if (item > 2) {
                return item;
            }
        });

        expect(result).toEqual([4,3,4]);

        result = tgUtilities.select(objA, function (item, key, obj) {
            expect(obj).toBe(objA);

            if (item > 2) {
                return item;
            }
        }, true);

        expect(result).toEqual([4,3]);

        result = tgUtilities.select(objB, function (item, key, obj) {
            expect(obj).toBe(objB);

            if (item !== key) {
                return item;
            }
        });

        expect(result).toEqual(['d']);

        result = tgUtilities.select(objB, function (item, key, obj) {
            expect(obj).toBe(objB);

            if (item !== key) {
                return [item, key];
            }
        });

        expect(result).toEqual([['d','b']]);
    });

    it('should expand array', function () {
        var objA = [
            null,
            [],
            [1,2],
            [3],
            [4,5,6],
            [[7]]
        ];

        expect(tgUtilities.expandArray()).toEqual(undefined);
        expect(tgUtilities.expandArray(objA)).toEqual([null,1,2,3,4,5,6,[7]]);
    });

    it('should be empty', function () {
        expect(tgUtilities.empty()).toBe(undefined);
        expect(tgUtilities.empty([])).toBeTruthy();
        expect(tgUtilities.empty([null])).toBeFalsy();
    });

    it('should has item', function () {
        expect(tgUtilities.has()).toBe(undefined);
        expect(tgUtilities.has([1,2,3], 2)).toBeTruthy();
        expect(tgUtilities.has([1,2,3], 4)).toBeFalsy();
    });

    it('should join in natural string', function () {
        expect(tgUtilities.naturalJoin()).toBe(undefined);
        expect(tgUtilities.naturalJoin([])).toBe(undefined);
        expect(tgUtilities.naturalJoin(['a'])).toBe('a');
        expect(tgUtilities.naturalJoin(['a','b'])).toBe('a and b');
        expect(tgUtilities.naturalJoin(['a','b','c'])).toBe('a, b and c');
        expect(tgUtilities.naturalJoin(['a','b','c'], '|', ' or ')).toBe('a|b or c');
    });

    it('should sort array', function () {
        expect(tgUtilities.sort()).toBe(undefined);
        expect(tgUtilities.sort([])).toEqual([]);
        expect(tgUtilities.sort(['a'])).toEqual(['a']);
        expect(tgUtilities.sort(['c','a','b'])).toEqual(['a','b','c']);
        expect(tgUtilities.sort(['c','a','b'], function(it1, it2) { return it2.charCodeAt(0) - it1.charCodeAt(0); })).toEqual(['c','b','a']);
    });
});
