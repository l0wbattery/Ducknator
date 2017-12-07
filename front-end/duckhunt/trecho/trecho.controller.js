angular.module('app').controller('TrechoController',function($scope,trechoService,localService,$routeParams,toastr,$location, autenticado){
    if($routeParams.idTrecho === undefined){
        $scope.salvar = function(trecho) {
            if ($scope.formTrecho.$invalid || trecho.IdLocalDestino == trecho.IdLocalOrigem) {
                exibirToastrErro();
                return;
            }
            exibirToastrSucess();
            trechoService.adicionarTrecho(trecho).then(function () {
                pathTrecho();
            }); 
        }
    }else{
        var id;
        trechoService.buscarPorId($routeParams.idTrecho).then(function(response) {
            $scope.trecho = response.data;
            $scope.trecho.IdLocalOrigem = response.data.Origem.Id;
            $scope.trecho.IdLocalDestino = response.data.Destino.Id;
            id = response.data.Id;
        });
        $scope.salvar = function(trecho) {
            if ($scope.formTrecho.$invalid) {
                exibirToastrErro();
                return;
            }
            exibirToastrSucess();
            trechoService.alterarTrecho(trecho,id).then(function () {
                pathTrecho();
            }); 
        }
    }

    function buscaLocais(){
        let promise = localService.listarLocal();
        promise.then((response) =>{$scope.origem = response.data;
            $scope.destino = response.data;} );
    }
    buscaLocais();
    $scope.isNotValid = function(campo){
        if($scope.formTrecho[campo].$invalid && $scope.formTrecho[campo].$touched)
            return true;
        return false;
    }
    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Trecho');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
    function pathTrecho() {
        $location.path('/trecholistar');
    }
});