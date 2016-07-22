var app = angular.module('NPRTicker', []);

app.controller('getNews', function($scope, $http, $interval) {
  
    $http.get("http://api.npr.org/query?id=1003&apiKey=MDI0NjcxNjQ2MDE0NjU0NDA0NTE0NDk2Nw000&format=json").then(function(response){
      $scope.news = response.data.list.story;
      $scope.headlines = [];
      $scope.links = [];
      for (item in $scope.news){
        if ($scope.news[item].hasOwnProperty("title")){
          $scope.headlines.push($scope.news[item].title.$text);
          $scope.links.push($scope.news[item].link[0].$text);
        }
        
        $scope.story_index = 0;
        $interval(function(){
          if($scope.story_index >= $scope.headlines.length){
            $scope.story_index = 0;
          }
          else{
            $scope.story_index++;
          }
        }, 3000);
      }  
    });
});