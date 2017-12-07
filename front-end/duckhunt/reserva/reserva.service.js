angular.module('app').factory('reservaService',function($http){
    
        let urlBase = 'http://localhost:57730/api/reserva';
    
        function adicionarReserva(reserva){
            return $http.post(urlBase,reserva);
        }
        function listarReservas() {
            return  $http.get(urlBase);
        }
        function calcularReserva(reserva) {
            return  $http.post(urlBase+'/calculavalor',reserva);
        }
        function buscarReservaPorId(id) {
            return  $http.get(urlBase+'/'+id);
        }
        function alterarReserva(reserva){
            return $http.put(urlBase+'/'+reserva.id,reserva);
        }
        function removerReserva(id){
            console.log(urlBase+'/'+id);
            return $http.delete(urlBase + '/' + id);
        }
        return {
            calcularReserva:calcularReserva,
            listarReservas: listarReservas,
            adicionarReserva:adicionarReserva,
            buscarReservaPorId:buscarReservaPorId,
            alterarReserva:alterarReserva,
            removerReserva:removerReserva
        };
});