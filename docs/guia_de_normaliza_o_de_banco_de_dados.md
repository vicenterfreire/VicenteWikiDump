# Guia de normalização de banco de dados

Normalização é uma maneira de organizar as informações de um banco de dados
relacional. A ideia é guardar cada fato no lugar apropriado e relacionar as
tabelas por identificadores, em vez de repetir os mesmos dados em muitos
lugares.

Isso ajuda a evitar informações conflitantes e problemas ao incluir, alterar
ou remover registros. As formas normais são regras que se aplicam uma sobre a
outra: antes de avaliar uma forma mais avançada, a tabela precisa atender às
anteriores.

> **Em termos simples:** se o nome de um departamento está repetido em dezenas
> de registros de funcionários, uma alteração no nome exige atualizar todos
> eles. Guardar o departamento uma vez e relacioná-lo aos funcionários reduz
> esse risco.

## Antes de começar: alguns conceitos

- **Tabela:** conjunto de informações do mesmo tipo, organizado em linhas e
  colunas. Por exemplo, uma tabela de clientes.
- **Linha (registro):** uma ocorrência, como um cliente específico.
- **Coluna (atributo):** uma característica registrada, como nome ou e-mail.
- **Chave primária (PK):** coluna, ou conjunto de colunas, que identifica cada
  linha sem repetições. Um `id_cliente` pode identificar cada cliente.
- **Chave composta:** chave formada por mais de uma coluna. Em uma tabela de
  itens de pedido, a combinação `id_pedido` + `id_produto` pode identificar uma
  linha.
- **Chave estrangeira (FK):** coluna que aponta para a chave de outra tabela,
  criando uma relação entre elas.
- **Dependência:** uma informação depende de outra quando conhecê-la determina
  um único valor. Se cada `id_departamento` identifica um nome de departamento,
  então o nome depende do identificador.

Normalizar não significa eliminar toda repetição. Por exemplo, o identificador
do departamento pode aparecer em vários funcionários para indicar a qual
departamento cada um pertence. O objetivo é evitar repetir fatos descritivos
que podem ser mantidos em um único lugar.

## Problemas causados por repetição

Uma tabela que mistura fatos diferentes pode levar a três tipos de problema:

- **Problema ao incluir:** talvez não seja possível cadastrar um departamento
  até que exista um funcionário para ele.
- **Problema ao alterar:** o nome do mesmo departamento pode precisar ser
  atualizado em várias linhas; se uma ficar para trás, os dados entram em
  conflito.
- **Problema ao remover:** ao excluir o único funcionário de um departamento,
  pode-se apagar também a única informação sobre aquele departamento.

## Primeira Forma Normal (1FN)

Uma tabela está na **1FN** quando cada célula contém um único valor e não há
grupos de informações repetidos em colunas ou listas.

### Exemplo: vários telefones em uma célula

| id_aluno | nome | telefones |
|---:|---|---|
| 1 | Ana Silva | (11) 9999-1111, (11) 8888-2222 |
| 2 | Carlos Souza | (21) 7777-3333 |

A célula de Ana guarda dois telefones. Isso dificulta localizar, contar ou
alterar um número individualmente.

Uma solução é separar os telefones em outra tabela, com uma linha para cada
número:

**Alunos**

| id_aluno (PK) | nome |
|---:|---|
| 1 | Ana Silva |
| 2 | Carlos Souza |

**Telefones dos alunos**

| id_aluno (FK) | telefone |
|---:|---|
| 1 | (11) 9999-1111 |
| 1 | (11) 8888-2222 |
| 2 | (21) 7777-3333 |

Neste exemplo, a combinação `id_aluno` + `telefone` pode identificar cada
telefone. O que conta como um valor único depende do uso: um endereço, por
exemplo, pode ficar em uma coluna se nunca precisar ser consultado ou alterado
por partes.

## Segunda Forma Normal (2FN)

Uma tabela está na **2FN** quando já está na 1FN e cada coluna que não faz
parte de uma chave depende da **chave composta inteira**, não apenas de uma
parte dela. Essa regra é relevante quando a chave tem mais de uma coluna.

### Exemplo: itens de pedido

Considere uma tabela em que cada linha representa um produto incluído em um
pedido. A chave é a combinação `id_pedido` + `id_produto`.

| id_pedido (PK) | id_produto (PK) | quantidade | nome_produto |
|---:|---|---:|---|
| 1001 | P1 | 5 | Teclado |
| 1001 | P2 | 2 | Mouse |
| 1002 | P1 | 1 | Teclado |

`quantidade` depende do produto **naquele pedido**, portanto depende das duas
colunas. Já `nome_produto` depende apenas de `id_produto`. Repeti-lo em cada
pedido cria uma dependência parcial.

Separe os fatos do pedido dos fatos do produto:

**Itens do pedido**

| id_pedido (PK) | id_produto (PK, FK) | quantidade |
|---:|---|---:|
| 1001 | P1 | 5 |
| 1001 | P2 | 2 |
| 1002 | P1 | 1 |

**Produtos**

| id_produto (PK) | nome_produto |
|---|---|
| P1 | Teclado |
| P2 | Mouse |

> **Importante:** o preço cobrado em um pedido pode ser diferente do preço
> atual do produto. Se for necessário preservar o histórico da venda, o preço
> praticado pertence ao item do pedido; o preço atual pertence ao cadastro do
> produto. A estrutura deve representar as regras reais do negócio.

Se a tabela tem apenas chaves simples, sem chaves compostas, não há dependência
parcial desse tipo e a 2FN não exige essa separação.

## Terceira Forma Normal (3FN)

Uma tabela está na **3FN** quando já está na 2FN e as colunas que não são chave
descrevem a chave da tabela, e não umas às outras.

### Exemplo: departamento do funcionário

| id_funcionario (PK) | nome_funcionario | id_departamento | nome_departamento |
|---:|---|---|---|
| 1 | João | D1 | TI |
| 2 | Maria | D1 | TI |
| 3 | Pedro | D2 | Vendas |

Se `id_departamento` determina `nome_departamento`, esse nome depende do
identificador do departamento, não diretamente do funcionário. É uma
**dependência transitiva**: funcionário → departamento → nome do departamento.

Separe as informações:

**Funcionários**

| id_funcionario (PK) | nome_funcionario | id_departamento (FK) |
|---:|---|---|
| 1 | João | D1 |
| 2 | Maria | D1 |
| 3 | Pedro | D2 |

**Departamentos**

| id_departamento (PK) | nome_departamento |
|---|---|
| D1 | TI |
| D2 | Vendas |

Assim, o nome do departamento é mantido em um só lugar. Se um departamento
mudar de nome, basta atualizar seu registro.

## Forma Normal de Boyce-Codd (FNBC)

A **FNBC** é uma versão mais rigorosa da 3FN. Ela exige que toda informação
determinante de outra informação seja uma chave candidata — isto é, algo capaz
de identificar uma linha de forma única.

Na 3FN, há uma exceção para certos casos em que a informação determinada faz
parte de uma chave candidata. A FNBC não permite essa exceção. Por isso, uma
tabela pode atender à 3FN e ainda não atender à FNBC. É um caso mais avançado;
em geral, quem projeta o banco verifica as dependências entre as colunas para
saber se essa situação existe.

## Quarta Forma Normal (4FN)

A **4FN** trata de fatos multivalorados que são independentes entre si. Uma
tabela que combina duas listas independentes pode criar linhas para todas as
combinações, mesmo que esses pares não tenham significado.

### Exemplo: habilidades e idiomas

Uma pessoa desenvolvedora pode ter várias habilidades e falar vários idiomas.
Se uma tabela mistura as duas listas, cada habilidade aparece combinada com
cada idioma:

| id_pessoa | habilidade | idioma |
|---:|---|---|
| 1 | Python | Português |
| 1 | Python | Inglês |
| 1 | SQL | Português |
| 1 | SQL | Inglês |

Se os idiomas não estiverem relacionados às habilidades, as quatro linhas
repetem combinações desnecessárias. Separe os fatos independentes:

**Habilidades**

| id_pessoa (FK) | habilidade |
|---:|---|
| 1 | Python |
| 1 | SQL |

**Idiomas**

| id_pessoa (FK) | idioma |
|---:|---|
| 1 | Português |
| 1 | Inglês |

Cada relação pode usar a combinação das duas colunas como chave. Se uma
habilidade estiver ligada a um idioma específico — por exemplo, nível de
proficiência por idioma —, essa relação não deve ser separada como se os fatos
fossem independentes.

## Quinta Forma Normal (5FN)

A **5FN**, também chamada de **Forma Normal de Junção de Projeção (PJNF)**, trata
de situações raras em que um fato depende de uma combinação de três ou mais
relações, e não pode ser representado corretamente apenas pelas dependências
tratadas nas formas anteriores.

Uma tabela só pode ser dividida em tabelas menores quando elas permitem
reconstruir **exatamente** os registros originais. Ao combinar as tabelas
novamente (operação chamada *junção* ou *join*), não podem surgir combinações
que nunca existiram nem desaparecer combinações válidas. As regras do negócio
precisam garantir essa propriedade.

Por isso, não basta separar uma tabela de três colunas em três pares. Sem uma
regra que torne essa separação segura, a junção pode gerar combinações falsas.
A 5FN é importante em alguns modelos complexos, mas não costuma ser o primeiro
problema encontrado em aplicações comuns.

## Resumo das formas normais

| Forma normal | Pergunta prática | O que busca evitar |
|---|---|---|
| **1FN** | Cada célula guarda um valor por vez? | Listas ou grupos repetidos dentro de uma célula |
| **2FN** | Cada informação depende da chave composta inteira? | Dependência de apenas parte de uma chave composta |
| **3FN** | Uma coluna que não é chave descreve outra coluna que não é chave? | Repetição de fatos que dependem de outro atributo |
| **FNBC** | Todo determinante é uma chave candidata? | Dependências que ainda podem causar inconsistências |
| **4FN** | Há listas independentes misturadas na mesma tabela? | Combinações cruzadas sem significado entre listas |
| **5FN** | A decomposição em tabelas menores reconstrói exatamente os fatos? | Redundâncias ligadas a combinações complexas de relações |

As regras são cumulativas: para chegar à 3FN, por exemplo, a tabela também
precisa atender à 1FN e à 2FN.

## Quando desnormalizar?

**Desnormalizar** é introduzir alguma repetição de propósito, geralmente para
atender a uma necessidade comprovada de leitura ou relatório. Pode ser útil em
um painel de análise, por exemplo, onde consultas frequentes juntariam muitos
dados.

Isso traz uma responsabilidade: decidir qual registro é a fonte oficial e como
manter as cópias sincronizadas. Uma junção entre tabelas não é automaticamente
lenta; antes de duplicar informações, meça o desempenho e confirme que a
complexidade adicional realmente resolve o problema.

## Por onde começar

1. Identifique o que cada linha representa e como ela será identificada.
2. Evite guardar listas de valores em uma única célula.
3. Observe se alguma informação depende apenas de parte de uma chave composta.
4. Mantenha cada fato descritivo no lugar que o identifica.
5. Confira as regras do negócio antes de dividir relações mais complexas.
6. Considere desnormalizar somente quando houver uma necessidade concreta e
   um plano para manter os dados consistentes.
