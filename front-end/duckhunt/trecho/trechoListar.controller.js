angular.module('app').controller('TrechoListarController',function($scope,trechoService,$routeParams,toastr, autenticado){
    function listarTrechos(){
        let promise = trechoService.listarTrecho();
        promise.then((response) => {
            $scope.trechos = response.data;
        })
    }
    listarTrechos();

    $scope.removerTrechoPorId = function(id){
        let promise = trechoService.removerTrecho(id);
        promise.then((response) => {listarTrechos();
            exibirToastrSucess();
        },
        function(response){
            toastr.error(response.data.Message, 'Formulário inválido');
        });
    }

    ////toastr

    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Trecho');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
});