
var pokedexApp = angular.module('pokedexApp',[]);

pokedexApp.controller('PokedexCtrl', ['$scope', '$http',
    function ($scope, $http){
      $('.pokedex__preloader').addClass("pokedex__preloader--active");
      $('.pokedex').addClass("pokedex--hide-filter pokedex--hide-pokemons");
      $http.get('http://pokeapi.co/api/v1/type/?limit=999').success(function(data){
          $scope.pokemonTypes = data;
          $('.pokedex').removeClass("pokedex--hide-pokemons");
      });
      $http.get('http://pokeapi.co/api/v1/pokemon/?limit=12').success(function(data){
          $scope.pokemons = data;
          $('.pokedex__preloader').removeClass("pokedex__preloader--active");
          $('.pokedex').removeClass("pokedex--hide-filter");
      });

    $scope.getInfo = function(id, $event){
      $pokemon = $($event.target).closest('.pokemon');

      $pokemon.find('.pokemon__spinner').addClass("pokemon__spinner--active");
      $pokemon.find('.pokemon__wrapper').addClass("pokemon__wrapper--inactive");

      $http.get('http://pokeapi.co/api/v1/pokemon/' + id).success(function(data){
          $scope.pokemonInfo = data;
          $('.pokemon__spinner').removeClass("pokemon__spinner--active");
          $('.pokemon__wrapper').removeClass("pokemon__wrapper--inactive");
          $('.pokemon-details').css('display', 'inline-block');
          $('body').css({'position': 'fixed','overflow': 'scroll'});
          $('#pokemonPic').attr('src', 'http://pokeapi.co/media/img/'+ id +'.png');
      });
    };

    $scope.loadMorePokemons = function(url){
      $('.btn-more__spinner').addClass("btn-more__spinner--active");
      $('.btn-more').addClass("btn-more--inactive");
      $http.get('http://pokeapi.co/' + url).success(function(data){
          $scope.pokemons.meta = data.meta;
          $scope.pokemons.objects = $scope.pokemons.objects.concat(data.objects);
          $('.btn-more__spinner').removeClass("btn-more__spinner--active");
          $('.btn-more').removeClass("btn-more--inactive");
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

        $scope.selectedAll = false;
        $scope.returnInitState();
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

$(document).on("mousedown","#pokemon-details",function() {
  closePopup(event);
});

function closePopup(event) {
   event.preventDefault();
   if ( $(event.target).hasClass('pokemon-details') || $(event.target).hasClass('pokemon-details__cross')) {
     $('.pokemon-details').fadeOut(300);
     $('body').css('position', 'static');
   }
 }
