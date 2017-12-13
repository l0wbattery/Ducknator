angular.module('duckHunt').factory('duckService', ['$', '$rootScope',
function ($, $rootScope) {
    var token;
    var proxy;
    var connection;
    return {
        connect: function () {
            var self = this;

            connection = $.hubConnection('http://192.168.0.100:8080/signalr');


            proxy = connection.createHubProxy('HubMessage');
            connection.start().done(function() {
                console.log(proxy);
            });
            proxy.on('messageAdded', function (bolaGamma, bolaAlpha,tiros) {
                $rootScope.$broadcast('messageAdded', bolaGamma, bolaAlpha,tiros);
            });
            proxy.on('atirou', function (atirou) {
                $rootScope.$broadcast('atirou', atirou);
            });
            proxy.on('patos', function (patos) {
                $rootScope.$broadcast('patos', patos);
            });
            proxy.on('pato1vivo', function (morto1) {
                $rootScope.$broadcast('pato1vivo', morto1);
            });
            proxy.on('pato2vivo', function (morto2) {
                $rootScope.$broadcast('pato2vivo', morto2);
            });
            proxy.on('pontuacao', function (pontuacao) {
                $rootScope.$broadcast('pontuacao', pontuacao);
            });
            proxy.on('token', function (token) {
                $rootScope.$broadcast('token', token);
            });
            proxy.on('isConnect', function (isConnect) {
                $rootScope.$broadcast('isConnect', isConnect);
            });
            proxy.on('redirectMobile', function (redirectMobile) {
                $rootScope.$broadcast('redirectMobile', redirectMobile);
            });
            proxy.on('redirectNome', function (redirectNome) {
                $rootScope.$broadcast('redirectNome', redirectNome);
            });
            proxy.on('redirectGame', function (redirectTutorial){
                $rootScope.$broadcast('redirectTutorial', redirectTutorial);
            })
            proxy.on('redirectGame', function (redirectGame) {
                $rootScope.$broadcast('redirectGame', redirectGame);
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
        sendMessage: function (bolaGamma, bolaAlpha,token) {
            if(this.isConnected()) {
                proxy.invoke('SendMessage', bolaGamma, bolaAlpha,token).Result;
            }
        },
        atirar: function (token){
            if(this.isConnected()){
                proxy.invoke('Atirar',token);
            }
        },
        rodaRound: function (token){
            if(this.isConnected()){
                proxy.invoke('RodaRound',token).Result;
            }
        },
        generateToken: function (){
            if(this.isConnected()){
                proxy.invoke('GenerateToken');
            }
        },
        enviaToken: function (token){
            if(this.isConnected()){
                proxy.invoke('EnviaToken',token);
            }
        },
        enviaNick: function (nick,token){
            if(this.isConnected()){
                proxy.invoke('EnviaNick',nick,token);
            }
        },
        salvaPartida: function (sala) {
            proxy.invoke('SalvaPartida', sala);
        }
    }
}]);
