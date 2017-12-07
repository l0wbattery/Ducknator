angular.module('app').controller('LocalController',function($scope,localService,$routeParams,toastr,$location, autenticado){
    if($routeParams.idLocal === undefined){
        $scope.salvar = function(local) {
            if ($scope.formLocal.$invalid) {
                exibirToastrErro();
                return;
            }
            exibirToastrSucess();
            localService.adicionarLocal(local).then(function () {
                pathLocal();
            }); 
        }
    }else{
        var id;
        localService.buscarPorId($routeParams.idLocal).then(function(response) {
            $scope.local = response.data;
            id = response.data.Id;
        });
        $scope.salvar = function(local) {
            if ($scope.formLocal.$invalid) {
                exibirToastrErro();
                return;
            }
            exibirToastrSucess();
            localService.alterarLocal(local,id).then(function () {
                pathLocal();
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
        if($scope.formLocal[campo].$invalid && $scope.formLocal[campo].$touched)
            return true;
        return false;
    }
    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Local');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
    function pathLocal() {
        $location.path('/locallistar');
    }
});