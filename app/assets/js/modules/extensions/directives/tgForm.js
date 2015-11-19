(function () {
    'use strict';

    function overrideFn(context, fnName, fn) {
        var baseFn = context[fnName] || angular.noop;

        context[fnName] = function overrideFunction() {
            var tmpBase = this.$baseFn,
                ret;

            this.$baseFn = baseFn;
            ret = fn.apply(this, arguments);
            this.$baseFn = tmpBase;

            return ret;
        };
    }

    angular.module('app')
        .directive('tgForm', tgForm)
        .directive('ngModel', tgModel)
        .directive('tgFormValidator', tgFormValidator)
        .directive('tgFormMessage', tgFormMessage);

    tgForm.$inject = ['$timeout'];

    function tgForm($timeout) {
        return {
            restrict: 'EA',
            require: 'form',
            compile: function () {
                function preLink(scope, element, attrs, formCtrl) {
                    var formControls = [],
                        formMessages = [];

                    formCtrl.$$addFormMessage = function (formMessage) {
                        formMessages.push(formMessage);
                    };

                    formCtrl.$$removeFormMessage = function (formMessage) {
                        var idx = formMessages.indexOf(formMessage);

                        if (idx !== -1) {
                            formMessage.splice(idx, 1);
                        }
                    };

                    formCtrl.$$validateCustoms = function (excluded) {
                        if (!Array.isArray(excluded)) {
                            excluded = [excluded];
                        }

                        $timeout(function () {
                            formControls.forEach(function (ngModelCtrl) {
                                if (ngModelCtrl.hasOwnProperty('$hasCustomValidations') &&
                                    excluded.indexOf(ngModelCtrl) === -1) {
                                    ngModelCtrl.$validate();
                                }
                            });

                            formCtrl.$$updateFormErrors();
                        });
                    };

                    formCtrl.$$updateFormErrors = function () {
                        formMessages.forEach(function (formMessage) {
                            formMessage.setError(null);
                        });

                        for (var validationKey in formCtrl.$error) {
                            if (formCtrl.$error.hasOwnProperty(validationKey)) {
                                var controls = formCtrl.$error[validationKey];

                                if (!Array.isArray(controls)) {
                                    controls = [controls];
                                }

                                controls.forEach(function (control) {
                                    if (control.$invalid) {
                                        formMessages.forEach(function (formMessage) {
                                            if (control.$name === formMessage.name) {
                                                formMessage.setError(formMessage.getMessage(validationKey));
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    };

                    formCtrl.$$updateControlErrors = function (ngModelCtrl) {
                        if (ngModelCtrl.$invalid) {
                            for (var validationKey in ngModelCtrl.$error) {
                                if (ngModelCtrl.$error.hasOwnProperty(validationKey) &&
                                    ngModelCtrl.$error[validationKey]) {
                                    formMessages.forEach(function (formMessage) {
                                        if (ngModelCtrl.$name === formMessage.name) {
                                            formMessage.setError(formMessage.getMessage(validationKey));
                                        }
                                    });
                                }
                            }
                        }
                    };

                    overrideFn(formCtrl, '$addControl', function (control) {
                        this.$baseFn(control);

                        formControls.push(control);

                        var validationTrigger = function (value) {
                            formCtrl.$$validateCustoms(control);

                            return value;
                        };

                        control.$parsers.push(validationTrigger);
                        control.$formatters.push(validationTrigger);
                    });

                    overrideFn(formCtrl, '$removeControl', function (control) {
                        this.$baseFn(control);

                        var idx = formControls.indexOf(control);

                        if (idx !== -1) {
                            formControls.splice(idx, 1);
                        }
                    });
                }

                return {
                    pre: preLink
                };
            }
        };
    }

    tgModel.$inject = ['$q'];

    function tgModel($q) {
        return {
            restrict: 'EA',
            require: ['ngModel', '^?form'],
            compile: function () {
                function getValidationKey(str, prefix) {
                    var validationKey = str.substring(prefix.length);

                    return validationKey.charAt(0).toLowerCase() + validationKey.slice(1);
                }

                function preLink(scope, element, attrs, ctrls) {
                    var ngModelCtrl = ctrls[0],
                        formCtrl = ctrls[1],
                        tgValidateStr = 'tgValidate',
                        tgValidateAsyncStr = 'tgValidateAsync';

                    for (var prop in attrs) {
                        if (attrs.hasOwnProperty(prop)) {
                            var idx = prop.indexOf(tgValidateStr);

                            if (idx === 0) {
                                ngModelCtrl.$hasCustomValidations = true;

                                var validationFn = attrs[prop],
                                    isAsync = prop.indexOf(tgValidateAsyncStr) === 0,
                                    validators = isAsync ? ngModelCtrl.$asyncValidators : ngModelCtrl.$validators,
                                    validationKey = getValidationKey(prop, isAsync ? tgValidateAsyncStr : tgValidateStr);

                                validators[validationKey] = function (isAsync, validationFn, modelValue, viewValue) {
                                    var result = scope.$eval(validationFn, {
                                        $form: formCtrl,
                                        $value: viewValue,
                                        $model: modelValue
                                    });

                                    if (isAsync) {
                                        // result is not promise
                                        if (!(result && result.then)) {
                                            result = (result) ? $q.resolve(result) : $q.reject(result);
                                        }
                                    }

                                    return result;
                                }.bind(null, isAsync, validationFn);
                            }
                        }
                    }

                    if (formCtrl && formCtrl.hasOwnProperty('$$updateControlErrors')) {
                        overrideFn(ngModelCtrl, '$$runValidators', function (modelValue, viewValue, doneCallback) {
                            this.$baseFn(modelValue, viewValue, function (allValid) {
                                doneCallback(allValid);

                                if (!allValid) {
                                    formCtrl.$$updateControlErrors(ngModelCtrl);
                                }
                            });
                        });
                    }
                }

                return {
                    pre: preLink
                };
            }
        };
    }

    function tgFormValidator() {
        return {
            restrict: 'EA',
            require: '^form',
            template: '<input type="hidden" ng-model="__validator" name="@">',
            replace: true
        };
    }

    function tgFormMessage() {
        return {
            restrict: 'EA',
            require: '^form',
            scope: true,
            template: '<span class="form-message">{{error}}</span>',
            compile: function () {
                function preLink(scope, element, attrs, formCtrl) {
                    if (formCtrl.hasOwnProperty('$$addFormMessage')) {
                        var inst = {
                            name: attrs.name || '@',
                            getMessage: function (key) {
                                if (key) {
                                    key = key + 'Message';

                                    if (attrs.hasOwnProperty(key)) {
                                        return attrs[key];
                                    }
                                }
                            },
                            setError: function (error) {
                                scope.error = error;
                            }
                        };

                        formCtrl.$$addFormMessage(inst);

                        scope.$on('$destroy', function () {
                            formCtrl.$$removeFormMessage(inst);
                        });
                    }
                }

                return {
                    pre: preLink
                };
            }
        };
    }
})();
