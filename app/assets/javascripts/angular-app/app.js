var app = angular.module('app', []);

app.controller('appCtrl', function ($scope, $http) {
  var regex = new RegExp("[^aeiouy]*[aeiouy]+[^aeiouy]*");
  var suffixes;
  var euro = "";
  var bis = "";
  var name = "";
  getSuffixes();
  $http({
    method: 'GET',
    url: 'categories/'
  }).then(function successCallback(response) {
      $scope.resp = response.data;
    }, function errorCallback(response) {
      console.log(response);
  });
  function getSuffixes() {
    $http({
    method: 'GET',
    url: 'suffixes',
  }).then(function successCallback(response) {
      suffixes = response.data;
    }, function errorCallback(response) {
      console.log(response.data);
      return false;
  });
  
  }
  $scope.confirm = function() {
    if(!$scope.form) {
      alert("Wybierz branżę!");
      return false;
    }
    $http({
    method: 'GET',
    url: 'prefix',
    params: {cat_id: $scope.form.type}
  }).then(function successCallback(response) {
      var suffixItem = Math.floor((Math.random() * suffixes.length));
      var suffix = suffixes[suffixItem].text;
      var item = Math.floor((Math.random() * response.data.length));
      var main = response.data[item].text;
      if($scope.form.euro) {
        euro = "euro";
      }
      if($scope.form.bis) {
        bis = "-bis";
      }
      if($scope.form.tripart) {
        name = regex.exec($scope.form.name);
      }
      var regexPref = new RegExp(".*[aeiouy]$");
      var regexSuf = new RegExp("^[aeiouy]");
      if((regexPref.test(main)) && (regexSuf.test(name)))
        {
          main = main.slice(0, -1);
        }
      if((regexPref.test(name)) && (regexSuf.test(suffix)))
        {
          suffix = suffix.slice(1);
        }
      $scope.yourNazwex = "Twój Nazwex: "+euro+main+name+suffix+bis;
    }, function errorCallback(response) {
      console.log(response.data);
  });
  };
});