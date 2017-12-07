angular.module('app').controller('OpcionalController',function($scope,opcionalService,$routeParams,toastr,$location, authService, autenticado){
    if($routeParams.idOpcional === undefined){
        $scope.salvar = function(opcional) {
            if ($scope.formOpcional.$invalid) {
                exibirToastrErro();
                return;
            }
            exibirToastrSucess();
            opcionalService.adicionarOpcional(opcional).then(function () {
                pathOpcional();
            }); 
        }
    }else{
        var id;
        opcionalService.buscarPorId($routeParams.idOpcional).then(function(response) {
            $scope.opcional = response.data;
            $scope.opcional.Valor *= 100; 
            id = response.data.Id;
        });
        $scope.salvar = function(opcional) {
            if ($scope.formOpcional.$invalid) {
                exibirToastrErro();
                return;
            }
            exibirToastrSucess();
            opcionalService.alterarOpcional(opcional,id).then(function () {
                pathOpcional();
            }); 
             
        }
    } 
    $scope.isNotValid = function(campo){
        if($scope.formOpcional[campo].$invalid && $scope.formOpcional[campo].$touched)
            return true;
        return false;
    }
    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Opcional');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
    function pathOpcional() {
        $location.path('/opcionallistar');
    }
});