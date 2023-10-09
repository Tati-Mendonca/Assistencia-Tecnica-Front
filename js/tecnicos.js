function loadTech() {
    listarTecnicos()

}


// function listarTecnicos() {
//     const requisicao = {
//         method: "GET"
//     }
//     fetch(urlTecnicos)
//         .then(res => res.json())
//         .then(res => dadosTecnicos(res))
//         .catch(error => alert("Falha na requisição"))
// }

// function dadosTecnicos(res) {
//     let dadosTec = ""
//     res.content.forEach(e => dadosTec += `<tr>
//                                 <td>${e.id}</td>
//                                 <td>${e.nome}</td>
//                                 <td>${e.telefone}</td>
//                                 <td>${e.email}</td>
//                                 <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="apagarTech(${e.id})"><i class="bi bi-trash3"></i></a></td>
//                               </tr>`);

//         document.querySelector("#tableTecnicos").innerHTML = dadosTec;

//     }


// _____________________________________


// const estado ={
//     page: 1,
//     pageSize: 5,
//     totalPage: DataTransfer.length/5
// }



// const controlePag = {
//         proximo() {
//             StaticRange.page++
//             if (true) {

//             }
//         },
//         anterior() {},
//         ir() {}

// }







// function montarBtnPaginacao() {
//     let btn = `<ul class="pagination">
//                                 <li class="page-item">
//                                     <a href="#" id="b1" class="page-link btn-pag">Anterior</a>
//                                 </li>
//                                 <li class="page-item">
//                                     <a href="#" id="b2" class="page-link btn-pag">1</a>
//                                 </li>
//                                 <li class="page-item">
//                                     <a href="#" id="b3" class="page-link btn-pag">2</a>
//                                 </li>
//                                 <li class="page-item">
//                                     <a href="#" id="b4" class="page-link btn-pag">3</a>
//                                 </li>
//                                 <li class="page-item">
//                                     <a href="#" id="b5" class="page-link btn-pag">Próxima</a>
//                                 </li>                                       
//                             </ul>`;


//     document.querySelector("#pagination").innerHTML = btn;

// }
// //_____________________________________________________________botoes funcionando

function muda(id) {
    let inicial = 0;

    let btn = document.querySelector("#pagination")

    for (let i = 0; i < btn.childNodes.length; i++) {
        // const e = btn.childNodes[i].id = (inicial++ == id) ? "btn" : id;
        const e = btn.childNodes[i].id = listarTecnicos() ? "btn" : id;
   
    listarTecnicos(id)

    //______________________________________________________________________________________________

    
    function listarTecnicos() {
        const requisicao = {
            method: "GET"
        }

        const endpoint = `${urlTecnicos}?pagina=${id}`
        console.log(endpoint);

        fetch(endpoint, requisicao)

            .then(res => res.json())
            .then(res => paginacao(res))
            .catch(error => console.log("Falha na requisição "))
    }

}



function paginacao(res) {
    let dadosPag = ""
    console.log(res);

    res.content.forEach(e => dadosPag += `<tr>
                                    <td>${e.id}</td>
                                    <td>${e.nome}</td>
                                    <td>${e.telefone}</td>
                                    <td>${e.email}</td>
                                    <td><a href="#" onclick="buscarPorId(${e.id})"><i class="bi bi-pencil-fill"></i></a> | <a href="#" onclick="apagarTech(${e.id})"><i class="bi bi-trash3"></i></a></td>
                                  </tr>`);

    document.querySelector("#tableTecnicos").innerHTML = dadosPag;




    console.log(res)
    const total = res.totalElements; // qnt de resultados por página
    let paginaInicial = res.pageable.pageNumber;
    console.log(total);
    console.log(paginaInicial);

    //calcular o inicio visualização
    let elementosPorPagina = res.numberOfElements;

    console.log(elementosPorPagina);

    //_____________________

    listarTecnicos(paginaInicial, total)

    function listarTecnicos(paginaInicial, total) {
        var dados = {
            paginaInicial: paginaInicial,
            total: total
        }

    }









    // console.log(total);


    // for (let i = 0; i < total.length; i++) {
    //     const e = total[i];
    // console.log(e);
    // }



    //  }

    // document.querySelector("#pagination").innerHTML = pageable;

}}