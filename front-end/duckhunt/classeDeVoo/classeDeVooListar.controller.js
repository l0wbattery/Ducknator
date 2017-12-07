angular.module('app').controller('ClasseDeVooListarController',function($scope,classeDeVooService,$routeParams,toastr){
    function listarClasseDeVoo(){
        let promise = classeDeVooService.listarClasseDeVoo();
        promise.then((response) => {
            $scope.classes = response.data;
        })
    }
    listarClasseDeVoo();

    $scope.removerClasseDeVooPorId = function(id){
        let promise = classeDeVooService.removerClasseDeVoo(id);
        promise.then((response) => {listarClasseDeVoo();
            exibirToastrSucess();
        },
        function(response){
            toastr.error(response.data.Message, 'Formulário inválido');
        }); 
    }

    ////toastr

    function exibirToastrSucess(){
        toastr.success('Ação realizada com sucesso', 'Classe De Voo');
    }
    function exibirToastrErro(){
        toastr.error('Revise os campos e tente novamente', 'Formulário inválido');
    }
});