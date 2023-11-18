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
//montar dados
function dadosServicos(res) {
    let dadosServ = ""
    res.forEach(e => dadosServ += `<tr>
                                <td>${e.id}</td>
                                <td>${e.descricao}</td>
                                <td>${e.valor}</td>
                                <td><a class="btn" data-bs-toggle="modal"
                                data-bs-target="#servicoModal" role="atualizar" onclick="atualizarServico(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="deletarServico(${e.id})"><i class="bi bi-trash3"></i></a></td>
                              </tr>`);

    document.querySelector("#tableServicos").innerHTML = dadosServ;

}
//consultar
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
                                <td><a href="#" onclick="atualizarServico(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="deletarServico(${e.id})"><i class="bi bi-trash3"></i></a></td>
                            </tr>`

            document.querySelector("#tableServicos").innerHTML = dadosServ;

        })
        .catch(error => alert("Falha na requisição"))
}

// function inserirServico() {

//     document.querySelector("#tituloModal").innerHTML = "Cadastrar Serviço";

//     const body = {
//         "descricao": document.querySelector("#descricao").value,
//         "valor": document.querySelector("#valor").value
//     }

//     const requisicao = {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }
//     fetch(urlServicos, requisicao)
//         .then(res => {
//             if (res.ok) {
//                 loadServicos()
//                 alert("Registro inserido com sucesso");
//             } else {
//                 alert("Verifique os dados e tente novamente")
//             }
//         })
//         .catch(error => console.log(error + "Falha na requisição"))

// }

function montarModal() {
    document.querySelector("#tituloModal").innerHTML = "Cadastrar Serviço";

    const dados =
                `<div class="modal-body col-12">
                <label for="descricao">Descrição</label>
                <textarea name="descricao" id="descricao" class="form-control"></textarea>
                <div class=" col-3">
                    <label for="valor">Valor</label>
                    <input type="text" name="valor" id="valor" class="form-control">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="salvar" data-bs-dismiss="modal" onclick="inserirServico()">Salvar</button>
            </div>`

    document.querySelector("#montar-modal").innerHTML = dados; 
}

function inserirServico() {

        const body = {
        "descricao": document.querySelector("#descricao").value,
        "valor": document.querySelector("#valor").value
    }

console.log(body);
    const requisicao = {
        method:"POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(urlServicos, requisicao)
    .then(res => res.json())
    .then(res => {
        loadServicos()
        document.querySelector("#resultado").style.display="block"
            const resultado =`<p id="resultado">Cadastro Inserido com sucesso</p>`
            document.querySelector("#resultado").innerHTML = resultado;
        setTimeout(() =>{
            let pai = document.querySelector("#elemento-pai")
            pai.parentNode.removeChild(pai)
        }, 3000)
        
  
    })
    .catch(error => alert("Falha na requisição " + error))
}



function deletarServico(id) {
    const requisicao = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const endpoint = `${urlServicos}/${id}`
    fetch(endpoint, requisicao)
        .then(res => {
            if (res.status === 200) {
                listarServicos()
                //um modal de confirmação sobre exclusão
                alert("Registro deletado com sucesso")
            } if (res.status === 400) {
                alert("Não é possivel deletar esse serviço pois ele foi usado em uma OS")
            }
        })
        .then(res => listar())
        .catch(error => alert("Falha na requisição"))
}

// apagar msg de erro

// .then(res => {
//     loadServicos()
//     document.querySelector("#resultado").style.display="block"
//     const resultado =`<p id="resultado">Cadastro Inserido com sucesso</p>`
//     document.querySelector("#resultado").innerHTML = resultado;
//     setTimeout(() =>{
//         const pai = document.querySelector("#elemento-pai")
//         pai.parentNode.removeChild(pai)
//     }, 3000)




//buscar por ID
function atualizarServico(id) {
    document.querySelector("#tituloModal").innerHTML = "Alterar";
    const requisicao = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const endpoint = `${urlServicos}/${id}`
    console.log(endpoint);

    fetch(endpoint, requisicao)
        .then(res => res.json())
        .then(e => {
            const dados =
                `<div class="modal-body col-12">
                <label for="descricao">Descrição</label>
                <textarea name="descricao" id="descricao" class="form-control">${e.descricao}</textarea>
                <div class=" col-3">
                    <label for="valor">Valor</label>
                    <input type="text" name="valor" id="valor" value="${e.valor}" class="form-control">
                </div>
                 <div class="modal-footer mt-2">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="salvarServico(${e.id})" id="salvar">Salvar</button>
                </div>`
            
            document.querySelector("#montar-modal").innerHTML = dados;
        })

        .catch(error => alert("Falha na requisição"))
}


// Atualizar o id selecionado
function salvarServico(id) {
    const body = {
        "id": `${id}`,
        "descricao": document.querySelector("#descricao").value,
        "valor": document.querySelector("#valor").value
    }
    console.log(body);

    const requisicao = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const endpoint = `${urlServicos}/${id}`

    fetch(endpoint, requisicao)
        .then(res => {
            if (res.ok) {
                listarServicos()
                alert("Serviço atualizado com sucesso");
            } else {
                alert("Verifique os dados e tente novamente")
            }

        })
        .catch(error => alert("Falha na requisição " + error))

}

