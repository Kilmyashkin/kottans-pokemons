
var pokedexApp = angular.module('pokedexApp',[]);

pokedexApp.controller('PokedexCtrl', ['$scope', '$http',
    function ($scope, $http){
        $http.get('http://pokeapi.co/api/v1/pokemon/?limit=12').success(function(data){
            $scope.pokemons = data;
            $scope.showAll();
        });

    $scope.getInfo = function(id){
      $http.get('http://pokeapi.co/api/v1/pokemon/' + id).success(function(data){
          $scope.pokemonInfo = data;
      });
      $('#pokemon-details').css('display', 'inline-block');
      $('#pokemonPic').attr('src', 'http://pokeapi.co/media/img/'+ id +'.png');
    };

    $scope.loadMore = function(url){
      $http.get('http://pokeapi.co/' + url).success(function(data){
          $scope.pokemons.meta = data.meta;
          $scope.pokemons.objects = $scope.pokemons.objects.concat(data.objects);
      });
    };

    $scope.showFire = function(){
      var filterObj = $scope.pokemons.objects;

      for (var pokemon in filterObj) {
        if (filterObj[pokemon].types[0].name === "fire") {
          filterObj[pokemon].visibility = true;
        } else {
          filterObj[pokemon].visibility = false;

        }
      }

    };
    $scope.showAll= function(){
      var filterObj = $scope.pokemons.objects;

      for (var pokemon in filterObj) {
        filterObj[pokemon].visibility = true;
      }
    };
   }]);
