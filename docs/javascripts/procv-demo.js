const procvDemoSteps = [
  {
    description:
      "Etapa 1 de 5: a matriz A2:C4 seleciona os dados, sem incluir os cabeçalhos.",
    label: "Etapa 1 de 5",
    next: "Procurar 102",
    focus: ['[data-cell="A2"]', '[data-cell="C4"]'],
  },
  {
    description:
      "Etapa 2 de 5: o PROCV procura 102 na primeira coluna da matriz, a coluna A, e encontra esse código na célula A3.",
    label: "Etapa 2 de 5",
    next: "Mostrar a linha",
    focus: ['[data-cell="A3"]'],
  },
  {
    description:
      "Etapa 3 de 5: o código foi encontrado na linha 3. O PROCV retorna uma informação dessa mesma linha.",
    label: "Etapa 3 de 5",
    next: "Escolher a coluna de retorno",
    focus: ['[data-cell="A3"]', '[data-cell="C3"]'],
  },
  {
    description:
      "Etapa 4 de 5: o número 2 indica a segunda coluna dentro da matriz A2:C4. Essa coluna é B, a coluna Produto.",
    label: "Etapa 4 de 5",
    next: "Ver o resultado",
    focus: ['[data-cell="B2"]', '[data-cell="B4"]'],
  },
  {
    description:
      "Etapa 5 de 5: o resultado é a célula B3, que contém Caneta.",
    label: "Etapa 5 de 5",
    next: "Recomeçar",
    focus: ['[data-cell="B3"]'],
  },
];

function initializeProcvDemo(demo) {
  if (demo.dataset.initialized === "true") {
    return;
  }

  const status = demo.querySelector("[data-demo-status]");
  const controls = demo.querySelector("[data-demo-controls]");
  const stepLabel = demo.querySelector("[data-demo-step]");
  const previousButton = demo.querySelector("[data-demo-previous]");
  const nextButton = demo.querySelector("[data-demo-next]");
  const spotlight = demo.querySelector("[data-demo-spotlight]");
  const spotlightContainer = demo.querySelector(".procv-demo__table-wrap");
  const origin = demo.querySelector("[data-demo-origin]");
  const cells = [...demo.querySelectorAll("[data-cell]")];
  let step = 0;

  function moveSpotlight(targets, visible) {
    const containerRect = spotlightContainer.getBoundingClientRect();
    const bounds = targets.reduce(
      (bounds, target) => {
        const rect = target.getBoundingClientRect();
        return {
          left: Math.min(bounds.left, rect.left),
          top: Math.min(bounds.top, rect.top),
          right: Math.max(bounds.right, rect.right),
          bottom: Math.max(bounds.bottom, rect.bottom),
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
      `${bounds.left - containerRect.left - spotlightContainer.clientLeft + spotlightContainer.scrollLeft - 4}px`,
    );
    spotlight.style.setProperty(
      "--spotlight-y",
      `${bounds.top - containerRect.top - spotlightContainer.clientTop + spotlightContainer.scrollTop - 4}px`,
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
    const currentStep = procvDemoSteps[step - 1];

    demo.dataset.step = String(step);
    cells.forEach((cell) => {
      const address = cell.dataset.cell;
      const row = address.slice(1);
      const column = address[0];

      cell.classList.toggle("is-matrix", step >= 1);
      cell.classList.toggle("is-search-column", step === 2 && column === "A");
      cell.classList.toggle("is-match", step === 2 && address === "A3");
      cell.classList.toggle("is-found-row", step === 3 && row === "3");
      cell.classList.toggle("is-return-column", step === 4 && column === "B");
      cell.classList.toggle("is-result", step === 5 && address === "B3");
    });

    const focusTargets = (currentStep?.focus ?? []).flatMap((selector) =>
      [...demo.querySelectorAll(selector)],
    );
    moveSpotlight(focusTargets, step > 0);

    status.textContent =
      currentStep?.description ??
      "A tabela está completa. Avance para ver como a fórmula encontra o resultado.";
    stepLabel.textContent = currentStep?.label ?? "Pronto para começar";
    previousButton.disabled = step === 0;
    nextButton.textContent = currentStep?.next ?? "Começar";
  }

  previousButton.addEventListener("click", () => {
    step = Math.max(0, step - 1);
    renderStep();
  });

  nextButton.addEventListener("click", () => {
    step = step === procvDemoSteps.length ? 0 : step + 1;
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
  document.querySelectorAll("[data-procv-demo]").forEach(initializeProcvDemo);
});
