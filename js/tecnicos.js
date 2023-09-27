function loadTech() {
    liscarTecnicos()
}


function liscarTecnicos() {
    const requisicao = {
        method: "GET"
    }
    fetch("http://localhost:8080/tecnicos")
        .then(res => res.json())
        .then(res => dadosTecnicos(res))
        .catch(error => alert("Falha na requisição"))
}

function dadosTecnicos(res) {
    let dadosTec = ""
    let tecnicos = res;
    tecnicos.content.forEach(e => dadosTec += `<tr>
                                <td>${e.id}</td>
                                <td>${e.nome}</td>
                                <td>${e.telefone}</td>
                                <td>${e.email}</td>
                                <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="apagarTech(${e.id})"><i class="bi bi-trash3"></i></a></td>
                              </tr>`);

        document.querySelector("#tableTecnicos").innerHTML = dadosTec;

    }




