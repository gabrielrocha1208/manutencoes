// Lista de placas dos veículos
const placas = [
    "PNE6975", "PNE6925", "PNE6855", "PND9445", "PMX1039", "PMX0959", 
    "PMX0879", "OSU4375", "OSU4025", "NUX8074", "HWX4232", "HWX4222", "HWK8419"
];

// Armazenamento das preventivas
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
            if (tipo === "placas-status") {
                mostrarStatusPreventiva(placa);
            }
        };
        placasDiv.appendChild(button);
    });
}

// Função para exibir tela inicial de manutenção corretiva
function entrarCorretiva() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes-corretiva").style.display = "block";
}

// Função para exibir tela inicial de manutenção preventiva
function entrarPreventiva() {
    document.getElementById("tela-inicial").style.display = "none";
    document.getElementById("tela-opcoes-preventiva").style.display = "block";
}

// Função para mostrar status preventiva
function mostrarStatusPreventiva() {
    document.getElementById("tela-opcoes-preventiva").style.display = "none";
    document.getElementById("status-preventiva").style.display = "block";
    inicializarPlacas("placas-status");
}

// Função para voltar para a tela inicial
function voltarParaTelaInicial() {
    document.getElementById("tela-inicial").style.display = "block";
    document.getElementById("tela-opcoes-corretiva").style.display = "none";
    document.getElementById("tela-opcoes-preventiva").style.display = "none";
}

// Função para voltar para a tela de opções preventiva
function voltarParaOpcoesPreventiva() {
    document.getElementById("status-preventiva").style.display = "none";
    document.getElementById("tela-opcoes-preventiva").style.display = "block";
}

// Função para cadastrar preventiva
function cadastrarPreventiva(placa) {
    const tipoPreventiva = prompt("Qual o tipo de preventiva?");
    const dataPreventiva = prompt("Qual a data da preventiva?");
    const proximaPreventiva = prompt("Qual a próxima preventiva?");
    
    if (tipoPreventiva && dataPreventiva && proximaPreventiva) {
        if (!preventivas[placa]) {
            preventivas[placa] = [];
        }
        preventivas[placa].push({ tipo: tipoPreventiva, data: dataPreventiva, proxima: proximaPreventiva });
        localStorage.setItem("preventivas", JSON.stringify(preventivas));
        alert("Preventiva cadastrada com sucesso!");
    }
}

// Função para mostrar as preventivas cadastradas
function mostrarStatusPreventiva(placa) {
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("preventiva-list");

    const preventivasList = preventivas[placa] || [];
    if (preventivasList.length === 0) {
        statusDiv.innerHTML = `<p>Não há manutenções preventivas cadastradas para a placa ${placa}.</p>`;
    } else {
        preventivasList.forEach(preventivaItem => {
            const p = document.createElement("p");
            p.innerText = `Tipo: ${preventivaItem.tipo}, Data: ${preventivaItem.data}, Próxima: ${preventivaItem.proxima}`;
            statusDiv.appendChild(p);
        });
    }

    document.getElementById("placas-status").innerHTML = "";
    document.getElementById("placas-status").appendChild(statusDiv);
}


