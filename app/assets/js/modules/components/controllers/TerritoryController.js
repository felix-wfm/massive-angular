angular.module('app')
    .controller('TerritoryController', ['$scope',
        function ($scope) {
            'use strict';

            $scope.source = {
                "data": {
                    "clusters": [{
                        "id": 10000,
                        "type": "CONTINENT",
                        "active": true,
                        "title": "Europe",
                        "territory_count": 45,
                        "territory_ids": [70, 203, 336, 276, 8, 470, 196, 616, 348, 674, 620, 826, 804, 703, 807, 20, 752, 208, 756, 688, 440, 372, 100, 578, 442, 233, 705, 380, 40, 438, 643, 498, 499, 642, 492, 250, 352, 528, 191, 428, 112, 246, 56, 724, 300],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10003,
                        "type": "CONTINENT",
                        "active": true,
                        "title": "Asia",
                        "territory_count": 48,
                        "territory_ids": [410, 608, 408, 4, 414, 64, 682, 887, 400, 344, 702, 762, 462, 626, 760, 392, 156, 458, 398, 158, 764, 144, 634, 31, 268, 512, 368, 96, 784, 524, 704, 586, 496, 795, 376, 104, 792, 860, 356, 51, 50, 48, 116, 364, 417, 418, 360, 422],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10002,
                        "type": "CONTINENT",
                        "active": true,
                        "title": "Africa",
                        "territory_count": 55,
                        "territory_ids": [686, 140, 818, 678, 12, 132, 404, 566, 800, 262, 562, 266, 694, 24, 384, 690, 148, 270, 516, 788, 174, 434, 646, 288, 426, 768, 430, 178, 180, 478, 204, 748, 466, 72, 894, 324, 624, 454, 450, 508, 504, 716, 854, 232, 231, 108, 706, 226, 710, 728, 834, 729, 732, 480, 120],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10001,
                        "type": "CONTINENT",
                        "active": true,
                        "title": "Australia and Oceania",
                        "territory_count": 16,
                        "territory_ids": [548, 882, 36, 583, 584, 585, 798, 520, 554, 258, 598, 296, 540, 242, 776, 90],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10005,
                        "type": "CONTINENT",
                        "active": true,
                        "title": "North America",
                        "territory_count": 24,
                        "territory_ids": [340, 308, 558, 192, 44, 591, 84, 670, 222, 630, 188, 320, 52, 212, 484, 780, 214, 840, 332, 662, 124, 28, 388, 659],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10004,
                        "type": "CONTINENT",
                        "active": true,
                        "title": "South America",
                        "territory_count": 12,
                        "territory_ids": [68, 152, 170, 32, 218, 76, 600, 858, 604, 862, 328, 740],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }],
                    "true_clusters": [{
                        "id": 2103,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Antilles",
                        "territory_count": 13,
                        "territory_ids": [308, 192, 670, 630, 52, 212, 662, 332, 780, 214, 28, 388, 659],
                        "alphanumeric_code": "2AN",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2122,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "European Continent",
                        "territory_count": 40,
                        "territory_ids": [70, 203, 276, 336, 8, 616, 348, 674, 620, 804, 703, 807, 20, 752, 208, 756, 688, 440, 100, 578, 442, 233, 705, 380, 40, 438, 643, 498, 499, 642, 492, 250, 528, 191, 428, 112, 246, 56, 724, 300],
                        "alphanumeric_code": "2EC",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2127,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Nordic Countries",
                        "territory_count": 5,
                        "territory_ids": [578, 352, 246, 752, 208],
                        "alphanumeric_code": "2NC",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2113,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Central America",
                        "territory_count": 7,
                        "territory_ids": [84, 222, 340, 188, 320, 558, 591],
                        "alphanumeric_code": "2CA",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2107,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Australasia",
                        "territory_count": 6,
                        "territory_ids": [548, 36, 540, 554, 242, 90],
                        "alphanumeric_code": "2AA",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2124,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "GSA Countries",
                        "territory_count": 3,
                        "territory_ids": [276, 40, 756],
                        "alphanumeric_code": "2GC",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2133,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "South East Asia",
                        "territory_count": 11,
                        "territory_ids": [702, 626, 608, 116, 458, 96, 764, 704, 418, 360, 104],
                        "alphanumeric_code": "2SE",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2131,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Scandinavia",
                        "territory_count": 3,
                        "territory_ids": [578, 752, 208],
                        "alphanumeric_code": "2SC",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2119,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Eastern Europe",
                        "territory_count": 14,
                        "territory_ids": [804, 440, 703, 100, 428, 233, 203, 112, 8, 616, 348, 643, 498, 642],
                        "alphanumeric_code": "2EE",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2109,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Baltic States",
                        "territory_count": 3,
                        "territory_ids": [440, 428, 233],
                        "alphanumeric_code": "2BS",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2102,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "American Continent",
                        "territory_count": 22,
                        "territory_ids": [68, 170, 32, 340, 76, 558, 858, 862, 740, 591, 152, 84, 222, 218, 320, 188, 484, 600, 840, 124, 604, 328],
                        "alphanumeric_code": "2AC",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2125,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Middle East",
                        "territory_count": 19,
                        "territory_ids": [64, 414, 512, 4, 368, 682, 887, 784, 524, 586, 400, 496, 356, 50, 462, 48, 364, 144, 634],
                        "alphanumeric_code": "2ME",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2101,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "America",
                        "territory_count": 36,
                        "territory_ids": [68, 340, 558, 76, 192, 740, 152, 84, 222, 630, 320, 218, 212, 214, 332, 28, 328, 388, 170, 32, 308, 858, 862, 44, 591, 670, 188, 52, 484, 600, 662, 840, 780, 124, 604, 659],
                        "alphanumeric_code": "2AM",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2128,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "North Africa",
                        "territory_count": 5,
                        "territory_ids": [788, 504, 818, 434, 12],
                        "alphanumeric_code": "2NF",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2108,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "Balkans",
                        "territory_count": 10,
                        "territory_ids": [100, 70, 807, 191, 8, 705, 300, 688, 642, 499],
                        "alphanumeric_code": "2BA",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2134,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "West Indies",
                        "territory_count": 14,
                        "territory_ids": [308, 192, 44, 670, 630, 52, 212, 662, 332, 780, 214, 28, 388, 659],
                        "alphanumeric_code": "2WI",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 2111,
                        "type": "CLUSTER",
                        "active": true,
                        "title": "British Isles",
                        "territory_count": 2,
                        "territory_ids": [372, 826],
                        "alphanumeric_code": "2BI",
                        "ext_alphanumeric_code": ""
                    }],
                    "countries": [{
                        "id": 120,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Cameroon",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CM",
                        "ext_alphanumeric_code": "CMR"
                    }, {
                        "id": 340,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Honduras",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "HN",
                        "ext_alphanumeric_code": "HND"
                    }, {"id": 604, "type": "COUNTRY", "active": true, "title": "Peru", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "PE", "ext_alphanumeric_code": "PER"}, {
                        "id": 56,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Belgium",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BE",
                        "ext_alphanumeric_code": "BEL"
                    }, {
                        "id": 690,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Seychelles",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SC",
                        "ext_alphanumeric_code": "SYC"
                    }, {"id": 392, "type": "COUNTRY", "active": true, "title": "Japan", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "JP", "ext_alphanumeric_code": "JPN"}, {
                        "id": 300,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Greece",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "GR",
                        "ext_alphanumeric_code": "GRC"
                    }, {
                        "id": 674,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "San Marino",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SM",
                        "ext_alphanumeric_code": "SMR"
                    }, {
                        "id": 860,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Uzbekistan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "UZ",
                        "ext_alphanumeric_code": "UZB"
                    }, {"id": 266, "type": "COUNTRY", "active": true, "title": "Gabon", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "GA", "ext_alphanumeric_code": "GAB"}, {
                        "id": 72,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Botswana",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BW",
                        "ext_alphanumeric_code": "BWA"
                    }, {
                        "id": 214,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Dominican Republic",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "DO",
                        "ext_alphanumeric_code": "DOM"
                    }, {"id": 858, "type": "COUNTRY", "active": true, "title": "Uruguay", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "UY", "ext_alphanumeric_code": "URY"}, {
                        "id": 158,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Taiwan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TW",
                        "ext_alphanumeric_code": "TWN"
                    }, {"id": 470, "type": "COUNTRY", "active": true, "title": "Malta", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "MT", "ext_alphanumeric_code": "MLT"}, {
                        "id": 528,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Netherlands",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "NL",
                        "ext_alphanumeric_code": "NLD"
                    }, {"id": 788, "type": "COUNTRY", "active": true, "title": "Tunisia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "TN", "ext_alphanumeric_code": "TUN"}, {
                        "id": 233,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Estonia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "EE",
                        "ext_alphanumeric_code": "EST"
                    }, {
                        "id": 600,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Paraguay",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "PY",
                        "ext_alphanumeric_code": "PRY"
                    }, {"id": 585, "type": "COUNTRY", "active": true, "title": "Palau", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "PW", "ext_alphanumeric_code": "PLW"}, {
                        "id": 458,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Malaysia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "MY",
                        "ext_alphanumeric_code": "MYS"
                    }, {
                        "id": 682,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Saudi Arabia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SA",
                        "ext_alphanumeric_code": "SAU"
                    }, {"id": 428, "type": "COUNTRY", "active": true, "title": "Latvia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "LV", "ext_alphanumeric_code": "LVA"}, {
                        "id": 608,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Philippines",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "PH",
                        "ext_alphanumeric_code": "PHL"
                    }, {"id": 404, "type": "COUNTRY", "active": true, "title": "Kenya", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "KE", "ext_alphanumeric_code": "KEN"}, {
                        "id": 232,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Eritrea",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "ER",
                        "ext_alphanumeric_code": "ERI"
                    }, {"id": 108, "type": "COUNTRY", "active": true, "title": "Burundi", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "BI", "ext_alphanumeric_code": "BDI"}, {
                        "id": 170,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Colombia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CO",
                        "ext_alphanumeric_code": "COL"
                    }, {"id": 208, "type": "COUNTRY", "active": true, "title": "Denmark", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "DK", "ext_alphanumeric_code": "DNK"}, {
                        "id": 84,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Belize",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BZ",
                        "ext_alphanumeric_code": "BLZ"
                    }, {"id": 894, "type": "COUNTRY", "active": true, "title": "Zambia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "ZM", "ext_alphanumeric_code": "ZMB"}, {
                        "id": 729,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Sudan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SD",
                        "ext_alphanumeric_code": "SDN"
                    }, {
                        "id": 180,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Democratic Republic of the Congo",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CD",
                        "ext_alphanumeric_code": "COD"
                    }, {"id": 368, "type": "COUNTRY", "active": true, "title": "Iraq", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "IQ", "ext_alphanumeric_code": "IRQ"}, {
                        "id": 196,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Cyprus",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CY",
                        "ext_alphanumeric_code": "CYP"
                    }, {"id": 218, "type": "COUNTRY", "active": true, "title": "Ecuador", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "EC", "ext_alphanumeric_code": "ECU"}, {
                        "id": 262,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Djibouti",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "DJ",
                        "ext_alphanumeric_code": "DJI"
                    }, {"id": 288, "type": "COUNTRY", "active": true, "title": "Ghana", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "GH", "ext_alphanumeric_code": "GHA"}, {
                        "id": 492,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Monaco",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "MC",
                        "ext_alphanumeric_code": "MCO"
                    }, {"id": 356, "type": "COUNTRY", "active": true, "title": "India", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "IN", "ext_alphanumeric_code": "IND"}, {
                        "id": 48,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Bahrain",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BH",
                        "ext_alphanumeric_code": "BHR"
                    }, {
                        "id": 408,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "North Korea",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "KP",
                        "ext_alphanumeric_code": "PRK"
                    }, {
                        "id": 728,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "South Sudan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SS",
                        "ext_alphanumeric_code": "SSD"
                    }, {"id": 372, "type": "COUNTRY", "active": true, "title": "Ireland", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "IE", "ext_alphanumeric_code": "IRL"}, {
                        "id": 748,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Swaziland",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SZ",
                        "ext_alphanumeric_code": "SWZ"
                    }, {"id": 250, "type": "COUNTRY", "active": true, "title": "France", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "FR", "ext_alphanumeric_code": "FRA"}, {
                        "id": 192,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Cuba",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CU",
                        "ext_alphanumeric_code": "CUB"
                    }, {"id": 566, "type": "COUNTRY", "active": true, "title": "Nigeria", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "NG", "ext_alphanumeric_code": "NGA"}, {
                        "id": 478,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Mauritania",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "MR",
                        "ext_alphanumeric_code": "MRT"
                    }, {"id": 124, "type": "COUNTRY", "active": true, "title": "Canada", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "CA", "ext_alphanumeric_code": "CAN"}, {
                        "id": 50,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Bangladesh",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BD",
                        "ext_alphanumeric_code": "BGD"
                    }, {"id": 548, "type": "COUNTRY", "active": true, "title": "Vanuatu", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "VU", "ext_alphanumeric_code": "VUT"}, {
                        "id": 68,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Bolivia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BO",
                        "ext_alphanumeric_code": "BOL"
                    }, {
                        "id": 344,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Hong Kong",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "HK",
                        "ext_alphanumeric_code": "HKG"
                    }, {
                        "id": 70,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Bosnia and Herzegovina",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BA",
                        "ext_alphanumeric_code": "BIH"
                    }, {
                        "id": 438,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Liechtenstein",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "LI",
                        "ext_alphanumeric_code": "LIE"
                    }, {"id": 388, "type": "COUNTRY", "active": true, "title": "Jamaica", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "JM", "ext_alphanumeric_code": "JAM"}, {
                        "id": 624,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Guinea-Bissau",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "GW",
                        "ext_alphanumeric_code": "GNB"
                    }, {"id": 740, "type": "COUNTRY", "active": true, "title": "Suriname", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "SR", "ext_alphanumeric_code": "SUR"}, {
                        "id": 44,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Bahamas",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BS",
                        "ext_alphanumeric_code": "BHS"
                    }, {
                        "id": 100,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Bulgaria",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BG",
                        "ext_alphanumeric_code": "BGR"
                    }, {"id": 504, "type": "COUNTRY", "active": true, "title": "Morocco", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "MA", "ext_alphanumeric_code": "MAR"}, {
                        "id": 764,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Thailand",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TH",
                        "ext_alphanumeric_code": "THA"
                    }, {"id": 686, "type": "COUNTRY", "active": true, "title": "Senegal", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "SN", "ext_alphanumeric_code": "SEN"}, {
                        "id": 270,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Gambia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "GM",
                        "ext_alphanumeric_code": "GMB"
                    }, {"id": 246, "type": "COUNTRY", "active": true, "title": "Finland", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "FI", "ext_alphanumeric_code": "FIN"}, {
                        "id": 780,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Trinidad and Tobago",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TT",
                        "ext_alphanumeric_code": "TTO"
                    }, {"id": 104, "type": "COUNTRY", "active": true, "title": "Myanmar", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "MM", "ext_alphanumeric_code": "MMR"}, {
                        "id": 336,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Holy See (Vatican City State)",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "VA",
                        "ext_alphanumeric_code": "VAT"
                    }, {
                        "id": 417,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Kyrgyzstan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "KG",
                        "ext_alphanumeric_code": "KGZ"
                    }, {
                        "id": 756,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Switzerland",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CH",
                        "ext_alphanumeric_code": "CHE"
                    }, {"id": 646, "type": "COUNTRY", "active": true, "title": "Rwanda", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "RW", "ext_alphanumeric_code": "RWA"}, {
                        "id": 598,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Papua New Guinea",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "PG",
                        "ext_alphanumeric_code": "PNG"
                    }, {"id": 414, "type": "COUNTRY", "active": true, "title": "Kuwait", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "KW", "ext_alphanumeric_code": "KWT"}, {
                        "id": 586,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Pakistan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "PK",
                        "ext_alphanumeric_code": "PAK"
                    }, {"id": 882, "type": "COUNTRY", "active": true, "title": "Samoa", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "WS", "ext_alphanumeric_code": "WSM"}, {
                        "id": 496,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Mongolia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "MN",
                        "ext_alphanumeric_code": "MNG"
                    }, {"id": 706, "type": "COUNTRY", "active": true, "title": "Somalia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "SO", "ext_alphanumeric_code": "SOM"}, {
                        "id": 242,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Fiji",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "FJ",
                        "ext_alphanumeric_code": "FJI"
                    }, {
                        "id": 584,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Marshall Islands",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "MH",
                        "ext_alphanumeric_code": "MHL"
                    }, {
                        "id": 398,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Kazakhstan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "KZ",
                        "ext_alphanumeric_code": "KAZ"
                    }, {"id": 430, "type": "COUNTRY", "active": true, "title": "Liberia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "LR", "ext_alphanumeric_code": "LBR"}, {
                        "id": 499,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Montenegro",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "ME",
                        "ext_alphanumeric_code": "MNE"
                    }, {"id": 591, "type": "COUNTRY", "active": true, "title": "Panama", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "PA", "ext_alphanumeric_code": "PAN"}, {
                        "id": 826,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "United Kingdom",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "GB",
                        "ext_alphanumeric_code": "GBR"
                    }, {
                        "id": 188,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Costa Rica",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CR",
                        "ext_alphanumeric_code": "CRI"
                    }, {"id": 64, "type": "COUNTRY", "active": true, "title": "Bhutan", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "BT", "ext_alphanumeric_code": "BTN"}, {
                        "id": 31,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Azerbaijan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AZ",
                        "ext_alphanumeric_code": "AZE"
                    }, {
                        "id": 222,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "El Salvador",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SV",
                        "ext_alphanumeric_code": "SLV"
                    }, {
                        "id": 132,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Cape Verde",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CV",
                        "ext_alphanumeric_code": "CPV"
                    }, {"id": 466, "type": "COUNTRY", "active": true, "title": "Mali", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "ML", "ext_alphanumeric_code": "MLI"}, {
                        "id": 620,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Portugal",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "PT",
                        "ext_alphanumeric_code": "PRT"
                    }, {"id": 462, "type": "COUNTRY", "active": true, "title": "Maldives", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "MV", "ext_alphanumeric_code": "MDV"}, {
                        "id": 76,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Brazil",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BR",
                        "ext_alphanumeric_code": "BRA"
                    }, {
                        "id": 96,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Brunei Darussalam",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BN",
                        "ext_alphanumeric_code": "BRN"
                    }, {"id": 454, "type": "COUNTRY", "active": true, "title": "Malawi", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "MW", "ext_alphanumeric_code": "MWI"}, {
                        "id": 410,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "South Korea",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "KR",
                        "ext_alphanumeric_code": "KOR"
                    }, {
                        "id": 144,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Sri Lanka",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "LK",
                        "ext_alphanumeric_code": "LKA"
                    }, {
                        "id": 212,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Dominica",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "DM",
                        "ext_alphanumeric_code": "DMA"
                    }, {"id": 616, "type": "COUNTRY", "active": true, "title": "Poland", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "PL", "ext_alphanumeric_code": "POL"}, {
                        "id": 540,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "New Caledonia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "NC",
                        "ext_alphanumeric_code": "NCL"
                    }, {"id": 51, "type": "COUNTRY", "active": true, "title": "Armenia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "AM", "ext_alphanumeric_code": "ARM"}, {
                        "id": 384,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Cote D'ivoire",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CI",
                        "ext_alphanumeric_code": "CIV"
                    }, {
                        "id": 670,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Saint Vincent and the Grenadines",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "VC",
                        "ext_alphanumeric_code": "VCT"
                    }, {"id": 818, "type": "COUNTRY", "active": true, "title": "Egypt", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "EG", "ext_alphanumeric_code": "EGY"}, {
                        "id": 112,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Belarus",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BY",
                        "ext_alphanumeric_code": "BLR"
                    }, {"id": 634, "type": "COUNTRY", "active": true, "title": "Qatar", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "QA", "ext_alphanumeric_code": "QAT"}, {
                        "id": 854,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Burkina Faso",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BF",
                        "ext_alphanumeric_code": "BFA"
                    }, {"id": 484, "type": "COUNTRY", "active": true, "title": "Mexico", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "MX", "ext_alphanumeric_code": "MEX"}, {
                        "id": 792,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Turkey",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TR",
                        "ext_alphanumeric_code": "TUR"
                    }, {
                        "id": 558,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Nicaragua",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "NI",
                        "ext_alphanumeric_code": "NIC"
                    }, {
                        "id": 418,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Lao People's Democratic Republic",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "LA",
                        "ext_alphanumeric_code": "LAO"
                    }, {"id": 798, "type": "COUNTRY", "active": true, "title": "Tuvalu", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "TV", "ext_alphanumeric_code": "TUV"}, {
                        "id": 32,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Argentina",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AR",
                        "ext_alphanumeric_code": "ARG"
                    }, {"id": 152, "type": "COUNTRY", "active": true, "title": "Chile", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "CL", "ext_alphanumeric_code": "CHL"}, {
                        "id": 174,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Comoros",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "KM",
                        "ext_alphanumeric_code": "COM"
                    }, {
                        "id": 762,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Tajikistan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TJ",
                        "ext_alphanumeric_code": "TJK"
                    }, {"id": 422, "type": "COUNTRY", "active": true, "title": "Lebanon", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "LB", "ext_alphanumeric_code": "LBN"}, {
                        "id": 512,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Oman",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "OM",
                        "ext_alphanumeric_code": "OMN"
                    }, {"id": 8, "type": "COUNTRY", "active": true, "title": "Albania", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "AL", "ext_alphanumeric_code": "ALB"}, {
                        "id": 694,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Sierra Leone",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SL",
                        "ext_alphanumeric_code": "SLE"
                    }, {"id": 426, "type": "COUNTRY", "active": true, "title": "Lesotho", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "LS", "ext_alphanumeric_code": "LSO"}, {
                        "id": 276,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Germany",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "DE",
                        "ext_alphanumeric_code": "DEU"
                    }, {
                        "id": 630,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Puerto Rico",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "PR",
                        "ext_alphanumeric_code": "PRI"
                    }, {
                        "id": 442,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Luxembourg",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "LU",
                        "ext_alphanumeric_code": "LUX"
                    }, {
                        "id": 862,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Venezuela",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "VE",
                        "ext_alphanumeric_code": "VEN"
                    }, {"id": 148, "type": "COUNTRY", "active": true, "title": "Chad", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "TD", "ext_alphanumeric_code": "TCD"}, {
                        "id": 434,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Libya",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "LY",
                        "ext_alphanumeric_code": "LBY"
                    }, {"id": 752, "type": "COUNTRY", "active": true, "title": "Sweden", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "SE", "ext_alphanumeric_code": "SWE"}, {
                        "id": 40,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Austria",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AT",
                        "ext_alphanumeric_code": "AUT"
                    }, {
                        "id": 710,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "South Africa",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "ZA",
                        "ext_alphanumeric_code": "ZAF"
                    }, {
                        "id": 28,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Antigua and Barbuda",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AG",
                        "ext_alphanumeric_code": "ATG"
                    }, {
                        "id": 705,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Slovenia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SI",
                        "ext_alphanumeric_code": "SVN"
                    }, {
                        "id": 231,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Ethiopia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "ET",
                        "ext_alphanumeric_code": "ETH"
                    }, {"id": 520, "type": "COUNTRY", "active": true, "title": "Nauru", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "NR", "ext_alphanumeric_code": "NRU"}, {
                        "id": 562,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Niger",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "NE",
                        "ext_alphanumeric_code": "NER"
                    }, {
                        "id": 258,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "French Polynesia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "PF",
                        "ext_alphanumeric_code": "PYF"
                    }, {
                        "id": 4,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Afghanistan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AF",
                        "ext_alphanumeric_code": "AFG"
                    }, {"id": 642, "type": "COUNTRY", "active": true, "title": "Romania", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "RO", "ext_alphanumeric_code": "ROM"}, {
                        "id": 204,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Benin",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "BJ",
                        "ext_alphanumeric_code": "BEN"
                    }, {"id": 156, "type": "COUNTRY", "active": true, "title": "China", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "CN", "ext_alphanumeric_code": "CHN"}, {
                        "id": 226,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Equatorial Guinea",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "GQ",
                        "ext_alphanumeric_code": "GNQ"
                    }, {"id": 52, "type": "COUNTRY", "active": true, "title": "Barbados", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "BB", "ext_alphanumeric_code": "BRB"}, {
                        "id": 36,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Australia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AU",
                        "ext_alphanumeric_code": "AUS"
                    }, {
                        "id": 659,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Saint Kitts and Nevis",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "KN",
                        "ext_alphanumeric_code": "KNA"
                    }, {"id": 804, "type": "COUNTRY", "active": true, "title": "Ukraine", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "UA", "ext_alphanumeric_code": "UKR"}, {
                        "id": 24,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Angola",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AO",
                        "ext_alphanumeric_code": "AGO"
                    }, {
                        "id": 296,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Kiribati",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "KI",
                        "ext_alphanumeric_code": "KIR"
                    }, {
                        "id": 702,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Singapore",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SG",
                        "ext_alphanumeric_code": "SGP"
                    }, {
                        "id": 320,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Guatemala",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "GT",
                        "ext_alphanumeric_code": "GTM"
                    }, {"id": 776, "type": "COUNTRY", "active": true, "title": "Tonga", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "TO", "ext_alphanumeric_code": "TON"}, {
                        "id": 643,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Russian Federation",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "RU",
                        "ext_alphanumeric_code": "RUS"
                    }, {"id": 498, "type": "COUNTRY", "active": true, "title": "Moldova", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "MD", "ext_alphanumeric_code": "MDA"}, {
                        "id": 724,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Spain",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "ES",
                        "ext_alphanumeric_code": "ESP"
                    }, {
                        "id": 90,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Solomon Islands",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SB",
                        "ext_alphanumeric_code": "SLB"
                    }, {
                        "id": 840,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "United States",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "US",
                        "ext_alphanumeric_code": "USA"
                    }, {"id": 400, "type": "COUNTRY", "active": true, "title": "Jordan", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "JO", "ext_alphanumeric_code": "JOR"}, {
                        "id": 732,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Western Sahara",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "EH",
                        "ext_alphanumeric_code": "ESH"
                    }, {"id": 178, "type": "COUNTRY", "active": true, "title": "Congo", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "CG", "ext_alphanumeric_code": "COG"}, {
                        "id": 800,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Uganda",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "UG",
                        "ext_alphanumeric_code": "UGA"
                    }, {
                        "id": 450,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Madagascar",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "MG",
                        "ext_alphanumeric_code": "MDG"
                    }, {"id": 328, "type": "COUNTRY", "active": true, "title": "Guyana", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "GY", "ext_alphanumeric_code": "GUY"}, {
                        "id": 20,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Andorra",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AD",
                        "ext_alphanumeric_code": "AND"
                    }, {"id": 688, "type": "COUNTRY", "active": true, "title": "Serbia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "RS", "ext_alphanumeric_code": "SRB"}, {
                        "id": 768,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Togo",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TG",
                        "ext_alphanumeric_code": "TGO"
                    }, {
                        "id": 440,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Lithuania",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "LT",
                        "ext_alphanumeric_code": "LTU"
                    }, {"id": 516, "type": "COUNTRY", "active": true, "title": "Namibia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "NA", "ext_alphanumeric_code": "NAM"}, {
                        "id": 578,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Norway",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "NO",
                        "ext_alphanumeric_code": "NOR"
                    }, {
                        "id": 480,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Mauritius",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "MU",
                        "ext_alphanumeric_code": "MUS"
                    }, {
                        "id": 760,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Syrian Arab Republic",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SY",
                        "ext_alphanumeric_code": "SYR"
                    }, {"id": 352, "type": "COUNTRY", "active": true, "title": "Iceland", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "IS", "ext_alphanumeric_code": "ISL"}, {
                        "id": 626,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Timor-Leste",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TL",
                        "ext_alphanumeric_code": "TLS"
                    }, {"id": 191, "type": "COUNTRY", "active": true, "title": "Croatia", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "HR", "ext_alphanumeric_code": "HRV"}, {
                        "id": 703,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Slovakia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "SK",
                        "ext_alphanumeric_code": "SVK"
                    }, {"id": 364, "type": "COUNTRY", "active": true, "title": "Iran", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "IR", "ext_alphanumeric_code": "IRN"}, {
                        "id": 795,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Turkmenistan",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TM",
                        "ext_alphanumeric_code": "TKM"
                    }, {
                        "id": 678,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Sao Tome and Principe",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "ST",
                        "ext_alphanumeric_code": "STP"
                    }, {"id": 308, "type": "COUNTRY", "active": true, "title": "Grenada", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "GD", "ext_alphanumeric_code": "GRD"}, {
                        "id": 268,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Georgia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "GE",
                        "ext_alphanumeric_code": "GEO"
                    }, {"id": 887, "type": "COUNTRY", "active": true, "title": "Yemen", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "YE", "ext_alphanumeric_code": "YEM"}, {
                        "id": 380,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Italy",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "IT",
                        "ext_alphanumeric_code": "ITA"
                    }, {
                        "id": 360,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Indonesia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "ID",
                        "ext_alphanumeric_code": "IDN"
                    }, {"id": 332, "type": "COUNTRY", "active": true, "title": "Haiti", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "HT", "ext_alphanumeric_code": "HTI"}, {
                        "id": 784,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "United Arab Emirates",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "AE",
                        "ext_alphanumeric_code": "ARE"
                    }, {
                        "id": 140,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Central African Republic",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CF",
                        "ext_alphanumeric_code": "CAF"
                    }, {"id": 324, "type": "COUNTRY", "active": true, "title": "Guinea", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "GN", "ext_alphanumeric_code": "GIN"}, {
                        "id": 554,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "New Zealand",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "NZ",
                        "ext_alphanumeric_code": "NZL"
                    }, {
                        "id": 203,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Czech Republic",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "CZ",
                        "ext_alphanumeric_code": "CZE"
                    }, {
                        "id": 807,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Macedonia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "MK",
                        "ext_alphanumeric_code": "MKD"
                    }, {"id": 716, "type": "COUNTRY", "active": true, "title": "Zimbabwe", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "ZW", "ext_alphanumeric_code": "ZWE"}, {
                        "id": 12,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Algeria",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "DZ",
                        "ext_alphanumeric_code": "DZA"
                    }, {
                        "id": 662,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Saint Lucia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "LC",
                        "ext_alphanumeric_code": "LCA"
                    }, {"id": 376, "type": "COUNTRY", "active": true, "title": "Israel", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "IL", "ext_alphanumeric_code": "ISR"}, {
                        "id": 583,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Micronesia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "FM",
                        "ext_alphanumeric_code": "FSM"
                    }, {
                        "id": 704,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Viet Nam",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "VN",
                        "ext_alphanumeric_code": "VNM"
                    }, {
                        "id": 116,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Cambodia",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "KH",
                        "ext_alphanumeric_code": "KHM"
                    }, {"id": 348, "type": "COUNTRY", "active": true, "title": "Hungary", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "HU", "ext_alphanumeric_code": "HUN"}, {
                        "id": 524,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Nepal",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "NP",
                        "ext_alphanumeric_code": "NPL"
                    }, {
                        "id": 834,
                        "type": "COUNTRY",
                        "active": true,
                        "title": "Tanzania",
                        "territory_count": 0,
                        "territory_ids": [],
                        "alphanumeric_code": "TZ",
                        "ext_alphanumeric_code": "TZA"
                    }, {"id": 508, "type": "COUNTRY", "active": true, "title": "Mozambique", "territory_count": 0, "territory_ids": [], "alphanumeric_code": "MZ", "ext_alphanumeric_code": "MOZ"}],
                    "quickpicks": [{
                        "id": 10014,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "Australasia",
                        "territory_count": 6,
                        "territory_ids": [548, 36, 540, 554, 242, 90],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10006,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "Caribbean",
                        "territory_count": 13,
                        "territory_ids": [308, 192, 670, 630, 52, 212, 662, 332, 780, 214, 28, 388, 659],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10013,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "North Africa",
                        "territory_count": 5,
                        "territory_ids": [788, 504, 818, 434, 12],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10017,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "African Commonwealth Nations",
                        "territory_count": 19,
                        "territory_ids": [508, 516, 716, 748, 72, 404, 894, 710, 834, 288, 566, 426, 800, 694, 454, 690, 270, 480, 120],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10008,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "Middle East",
                        "territory_count": 19,
                        "territory_ids": [64, 414, 512, 4, 368, 682, 887, 784, 524, 586, 400, 496, 356, 50, 462, 48, 364, 144, 634],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10007,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "Central America",
                        "territory_count": 7,
                        "territory_ids": [84, 222, 340, 188, 320, 558, 591],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10019,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "Central Asia",
                        "territory_count": 8,
                        "territory_ids": [51, 762, 398, 417, 795, 31, 268, 860],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10016,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "Eastern Europe and Balkans",
                        "territory_count": 20,
                        "territory_ids": [440, 70, 100, 203, 233, 705, 8, 616, 348, 643, 498, 499, 642, 804, 703, 807, 428, 191, 112, 688],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10010,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "Baltic States",
                        "territory_count": 3,
                        "territory_ids": [440, 428, 233],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10011,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "GSA Countries",
                        "territory_count": 3,
                        "territory_ids": [276, 40, 756],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10012,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "Nordic Countries",
                        "territory_count": 5,
                        "territory_ids": [578, 352, 246, 752, 208],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10015,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "North America",
                        "territory_count": 3,
                        "territory_ids": [484, 840, 124],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10009,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "South East Asia",
                        "territory_count": 11,
                        "territory_ids": [702, 626, 608, 116, 458, 96, 764, 704, 418, 360, 104],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }, {
                        "id": 10018,
                        "type": "QUICK PICK",
                        "active": true,
                        "title": "North East Asia",
                        "territory_count": 6,
                        "territory_ids": [410, 408, 392, 156, 158, 344],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }],
                    "worldwide": [{
                        "id": 10021,
                        "type": "WORLDWIDE",
                        "active": true,
                        "title": "Worldwide",
                        "territory_count": 200,
                        "territory_ids": [548, 4, 8, 558, 12, 554, 566, 20, 562, 24, 28, 31, 516, 32, 512, 36, 524, 40, 520, 44, 51, 50, 48, 528, 52, 540, 56, 68, 608, 70, 64, 76, 616, 72, 620, 626, 84, 624, 630, 634, 90, 100, 578, 96, 583, 584, 585, 586, 108, 104, 591, 116, 112, 598, 600, 124, 604, 120, 686, 682, 140, 678, 132, 674, 702, 152, 703, 156, 158, 694, 144, 690, 148, 688, 170, 174, 646, 643, 642, 670, 191, 188, 178, 662, 180, 659, 204, 203, 748, 196, 192, 740, 762, 760, 222, 764, 218, 212, 752, 214, 208, 756, 716, 233, 232, 231, 705, 704, 706, 226, 710, 728, 729, 732, 250, 246, 724, 242, 818, 276, 826, 804, 258, 807, 800, 262, 266, 270, 268, 788, 308, 784, 798, 795, 792, 288, 768, 296, 780, 300, 776, 882, 340, 887, 336, 348, 344, 894, 324, 320, 332, 328, 372, 368, 854, 858, 380, 376, 862, 860, 356, 834, 352, 364, 840, 360, 410, 408, 414, 400, 404, 392, 398, 384, 388, 440, 442, 434, 438, 426, 428, 430, 417, 418, 422, 478, 470, 466, 462, 458, 454, 450, 508, 504, 496, 498, 499, 492, 484, 480],
                        "alphanumeric_code": "",
                        "ext_alphanumeric_code": ""
                    }]
                }
            };

            $scope.__territory = {
                model1: []
            };

            (function init() {

            })();
        }
    ]);
