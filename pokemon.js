
var pokedexApp = angular.module('pokedexApp',[]);

pokedexApp.controller('PokedexCtrl', ['$scope', '$http',
    function ($scope, $http){
      $('.pokemon-preloader').addClass("pokemon-preloader--active");
      $http.get('http://pokeapi.co/api/v1/pokemon/?limit=12').success(function(data){
          $scope.pokemons = data;
          $('.pokemon-preloader').removeClass("pokemon-preloader--active");
      });
      $http.get('http://pokeapi.co/api/v1/type/?limit=999').success(function(data){
          $scope.pokemonTypes = data;
      });

    $scope.getInfo = function(id){
      $http.get('http://pokeapi.co/api/v1/pokemon/' + id).success(function(data){
          $scope.pokemonInfo = data;
      });
      $('.pokemon-details').css('display', 'inline-block');
      $('#pokemonPic').attr('src', 'http://pokeapi.co/media/img/'+ id +'.png');
    };

    $scope.loadMorePokemons = function(url){
      $('.btn-more').addClass("btn-more--loader");
      $http.get('http://pokeapi.co/' + url).success(function(data){
          $scope.pokemons.meta = data.meta;
          $scope.pokemons.objects = $scope.pokemons.objects.concat(data.objects);
          $('.btn-more').removeClass("btn-more--loader");
      });

      $scope.loadMoreButton = true;
      $scope.displayPokemons($scope.filterChecked);
    };

    $scope.filterChecked = [];

    $scope.removeInitState = function() {
      var filterObj = $scope.pokemons.objects;
        for (var pokemon in filterObj) {
          filterObj[pokemon].checked = false;
        }
    };

    $scope.returnInitState = function() {
      var filterObj = $scope.pokemons.objects;
      for (var pokemon in filterObj) {
        filterObj[pokemon].checked = true;
      }
    };

    $scope.checkAll = function () {
        $scope.loadMoreButton = true;
        $scope.filterChecked = [];
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
            for (var type in $scope.pokemonTypes.objects) {
              var name = $scope.pokemonTypes.objects[type].name.toLowerCase();
              $scope.filterChecked.push(name);
            }
        } else {
            $scope.selectedAll = false;
            $scope.returnInitState();
        }
        angular.forEach($scope.pokemonTypes.objects , function (type) {
            type.selected = $scope.selectedAll;
        });

        $scope.displayPokemons($scope.filterChecked);
        $scope.loadMoreButton = true;
    };

    $scope.includeTypes = function(type) {
      var name = type.name.toLowerCase();
      var index = $scope.filterChecked.indexOf(name);
      if (type.selected) {
        $scope.filterChecked.push(name);
      } else {
        $scope.filterChecked.splice(index, 1);
      }

      $scope.displayPokemons($scope.filterChecked);
    };

    $scope.displayPokemons = function(checked) {
      $scope.loadMoreButton = false;
      var filterObj = $scope.pokemons.objects;
      for (var pokemon in filterObj) {
        var pokTypes = filterObj[pokemon].types;
        for (var poktype in pokTypes) {
          var index = checked.indexOf(filterObj[pokemon].types[poktype].name);
          if (index !== -1) {
            filterObj[pokemon].checked = true;
            }
          }
        }

        if ($scope.filterChecked.length === 0) {
          $scope.returnInitState();
          $scope.loadMoreButton = true;
        } else if ($scope.filterChecked.length === 20) {
          $scope.loadMoreButton = true;
        }
      };

   }]);
