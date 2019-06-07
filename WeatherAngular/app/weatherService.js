(function() {

  var module = angular
    .module('WeatherApp')
    
    
      .constant('appId', '9812ed94ac3eb3b7493a2c2d3e8c5d3a')
    .factory("weatherService", ['$http', '$log', '$q', 'appId',
    

      function weatherService($http, $log, $q, appId) {

        var getWeather = function getWeather(zipCode) {

            $log.info("Retrieving weather for " + zipCode);

            return $http.get('https://api.openweathermap.org/data/2.5/forecast?zip=' + zipCode + '&appid=' + appId)
          
            
        }; 
        return {
          GetWeather: getWeather
        };
        
      } // End weatherService()
    ]);

  
  
  


}());