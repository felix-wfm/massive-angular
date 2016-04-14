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

    tgForm.$inject = ['$parse', '$timeout'];

    function tgForm($parse, $timeout) {
        return {
            restrict: 'EA',
            require: ['form', 'tgForm'],
            compile: function () {
                function preLink(scope, element, attrs, ctrls) {
                    var formCtrl = ctrls[0],
                        tgFormCtrl = ctrls[1],
                        onSubmit = $parse(attrs.onSubmit);

                    formCtrl.$isExtendedForm = true;
                    tgFormCtrl.$form = formCtrl;

                    formCtrl.submit = function () {
                        var event = new Event('submit'),
                            nativeElement = element[0];


                        /**
                         *  Current angular submit handler:
                         *  var handleFormSubmission = function(event) {
                         *      scope.$apply(function() {
                         *          controller.$commitViewValue();
                         *          controller.$setSubmitted();
                         *      });
                         *
                         *      event.preventDefault();
                         *  };
                         *
                         *  Cause this block working in angular context
                         *  and to prevent Error: $digest already in progress
                         *  We've to run this asynchronously
                         */
                        setTimeout(function () {
                            nativeElement.dispatchEvent(event);
                        });
                    };

                    formCtrl.hasErrorOfType = function (errorType) {
                        return !!(errorType && formCtrl.$error[errorType]);
                    };

                    overrideFn(formCtrl, '$addControl', function (control) {
                        this.$baseFn.apply(this, arguments);

                        tgFormCtrl.$$addFormControl(control);

                        if (control.hasOwnProperty('$parsers') &&
                            control.hasOwnProperty('$formatters')) {
                            var validationTrigger = function (value) {
                                tgFormCtrl.$$validateCustoms(control);

                                return value;
                            };

                            control.$parsers.push(validationTrigger);
                            control.$formatters.push(validationTrigger);
                        }
                    });

                    overrideFn(formCtrl, '$removeControl', function (control) {
                        this.$baseFn.apply(this, arguments);

                        tgFormCtrl.$$removeFormControl(control);
                    });

                    overrideFn(formCtrl, '$setSubmitted', function () {
                        if (formCtrl.$$inSubmition) {
                            return;
                        }

                        this.$baseFn.apply(this, arguments);

                        if (attrs.showErrorsOnSubmit === 'true') {
                            tgFormCtrl.$$updateFormErrors();
                        }

                        if (attrs.submitChildForms === 'true') {
                            tgFormCtrl.formControls.forEach(function (formControl) {
                                if (formControl.hasOwnProperty('$setSubmitted') && !formControl.$submitted) {
                                    formCtrl.$$inSubmition = true;
                                    formControl.$setSubmitted();
                                    formCtrl.$$inSubmition = false;
                                }
                            });
                        }

                        if (formCtrl.$valid) {
                            onSubmit(scope, {
                                $form: formCtrl
                            });
                        }
                    });
                }

                return {
                    pre: preLink
                };
            },
            controller: ['$attrs', function tgFormController(attrs) {
                this.formMessages = [];
                this.formControls = [];

                this.$$addFormMessage = function (formMessage) {
                    this.formMessages.push(formMessage);
                };

                this.$$removeFormMessage = function (formMessage) {
                    var idx = this.formMessages.indexOf(formMessage);

                    if (idx !== -1) {
                        this.formMessages.splice(idx, 1);
                    }
                };

                this.$$addFormControl = function (formControl) {
                    this.formControls.push(formControl);
                };

                this.$$removeFormControl = function (formControl) {
                    var idx = this.formControls.indexOf(formControl);

                    if (idx !== -1) {
                        this.formControls.splice(idx, 1);
                    }
                };

                this.$$validateCustoms = function (excluded) {
                    var self = this;

                    if (!Array.isArray(excluded)) {
                        excluded = [excluded];
                    }

                    $timeout(function () {
                        self.formControls.forEach(function (ngModelCtrl) {
                            if (ngModelCtrl.hasOwnProperty('$hasCustomValidations') &&
                                excluded.indexOf(ngModelCtrl) === -1) {
                                ngModelCtrl.$validate();
                            }
                        });

                        self.$$updateFormErrors();
                    });
                };

                this.$$updateFormErrors = function () {
                    var self = this;

                    self.formMessages.forEach(function (formMessage) {
                        formMessage.setMessage(null);
                    });

                    var fUpdateFormErrorsFor = function (formCtrl) {
                        if (attrs.showErrorsOnSubmit !== 'true' || formCtrl.$submitted) {
                            for (var validationKey in formCtrl.$error) {
                                if (formCtrl.$error.hasOwnProperty(validationKey)) {
                                    var controls = formCtrl.$error[validationKey];

                                    if (!Array.isArray(controls)) {
                                        controls = [controls];
                                    }

                                    controls.forEach(function (control) {
                                        if (control.hasOwnProperty('$submitted')) {
                                            if (!control.$isExtendedForm) {
                                                fUpdateFormErrorsFor(control);
                                            }
                                        }
                                        else if (control.$invalid) {
                                            self.formMessages.forEach(function (formMessage) {
                                                if (control.$name === formMessage.name ||
                                                    (formMessage.isFormMessage && control.$isFormValidator)) {
                                                    if (!formMessage.getMessage()) {
                                                        formMessage.setMessageByKey(validationKey);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    };

                    fUpdateFormErrorsFor(self.$form);
                };

                this.$$updateControlErrors = function (ngModelCtrl) {
                    var self = this;

                    if (ngModelCtrl.$invalid) {
                        if (attrs.showErrorsOnSubmit !== 'true' || self.$form.$submitted) {
                            for (var validationKey in ngModelCtrl.$error) {
                                if (ngModelCtrl.$error.hasOwnProperty(validationKey) &&
                                    ngModelCtrl.$error[validationKey]) {
                                    self.formMessages.forEach(function (formMessage) {
                                        if ((ngModelCtrl.$name === formMessage.name) ||
                                            (formMessage.isFormMessage && ngModelCtrl.$isFormValidator)) {
                                            if (!formMessage.getMessage()) {
                                                formMessage.setMessageByKey(validationKey);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                };
            }]
        };
    }

    tgModel.$inject = ['$q'];

    function tgModel($q) {
        return {
            restrict: 'EA',
            require: ['ngModel', '^?tgForm'],
            compile: function () {
                function getValidationKey(str, prefix) {
                    var validationKey = str.substring(prefix.length);

                    return validationKey.charAt(0).toLowerCase() + validationKey.slice(1);
                }

                function preLink(scope, element, attrs, ctrls) {
                    var ngModelCtrl = ctrls[0],
                        tgFormCtrl = ctrls[1],
                        tgValidateStr = 'tgValidate',
                        tgValidateAsyncStr = 'tgValidateAsync';

                    if (ngModelCtrl.$name.indexOf('form-validator') === 0) {
                        ngModelCtrl.$isFormValidator = true;
                    }

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
                                        $form: tgFormCtrl,
                                        $value: viewValue,
                                        $model: modelValue
                                    });

                                    if (isAsync) {
                                        // result is not promise
                                        if (!(result && result.then)) {
                                            result = (result) ? $q.resolve(result) : $q.reject(result);
                                        }
                                    } else {
                                        // convert result to boolean
                                        result = !!result;
                                    }

                                    return result;
                                }.bind(null, isAsync, validationFn);
                            }
                        }
                    }

                    if (tgFormCtrl) {
                        overrideFn(ngModelCtrl, '$$runValidators', function (modelValue, viewValue, doneCallback) {
                            this.$baseFn(modelValue, viewValue, function (allValid) {
                                doneCallback(allValid);

                                if (!allValid) {
                                    tgFormCtrl.$$updateControlErrors(ngModelCtrl);
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
            require: '^tgForm',
            scope: true,
            template: '<input type="hidden" ng-model="__validator" name="form-validator-{{$id}}">',
            replace: true
        };
    }

    tgFormMessage.$inject = [];

    function tgFormMessage() {
        return {
            restrict: 'EA',
            require: '^tgForm',
            scope: true,
            template: '<span class="form-message">{{message}}</span>',
            compile: function () {
                function preLink(scope, element, attrs, tgFormCtrl) {
                    var inst = {
                        name: attrs.name || '@',
                        isFormMessage: (!attrs.name),
                        setMessageByKey: function (key) {
                            if (key) {
                                key = key + 'Message';

                                if (attrs.hasOwnProperty(key)) {
                                    var msg = scope.$parent.$eval(attrs[key]);

                                    this.setMessage(msg);
                                }
                            }
                        },
                        setMessage: function (message) {
                            scope.message = message;
                        },
                        getMessage: function () {
                            return scope.message;
                        }
                    };

                    tgFormCtrl.$$addFormMessage(inst);

                    scope.$on('$destroy', function () {
                        tgFormCtrl.$$removeFormMessage(inst);
                    });
                }

                return {
                    pre: preLink
                };
            }
        };
    }
})();
