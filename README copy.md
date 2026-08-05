# Instalação e Execução do Projeto

## Pré-requisitos

Antes de executar o projeto, é necessário possuir:

* Node.js instalado
* MySQL Server instalado
* MySQL Workbench (ou outro cliente MySQL)
* Dependências do projeto instaladas

---

# Configuração do Banco de Dados

## 1. Executar o Script SQL

Abra o MySQL Workbench (ou outro cliente MySQL) e execute o arquivo do vscode:

```txt
banco_yugioh.sql
```

O script será responsável por criar:

* Banco de dados `banco_exodia`
* Tabelas do sistema
* Relacionamentos
* Views
* Consultas de teste

---

## 2. Criação do Usuário da Aplicação

Após a criação do banco de dados, execute os comandos abaixo:

```sql
CREATE USER 'app_yugioh'@'%' IDENTIFIED BY 'YuGiOh2026';

GRANT SELECT ON banco_exodia.view_monstro TO 'app_yugioh'@'%';
GRANT SELECT ON banco_exodia.view_armadilha TO 'app_yugioh'@'%';
GRANT SELECT ON banco_exodia.view_feitico TO 'app_yugioh'@'%';
GRANT SELECT ON banco_exodia.view_colecao_cartas TO 'app_yugioh'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Cartas TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Monstros TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Armadilhas TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Feiticos TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.Colecoes TO 'app_yugioh'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON banco_exodia.CartasColecoes TO 'app_yugioh'@'%';

FLUSH PRIVILEGES;
```

### Descrição

Foi criado um usuário específico para a aplicação chamado **app_yugioh**.

Esse usuário possui permissões para:

* Consultar as views do sistema
* Inserir registros
* Atualizar registros
* Excluir registros
* Consultar dados das tabelas

A utilização de um usuário próprio aumenta a segurança da aplicação, evitando o uso da conta administrativa (`root`) durante a execução do sistema.

---

## 3. Configuração do Arquivo `.env`

Crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=app_yugioh
DB_PASSWORD=YuGiOh2026
DB_NAME=banco_exodia
PORT=3000
```

---

# Instalação das Dependências

No terminal, execute:

```bash
npm install
```

Esse comando instalará todas as dependências necessárias para a execução do projeto.

---

# Execução do Backend

Para iniciar o servidor, execute:

```bash
nodemon
```

ou

```bash
npm start
```

### Resultado Esperado

```txt
Conectado ao banco de dados com sucesso.
XXXX cartas carregadas do banco.
Servidor rodando em http://localhost:3000
```

---

# Testando a API

## 1. Listar Todas as Cartas

Abra o navegador e acesse:

```txt
http://localhost:3000/cartas
```

### Resultado Esperado

Retorno de todas as cartas cadastradas.

---

## 2. Buscar Carta por ID

Exemplo:

```txt
http://localhost:3000/cartas/2095764
```

### Resultado Esperado

Retorno dos dados da carta correspondente ao ID informado.

---

## 3. Pesquisar Cartas por Critério

Exemplo:

```txt
http://localhost:3000/cartas/pesquisar/Wyrm
```

### Resultado Esperado

Retorno das cartas que atendem ao critério informado.

---

## 4. Pesquisar Cartas por Coleção

Exemplo:

```txt
http://localhost:3000/cartas/colecao/Secret%20Rare
```

### Resultado Esperado

Retorno das cartas pertencentes à coleção pesquisada.

---

## 5. Criar uma Carta

Exemplo:

```txt
http://localhost:3000/cartas/criar/999999/CartaTeste/monster
```

### Resultado Esperado

Criação da carta e retorno dos dados cadastrados.

---

## 6. Atualizar uma Carta

Exemplo:

```txt
http://localhost:3000/cartas/atualizar/999999/CartaAtualizada/monster
```

### Resultado Esperado

Atualização dos dados da carta.

---

## 7. Remover uma Carta

Utilizando Postman ou Insomnia:

```http
DELETE http://localhost:3000/cartas/999999
```

### Resultado Esperado

Retorno HTTP 204 e remoção da carta.

---

# Teste das Requisições do Front-end

Foi criado o arquivo:

```txt
src/testeRequisicoes.ts
```

Esse arquivo valida todas as funções disponibilizadas pelo módulo `frontService`.

## Como Executar

### 1. Inicie o Backend

```bash
nodemon
```

### 2. Em outro terminal, execute:

```bash
npx ts-node src/testeRequisicoes.ts
```

---

## Funções Testadas

### ✓ listarCartas()

Responsável por listar todas as cartas cadastradas.

### ✓ pesquisarCartasCriterio()

Responsável por pesquisar cartas utilizando um critério informado.

### ✓ pesquisarCartasPorColecao()

Responsável por pesquisar cartas pertencentes a uma determinada coleção.

### ✓ buscarCarta()

Responsável por buscar uma carta específica através do ID.

### ✓ criarCarta()

Responsável por criar uma nova carta.

### ✓ atualizarCarta()

Responsável por atualizar uma carta existente.

### ✓ removerCarta()

Responsável por remover uma carta do sistema.

---

## Objetivo do Arquivo de Testes

Validar todas as funções exportadas pelo `frontService`, garantindo que possam ser utilizadas em qualquer parte do front-end através das rotas disponibilizadas pela API.

Dessa forma, qualquer integrante responsável pelo front-end pode importar e utilizar essas funções normalmente em componentes, páginas ou módulos do sistema.

---

# Observações

* O servidor deve estar em execução antes dos testes.
* O banco de dados deve estar criado e configurado corretamente.
* As credenciais do arquivo `.env` devem coincidir com as do usuário criado no MySQL.
* Caso ocorra erro `ECONNREFUSED`, verifique se o servidor backend está iniciado.
* Caso ocorra erro de autenticação, verifique usuário, senha e permissões do banco de dados.
* Para que as pesquisas funcionem corretamente, as cartas devem estar carregadas na aplicação durante a inicialização do servidor.
* Recomenda-se utilizar o arquivo `testeRequisicoes.ts` para validar o funcionamento das rotas antes da integração com o front-end.
