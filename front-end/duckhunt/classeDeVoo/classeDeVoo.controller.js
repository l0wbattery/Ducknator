angular.module('app').controller('ClasseDeVooController',function($scope,classeDeVooService,$routeParams,toastr,$location){
    if($routeParams.idClasseDeVoo === undefined){
        $scope.salvar = function(classeDeVoo) {
            if ($scope.formClasseDeVoo.$invalid) {
                exibirToastrErro();
                return;
            }
            exibirToastrSucess();
            classeDeVooService.adicionarClasseDeVoo(classeDeVoo).then(function () {
                pathClasse();
            }); 
        }
    }else{
        var id;
        classeDeVooService.buscarPorId($routeParams.idClasseDeVoo).then(function(response) {
            $scope.classeDeVoo = response.data;
            id = response.data.Id;
        });
        $scope.salvar = function(classeDeVoo) {
            if ($scope.formClasseDeVoo.$invalid) {
                exibirToastrErro();
                return;
            }
            exibirToastrSucess();
            classeDeVooService.alterarClasseDeVoo(classeDeVoo,id).then(function () {
                pathClasse();
            }); 
        }
    }

    $scope.isNotValid = function(campo){
        if($scope.formClasseDeVoo[campo].$invalid && $scope.formClasseDeVoo[campo].$touched)
            return true;
        return false;
    }
    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Classe De Voo');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
    function pathClasse() {
        $location.path('/classedevoolistar');
    }
});