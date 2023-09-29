const urlServicos = urlBase + "servicos"

function loadServicos() {
    listarServicos()
}

function listarServicos() {
    const requisicao = {
        method: "GET"
    }
    fetch(urlServicos)
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
                                <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="deletarServico(${e.id})"><i class="bi bi-trash3"></i></a></td>
                              </tr>`);

    document.querySelector("#tableServicos").innerHTML = dadosServ;

}

function buscarPorIdServico() {
    let id = document.querySelector("#buscarServico").value;
    const requisicao = {
        method: "GET"
    }
    const endpoint = `${urlServicos}/${id}`;

    fetch(endpoint, requisicao)
        .then(res => res.json())
        .then((e) => {

             const dadosServ = `<tr>
                                <td>${e.id}</td>
                                <td>${e.descricao}</td>
                                <td>${e.valor}</td>
                                <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="deletarServico(${e.id})"><i class="bi bi-trash3"></i></a></td>
                            </tr>`

                document.querySelector("#tableServicos").innerHTML = dadosServ;
                console.log(dadosServ);
            })
        .catch(error => alert("Falha na requisição"))
        console.log(error.message);
}

function inserirServico() {
    const body = {
        "descricao": document.querySelector("#descricao").value,
        "valor": document.querySelector("#valor").value
    }

    const requisicao = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(urlServicos, requisicao)
        .then(res => {
            if (res.ok) {
                loadServicos()
                alert("Registro inserido com sucesso");
            } else {
                alert("Verifique os dados e tente novamente")
            }
        })
        .catch(error => console.log(error + "Falha na requisição"))

}



function deletarServico(id) {
    const requisicao = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const endpoint = `${urlServicos}/${id}`
    console.log(id);
    fetch(endpoint, requisicao)
        .then(res => {
            if (res.ok) {
                listarServicos()

                //um modal de confirmação sobre exclusão


                alert("Registro deletado com sucesso")
            } else {
                alert("Verifique os dados e tente novamente")
            }
        })
        .then(res => listar())
        .catch(error => alert("Falha na requisição"))
}



