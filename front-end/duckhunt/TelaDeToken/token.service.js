angular.module('duckHunt').factory('tokenService', ['$', '$rootScope',
  function($, $rootScope){
    var proxy;
    var connection;
    return {
        connect: function () {
            var self = this;

            connection = $.hubConnection('http://192.168.0.13:8080/signalr');
            proxy = connection.createHubProxy('HubMessage');
            connection.start().done(function() {
                console.log("Conectado")
            });
        },

        sendToken: function (token) {
                proxy.invoke('SendToken', token);
        }
}])
