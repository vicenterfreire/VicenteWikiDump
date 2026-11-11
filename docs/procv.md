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
