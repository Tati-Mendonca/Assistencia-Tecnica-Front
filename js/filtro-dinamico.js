function consultarfiltro() {
    let valor = document.querySelector("#search").value;
    let dataInicial = document.querySelector("#data-entrada").value;
    // let dataFinal = document.querySelector("#data-fim").value;
    let documento = document.querySelector("#form-documento").value;

    let exibir = document.querySelector(".elemento-oculto").style.display = "block"
    let ocultar = document.querySelector(".elemento-visivel").style.display = "none"


    const requisicao = {
        method: "GET",
    }
    const endpoint = `${urlOS}?nome=${valor}&dataInicio=${dataInicial}&documento=${documento}`;

    console.log(endpoint);

    fetch(endpoint, requisicao)
        .then(res => res.json())
        .then((data) => {

            let dados = " "
            for (let i = 0; i < data.length; i++) {
                e = data[i]
                dados += `<tr>
                                                     <td>${e.id}</td>
                                                     <td>${e.cliente.nome}</td>
                                                     <td>${e.equipamento.tipo}</td>
                                                     <td>${e.equipamento.modelo}</td>
                                                     <td>${e.entrada}</td>
                                                     <td>${e.defeito}</td>
                                                     <td>${e.previsao}</td>
                                                     <td>${e.status}</td>
                                                     <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="finalizar(${e.id})"><i class="bi bi-check2"></i></a></td>
                                               </tr>`

                document.querySelector("#tableResultado").innerHTML = dados;

            }
        })
        .then()
        .catch(error => alert(error.message + "Falha na requisição"))

}

