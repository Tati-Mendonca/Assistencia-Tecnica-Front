let urlBase = "http://localhost:8080/";
const urlEquipamentos = urlBase + "equipamentos"
const urlOS = urlBase + "ordem-servico"
const urlTecnicos = urlBase + "tecnicos"


function load() {
    listarTipos();
    listar();
    const hoje = new Date()
    document.getElementById("dataEntrada").defaultValue = hoje.getFullYear() + '-' + ('0' + (hoje.getMonth() + 1)).slice(-2) + '-' + ('0' + hoje.getDate()).slice(-2);
    document.querySelector("#sucesso").hidden = true
    document.querySelector("#alerta").hidden = true
}

function reloadTable() {
    const formulario = document.querySelector("#dados")
    formulario.reset()
}

function listarTipos() {
    const requisicao = {
        method: "GET"
    };

    fetch(urlEquipamentos + "/tipos", requisicao)
        .then(res => res.json())
        .then(res => montarTipos(res))
        .catch(error => document.querySelector(".alerta").hidden = false)
}

function montarTipos(res) {
    var options = `<option>Selecione</option>`;
    res.forEach(e => options += `<option value=${e}>${e}</option>`);
    document.querySelector("#tipo").innerHTML = options;
}

function inserir() {
    const body = {
        "equipamento": {
            "modelo": document.querySelector("#modelo").value,
            "tipo": document.querySelector("#tipo").value
        },
        "cliente": document.querySelector("#proprietario").value,
        "entrada": document.querySelector("#dataEntrada").value,
        "previsao": document.querySelector("#dataSaida").value,
        "defeito": document.querySelector("#defeito").value,
        "documento": document.querySelector("#documento").value,
        "telefone": {
            "numero": document.querySelector("#telefone").value,
        }
    }

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
                disparaAlert()
                reloadTable()
                listar()
            } else {
                disparaAlerta()
            }
        })
        .then(res => res.json())
        .catch(error => console.log("Falha na requisição"))
}


function listar() {
    const requisicao = {
        method: "GET"
    }

    fetch(urlOS, requisicao)
        .then(res => res.json())
        .then(res => montarDados(res))
        .then(res => document.querySelector("#falha").hidden = true)
        .catch(error => document.querySelector("#falha").hidden = false)


}

function montarDados(res) {
    let dados = " "
    res.forEach(e => dados += `<tr>
                                <td>${e.id}</td>
                                <td>${e.cliente.nome}</td>
                                <td>${e.equipamento.modelo}</td>
                                <td>${e.equipamento.tipo}</td>
                                <td>${e.entrada}</td>
                                <td>${e.defeito}</td>
                                <td>${e.previsao}</td>
                                <td>${e.status}</td>
                                <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="finalizar(${e.id})"><i class="bi bi-check2"></i></a></td>
                              </tr>`);

    document.querySelector("#tableDados").innerHTML = dados;
}

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
                                <td>${e.cliente.documento}</td>
                                <td>${e.cliente.telefone.numero}</td>
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
                alert("Registro finalizado com sucesso")
            } else {
                alert("Verifique os dados e tente novamente")
            }
        })
        .then(res => listar())
        .catch(error => alert("Falha na requisição"))
}


function buscarPorId(id) {
    var requisicao = {
        method: "GET"
    }

    const endpoint = `${urlOS}/${id}`

    fetch(endpoint, requisicao)
        .then(res => res.json())
        .then((res) => {
            document.querySelector("#modelo").value = res.equipamento.modelo;
            document.querySelector("#proprietario").value = res.cliente.nome;
            document.querySelector("#documento").value = res.cliente.documento;
            document.querySelector("#telefone").value = res.cliente.telefone.numero;
            document.querySelector("#defeito").value = res.defeito;
            document.querySelector("#tipo").value = res.equipamento.tipo;
            document.querySelector("#dataEntrada").value = res.entrada;
            document.querySelector("#dataSaida").value = res.previsao
        })

        .catch(error => alert("Falha na requisição " + error))
}


function disparaAlert() {
    now = document.querySelector("#sucesso").hidden = false
    console.log(now);

    function sumir() {
        document.querySelector("#sucesso").hidden = true 
    }
    setTimeout(sumir, 3000) 
}

function disparaAlerta() {
    now = document.querySelector("#alerta").hidden = false
    console.log(now);

    function sumir() {
        document.querySelector("#alerta").hidden = true 
    }
    setTimeout(sumir, 3000) 
}

