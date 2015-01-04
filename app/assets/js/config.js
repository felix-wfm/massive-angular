angular.module('app')
    .config(['$logProvider',
        function ($logProvider) {
            'use strict';

            $logProvider.debugEnabled(true);
        }
    ]);
