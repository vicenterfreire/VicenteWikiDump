const normalizationDemoStages = [
  {
    description:
      "Etapa 1 de 4: há vários itens no mesmo campo. Isso dificulta consultar ou alterar um item individualmente.",
    label: "Etapa 1 de 4 — situação inicial",
    next: "Aplicar a 1FN",
  },
  {
    description:
      "Etapa 2 de 4: a 1FN coloca um item em cada linha e um valor em cada célula. Nome e departamento ainda se repetem.",
    label: "Etapa 2 de 4 — 1FN",
    next: "Aplicar a 2FN",
  },
  {
    description:
      "Etapa 3 de 4: a chave do item é Pedido + Produto. A quantidade depende dos dois; o nome e o departamento dependem só do produto, então ficam na tabela Produtos.",
    label: "Etapa 3 de 4 — 2FN",
    next: "Aplicar a 3FN",
  },
  {
    description:
      "Etapa 4 de 4: o nome do departamento depende do identificador do departamento, não do produto. Uma tabela própria evita repetir esse nome.",
    label: "Etapa 4 de 4 — 3FN",
    next: "Recomeçar",
  },
];

function initializeNormalizationDemo(demo) {
  if (demo.dataset.initialized === "true") {
    return;
  }

  const stages = [...demo.querySelectorAll("[data-normalization-stage]")];
  const status = demo.querySelector("[data-normalization-status]");
  const controls = demo.querySelector("[data-normalization-controls]");
  const stepLabel = demo.querySelector("[data-normalization-step]");
  const previousButton = demo.querySelector("[data-normalization-previous]");
  const nextButton = demo.querySelector("[data-normalization-next]");
  let step = 0;

  function renderStep() {
    const currentStage = normalizationDemoStages[step];

    demo.dataset.step = String(step);
    stages.forEach((stage, index) => {
      stage.hidden = index !== step;
    });

    status.textContent =
      currentStage?.description ??
      "Começamos com produtos e quantidades agrupados no mesmo campo. Avance para ver como organizar os dados.";
    stepLabel.textContent = currentStage?.label ?? "Pronto para começar";
    previousButton.disabled = step === 0;
    nextButton.textContent = currentStage?.next ?? "Começar";
  }

  previousButton.addEventListener("click", () => {
    step = Math.max(0, step - 1);
    renderStep();
  });

  nextButton.addEventListener("click", () => {
    step = step === normalizationDemoStages.length - 1 ? 0 : step + 1;
    renderStep();
  });

  demo.dataset.initialized = "true";
  controls.hidden = false;
  renderStep();
}

document$.subscribe(() => {
  document
    .querySelectorAll("[data-normalization-demo]")
    .forEach(initializeNormalizationDemo);
});
