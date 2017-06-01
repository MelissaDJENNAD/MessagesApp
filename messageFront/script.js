var monApi = "http://localhost:1337/messages"
var application = angular.module('application',['angularMoment']);
application.run(function(amMoment) {
  amMoment.changeLocale('fr');
});
application.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;

}]);

application.controller('monController', ['$scope', '$http', function($scope, $http) {


function refreshMessages(){
  $http.get(monApi).then( function(response){
    $scope.messages = response.data ;
    // console.log(response.data)
  });

} ;
$scope.user={};
$scope.user.email = "Mélissa@Mélissa.com" ;
$scope.user.password ="MélissaDJENNAD";
refreshMessages() ;

  $scope.ajouterMessage = function(){
    // console.log($scope.newMessage);
    $http.post(monApi, $scope.newMessage, autorisationHeaders).then(function(response){
    refreshMessages() ;
    }) ;
  };


  $scope.editMessage = function(message){
    $scope.modifMessage = JSON.parse(JSON.stringify(message));

  };

  $scope.miseAJourMessage = function(){
    $http.put(monApi+"/"+$scope.modifMessage.id, $scope.modifMessage, autorisationHeaders).then(function(response){
      refreshMessages() ;
    }) ;

  } ;
  $scope.supprimerMessage = function(){
    $http.delete(monApi+"/"+$scope.modifMessage.id, $scope.modifMessage, autorisationHeaders).then(function(response){
    refreshMessages() ;
    });
  };
  $scope.afficheLogSelect = function (messages){
    var elementsSelect = [];
    messages.forEach(function(item){
      if(item.select == true){
        elementsSelect.push(item);
      } ;
    }) ;
    elementsSelect.forEach(function(item,index, array){
      $http.delete(monApi+"/"+item.id, autorisationHeaders).then(function(response){
        console.log("messages supprimés :"+ response.data.id)
      refreshMessages() ;
      }) ;
    }) ;
  } ;

$scope.allSelect = function (){
  if ($scope.selectAll == true) {
    $scope.messages.forEach(function(item){
      item.select = true ;
    })
  } else {
    $scope.messages.forEach(function(item){
      item.select = false ;
    })
  } ;

} ;





////////////////////////////////////////////
// PARTI USERS
///////////////////////////////////////////

var urlPourInscription = 'http://localhost:1337/auth/login' ;
// var autorisationHeaders = {headers: {'access_token': $scope.token}} ;

$scope.inscription = function (){
console.log($scope.user);
$http.post(urlPourInscription, $scope.user).then(function(response){
 console.log(response);})
} ;

$scope.connexion = function (){
  $http.post('http://localhost:1337/user/jwt', $scope.user).then(function(response){
$scope.token= response.data.token ;
   autorisationHeaders = {headers: {'access_token': $scope.token}};
 })
}



}]);
