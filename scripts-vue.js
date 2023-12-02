new Vue({
    el: '#app',
    data : {
        cep : "",
        cep_data : null,
        url_pattern : 'https://viacep.com.br/ws/{cep}/json/',
        is_cep_not_found : false
    },
    methods : {
        consultar_cep(){
            let self = this;
            let url_cep =  'https://viacep.com.br/ws/{cep}/json/'.replace('{cep}', this.cep);
            console.log('URL: ' + url_cep);
            axios.get(url_cep)
                .then(function (response) {
                    console.log('Request started');
                    console.log(response);
                    if(!response.data.hasOwnProperty("erro")) {
                        self.cep_data = {
                            "cep": response.data["cep"],
                            "state": response.data["uf"],
                            "city": response.data["localidade"],
                            "neighborhood": response.data["bairro"],
                            "street": response.data["logradouro"]
                        };
                        self.is_cep_not_found = false;
                        console.log('Request success');
                    } else {
                        self.cep_data = null;
                        self.is_cep_not_found = true;
                        console.log('CEP Not Found');
                    }
                }).catch(function (error){
                    this.cep_data = null;
                    console.log('Request failed');
                    console.error(error);
                }).finally(function () {
                    console.log('Request finished');
                 });
        }
    }
});