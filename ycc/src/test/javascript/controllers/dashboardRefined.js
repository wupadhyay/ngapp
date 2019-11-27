var cobrandIdentifier = '10000004';
describe('The dashboard refined tests', function() {
	
    var $scope, factory,applicationServiceMock, $q_var,httpBackend,dashboardController,obj
    beforeEach(module('YodleeCustomerCare'));
    beforeEach(module('Controllers'));
    beforeEach(module('Services'));
     
   //include previous module containing mocked service which will override actual service, because it's declared later
     beforeEach(module('Path')); 
     beforeEach(inject(function($controller, $rootScope,$http,$q,ApplicationService,$httpBackend,$injector) {
      
       
       $scope = $rootScope.$new();
       $q_var=$q;
        applicationServiceMock= ApplicationService;
        httpBackend = $injector.get('$httpBackend');
       dashboardController= $controller('DashboardController', {
         '$scope': $scope
       
       });
     }));

     beforeEach(function()
    {
         obj ={  
   "refreshStats":{  
      "refreshType":"REFRESH",
      "groupBy":"COBRAND",
      "info":[  
         {  
            "summary":{  
               "totalVolume":"488661",
               "success":{  
                  "volume":"461026.0",
                  "rate":"94.34"
               },
               "failure":[  
                  {  
                     "volume":"6783",
                     "rate":"1.39",
                     "type":"TECHNICAL"
                  },
                  {  
                     "volume":"7552",
                     "rate":"1.55",
                     "type":"SITE"
                  },
                  {  
                     "volume":"13298",
                     "rate":"2.72",
                     "type":"USERACTIONREQUIRED"
                  }
               ],
               "latency":{  
                  "min":"0.0",
                  "avg":"19.35",
                  "max":"3601.43",
                  "breakups":[  
                     {  
                        "volume":"355932",
                        "rate":"72.84",
                        "range":"0_TO_20_SECS"
                     },
                     {  
                        "volume":"55131",
                        "rate":"11.28",
                        "range":"20_TO_40_SECS"
                     },
                     {  
                        "volume":"33189",
                        "rate":"6.79",
                        "range":"40_TO_60_SECS"
                     },
                     {  
                        "volume":"18539",
                        "rate":"3.79",
                        "range":"60_TO_80_SECS"
                     },
                     {  
                        "volume":"10478",
                        "rate":"2.14",
                        "range":"80_TO_100_SECS"
                     },
                     {  
                        "volume":"15392",
                        "rate":"3.15",
                        "range":"GRT_THAN_100_SECS"
                     }
                  ]
               }
            },
            "name":"restserver_BAC",
            "details":[  
               {  
                  "date":"2018/02/15",
                  "summary":{  
                     "totalVolume":"292095",
                     "success":{  
                        "volume":"273117",
                        "rate":"93.5"
                     },
                     "failure":[  
                        {  
                           "volume":"4619",
                           "rate":"1.58",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"5030",
                           "rate":"1.72",
                           "type":"SITE"
                        },
                        {  
                           "volume":"9325",
                           "rate":"3.19",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"18.59",
                        "max":"3601.43",
                        "breakups":[  
                           {  
                              "volume":"215072",
                              "rate":"73.63",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"34075",
                              "rate":"11.67",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"18604",
                              "rate":"6.37",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"10294",
                              "rate":"3.52",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"5803",
                              "rate":"1.99",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"8247",
                              "rate":"2.82",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/14",
                  "summary":{  
                     "totalVolume":"670779",
                     "success":{  
                        "volume":"640620",
                        "rate":"95.5"
                     },
                     "failure":[  
                        {  
                           "volume":"7139",
                           "rate":"1.06",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"8046",
                           "rate":"1.2",
                           "type":"SITE"
                        },
                        {  
                           "volume":"14969",
                           "rate":"2.23",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"16.79",
                        "max":"3601.27",
                        "breakups":[  
                           {  
                              "volume":"514707",
                              "rate":"76.73",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"66438",
                              "rate":"9.9",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"38859",
                              "rate":"5.79",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"20515",
                              "rate":"3.06",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"12205",
                              "rate":"1.82",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"18055",
                              "rate":"2.69",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/13",
                  "summary":{  
                     "totalVolume":"716377",
                     "success":{  
                        "volume":"681417",
                        "rate":"95.12"
                     },
                     "failure":[  
                        {  
                           "volume":"7867",
                           "rate":"1.1",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"12724",
                           "rate":"1.78",
                           "type":"SITE"
                        },
                        {  
                           "volume":"14352",
                           "rate":"2.0",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"16.28",
                        "max":"3603.53",
                        "breakups":[  
                           {  
                              "volume":"554563",
                              "rate":"77.41",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"68811",
                              "rate":"9.61",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"40076",
                              "rate":"5.59",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"21587",
                              "rate":"3.01",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"12950",
                              "rate":"1.81",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"18390",
                              "rate":"2.57",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/12",
                  "summary":{  
                     "totalVolume":"744743",
                     "success":{  
                        "volume":"705195",
                        "rate":"94.69"
                     },
                     "failure":[  
                        {  
                           "volume":"8900",
                           "rate":"1.2",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"14226",
                           "rate":"1.91",
                           "type":"SITE"
                        },
                        {  
                           "volume":"16397",
                           "rate":"2.2",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"17.55",
                        "max":"3600.68",
                        "breakups":[  
                           {  
                              "volume":"558069",
                              "rate":"74.93",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"79533",
                              "rate":"10.68",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"46084",
                              "rate":"6.19",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"25217",
                              "rate":"3.39",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"14832",
                              "rate":"1.99",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"21008",
                              "rate":"2.82",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/11",
                  "summary":{  
                     "totalVolume":"409904",
                     "success":{  
                        "volume":"389450",
                        "rate":"95.01"
                     },
                     "failure":[  
                        {  
                           "volume":"5345",
                           "rate":"1.3",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"6995",
                           "rate":"1.71",
                           "type":"SITE"
                        },
                        {  
                           "volume":"8106",
                           "rate":"1.98",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"17.21",
                        "max":"3600.48",
                        "breakups":[  
                           {  
                              "volume":"308139",
                              "rate":"75.17",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"43898",
                              "rate":"10.71",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"25457",
                              "rate":"6.21",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"13514",
                              "rate":"3.3",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"8171",
                              "rate":"1.99",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"10725",
                              "rate":"2.62",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/10",
                  "summary":{  
                     "totalVolume":"462243",
                     "success":{  
                        "volume":"421899",
                        "rate":"91.27"
                     },
                     "failure":[  
                        {  
                           "volume":"8350",
                           "rate":"1.81",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"19036",
                           "rate":"4.12",
                           "type":"SITE"
                        },
                        {  
                           "volume":"12958",
                           "rate":"2.8",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"21.81",
                        "max":"3601.10",
                        "breakups":[  
                           {  
                              "volume":"321067",
                              "rate":"69.46",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"59067",
                              "rate":"12.78",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"34158",
                              "rate":"7.39",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"18231",
                              "rate":"3.94",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"11308",
                              "rate":"2.45",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"18412",
                              "rate":"3.98",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/09",
                  "summary":{  
                     "totalVolume":"639863",
                     "success":{  
                        "volume":"603380",
                        "rate":"94.3"
                     },
                     "failure":[  
                        {  
                           "volume":"9099",
                           "rate":"1.42",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"12355",
                           "rate":"1.93",
                           "type":"SITE"
                        },
                        {  
                           "volume":"15027",
                           "rate":"2.35",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"16.02",
                        "max":"3600.59",
                        "breakups":[  
                           {  
                              "volume":"491777",
                              "rate":"76.86",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"69069",
                              "rate":"10.79",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"35282",
                              "rate":"5.51",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"18124",
                              "rate":"2.83",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"9950",
                              "rate":"1.56",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"15661",
                              "rate":"2.45",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/08",
                  "summary":{  
                     "totalVolume":"647660",
                     "success":{  
                        "volume":"607304",
                        "rate":"93.77"
                     },
                     "failure":[  
                        {  
                           "volume":"10355",
                           "rate":"1.6",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"14829",
                           "rate":"2.29",
                           "type":"SITE"
                        },
                        {  
                           "volume":"15167",
                           "rate":"2.34",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"15.73",
                        "max":"3600.50",
                        "breakups":[  
                           {  
                              "volume":"498872",
                              "rate":"77.03",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"70232",
                              "rate":"10.84",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"35563",
                              "rate":"5.49",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"17981",
                              "rate":"2.78",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"9752",
                              "rate":"1.51",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"15260",
                              "rate":"2.36",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/07",
                  "summary":{  
                     "totalVolume":"679166",
                     "success":{  
                        "volume":"633298",
                        "rate":"93.25"
                     },
                     "failure":[  
                        {  
                           "volume":"8206",
                           "rate":"1.21",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"21081",
                           "rate":"3.1",
                           "type":"SITE"
                        },
                        {  
                           "volume":"16575",
                           "rate":"2.44",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"15.84",
                        "max":"3601.31",
                        "breakups":[  
                           {  
                              "volume":"521700",
                              "rate":"76.81",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"74639",
                              "rate":"10.99",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"37389",
                              "rate":"5.51",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"19232",
                              "rate":"2.83",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"10217",
                              "rate":"1.5",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"15989",
                              "rate":"2.35",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/06",
                  "summary":{  
                     "totalVolume":"724147",
                     "success":{  
                        "volume":"678315",
                        "rate":"93.67"
                     },
                     "failure":[  
                        {  
                           "volume":"9256",
                           "rate":"1.28",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"21035",
                           "rate":"2.9",
                           "type":"SITE"
                        },
                        {  
                           "volume":"15530",
                           "rate":"2.14",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"15.68",
                        "max":"3600.27",
                        "breakups":[  
                           {  
                              "volume":"562020",
                              "rate":"77.61",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"72245",
                              "rate":"9.98",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"40382",
                              "rate":"5.58",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"21038",
                              "rate":"2.91",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"11535",
                              "rate":"1.59",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"16927",
                              "rate":"2.34",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/05",
                  "summary":{  
                     "totalVolume":"743364",
                     "success":{  
                        "volume":"700943",
                        "rate":"94.29"
                     },
                     "failure":[  
                        {  
                           "volume":"8584",
                           "rate":"1.15",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"16925",
                           "rate":"2.28",
                           "type":"SITE"
                        },
                        {  
                           "volume":"16886",
                           "rate":"2.27",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"17.23",
                        "max":"3601.15",
                        "breakups":[  
                           {  
                              "volume":"559089",
                              "rate":"75.21",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"80507",
                              "rate":"10.83",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"46058",
                              "rate":"6.2",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"23954",
                              "rate":"3.22",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"13417",
                              "rate":"1.8",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"20339",
                              "rate":"2.74",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/04",
                  "summary":{  
                     "totalVolume":"396473",
                     "success":{  
                        "volume":"379708",
                        "rate":"95.77"
                     },
                     "failure":[  
                        {  
                           "volume":"3778",
                           "rate":"0.95",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"5438",
                           "rate":"1.37",
                           "type":"SITE"
                        },
                        {  
                           "volume":"7542",
                           "rate":"1.9",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"14.99",
                        "max":"3601.06",
                        "breakups":[  
                           {  
                              "volume":"307519",
                              "rate":"77.56",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"40673",
                              "rate":"10.26",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"23177",
                              "rate":"5.85",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"11444",
                              "rate":"2.89",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"6367",
                              "rate":"1.61",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"7293",
                              "rate":"1.84",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/03",
                  "summary":{  
                     "totalVolume":"428137",
                     "success":{  
                        "volume":"396678",
                        "rate":"92.65"
                     },
                     "failure":[  
                        {  
                           "volume":"6356",
                           "rate":"1.48",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"11526",
                           "rate":"2.69",
                           "type":"SITE"
                        },
                        {  
                           "volume":"13577",
                           "rate":"3.17",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"20.28",
                        "max":"3600.78",
                        "breakups":[  
                           {  
                              "volume":"298323",
                              "rate":"69.68",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"61190",
                              "rate":"14.29",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"32249",
                              "rate":"7.53",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"15250",
                              "rate":"3.56",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"7877",
                              "rate":"1.84",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"13248",
                              "rate":"3.09",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               },
               {  
                  "date":"2018/02/02",
                  "summary":{  
                     "totalVolume":"637122",
                     "success":{  
                        "volume":"600919",
                        "rate":"94.32"
                     },
                     "failure":[  
                        {  
                           "volume":"7814",
                           "rate":"1.23",
                           "type":"TECHNICAL"
                        },
                        {  
                           "volume":"12849",
                           "rate":"2.02",
                           "type":"SITE"
                        },
                        {  
                           "volume":"15537",
                           "rate":"2.44",
                           "type":"USERACTIONREQUIRED"
                        }
                     ],
                     "latency":{  
                        "min":"0.00",
                        "avg":"15.22",
                        "max":"3600.71",
                        "breakups":[  
                           {  
                              "volume":"496872",
                              "rate":"77.99",
                              "range":"0_TO_20_SECS"
                           },
                           {  
                              "volume":"69043",
                              "rate":"10.84",
                              "range":"20_TO_40_SECS"
                           },
                           {  
                              "volume":"31967",
                              "rate":"5.02",
                              "range":"40_TO_60_SECS"
                           },
                           {  
                              "volume":"15682",
                              "rate":"2.46",
                              "range":"60_TO_80_SECS"
                           },
                           {  
                              "volume":"8638",
                              "rate":"1.36",
                              "range":"80_TO_100_SECS"
                           },
                           {  
                              "volume":"14920",
                              "rate":"2.34",
                              "range":"GRT_THAN_100_SECS"
                           }
                        ]
                     }
                  }
               }
            ],
            "id":"10001372",
            "lastModified":"2018-02-16T04:00:00Z"
         }
      ]
   }
};
    });
   
     it('should initilize dahboard',function()
     {
         $scope.staticLabels={};
         $scope.staticLabels.historicLabel="hh";
         
      
        //    httpBackend.expect('GET','resources/appLabels.properties').respond(200,
        //    {
        //     "dashboard_Label":"Dashboard",
        //      "cobrand_Label":"Cobrand",
        //      "download_Label":"Download",
        //       "print_Label":"Print",
        //       "more_Label":"More",
        //      "system_up_time":"System Up Time"
        //    }
        // );
       

        //  httpBackend.expect('POST', 'ycc/base/userType').respond(200,
        // {
        //                 "cobrandInfo": {
        //                     "cobrandId": 10000004,
        //                     "cobrandStatusId": 1,
        //                     "name": "Yodlee",
        //                     "created": 0,
        //                     "lastUpdated": 0,
        //                     "isCacherunDisabled": false,
        //                     "isChannel": false,
        //                     "isYodlee": false,
        //                     "iavEnabled": true,
        //                     "slmrEnabled": true,
        //                     "balanceRefreshEnabled": false,
        //                     "iavCacheRefreshEnabled": false
        //                 }
        //             }

        //         );

     
      

   console.log("type of"+typeof JSON.stringify (obj));
    
       //var str= JSON.stringify(obj);
      // console.log("JSON string"+str);
      // console.log("again ..."+JSON.stringify(str));
      // var a1=JSON.parse(JSON.stringify(str));
      // console.log("a1"+a1.refreshStats.info);
      // console.log("found type"+typeof str);
         httpBackend.expect('POST','ycc/cd/cobRefreshStats').respond(200,JSON.stringify(obj));
         
     
    
        //  httpBackend.expect('POST','ycc/cd/cobRefreshStats').respond(200,
        //   "");

        //  httpBackend.expect('POST','ycc/cd/cobRefreshStats').respond(200,
        //  {
        //      "data" :
        //      {
        //          "data1":"data1",
        //          "data2":"data2"
        //      }
        //  }); 
       
                console.log(dashboardController);
                console.log("sss"+$scope);
        //         spyOn($scope,
        //         'getOverallCommonStatistics').and.callFake(function()
        //     {
        //          console.log("called fake method..");      
        //     });
               
            spyOn($scope,
        'topVolumeSiteStats').and.callFake(
            function()
            {
                console.log("called fake top volume statas");
            }
        );

         spyOn($scope,
        'topFailureSitesStats').and.callFake(
            function()
            {
                console.log("called fake top faoilure  statas");
            }
        );
        // spyOn($scope,
        //     '').and.callFake(
        //         function()
        //         {
        //             console.log("called fake top faoilure  statas");
        //         }
        //     );
    


              
               $scope.refreshStats();
               spyOn($scope,
              'dataRenderForOverAllRefreshStats').and.callFake(
                  function()
                  {
                      console.log("called fake");
                  }
              );
         

             spyOn($scope,
              'dataRenderedHistoricStatsGraph').and.callFake(
                  function()
                  {
                      console.log("called fake");
                  }
              );

             console.log("calling flush");
              
                //$scope.initDashboard();
               // httpBackend.verifyNoOutstandingRequest ();
                httpBackend.flush();
               
                console.log("here... initDashboard");
                //$scope.$digest();
                expect(	$scope.selectedHistoricLatencyTrendTimeSlot).toBe("P15D");

               

           

           
     });
     
     it('call data init properly',function(){

    $scope.staticLabels={};
     $scope.staticLabels.error_code="errorCode";
    console.log("data overall refereh");
     $scope.dataRenderForOverAllRefreshStats(obj,"IAV");
     console.log("infor val"+$scope.overall_uar);

     expect($scope.show).toBe(true);

     });
  
        
   
      
   });