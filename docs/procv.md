# PROCV no Excel

O [PROCV no Excel](https://microsoft.com) (ou VLOOKUP) é uma função usada para fazer uma **busca vertical** (de cima para baixo) na primeira coluna de uma tabela e retornar um dado correspondente na mesma linha.

## Sintaxe da função

```excel
=PROCV(valor_procurado; matriz_tabela; núm_índice_coluna; [procurar_intervalo])
```

- **valor_procurado:** O dado que você quer encontrar (ex: um código de produto, CPF ou nome).
- **matriz_tabela:** O intervalo de células onde os dados estão (a coluna do valor procurado deve ser obrigatoriamente a **primeira coluna** dessa seleção).
- **núm_índice_coluna:** O número da coluna (contando a partir da primeira da seleção) de onde você quer que a resposta seja trazida.
- **procurar_intervalo:** Define se a busca é exata ou aproximada:
  - **0 ou FALSO:** Busca uma **correspondência exata** (o mais recomendado).
  - **1 ou VERDADEIRO:** Busca uma **correspondência aproximada** (a tabela precisa estar em ordem crescente).

## Exemplo prático

Imagine que a **Coluna A** é o _Código_ e a **Coluna B** é o _Produto_. Para descobrir qual produto tem o código `102` na célula `A2`, use:

```excel
=PROCV(102; A1:B10; 2; FALSO)
```

O Excel procura `102` na coluna A e retorna o texto da 2ª coluna (Coluna B) da mesma linha.

## Principais regras e cuidados

- **Sentido único:** O PROCV só busca valores **da esquerda para a direita**. Se a informação desejada estiver à esquerda da coluna de referência, use **PROCX** ou a combinação **ÍNDICE + CORRESP**.
- **Erro `#N/D`:** Aparece quando o valor procurado não é encontrado na primeira coluna ou quando há digitação incorreta.
- **Travar a tabela:** Ao arrastar a fórmula para outras células, use o símbolo de cifrão (ex: `$A$1:$B$10` ou apertando `F4`) para fixar o intervalo da tabela.

## Fontes e materiais de apoio

- [Suporte da Microsoft - Função PROCV](https://microsoft.com)
- [Guia da Carreira sobre PROCV](https://guiadacarreira.com.br)
- [Adriano Pataro - Função PROCV](https://adrianopataro.com.br)
- [PROCV no Excel - Hashtag Treinamentos](https://youtube.com)
