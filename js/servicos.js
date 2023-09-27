function loadServicos() {
    listarServicos()
}

function listarServicos() {
    const requisicao = {
        method: "GET"
    }
    fetch("http://localhost:8080/servicos")
        .then(res => res.json())
        .then(res => dadosServicos(res))
        .catch(error => console.log(error + "Falha na requisição"))
}

function dadosServicos(res) {
    let dadosServ = ""
    res.forEach(e => dadosServ += `<tr>
                                <td>${e.id}</td>
                                <td>${e.descricao}</td>
                                <td>${e.valor}</td>
                                <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="apagarTech(${e.id})"><i class="bi bi-trash3"></i></a></td>
                              </tr>`);

        document.querySelector("#tableServicos").innerHTML = dadosServ;

    }

