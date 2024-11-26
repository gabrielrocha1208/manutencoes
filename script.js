// Lista de placas dos veículos
const placas = [
    "PNE6975", "PNE6925", "PNE6855", "PND9445", "PMX1039", "PMX0959", 
    "PMX0879", "OSU4375", "OSU4025", "NUX8074", "HWX4232", "HWX4222", "HWK8419"
];

// Armazenamento das manutenções
let manutencoes = JSON.parse(localStorage.getItem("manutencoes")) || {};
let preventivas = JSON.parse(localStorage.getItem("preventivas")) || {};

// Função para inicializar placas para cada tela
function inicializarPlacas(tipo) {
    const placasDiv = document.getElementById(tipo);
    placasDiv.innerHTML = "";
    placas.forEach(placa => {
        const button = document.createElement("button");
        button.innerText = placa;
        button.classList.add("placa-button");
        button.onclick = () => {
            if (tipo === "placas-pendentes") {
                mostrarManutencaoPorPlaca(placa);
            } else if (tipo === "placas-cadastro") {
                cadastrarManutencao(placa);
            } else if (tipo === "placas-preventiva") {
                cadastrarPreventiva(placa);
            } else if (tipo === "placas-status") {
                mostrarStatusPreventiva(placa);
            }
        };
        placasDiv.appendChild(button);
    });
}

// Função para exibir tela inicial
function entrar() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Função para mostrar a tela de manutenção preventiva
function mostrarManutencaoPreventiva() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Função para mostrar as manutenções pendentes
function mostrarManutencaoPendentes() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("manutencao-pendentes").style.display = "block";
    inicializarPlacas("placas-pendentes");
}

// Função para mostrar o formulário de cadastro
function mostrarCadastrarManutencao() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "block";
    inicializarPlacas("placas-cadastro");
}

// Função para mostrar tela de cadastro preventiva
function mostrarCadastrarPreventiva() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("cadastrar-preventiva").style.display = "block";
    inicializarPlacas("placas-preventiva");
}

// Função para mostrar status da preventiva
function mostrarStatusPreventiva() {
    document.getElementById("tela-opcoes").style.display = "none";
    document.getElementById("status-preventiva").style.display = "block";
    inicializarPlacas("placas-status");
}

// Função para voltar para a tela de opções
function voltarParaOpcoes() {
    document.getElementById("manutencao-pendentes").style.display = "none";
    document.getElementById("cadastrar-manutencao").style.display = "none";
    document.getElementById("cadastrar-preventiva").style.display = "none";
    document.getElementById("status-preventiva").style.display = "none";
    document.getElementById("tela-opcoes").style.display = "block";
}

// Função para cadastrar manutenção
function cadastrarManutencao(placa) {
    const manutencaoDescricao = prompt("Cadastre a nova manutenção para " + placa);
    if (manutencaoDescricao) {
        if (!manutencoes[placa]) {
            manutencoes[placa] = [];
        }
        manutencoes[placa].push(manutencaoDescricao);
        localStorage.setItem("manutencoes", JSON.stringify(manutencoes));
        alert("Manutenção cadastrada com sucesso!");
    }
}

// Função para cadastrar manutenção preventiva
function cadastrarPreventiva(placa) {
    const tipoPreventiva = prompt("Tipo de preventiva (Ex: Troca de óleo, Inspeção)");
    const dataPreventiva = prompt("Data da preventiva");
    const proximaPreventiva = prompt("Próxima preventiva (data)");

    if (tipoPreventiva && dataPreventiva && proximaPreventiva) {
        if (!preventivas[placa]) {
            preventivas[placa] = [];
        }
        preventivas[placa].push({ tipo: tipoPreventiva, data: dataPreventiva, proxima: proximaPreventiva });
        localStorage.setItem("preventivas", JSON.stringify(preventivas));
        alert("Preventiva cadastrada com sucesso!");
    }
}

// Função para mostrar manutenções preventivas
function mostrarStatusPreventiva(placa) {
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("preventiva-list");

    const preventivasList = preventivas[placa] || [];
    preventivasList.forEach((preventivaItem, index) => {
        const p = document.createElement("p");
        p.innerText = `Tipo: ${preventivaItem.tipo}, Data: ${preventivaItem.data}, Próxima: ${preventivaItem.proxima}`;
        statusDiv.appendChild(p);
    });

    document.getElementById("placas-status").innerHTML = "";
    document.getElementById("placas-status").appendChild(statusDiv);
}
