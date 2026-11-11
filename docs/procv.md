# PROCV no Excel

O **PROCV** procura um valor na primeira coluna de uma tabela e devolve uma
informação da mesma linha. Ele é útil, por exemplo, para encontrar o nome de um
produto a partir do seu código.

PROCV significa **procura vertical**: a busca é feita de cima para baixo. O
nome em inglês é **VLOOKUP**.

## Um exemplo do dia a dia

Imagine uma lista de produtos:

| Código | Produto | Preço |
|---|---|---:|
| 101 | Caderno | R$ 25,00 |
| 102 | Caneta | R$ 5,00 |
| 103 | Mochila | R$ 120,00 |

Para descobrir o nome do produto com código `102`, use:

```excel
=PROCV(102; A2:C4; 2; FALSO)
```

O Excel procura `102` na primeira coluna do intervalo `A2:C4` e retorna o valor
da **2ª coluna** desse intervalo: `Caneta`.

## Veja o PROCV passo a passo

A demonstração abaixo mostra o que cada parte da fórmula faz. Use os botões para
avançar ou voltar pelas etapas.

<section class="procv-demo" data-procv-demo aria-labelledby="procv-demo-title">
  <h3 id="procv-demo-title">Como a busca encontra “Caneta”</h3>
  <p>Fórmula: <code>=PROCV(102; A2:C4; 2; FALSO)</code></p>
  <p class="procv-demo__status" data-demo-status aria-live="polite" aria-atomic="true">
    A tabela está completa. Avance para ver como a fórmula encontra o resultado.
  </p>
  <div class="procv-demo__table-wrap">
    <table class="procv-demo__table">
      <caption>Lista de produtos. As letras indicam as colunas da planilha e os números, as linhas.</caption>
      <thead>
        <tr>
          <th scope="col">Linha</th>
          <th scope="col">A (código)</th>
          <th scope="col">B (produto)</th>
          <th scope="col">C (preço)</th>
        </tr>
      </thead>
      <tbody>
        <tr data-row="2">
          <th scope="row">2</th>
          <td data-cell="A2">101</td>
          <td data-cell="B2">Caderno</td>
          <td data-cell="C2">R$ 25,00</td>
        </tr>
        <tr data-row="3">
          <th scope="row">3</th>
          <td data-cell="A3">102</td>
          <td data-cell="B3">Caneta</td>
          <td data-cell="C3">R$ 5,00</td>
        </tr>
        <tr data-row="4">
          <th scope="row">4</th>
          <td data-cell="A4">103</td>
          <td data-cell="B4">Mochila</td>
          <td data-cell="C4">R$ 120,00</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="procv-demo__legend" aria-label="Legenda">
    <span><i class="procv-demo__swatch procv-demo__swatch--matrix" aria-hidden="true"></i>Intervalo selecionado</span>
    <span><i class="procv-demo__swatch procv-demo__swatch--match" aria-hidden="true"></i>Correspondência encontrada</span>
    <span><i class="procv-demo__swatch procv-demo__swatch--result" aria-hidden="true"></i>Resultado</span>
  </div>
  <div class="procv-demo__controls" data-demo-controls hidden>
    <button class="md-button" type="button" data-demo-previous disabled>Voltar</button>
    <span data-demo-step aria-live="polite">Pronto para começar</span>
    <button class="md-button md-button--primary" type="button" data-demo-next>Começar</button>
  </div>
</section>

Sem a animação, o resumo é: o intervalo `A2:C4` define a matriz; o PROCV procura
`102` na primeira coluna dessa matriz e encontra a linha 3. Depois, conta duas
colunas a partir do início da matriz e retorna a célula `B3`, cujo valor é
**Caneta**.

## Entendendo cada parte

```excel
=PROCV(valor_procurado; intervalo_da_tabela; número_da_coluna; tipo_de_busca)
```

- **valor_procurado:** o que você quer localizar, como um código ou nome.
- **intervalo_da_tabela:** as células que contêm os dados. A coluna onde o Excel
  vai procurar precisa ser a primeira do intervalo selecionado.
- **número_da_coluna:** qual coluna do intervalo contém a resposta. A contagem
  começa em `1`, na primeira coluna selecionada — não necessariamente na coluna
  A da planilha.
- **tipo_de_busca:** define se a busca exige um valor igual ou aceita uma
  aproximação.

## Prefira a busca exata

Na maioria dos casos, você quer encontrar exatamente o código ou o nome
informado. Para isso, use `FALSO` (ou `0`) no último argumento:

```excel
=PROCV(102; A2:C4; 2; FALSO)
```

`VERDADEIRO` (ou `1`) permite uma busca aproximada. Ela só é apropriada em
situações específicas — por exemplo, para encontrar uma faixa de valores em uma
tabela organizada em ordem crescente. Se tiver dúvida, use `FALSO`.

## Regras importantes

### A coluna de busca deve estar à esquerda

O PROCV sempre procura na **primeira coluna** do intervalo e só retorna dados
que estejam à direita dela. Se o código estiver na coluna B e o nome na coluna
A, o PROCV não consegue buscar pelo código e retornar o nome. Nas versões mais
recentes do Excel, a função **PROCX** permite escolher separadamente onde buscar
e de onde retornar o resultado.

### Fixe o intervalo ao copiar a fórmula

Se você copiar a fórmula para outras linhas, talvez queira manter a mesma lista
de produtos. Use cifrões para fixar o intervalo:

```excel
=PROCV(E2; $A$2:$C$4; 2; FALSO)
```

No Excel, selecione o intervalo na fórmula e pressione `F4` para alternar as
opções de fixação. Sem os cifrões, o intervalo pode se deslocar ao copiar a
fórmula.

## Quando algo dá errado

- **`#N/D`:** não foi encontrado um valor igual ao procurado. Confira espaços
  extras, diferenças entre texto e número e se o valor está na primeira coluna
  do intervalo.
- **Resultado inesperado:** confirme o número da coluna. A contagem começa na
  primeira coluna do intervalo, que vale `1`.
- **`#REF!`:** o número da coluna informado é maior que a quantidade de colunas
  do intervalo.

Uma planilha pode exibir uma mensagem mais amigável para um valor não
encontrado com `SEERRO`, por exemplo:

```excel
=SEERRO(PROCV(E2; $A$2:$C$4; 2; FALSO); "Código não encontrado")
```

Use isso quando fizer sentido para quem consulta a planilha. `SEERRO` também
oculta outros erros da fórmula; portanto, não substitui a conferência da
referência e dos argumentos.

## Em resumo

1. Selecione um intervalo que comece pela coluna onde está o valor procurado.
2. Conte a coluna de retorno dentro desse intervalo, começando em `1`.
3. Use `FALSO` para exigir uma correspondência exata.
4. Fixe o intervalo com `$` se for copiar a fórmula.

Para detalhes sobre a função, consulte a
[ajuda oficial da Microsoft sobre PROCV](https://support.microsoft.com/pt-br/search/results?query=fun%C3%A7%C3%A3o%20PROCV).
