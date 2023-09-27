const urlBase = "http://localhost:8080/";
const urlEquipamentos = urlBase + "equipamentos"
const urlOS = urlBase + "ordem-servico"
const urlTecnicos = urlBase + "tecnicos"

function load() { //carrrega a página mostrando essas informações
    listarTipos();
    listar();
    
}

function reloadTable() {
    location.reload()
}

function listarTipos() {
    const requisicao = {
        method: "GET"
    };

    fetch(urlEquipamentos + "/tipos", requisicao)
        .then(res => res.json())
        .then(res => montarTipos(res))
        .catch(error => alert("Falha na requisição"))
}

function montarTipos(res) {
    var options = `<option>Selecione</option>`;
    res.forEach(e => options += `<option value=${e}>${e}</option>`);
    document.querySelector("#tipo").innerHTML = options;
}
//_______________________________________________________________________

function inserir() {

    const body = {
        "equipamento": {
            "tipo": document.querySelector("#tipo").value
        },
        "cliente": document.querySelector("#proprietario").value,
        "entrada": document.querySelector("#dataEntrada").value,
        "previsao": document.querySelector("#dataSaida").value,
        "defeito": document.querySelector("#defeito").value,

        "status": document.querySelector("#status").value,

    }
    //    "prioridade": document.querySelector("#prioridade").value,
    const requisicao = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(urlOS, requisicao)
        .then(res => {
            if (res.ok) {
                alert("Registro inserido com sucesso");
            } else {
                alert("Verifique os dados e tente novamente")
                // alert("Verifique os dados e tente novamente")
            }
        })
    console.log("Falha na requisição")
    // .catch(error => alert("Falha na requisição"))
}
//_______________________________________________________________________
function listar() {
    const requisicao = {
        method: "GET"
    }

    fetch(urlOS, requisicao)
        .then(res => res.json())
        .then(res => montarDados(res))
        .catch(error => alert("Falha na requisição"))
}


function montarDados(res) {
    let dados = " "
    res.forEach(e => dados += `<tr>
                                <td>${e.id}</td>
                                <td>${e.cliente.nome}</td>
                                <td>${e.equipamento.tipo}</td>
                                <td>${e.equipamento.modelo}</td>
                                <td>${e.entrada}</td>
                                <td>${e.defeito}</td>
                                <td>${e.previsao}</td>
                                <td>${e.status}</td>
                                <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="finalizar(${e.id})"><i class="bi bi-check2"></i></a></td>
                              </tr>`);


    document.querySelector("#tableDados").innerHTML = dados;

}

//_______________________________________________________________________


function montarResposta(res) {
    let dados = " "
    res.forEach(e => dados += `<tr>
                                <td>${e.id}</td>
                                <td>${e.cliente.nome}</td>
                                <td>${e.equipamento.tipo}</td>
                                <td>${e.equipamento.modelo}</td>
                                <td>${e.entrada}</td>
                                <td>${e.defeito}</td>
                                <td>${e.previsao}</td>
                                <td>${e.status}</td>
                                <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="finalizar(${e.id})"><i class="bi bi-check2"></i></a></td>
                              </tr>`);


    document.querySelector("#tableResposta").innerHTML = dados;

}


function finalizar(id) {
    const requisicao = {
        method: "PATCH"
    }

    const endpoint = `${urlOS}/${id}`
    fetch(endpoint, requisicao)
        .then(res => {
            if (res.ok) {

                //um modal de confirmação sobre exclusão


                alert("Registro finalizado com sucesso")
            } else {
                alert("Verifique os dados e tente novamente")
            }
        })
        .then(res => listar())
        .catch(error => alert("Falha na requisição"))
}
//_______________________________________________________________________
function buscarPorId(id) {
    const requisicao = {
        method: "GET"
    }
    const endpoint = `${urlOS}/${id}`;

    fetch(endpoint, requisicao)
        .then(res => res.json())
        .then(e => {
            document.querySelector("#modelo").value = e.equipamento.modelo;
            document.querySelector("#tipo").value = e.equipamento.tipo;
            document.querySelector("#proprietario").value = e.cliente.nome;
            document.querySelector("#dataEntrada").value = e.entrada;
            document.querySelector("#dataSaida").value = e.eprevisao;
            document.querySelector("#defeito").value = e.defeito;
            document.querySelector("#status").value = e.status;
            document.querySelector("#prioridade").value = e.prioridade;

        })
}

//_______________________________________________________________________

// function consultar() {
//     const requisicao = {
//         method: "GET"
//     }

//     const id = document.querySelector("#search").value;
    

//     const endpoint = `${urlOS}/${id}`;

//     fetch(endpoint, requisicao)
//         .then(res => res.json())
//         .then(e => {
//             const dados = `<tr>
//                                 <td>${e.id}</td>
//                                 <td>${e.cliente.nome}</td>
//                                 <td>${e.equipamento.tipo}</td>
//                                 <td>${e.equipamento.modelo}</td>
//                                 <td>${e.entrada}</td>
//                                 <td>${e.defeito}</td>
//                                 <td>${e.previsao}</td>
//                                 <td>${e.status}</td>

//                                 <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="finalizar(${e.id})"><i class="bi bi-check2"></i></a></td>

//                     </tr>`;
//             document.querySelector("#tableResultado").innerHTML = dados;
//         })
//         .catch(error => alert("Falha na requisição"))
// }

//_______________________________________________________________________

function buscarPorId(id) {
    var requisicao = {
        method: "GET"
    }

    const endpoint = `${urlOS}/${id}`

    fetch(endpoint, requisicao)
        .then(res => res.json())
        .then(e => {
            // document.querySelector("#modelo").value = e.equipamento.modelo;
            document.querySelector("#tipo").value = e.equipamento.tipo;
            document.querySelector("#proprietario").value = e.cliente.nome;
            document.querySelector("#dataEntrada").value = e.entrada;
            document.querySelector("#dataSaida").value = e.eprevisao;
            document.querySelector("#defeito").value = e.defeito;
            document.querySelector("#status").value = e.status;
            // document.querySelector("#prioridade").value = e.prioridade;
        })
}


function home() {
    alert("mudou pra home")
}








// usar este id: home-tab-pane na busca


