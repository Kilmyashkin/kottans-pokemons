
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
    $scope.countChecked = 0;
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

    };

    // $scope.checkAll = function() {
    //   $("input[type='checkbox']").each(function(){
    //     $(this).prop("checked", true).change();
    //   });
    //
    //   $scope.filterChecked = [];
    //
    //   for (var type in $scope.pokemonTypes.objects) {
    //     var name = $scope.pokemonTypes.objects[type].name.toLowerCase();
    //     $scope.filterChecked.push(name);
    //   }
    //
    //   $scope.displayPokemons($scope.filterChecked);
    // };

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
      var filterObj = $scope.pokemons.objects;
      for (var pokemon in filterObj) {
        var pokTypes = filterObj[pokemon].types;
        for (var poktype in pokTypes) {
          var index = checked.indexOf(filterObj[pokemon].types[poktype].name);
          console.log(filterObj[pokemon].types[poktype].name);
          console.log(checked);
          if (index !== -1) {
            filterObj[pokemon].checked = true;
            }
          }
        }

        if ($scope.filterChecked.length === 0) {
          $scope.returnInitState();
        }
      };

      // var filterObj = $scope.pokemons.objects;
      // for (var pokemon in filterObj) {
      //   var pokTypes = filterObj[pokemon].types;
      //     for (var poktype in pokTypes) {
      //       if (filterObj[pokemon].types[poktype].name === type.name.toLowerCase() && type.checked) {
      //         filterObj[pokemon].checked = true;
      //         break;
      //       } else if (filterObj[pokemon].types[0].name === type.name.toLowerCase() && !type.checked){
      //         filterObj[pokemon].checked = false;
      //       }
      //     }
      // }
      // if (type.checked) {
      //   $scope.countChecked++;
      // } else {
      //   $scope.countChecked--;
      //   if ($scope.countChecked === 0) {
      //     $scope.returnInitState();
      //   }
      // }
    // };

   }]);
