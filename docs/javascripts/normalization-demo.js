const normalizationDemoStages = [
  {
    description:
      "Etapa 1 de 4: há vários itens no mesmo campo. Isso dificulta consultar ou alterar um item individualmente.",
    label: "Etapa 1 de 4 — situação inicial",
    next: "Aplicar a 1FN",
    focus: "grouped",
  },
  {
    description:
      "Etapa 2 de 4: a 1FN coloca um item em cada linha e um valor em cada célula. Nome e departamento ainda se repetem.",
    label: "Etapa 2 de 4 — 1FN",
    next: "Aplicar a 2FN",
    focus: "atomic-row",
  },
  {
    description:
      "Etapa 3 de 4: a chave do item é Pedido + Produto. A quantidade depende dos dois; o nome e o departamento dependem só do produto, então ficam na tabela Produtos.",
    label: "Etapa 3 de 4 — 2FN",
    next: "Aplicar a 3FN",
    focus: "product-description",
  },
  {
    description:
      "Etapa 4 de 4: o nome do departamento depende do identificador do departamento, não do produto. Uma tabela própria evita repetir esse nome.",
    label: "Etapa 4 de 4 — 3FN",
    next: "Recomeçar",
    focus: "department-name",
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
  const spotlight = demo.querySelector("[data-normalization-spotlight]");
  const origin = demo.querySelector("[data-normalization-origin]");
  let step = 0;

  function moveSpotlight(targets, visible) {
    const demoRect = demo.getBoundingClientRect();
    const bounds = targets.reduce(
      (result, target) => {
        const rect = target.getBoundingClientRect();
        return {
          left: Math.min(result.left, rect.left),
          top: Math.min(result.top, rect.top),
          right: Math.max(result.right, rect.right),
          bottom: Math.max(result.bottom, rect.bottom),
        };
      },
      {
        left: Number.POSITIVE_INFINITY,
        top: Number.POSITIVE_INFINITY,
        right: Number.NEGATIVE_INFINITY,
        bottom: Number.NEGATIVE_INFINITY,
      },
    );

    if (targets.length === 0) {
      const rect = origin.getBoundingClientRect();
      bounds.left = rect.left + rect.width / 2 - 6;
      bounds.top = rect.top + rect.height / 2 - 6;
      bounds.right = bounds.left + 12;
      bounds.bottom = bounds.top + 12;
    }

    spotlight.style.setProperty(
      "--spotlight-x",
      `${bounds.left - demoRect.left - demo.clientLeft + demo.scrollLeft - 4}px`,
    );
    spotlight.style.setProperty(
      "--spotlight-y",
      `${bounds.top - demoRect.top - demo.clientTop + demo.scrollTop - 4}px`,
    );
    spotlight.style.setProperty(
      "--spotlight-width",
      `${bounds.right - bounds.left + 8}px`,
    );
    spotlight.style.setProperty(
      "--spotlight-height",
      `${bounds.bottom - bounds.top + 8}px`,
    );
    spotlight.classList.toggle("is-visible", visible);
    spotlight.classList.toggle("is-origin", targets.length === 0);
  }

  function renderStep() {
    const currentStage = normalizationDemoStages[step];

    demo.dataset.step = String(step);
    stages.forEach((stage, index) => {
      stage.hidden = index !== step;
    });

    demo.querySelectorAll("[data-normal-focus]").forEach((target) => {
      target.classList.toggle(
        "is-focus-target",
        target.dataset.normalFocus === currentStage?.focus,
      );
    });

    const activeStage = stages[step];
    const focusTargets = currentStage
      ? [...activeStage.querySelectorAll(`[data-normal-focus="${currentStage.focus}"]`)]
      : [];
    moveSpotlight(focusTargets, step > 0);

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
  window.addEventListener("resize", () => {
    renderStep();
  });
}

document$.subscribe(() => {
  document
    .querySelectorAll("[data-normalization-demo]")
    .forEach(initializeNormalizationDemo);
});
