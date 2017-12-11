angular.module('duckHunt').factory('duckService', ['$', '$rootScope',
function ($, $rootScope) {
    var proxy;
    var connection;
    return {
        connect: function () {
            var self = this;

            connection = $.hubConnection('http://192.168.15.179:8080/signalr');

            proxy = connection.createHubProxy('HubMessage');
            connection.start().done(function() {
                console.log("Conectado")
            });
            proxy.on('messageAdded', function (bolaGamma, bolaAlpha,tiros) {
                $rootScope.$broadcast('messageAdded', bolaGamma, bolaAlpha,tiros);
            });
            proxy.on('atirou', function (atirou) {
                $rootScope.$broadcast('atirou', atirou);
            });
            proxy.on('pato1', function (pato1) {
                $rootScope.$broadcast('pato1', pato1);
            });
            proxy.on('pato2', function (pato2) {
                $rootScope.$broadcast('pato2', pato2);
            });
        },
        isConnecting: function () {
            return connection.state === 0;
        },
        isConnected: function () {
            return connection.state === 1;
        },
        connectionState: function () {
            return connection.state;
        },
        sendMessage: function (bolaGamma, bolaAlpha) {
            if(this.isConnected()) {
                proxy.invoke('SendMessage', bolaGamma, bolaAlpha).Result;
            }
        },
        atirar: function (){
            if(this.isConnected()){
                proxy.invoke('Atirar');
            }
        },
        rodaPatosMiniRound: function (){
            if(this.isConnected()){
                proxy.invoke('RodaPatosMiniRound').Result;
            }
        },
    }
}]);
