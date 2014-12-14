angular.module('tg.extensions')
    .factory('$tgComponents', ['tgEventsProcessor', function (tgEventsProcessor) {
        'use strict';

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
    }])
    .factory('tgEventsProcessor', ['$q', function ($q) {
        'use strict';

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
                                var isPromise = (result.hasOwnProperty('then') && angular.isFunction(result.then));

                                if (isPromise) {
                                    promises.push(result);
                                }
                            }
                        });
                    }
                }

                return $q.all(promises);
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
    }]);
