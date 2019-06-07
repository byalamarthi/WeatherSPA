(function () {

    angular
        .module('WeatherApp', [])
        .controller('main', ['weatherService',
            function (weatherService) {

                var vm = this;
                vm.Search = function () {

                    weatherService.GetWeather(vm.query)
                        .then(function (response) {
                            var date = new Date();
                            var dt = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

                            var date2 = new Date(new Date().setDate(date.getDate() + 1));
                            //date2 = date2.setDate(date2.getDate() + 1);
                            var date3 = new Date(new Date().setDate(date.getDate() + 2));
                            var date4 = new Date(new Date().setDate(date.getDate() + 3));
                            var date2format = date2.getFullYear() + '-' + ('0' + (date2.getMonth() + 1)).slice(-2) + '-' + ('0' + date2.getDate()).slice(-2);
                            var date3format = date3.getFullYear() + '-' + ('0' + (date3.getMonth() + 1)).slice(-2) + '-' + ('0' + date3.getDate()).slice(-2);
                            var date4format = date4.getFullYear() + '-' + ('0' + (date4.getMonth() + 1)).slice(-2) + '-' + ('0' + date4.getDate()).slice(-2);
                            vm.date2format = date2format;
                            vm.date3format = date3format;
                            vm.date4format = date4format;
                            vm.dayone = [{
                                'Time': '00:00:00',
                                'Temperatures': "",
                                'Main': "",
                                'Description':""
                            }, {
                                'Time': '03:00:00',
                                    'Temperatures': "",
                                    'Main': "",
                                    'Description': ""
                            }, {
                                'Time': '06:00:00',
                                    'Temperatures': "",
                                    'Main': "",
                                    'Description': ""
                            }, {
                                'Time': '09:00:00',
                                    'Temperatures': "",
                                    'Main': "",
                                    'Description': ""
                            }, {
                                'Time': '12:00:00',
                                    'Temperatures': "",
                                    'Main': "",
                                    'Description': ""
                            }, {
                                'Time': '15:00:00',
                                    'Temperatures': "",
                                    'Main': "",
                                    'Description': ""
                            }, {
                                'Time': '18:00:00',
                                    'Temperatures': "",
                                    'Main': "",
                                    'Description': ""
                            }, {
                                'Time': '21:00:00',
                                    'Temperatures': "",
                                    'Main': "",
                                    'Description': ""
                            }];
                            vm.daytwo = [];
                            vm.daythree = [];
                            vm.dayfour = [];
                            vm.City = response.data.city.name;
                            vm.Currenttemp = GetTemperatures(response.data.list[0].main);
                            
                            angular.forEach(response.data.list, function (val, key) {

                                var weatherdate = val.dt_txt.substring(0, 10);
                                var weatherTime = val.dt_txt.substring(11, 19);

                                
                                if (dt == weatherdate) {
                                    angular.forEach(vm.dayone, function (v, k) {
                                        
                                        if (v.Time == weatherTime) {
                                            v.Temperatures = GetTemperatures(val.main);
                                            v.Main = val.weather[0].main;
                                            v.Description = val.weather[0].description;
                                        }
                                        else if (v.Temperatures == "") {
                                            v.Temperatures = "n/a";
                                        }
                                    })

                                    
                                }
                                if (date2format == weatherdate) {

                                    vm.daytwo.push({
                                        'Date': val.dt_txt.substring(0, 10),
                                        'Time': val.dt_txt.substring(11, 19),
                                        'weather': val.weather[0].main,
                                        'Description': val.weather[0].description,

                                        'Temperatures': GetTemperatures(val.main)
                                    })
                                }
                                if (date3format == weatherdate) {
                                    vm.daythree.push({
                                        'Date': val.dt_txt.substring(0, 10),
                                        'Time': val.dt_txt.substring(11, 19),
                                        'weather': val.weather[0].main,
                                        'Description': val.weather[0].description,

                                        'Temperatures': GetTemperatures(val.main)
                                    })
                                }
                                if (date4format == weatherdate) {
                                    vm.dayfour.push({
                                        'Date': val.dt_txt.substring(0, 10),
                                        'Time': val.dt_txt.substring(11, 19),
                                        'weather': val.weather[0].main,
                                        'Description': val.weather[0].description,

                                        'Temperatures': GetTemperatures(val.main)
                                    })
                                }
                                //val.dt_txt;
                            });

                            vm.ValidDataLoaded = true;

                        })

                        .catch(function (message) {

                            vm.error = message;
                            vm.ValidDataLoaded = false;

                        });

                }; 
            }
        ]); 

    var GetTemperatures = function GetTemperatures(temps) {
        return [{
            "Units": "Farenheit",
            "Current": GetFarenheit(temps.temp) ,

        }];
    }; 

    var GetFarenheit = function GetFarenheit(temp) {
        return ((temp - 273) * (9 / 5)) + 32 ;
    }; 

    

}()); 