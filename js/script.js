
const plans = {
    essencial: {
        number: "PLANO 01",
        title: "Essencial",
        description: "Ideal para quem deseja apresentar seu negócio na internet de maneira profissional e simples.",
        features: [
            "Página de apresentação",
            "Informações da empresa",
            "Fotos e localização",
            "Contato pelo WhatsApp"
        ]
    },

    intermediario: {
        number: "PLANO 02",
        title: "Intermediário",
        description: "Ideal para empresas que desejam apresentar seus produtos e facilitar o contato com os clientes.",
        features: [
            "Tudo do plano Essencial",
            "Catálogo de produtos",
            "Categorias e preços",
            "Pedidos pelo WhatsApp"
        ]
    },

    completo: {
        number: "PLANO 03",
        title: "Completo",
        description: "Uma solução mais avançada para negócios que desejam vender e gerenciar suas operações pela internet.",
        features: [
            "Tudo do plano Intermediário",
            "Carrinho de compras",
            "Pagamento online",
            "Painel administrativo",
            "Gerenciamento de produtos e pedidos"
        ]
    }
};

const options = document.querySelectorAll(".plan-option");

options.forEach(option => {

    option.addEventListener("click", () => {

        const selectedPlan = option.dataset.plan;
        const plan = plans[selectedPlan];

        options.forEach(item => {
            item.classList.remove("active");
        });

        option.classList.add("active");

        document.getElementById("plan-number").textContent = plan.number;
        document.getElementById("plan-title").textContent = plan.title;
        document.getElementById("plan-description").textContent = plan.description;

        const featureList = document.getElementById("plan-features");

        featureList.innerHTML = "";

        plan.features.forEach(feature => {

            const li = document.createElement("li");
            li.textContent = feature;

            featureList.appendChild(li);

        });

    });

});


// QUESTIONÁRIO DE PROJETOS SKS

const modal = document.getElementById("project-modal");

const chooseButton = document.getElementById("choose-plan");
const closeButton = document.getElementById("close-modal");

const steps = document.querySelectorAll(".form-step");

const nextButton = document.getElementById("next-step");
const previousButton = document.getElementById("previous-step");
const finishButton = document.getElementById("finish-form");

const progressFill = document.getElementById("progress-fill");
const stepLabel = document.getElementById("step-label");
const progressPercent = document.getElementById("progress-percent");

let currentStep = 0;


// Abrir questionário

chooseButton.addEventListener("click", () => {
    modal.classList.add("show");
});


// Fechar questionário

closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
});


// Atualizar etapa

function updateStep() {

    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    const progress = ((currentStep + 1) / steps.length) * 100;

    progressFill.style.width = progress + "%";

    stepLabel.textContent =
        `ETAPA ${currentStep + 1} DE ${steps.length}`;

    progressPercent.textContent = progress + "%";

    previousButton.hidden = currentStep === 0;
    nextButton.hidden = currentStep === steps.length - 1;
    finishButton.hidden = currentStep !== steps.length - 1;
}


// Validar etapa atual

function validateStep() {

    const currentFields =
        steps[currentStep].querySelectorAll("[required]");

    for (const field of currentFields) {

        if (!field.checkValidity()) {
            field.reportValidity();
            return false;
        }

    }

    return true;
}


// Próxima etapa

nextButton.addEventListener("click", () => {

    if (!validateStep()) return;

    if (currentStep < steps.length - 1) {

        currentStep++;

        updateStep();

    }

});


// Voltar etapa

previousButton.addEventListener("click", () => {

    if (currentStep > 0) {

        currentStep--;

        updateStep();

    }

});


// Finalizar questionário

document.getElementById("project-form")
.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!validateStep()) return;

    // Capturar adicionais escolhidos

    const selectedExtras = [
        ...document.querySelectorAll(
            'input[name="extras"]:checked'
        )
    ].map(input => input.value);

    const selectedPlan =
        document.getElementById("plan-title").textContent;

    // Montar resumo do projeto

    const summary = `
SOLICITAÇÃO DE PROJETO - SKS

Plano escolhido: ${selectedPlan}

Empresa: ${document.getElementById("business-name").value}

Ramo: ${document.getElementById("business-type").value}

Estilo: ${document.getElementById("site-style").value}

Cores: ${document.getElementById("site-colors").value}

Referência: ${document.getElementById("site-reference").value || "Não informado"}

ADICIONAIS ESCOLHIDOS:
${selectedExtras.join("\n") || "Nenhum adicional"}

Orçamento: ${document.getElementById("budget").value}

Detalhes:
${document.getElementById("project-details").value || "Não informado"}
    `;

    alert("Projeto preenchido com sucesso!\n\n" + summary);

});


// Inicializar questionário

updateStep();
