let urlBase = "http://localhost:8080/";
const urlEquipamentos = urlBase + "equipamentos"
const urlOS = urlBase + "ordem-servico"
const urlTecnicos = urlBase + "tecnicos"


function load() { 
    listarTipos();
    listar();
    const hoje = new Date()
    document.getElementById("dataEntrada").defaultValue = hoje.getFullYear() + '-' + ('0' + (hoje.getMonth() + 1)).slice(-2) + '-' + ('0' + hoje.getDate()).slice(-2);

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
        .catch(error => alert("Falha na requisição"))
}

function montarTipos(res) {
    var options = `<option>Selecione</option>`;
    res.forEach(e => options += `<option value=${e}>${e}</option>`);
    document.querySelector("#tipo").innerHTML = options;
}


function inserir() {


    let tel = document.querySelector("#telefone").value
    console.log(tel);
    const numeroCompleto = tel.replace(/[^0-9]+/g, '')
    const area = numeroCompleto.substr(0, 2)
    const numero = numeroCompleto.substr(2, numeroCompleto.length)
    console.log(numero);
    console.log(area);

    // let telefoneDb = document.querySelector("#telefone")
    // console.log(numero);
    // console.log(telefoneDb);
    // telefoneDb.setAttribute("value",`${numero}`)

    // document.querySelector(#numero).value Descobri um jeito de passar o numero no body


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
            // "area": area,
            "numero": document.querySelector("#telefone").value,
            // "tipo": numero
        }
    }
 
    console.log(body)
    const requisicao = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(urlOS, requisicao)
        .then((res) => {
            if (res.status === 200) {
                alert("Equipamento cadastrado com sucesso")
                reloadTable()
                listar()
            } else{
                alert("Verifique os dados e tente novamente")
                console.log(res.error);

            }
        })
        .then(res => res.json())
        .catch(error => console.log("Falha na requisição" + error))
    }


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
console.log(res);
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




// ______________________________________________________________
// validação input telefone:

// function myTel(event) {

//     let tel = event.target;
//     tel.value = mascara(tel.value)
// }
// const mascara = (tel) => { //preenche corretamente a bagaceta do input
//     if (!tel) return ""
//     tel = tel.replace(/\D/g, '')
//     tel = tel.replace(/(\d{2})(\d)/, "($1) $2")
//     tel = tel.replace(/(\d)(\d{4})$/, "$1-$2")
//     return tel
// }



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

                //um modal de confirmação sobre exclusão


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
            console.log(res);
        })
   
        .catch(error => alert("Falha na requisição " + error))
}




