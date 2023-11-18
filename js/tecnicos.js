function loadTech() { 
    let numeroPag = "0"
    listarTecnicos(numeroPag)
}

function listarTecnicos(numeroPag) { 
    const requisicao = {
        method: "GET"
    }


    const endpoint = `${urlTecnicos}?pagina=${numeroPag}`
console.log(endpoint);
    fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            if (res.empty == true) {
                console.log("Nenhum resultado encontrado")
            } else {
                let paginaAtual = res.pageable.pageNumber
                let limitePorPagina = res.size
           
                respostaAPI(paginaAtual, limitePorPagina)

                let dadosTec = ""
                res.content.forEach(e => dadosTec += `<tr>
                                                <td>${e.id}</td>
                                                <td>${e.nome}</td>
                                                <td>${e.email}</td>
                                                <td>${e.telefone.numero}</td>
                                                <td><a href="#" data-bs-toggle="modal"
                                                data-bs-target="#tecnicoModal" onclick="atualizarTecnico(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="deletarTecnico(${e.id})"><i class="bi bi-trash3"></i></a></td>
                                              </tr>`);

                document.querySelector("#tableTecnicos").innerHTML = dadosTec;
            }
        })
        .catch(error => document.querySelector(".alert").hidden = false)
}



const respostaAPI = function (paginaAtual, limitePorPagina) {

   localStorage.setItem("valor", paginaAtual)
   localStorage.setItem("limite", limitePorPagina)

}

function proximaTela() {
    let proximaPag = localStorage.getItem("valor");
    let limitePag = localStorage.getItem("limite");

    let numeroPag = parseInt(proximaPag)+1
    let limite = parseInt(limitePag)-1

    if (numeroPag < limitePag) { 
        listarTecnicos(numeroPag)
        document.querySelector(".first").classList.remove("disabled")
    } if (numeroPag === limite) {
        document.querySelector(".next").classList.add("disabled")
    } 
}


function voltarTela() {   
    let voltar = localStorage.getItem("valor");

    let voltarPag = parseInt(voltar) 
    let numeroPag = voltarPag-1

    if (numeroPag <= 3 && numeroPag >= 0) { 
        listarTecnicos(numeroPag) 
        document.querySelector(".next").classList.remove("disabled")
    } if (numeroPag === 0) { 
        document.querySelector(".first").classList.add("disabled")
    }
}

function mudar(e){    
    let numeroPag = e.id -1
    console.log(numeroPag);
    if (numeroPag <= 2) {
        document.querySelector(".next").classList.remove("disabled")
    }
    if (numeroPag > 0) {
        document.querySelector(".first").classList.remove("disabled")
    }
    if (numeroPag === 0) {
        document.querySelector(".first").classList.add("disabled")
    }
    listarTecnicos(numeroPag)
}


function montarModalTech() {
    document.querySelector("#tituloModalTech").innerHTML = "Cadastrar Técnico";

    const dados =
        `<div class="modal-body col-12">
            <label for="nome">Nome</label>
            <input type="text" name="nome" id="nome-tech" class="form-control">
        <div class="row py-3">
        <div class="col-8">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" class="form-control">
        </div>
        <div class="col-4">
            <label for="telefone-tech">Telefone</label>
            <input type="text" name="telefone-tech" id="telefone-tech" class="form-control">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="salvar" data-bs-dismiss="modal" onclick="inserirTecnico()">Salvar</button>
        </div>`

    document.querySelector("#modalTech").innerHTML = dados;
}

function inserirTecnico() {
    const body = {
        "nome": document.querySelector("#nome-tech").value,
        "telefone": {
            //   "area": "11",
            "numero": document.querySelector("#telefone-tech").value,
            //   "tipo": "CELULAR"
        },
        "email": document.querySelector("#email").value
    }
    console.log(body);
    const requisicao = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(urlTecnicos, requisicao)
        .then(res => {
            if (res.status === 200) {
                loadTech()
                alert("Cadastro realizado com sucesso!")
            } else {
                alert("E-mail já cadastrado, tente usar um novo")
            }
        })
        .then(res => res.json())
        .catch(error => console("Falha na requisição"))
}

function atualizarTecnico(id) {
    document.querySelector("#tituloModalTech").innerHTML = "Alterar";
    const requisicao = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const endpoint = `${urlTecnicos}/${id}`
    console.log(endpoint);

    fetch(endpoint, requisicao)
        .then(res => res.json())
        .then(e => {
            //console.log(e.error);
            const dados =
                `<div class="modal-body col-12">
                    <label for="nome">Nome</label>
                    <input type="text" name="nome" id="nome-tech" class="form-control" value="${e.nome}">
                <div class="row py-3">
                    <div class="col-8">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email" class="form-control" value="${e.email}">
                    </div>
                    <div class="col-4">
                        <label for="telefone-tech">Telefone</label>
                        <input type="text" name="telefone-tech" id="telefone-tech" class="form-control" value="${e.telefone.numero}">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="salvar" data-bs-dismiss="modal" onclick="salvarTecnico(${e.id})">Salvar</button>
                </div>`

            document.querySelector("#modalTech").innerHTML = dados;
        })

        .catch(error => alert("Falha na requisição" + error))
}

function salvarTecnico(id) {

    const body = {
        "nome": document.querySelector("#nome-tech").value,
        "telefone": {
            "numero": document.querySelector("#telefone-tech").value
        },
        "email": document.querySelector("#email").value,
        "id": `${id}`
    }

    console.log(body);

    const requisicao = {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const endpoint = `${urlTecnicos}/${id}`

    fetch(endpoint, requisicao)
        .then(res => {
            if (res.ok) {
                listarTecnicos()
                alert("Serviço atualizado com sucesso");
            } else {
                alert("Verifique os dados e tente novamente")
            }

        })
        .catch(error => alert("Falha na requisição " + error))

}

function deletarTecnico(id) {
    alert("Deletar tecnico")
    const requisicao = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    const endpoint = `${urlTecnicos}/${id}`
    console.log(endpoint);
    fetch(endpoint, requisicao)
        .then(res => {
            if (res.status === 200) {
                listarTecnicos()
                //um modal de confirmação sobre exclusão
                alert("Cadastro deletado com sucesso")
            } else {
                alert("Técnico com OS vinculada.")
            }
        })
        // .then(res => listar())
        .catch(error => alert("Falha na requisição"))
}

// function ativar(elemento) {
//     let itens = document.querySelectorAll(".page-item-tec")
//     console.log(itens);
//     for (let i = 0; i < itens.length; i++) {
//         itens[i].classList.remove("active")
//     }
//     elemento.classList.add("active")
// }

// function ativar(elemento) {
//     let itens = document.querySelectorAll(".page-item")
//     for (let i = 0; i < itens.length; i++) {
//         itens[i].classList.remove("active")
//     }
//     elemento.classList.add("active")
// }


function ativar(elemento) {
    let itens = document.querySelectorAll(".page-item")
    for (let i = 0; i < itens.length; i++) {
        itens[i].classList.remove("active")
    }
    elemento.classList.add("active")
}