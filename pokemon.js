
var pokedexApp = angular.module('pokedexApp',[]);

pokedexApp.controller('PokedexCtrl', ['$scope', '$http',
    function ($scope, $http){
        $http.get('http://pokeapi.co/api/v1/pokemon/?limit=12').success(function(data){
            $scope.pokemons = data;
        });
        $http.get('http://pokeapi.co/api/v1/type/?limit=999').success(function(data){
            $scope.pokemonTypes = data;
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
      $scope.removeInitState = true;

      // var filterObj = $scope.pokemons.objects;
      // alert("ola");
      //
      // for (var pokemon in filterObj) {
      //   if (!filterObj[pokemon].checked) {
      //     filterObj[pokemon].checked = true;
      //   } else {
      //     filterObj[pokemon].checked = false;
      //   }
      // }
    };

    // $scope.checkFilterType = function() {
    //   var filterChecked = [];
    //   var filterUnchecked = [];
    //
    //   $("input[type='checkbox']").each(function(){
    //     var name = $(this).attr('name').toLowerCase();
    //     var isChecked = $(this).is(":checked");
    //     if (isChecked) {
    //       filterChecked.push(name);
    //     } else {
    //       filterUnchecked.push(name);
    //     }
    //   });
    //
    //   displayPokemons(filterChecked, filterUnchecked);
    // };
    //
    // var displayPokemons = function(checked, unchecked) {
    //   var filterObj = $scope.pokemons.objects;
    //   checked.forEach(function(type) {
    //     for (var pokemon in filterObj) {
    //       var pokTypes = filterObj[pokemon].types;
    //       for (var poktype in pokTypes) {
    //         if (filterObj[pokemon].types[poktype].name === type){
    //           filterObj[pokemon].checked = true;
    //         }
    //       }
    //     }
    //   });
      // unchecked.forEach(function(type) {
      //   for (var pokemon in filterObj) {
      //     var pokTypes = filterObj[pokemon].types;
      //     for (var poktype in pokTypes) {
      //       if (filterObj[pokemon].types[poktype].name === type && !filterObj[pokemon].alreadyChecked){
      //         filterObj[pokemon].checked = false;
      //       }
      //     }
      //   }
      // });
    // };

    $scope.removeInitState = function() {
      var filterObj = $scope.pokemons.objects;

      for (var pokemon in filterObj) {
        filterObj[pokemon].checked = false;
      }

      $scope.removeInitState = false;
    };

    $scope.returnInitState = function() {
      var filterObj = $scope.pokemons.objects;
      for (var pokemon in filterObj) {
        filterObj[pokemon].checked = true;
      }

      $scope.removeInitState = true;
    };

    $scope.countChecked = 0;

    $scope.includeTypes = function(type) {
      var filterObj = $scope.pokemons.objects;
      for (var pokemon in filterObj) {
        if (filterObj[pokemon].types[0].name === type.name.toLowerCase() && type.checked) {
          filterObj[pokemon].checked = true;
        } else if (filterObj[pokemon].types[0].name === type.name.toLowerCase() && !type.checked){
          filterObj[pokemon].checked = false;
        }
      }
      if (type.checked) {
        $scope.countChecked++;
        console.log($scope.countChecked);
      } else {
        $scope.countChecked--;
        console.log($scope.countChecked);
        if ($scope.countChecked === 0) {
          $scope.returnInitState();
        }
      }
    };

   }]);
