(function () {
    'use strict';

    /*
     * BASE COMPONENTS FUNCTIONALITY
     */
    angular.module('tg.extensions')
        .factory('$tgComponents', tgComponents)
        .factory('$tgForms', tgForms)
        .factory('tgEventsProcessor', tgEventsProcessor);

    tgComponents.$inject = ['tgEventsProcessor'];

    function tgComponents(tgEventsProcessor) {
        var instances = {},
            eventsProc = tgEventsProcessor.new();

        return {
            $addInstance: function (inst) {
                if (!inst || !inst.$name) {
                    throw new Error('Invalid instance or instance name.');
                }

                if (instances.hasOwnProperty(inst.$name)) {
                    //throw new Error('Component with instance name `' + inst.$name + '` already exist.');
                    this.$removeInstance(inst);
                }

                if (!!inst.$supportEvents && !inst.hasOwnProperty('events')) {
                    inst.events = tgEventsProcessor.new();

                    inst.trigger = function (name) {
                        var args = [];
                        Array.prototype.push.apply(args, arguments);
                        args.push(inst);

                        return inst.events.emit.apply(inst.events, args);
                    };
                }

                instances[inst.$name] = inst;

                eventsProc.emit('$onInstanceAdded', inst);
            },
            $removeInstance: function (inst) {
                if (!inst || !inst.$name) {
                    throw new Error('Invalid instance or instance name.');
                }

                if (!instances.hasOwnProperty(inst.$name)) {
                    throw new Error('Component with instance name `' + inst.$name + '` doesn\'t exist.');
                }

                delete instances[inst.$name];

                eventsProc.emit('$onInstanceRemoved', inst);
            },
            hasInstance: function (name) {
                if (!name) {
                    throw new Error('Invalid instance name.');
                }

                return instances.hasOwnProperty(name);
            },
            getInstance: function (name) {
                if (!this.hasInstance(name)) {
                    throw new Error('Component with instance name `' + name + '` doesn\'t exist.');
                }

                return instances[name] || null;
            },
            getInstances: function () {
                var results = [];

                for (var key in instances) {
                    results.push(instances[key]);
                }

                return results;
            },
            events: eventsProc
        };
    }

    tgForms.$inject = ['tgEventsProcessor'];

    function tgForms(tgEventsProcessor) {
        var instances = {},
            eventsProc = tgEventsProcessor.new();

        return {
            $addInstance: function (inst) {
                if (!inst || !inst.$name) {
                    throw new Error('Invalid instance or instance name.');
                }

                if (instances.hasOwnProperty(inst.$name)) {
                    throw new Error('Component with instance name `' + inst.$name + '` already exist.');
                }

                if (!!inst.$supportEvents && !inst.hasOwnProperty('events')) {
                    inst.events = tgEventsProcessor.new();

                    inst.trigger = function (name) {
                        var args = [];
                        Array.prototype.push.apply(args, arguments);
                        args.push(inst);

                        return inst.events.emit.apply(inst.events, args);
                    };
                }

                instances[inst.$name] = inst;

                eventsProc.emit('$onFormInstanceAdded', inst);
            },
            $removeInstance: function (inst) {
                if (!inst || !inst.$name) {
                    throw new Error('Invalid instance or instance name.');
                }

                if (!instances.hasOwnProperty(inst.$name)) {
                    throw new Error('Component with instance name `' + inst.$name + '` doesn\'t exist.');
                }

                delete instances[inst.$name];

                eventsProc.emit('$onFormInstanceRemoved', inst);
            },
            hasInstance: function (name) {
                if (!name) {
                    throw new Error('Invalid instance name.');
                }

                return instances.hasOwnProperty(name);
            },
            getInstance: function (name) {
                return instances[name] || undefined;
            },
            getInstances: function () {
                var results = [];

                for (var key in instances) {
                    results.push(instances[key]);
                }

                return results;
            },
            events: eventsProc
        };
    }

    tgEventsProcessor.$inject = ['$q'];

    function tgEventsProcessor($q) {
        function EventsProcessor() {
            this.handlers = {};

            this.on = function (eventName, fn) {
                if (angular.isString(eventName) && eventName.length > 0 && angular.isFunction(fn)) {
                    if (!this.handlers.hasOwnProperty(eventName)) {
                        this.handlers[eventName] = [];
                    }

                    var ev = this.handlers[eventName];

                    ev.push(fn);

                    return function removeHandler() {
                        var idx = ev.indexOf(fn);

                        if (idx !== -1) {
                            ev.splice(idx, 1);
                        }
                    };
                }
            };

            this.emit = function (eventName) {
                var promises = [];

                if (angular.isString(eventName) && eventName.length > 0) {
                    if (this.handlers.hasOwnProperty(eventName)) {
                        var args = [];
                        Array.prototype.push.apply(args, arguments);
                        args.shift();

                        angular.forEach(this.handlers[eventName], function (fn) {
                            var result = fn.apply(this, args);

                            if (result) {
                                var isPromise = angular.isFunction(result.then);

                                if (isPromise) {
                                    promises.push(result);
                                }
                            }
                        });
                    }
                }

                return $q.all(promises);
            };

            this.has = function (eventName) {
                return this.handlers[eventName] && (this.handlers[eventName]).length > 0;
            };

            this.clear = function (eventName, fn) {
                if (eventName !== undefined) {
                    if (angular.isString(eventName) && eventName.length > 0) {
                        if (angular.isFunction(fn)) {
                            var idx = this.handlers[eventName].indexOf(fn);

                            if (idx !== -1) {
                                this.handlers[eventName].splice(idx, 1);
                            }
                        } else {
                            delete this.handlers[eventName];
                        }
                    }
                } else {
                    this.handlers = {};
                }
            };
        }

        return {
            new: function () {
                return new EventsProcessor();
            }
        };
    }

    /*
     * COMMON COMPONENTS FUNCTIONALITY
     */
    angular.module('tg.extensions')
        .directive('tgComponentRenderTemplate', tgComponentRenderTemplate)
        .factory('tgComponentRenderTemplateModel', tgComponentRenderTemplateModel)
        .factory('tgComponentsTemplate', tgComponentsTemplate);

    tgComponentRenderTemplate.$inject = ['$http', '$compile', '$parse', '$templateCache'];

    function tgComponentRenderTemplate($http, $compile, $parse, $templateCache) {
        return {
            restrict: 'A',
            scope: false,
            compile: function (tElement, tAttrs) {
                var renderTpl = $parse(tAttrs.tgComponentRenderTemplate);

                function postLink(scope, element, attrs) {
                    element.empty();

                    var renderTplModel = renderTpl(scope);

                    if (renderTplModel && renderTplModel.template) {
                        renderTplModel.template(scope, function (contents) {
                            element.append(contents);
                        });

                        if (renderTplModel.appendTo) {
                            element.detach().appendTo(renderTplModel.appendTo);
                        }

                        renderTplModel.render(element);
                    } else if (renderTplModel && renderTplModel.templateUrl) {
                        $http.get(renderTplModel.templateUrl, {cache: $templateCache})
                            .success(function (tplContent) {
                                element.append($compile(tplContent.trim())(scope));

                                if (renderTplModel.appendTo) {
                                    element.detach().appendTo(renderTplModel.appendTo);
                                }

                                renderTplModel.render(element);
                            });
                    } else {
                        element.remove();
                    }

                    if (renderTplModel) {
                        scope.$on('$destroy', function () {
                            renderTplModel.destroy();
                        });
                    }
                }

                return {
                    pre: undefined,
                    post: postLink
                };
            }
        };
    }

    tgComponentRenderTemplateModel.$inject = ['$injector'];

    function tgComponentRenderTemplateModel($injector) {
        var Utilities = $injector.get('tgUtilities');

        function RenderTemplateModelFactory(name, templateUrl, renderCallback, destroyCallback) {
            this.name = name;
            this.templateUrl = templateUrl;
            this.template = undefined;
            this.appendTo = false;
            this.strictWidth = false;
            this.element = undefined;
            this.style = undefined;
            this.class = undefined;
            this.renderCallback = renderCallback;
            this.destroyCallback = destroyCallback;
        }

        RenderTemplateModelFactory.prototype.setTemplate = function (tpl) {
            this.template = tpl;
        };

        RenderTemplateModelFactory.prototype.render = function (element) {
            this.element = element;

            if (Utilities.isFunction(this.renderCallback)) {
                this.renderCallback(this);
            }
        };

        RenderTemplateModelFactory.prototype.destroy = function () {
            if (Utilities.isFunction(this.destroyCallback)) {
                this.destroyCallback(this);
            }

            this.element = null;
        };

        return RenderTemplateModelFactory;
    }

    function tgComponentsTemplate() {
        function transcludeTemplate(require, templateSetter) {
            return {
                restrict: 'A',
                require: require,
                transclude: true,
                scope: false,
                compile: function () {
                    function preLink(scope, element, attrs, ctrl, $transcludeFn) {
                        if (templateSetter && ctrl && ctrl.hasOwnProperty(templateSetter)) {
                            ctrl[templateSetter]($transcludeFn);
                        }
                    }

                    function postLink(scope, element, attrs) {
                        element.remove();
                    }

                    return {
                        pre: preLink,
                        post: postLink
                    };
                }
            };
        }

        return {
            transcludeTemplate: transcludeTemplate
        };
    }
})();
