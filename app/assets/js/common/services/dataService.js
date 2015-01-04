(function () {
    'use strict';

    angular.module('tg.common')
        .service('DataService', DataService);

    DataService.$inject = ['$q'];

    function DataService($q) {
        var countries = [
            {
                "id": 4,
                "code": "AF",
                "name": "Afghanistan"
            },
            {
                "id": 8,
                "code": "AL",
                "name": "Albania"
            },
            {
                "id": 12,
                "code": "DZ",
                "name": "Algeria"
            },
            {
                "id": 20,
                "code": "AD",
                "name": "Andorra"
            },
            {
                "id": 24,
                "code": "AO",
                "name": "Angola"
            },
            {
                "id": 28,
                "code": "AG",
                "name": "Antigua and Barbuda"
            },
            {
                "id": 31,
                "code": "AZ",
                "name": "Azerbaijan"
            },
            {
                "id": 32,
                "code": "AR",
                "name": "Argentina"
            },
            {
                "id": 36,
                "code": "AU",
                "name": "Australia"
            },
            {
                "id": 40,
                "code": "AT",
                "name": "Austria"
            },
            {
                "id": 44,
                "code": "BS",
                "name": "Bahamas"
            },
            {
                "id": 48,
                "code": "BH",
                "name": "Bahrain"
            },
            {
                "id": 50,
                "code": "BD",
                "name": "Bangladesh"
            },
            {
                "id": 51,
                "code": "AM",
                "name": "Armenia"
            },
            {
                "id": 52,
                "code": "BB",
                "name": "Barbados"
            },
            {
                "id": 56,
                "code": "BE",
                "name": "Belgium"
            },
            {
                "id": 64,
                "code": "BT",
                "name": "Bhutan"
            },
            {
                "id": 68,
                "code": "BO",
                "name": "Bolivia"
            },
            {
                "id": 70,
                "code": "BA",
                "name": "Bosnia and Herzegovina"
            },
            {
                "id": 72,
                "code": "BW",
                "name": "Botswana"
            },
            {
                "id": 76,
                "code": "BR",
                "name": "Brazil"
            },
            {
                "id": 84,
                "code": "BZ",
                "name": "Belize"
            },
            {
                "id": 90,
                "code": "SB",
                "name": "Solomon Islands"
            },
            {
                "id": 96,
                "code": "BN",
                "name": "Brunei Darussalam"
            },
            {
                "id": 100,
                "code": "BG",
                "name": "Bulgaria"
            },
            {
                "id": 104,
                "code": "MM",
                "name": "Myanmar"
            },
            {
                "id": 108,
                "code": "BI",
                "name": "Burundi"
            },
            {
                "id": 112,
                "code": "BY",
                "name": "Belarus"
            },
            {
                "id": 116,
                "code": "KH",
                "name": "Cambodia"
            },
            {
                "id": 120,
                "code": "CM",
                "name": "Cameroon"
            },
            {
                "id": 124,
                "code": "CA",
                "name": "Canada"
            },
            {
                "id": 132,
                "code": "CV",
                "name": "Cape Verde"
            },
            {
                "id": 140,
                "code": "CF",
                "name": "Central African Republic"
            },
            {
                "id": 144,
                "code": "LK",
                "name": "Sri Lanka"
            },
            {
                "id": 148,
                "code": "TD",
                "name": "Chad"
            },
            {
                "id": 152,
                "code": "CL",
                "name": "Chile"
            },
            {
                "id": 156,
                "code": "CN",
                "name": "China"
            },
            {
                "id": 158,
                "code": "TW",
                "name": "Taiwan"
            },
            {
                "id": 170,
                "code": "CO",
                "name": "Colombia"
            },
            {
                "id": 174,
                "code": "KM",
                "name": "Comoros"
            },
            {
                "id": 178,
                "code": "CG",
                "name": "Congo"
            },
            {
                "id": 180,
                "code": "CD",
                "name": "Democratic Republic of the Congo"
            },
            {
                "id": 188,
                "code": "CR",
                "name": "Costa Rica"
            },
            {
                "id": 191,
                "code": "HR",
                "name": "Croatia"
            },
            {
                "id": 192,
                "code": "CU",
                "name": "Cuba"
            },
            {
                "id": 196,
                "code": "CY",
                "name": "Cyprus"
            },
            {
                "id": 203,
                "code": "CZ",
                "name": "Czech Republic"
            },
            {
                "id": 204,
                "code": "BJ",
                "name": "Benin"
            },
            {
                "id": 208,
                "code": "DK",
                "name": "Denmark"
            },
            {
                "id": 212,
                "code": "DM",
                "name": "Dominica"
            },
            {
                "id": 214,
                "code": "DO",
                "name": "Dominican Republic"
            },
            {
                "id": 218,
                "code": "EC",
                "name": "Ecuador"
            },
            {
                "id": 222,
                "code": "SV",
                "name": "El Salvador"
            },
            {
                "id": 226,
                "code": "GQ",
                "name": "Equatorial Guinea"
            },
            {
                "id": 231,
                "code": "ET",
                "name": "Ethiopia"
            },
            {
                "id": 232,
                "code": "ER",
                "name": "Eritrea"
            },
            {
                "id": 233,
                "code": "EE",
                "name": "Estonia"
            },
            {
                "id": 242,
                "code": "FJ",
                "name": "Fiji"
            },
            {
                "id": 246,
                "code": "FI",
                "name": "Finland"
            },
            {
                "id": 250,
                "code": "FR",
                "name": "France"
            },
            {
                "id": 258,
                "code": "PF",
                "name": "French Polynesia"
            },
            {
                "id": 262,
                "code": "DJ",
                "name": "Djibouti"
            },
            {
                "id": 266,
                "code": "GA",
                "name": "Gabon"
            },
            {
                "id": 268,
                "code": "GE",
                "name": "Georgia"
            },
            {
                "id": 270,
                "code": "GM",
                "name": "Gambia"
            },
            {
                "id": 276,
                "code": "DE",
                "name": "Germany"
            },
            {
                "id": 288,
                "code": "GH",
                "name": "Ghana"
            },
            {
                "id": 296,
                "code": "KI",
                "name": "Kiribati"
            },
            {
                "id": 300,
                "code": "GR",
                "name": "Greece"
            },
            {
                "id": 308,
                "code": "GD",
                "name": "Grenada"
            },
            {
                "id": 320,
                "code": "GT",
                "name": "Guatemala"
            },
            {
                "id": 324,
                "code": "GN",
                "name": "Guinea"
            },
            {
                "id": 328,
                "code": "GY",
                "name": "Guyana"
            },
            {
                "id": 332,
                "code": "HT",
                "name": "Haiti"
            },
            {
                "id": 336,
                "code": "VA",
                "name": "Holy See (Vatican City State)"
            },
            {
                "id": 340,
                "code": "HN",
                "name": "Honduras"
            },
            {
                "id": 344,
                "code": "HK",
                "name": "Hong Kong"
            },
            {
                "id": 348,
                "code": "HU",
                "name": "Hungary"
            },
            {
                "id": 352,
                "code": "IS",
                "name": "Iceland"
            },
            {
                "id": 356,
                "code": "IN",
                "name": "India"
            },
            {
                "id": 360,
                "code": "ID",
                "name": "Indonesia"
            },
            {
                "id": 364,
                "code": "IR",
                "name": "Iran"
            },
            {
                "id": 368,
                "code": "IQ",
                "name": "Iraq"
            },
            {
                "id": 372,
                "code": "IE",
                "name": "Ireland"
            },
            {
                "id": 376,
                "code": "IL",
                "name": "Israel"
            },
            {
                "id": 380,
                "code": "IT",
                "name": "Italy"
            },
            {
                "id": 384,
                "code": "CI",
                "name": "Cote D'ivoire"
            },
            {
                "id": 388,
                "code": "JM",
                "name": "Jamaica"
            },
            {
                "id": 392,
                "code": "JP",
                "name": "Japan"
            },
            {
                "id": 398,
                "code": "KZ",
                "name": "Kazakhstan"
            },
            {
                "id": 400,
                "code": "JO",
                "name": "Jordan"
            },
            {
                "id": 404,
                "code": "KE",
                "name": "Kenya"
            },
            {
                "id": 408,
                "code": "KP",
                "name": "North Korea"
            },
            {
                "id": 410,
                "code": "KR",
                "name": "South Korea"
            },
            {
                "id": 414,
                "code": "KW",
                "name": "Kuwait"
            },
            {
                "id": 417,
                "code": "KG",
                "name": "Kyrgyzstan"
            },
            {
                "id": 418,
                "code": "LA",
                "name": "Lao People's Democratic Republic"
            },
            {
                "id": 422,
                "code": "LB",
                "name": "Lebanon"
            },
            {
                "id": 426,
                "code": "LS",
                "name": "Lesotho"
            },
            {
                "id": 428,
                "code": "LV",
                "name": "Latvia"
            },
            {
                "id": 430,
                "code": "LR",
                "name": "Liberia"
            },
            {
                "id": 434,
                "code": "LY",
                "name": "Libya"
            },
            {
                "id": 438,
                "code": "LI",
                "name": "Liechtenstein"
            },
            {
                "id": 440,
                "code": "LT",
                "name": "Lithuania"
            },
            {
                "id": 442,
                "code": "LU",
                "name": "Luxembourg"
            },
            {
                "id": 450,
                "code": "MG",
                "name": "Madagascar"
            },
            {
                "id": 454,
                "code": "MW",
                "name": "Malawi"
            },
            {
                "id": 458,
                "code": "MY",
                "name": "Malaysia"
            },
            {
                "id": 462,
                "code": "MV",
                "name": "Maldives"
            },
            {
                "id": 466,
                "code": "ML",
                "name": "Mali"
            },
            {
                "id": 470,
                "code": "MT",
                "name": "Malta"
            },
            {
                "id": 478,
                "code": "MR",
                "name": "Mauritania"
            },
            {
                "id": 480,
                "code": "MU",
                "name": "Mauritius"
            },
            {
                "id": 484,
                "code": "MX",
                "name": "Mexico"
            },
            {
                "id": 492,
                "code": "MC",
                "name": "Monaco"
            },
            {
                "id": 496,
                "code": "MN",
                "name": "Mongolia"
            },
            {
                "id": 498,
                "code": "MD",
                "name": "Moldova"
            },
            {
                "id": 499,
                "code": "ME",
                "name": "Montenegro"
            },
            {
                "id": 504,
                "code": "MA",
                "name": "Morocco"
            },
            {
                "id": 508,
                "code": "MZ",
                "name": "Mozambique"
            },
            {
                "id": 512,
                "code": "OM",
                "name": "Oman"
            },
            {
                "id": 516,
                "code": "NA",
                "name": "Namibia"
            },
            {
                "id": 520,
                "code": "NR",
                "name": "Nauru"
            },
            {
                "id": 524,
                "code": "NP",
                "name": "Nepal"
            },
            {
                "id": 528,
                "code": "NL",
                "name": "Netherlands"
            },
            {
                "id": 540,
                "code": "NC",
                "name": "New Caledonia"
            },
            {
                "id": 548,
                "code": "VU",
                "name": "Vanuatu"
            },
            {
                "id": 554,
                "code": "NZ",
                "name": "New Zealand"
            },
            {
                "id": 558,
                "code": "NI",
                "name": "Nicaragua"
            },
            {
                "id": 562,
                "code": "NE",
                "name": "Niger"
            },
            {
                "id": 566,
                "code": "NG",
                "name": "Nigeria"
            },
            {
                "id": 578,
                "code": "NO",
                "name": "Norway"
            },
            {
                "id": 583,
                "code": "FM",
                "name": "Micronesia"
            },
            {
                "id": 584,
                "code": "MH",
                "name": "Marshall Islands"
            },
            {
                "id": 585,
                "code": "PW",
                "name": "Palau"
            },
            {
                "id": 586,
                "code": "PK",
                "name": "Pakistan"
            },
            {
                "id": 591,
                "code": "PA",
                "name": "Panama"
            },
            {
                "id": 598,
                "code": "PG",
                "name": "Papua New Guinea"
            },
            {
                "id": 600,
                "code": "PY",
                "name": "Paraguay"
            },
            {
                "id": 604,
                "code": "PE",
                "name": "Peru"
            },
            {
                "id": 608,
                "code": "PH",
                "name": "Philippines"
            },
            {
                "id": 616,
                "code": "PL",
                "name": "Poland"
            },
            {
                "id": 620,
                "code": "PT",
                "name": "Portugal"
            },
            {
                "id": 624,
                "code": "GW",
                "name": "Guinea-Bissau"
            },
            {
                "id": 626,
                "code": "TL",
                "name": "Timor-Leste"
            },
            {
                "id": 630,
                "code": "PR",
                "name": "Puerto Rico"
            },
            {
                "id": 634,
                "code": "QA",
                "name": "Qatar"
            },
            {
                "id": 642,
                "code": "RO",
                "name": "Romania"
            },
            {
                "id": 643,
                "code": "RU",
                "name": "Russian Federation"
            },
            {
                "id": 646,
                "code": "RW",
                "name": "Rwanda"
            },
            {
                "id": 659,
                "code": "KN",
                "name": "Saint Kitts and Nevis"
            },
            {
                "id": 662,
                "code": "LC",
                "name": "Saint Lucia"
            },
            {
                "id": 670,
                "code": "VC",
                "name": "Saint Vincent and the Grenadines"
            },
            {
                "id": 674,
                "code": "SM",
                "name": "San Marino"
            },
            {
                "id": 678,
                "code": "ST",
                "name": "Sao Tome and Principe"
            },
            {
                "id": 682,
                "code": "SA",
                "name": "Saudi Arabia"
            },
            {
                "id": 686,
                "code": "SN",
                "name": "Senegal"
            },
            {
                "id": 688,
                "code": "RS",
                "name": "Serbia"
            },
            {
                "id": 690,
                "code": "SC",
                "name": "Seychelles"
            },
            {
                "id": 694,
                "code": "SL",
                "name": "Sierra Leone"
            },
            {
                "id": 702,
                "code": "SG",
                "name": "Singapore"
            },
            {
                "id": 703,
                "code": "SK",
                "name": "Slovakia"
            },
            {
                "id": 704,
                "code": "VN",
                "name": "Viet Nam"
            },
            {
                "id": 705,
                "code": "SI",
                "name": "Slovenia"
            },
            {
                "id": 706,
                "code": "SO",
                "name": "Somalia"
            },
            {
                "id": 710,
                "code": "ZA",
                "name": "South Africa"
            },
            {
                "id": 716,
                "code": "ZW",
                "name": "Zimbabwe"
            },
            {
                "id": 724,
                "code": "ES",
                "name": "Spain"
            },
            {
                "id": 728,
                "code": "SS",
                "name": "South Sudan"
            },
            {
                "id": 729,
                "code": "SD",
                "name": "Sudan"
            },
            {
                "id": 732,
                "code": "EH",
                "name": "Western Sahara"
            },
            {
                "id": 740,
                "code": "SR",
                "name": "Suriname"
            },
            {
                "id": 748,
                "code": "SZ",
                "name": "Swaziland"
            },
            {
                "id": 752,
                "code": "SE",
                "name": "Sweden"
            },
            {
                "id": 756,
                "code": "CH",
                "name": "Switzerland"
            },
            {
                "id": 760,
                "code": "SY",
                "name": "Syrian Arab Republic"
            },
            {
                "id": 762,
                "code": "TJ",
                "name": "Tajikistan"
            },
            {
                "id": 764,
                "code": "TH",
                "name": "Thailand"
            },
            {
                "id": 768,
                "code": "TG",
                "name": "Togo"
            },
            {
                "id": 776,
                "code": "TO",
                "name": "Tonga"
            },
            {
                "id": 780,
                "code": "TT",
                "name": "Trinidad and Tobago"
            },
            {
                "id": 784,
                "code": "AE",
                "name": "United Arab Emirates"
            },
            {
                "id": 788,
                "code": "TN",
                "name": "Tunisia"
            },
            {
                "id": 792,
                "code": "TR",
                "name": "Turkey"
            },
            {
                "id": 795,
                "code": "TM",
                "name": "Turkmenistan"
            },
            {
                "id": 798,
                "code": "TV",
                "name": "Tuvalu"
            },
            {
                "id": 800,
                "code": "UG",
                "name": "Uganda"
            },
            {
                "id": 804,
                "code": "UA",
                "name": "Ukraine"
            },
            {
                "id": 807,
                "code": "MK",
                "name": "Macedonia"
            },
            {
                "id": 818,
                "code": "EG",
                "name": "Egypt"
            },
            {
                "id": 826,
                "code": "GB",
                "name": "United Kingdom"
            },
            {
                "id": 834,
                "code": "TZ",
                "name": "Tanzania"
            },
            {
                "id": 840,
                "code": "US",
                "name": "United States"
            },
            {
                "id": 854,
                "code": "BF",
                "name": "Burkina Faso"
            },
            {
                "id": 858,
                "code": "UY",
                "name": "Uruguay"
            },
            {
                "id": 860,
                "code": "UZ",
                "name": "Uzbekistan"
            },
            {
                "id": 862,
                "code": "VE",
                "name": "Venezuela"
            },
            {
                "id": 882,
                "code": "WS",
                "name": "Samoa"
            },
            {
                "id": 887,
                "code": "YE",
                "name": "Yemen"
            },
            {
                "id": 894,
                "code": "ZM",
                "name": "Zambia"
            }
        ];

        function getCountries() {
            var defer = $q.defer();

            defer.resolve(countries);

            return defer.promise;
        }

        return {
            getCountries: getCountries
        };
    }
})();
