angular.module('app').controller('ReservaController', function ($scope, authService, autenticado, reservaService,trechoService,opcionalService,classeDeVooService,usuarioService,toastr) {
    
    //scope, variaveis, etc
    $scope.reserva = {};
    var reservaASalvar = [];
    var usuarioLogado;
    var idsOpcionais;
    
    //form
    $scope.salvar = function() {
        if($scope.reserva.trechoId === undefined || $scope.reserva.classeDeVooId === undefined || idsOpcionais === undefined){
            exibirToastrErro();
        }else{
            adicionarReserva();
        }
    }
    function isChecked(value) {
        return value.checked === true;
    }

    $scope.atualizaReservaASalvar = function (){
        idsOpcionais = $scope.opcionais.filter(isChecked).map(function (value){return value.Id;});
        if($scope.reserva.trechoId !== undefined && $scope.reserva.classeDeVooId !== undefined && idsOpcionais !== undefined){
            reservaASalvar = JSON.stringify({ IdTrecho : $scope.reserva.trechoId,
                                            IdClasseDeVoo : $scope.reserva.classeDeVooId,
                                            IdUsuario : usuarioLogado.Id,
                                            IdsOpcional : idsOpcionais});
            calcularReserva(reservaASalvar);
        }
    }
    function adicionarReserva(){
        let promise = reservaService.adicionarReserva(reservaASalvar);
        promise.then((response) => {buscarReservasPorId(usuarioLogado.Id);
            exibirToastrSucess();})
    }
    //funções de listagem
    function listarTrechos(){
        let promise = trechoService.listarTrecho();
        promise.then((response) => $scope.trechos = response.data);
    }
    function listarOpcionais(){
        let promise = opcionalService.listarOpcional();
        promise.then((response) => {
            $scope.opcionais = response.data;
        })
    }
    function listarClassesDeVoo(){
        let promise = classeDeVooService.listarClasseDeVoo();
        promise.then((response) => $scope.classes = response.data);
    }
    function getUsuarioLogado(){
        let promise = usuarioService.listarUsuarioLogado();
        promise.then((response) => { 
            usuarioLogado = response.data.dados;
            buscarReservasPorId(usuarioLogado.Id);
        });
    }
    function calcularReserva(reservaASalvar){
        let promise = reservaService.calcularReserva(reservaASalvar);
        promise.then((response) => $scope.valorTotal = response.data);
    }
    function buscarReservasPorId(id){
        let promise = reservaService.buscarReservaPorId(id);
        promise.then((response) => $scope.reservas = response.data);
    }
    $scope.removerReservaPorId = function(id){
        let promise = reservaService.removerReserva(id);
        promise.then((response) => {buscarReservasPorId(usuarioLogado.Id);
            exibirToastrSucess();});
    }
    listarClassesDeVoo();
    listarTrechos();
    listarOpcionais();
    getUsuarioLogado();
    
    ////toastr

    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Reserva');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
});
    