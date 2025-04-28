# API de Tarefas

Essa API permite a criação, leitura, atualização, remoção e conclusão de tarefas. A API foi desenvolvida com **Node.js**, e utiliza um banco de dados próprio para armazenar as tarefas. Além disso, a API também permite a importação de tarefas a partir de um arquivo CSV usando **stream**.

## Tecnologias Usadas

- **Node.js** - Plataforma para desenvolvimento do servidor com JavaScript.
- **CSV-Parse** - Biblioteca para ler arquivos CSV de forma eficiente usando stream.


## Estrutura de Dados

Antes de entender as rotas, vamos definir a estrutura de dados que uma tarefa (`task`) deve ter:

- **`id`**: Identificador único da task (gerado automaticamente).
- **`title`**: Título da task.
- **`description`**: Descrição detalhada da task.
- **`completed_at`**: Data de quando a task foi concluída. Inicialmente é `null`.
- **`created_at`**: Data de quando a task foi criada.
- **`updated_at`**: Data de quando a task foi atualizada.
---

## Endpoints da API

### 1. **POST - /tasks**

Cria uma nova tarefa no banco de dados.

**Requisição**:
- Corpo da requisição (JSON):
  ```json
  
  {
    "title": "Exemplo de Task",
    "description": "Descrição da task"
  }

**Resposta**:
Código: 201 Created

---

### 2. **GET - /tasks**

**Requisição**:
**Lista todas as tarefas ou realiza uma busca filtrando pelo title e description.**

**Resposta**:
Código: 200 ok

Exemplo: 
 ```json

  {
    "id": "9ba4c848-7021-4343-bd22-6684a8b056e1",
    "title": "Minha nova tarefa",
    "description": "Descrição detalhada da tarefa",
    "completed_at": null,
    "created_at": "2025-04-28T10:00:00Z",
    "updated_at": "2025-04-28T10:00:00Z"
  }
```
---


### 3. **PUT - /tasks/:id**

**Requisição**:
**Atualiza o título ou a descrição de uma task existente, identificado pelo id.**
  
  **id:** ID da tarefa a ser atualizada.

Corpo da requisição:

```json
{
  "title": "Novo título"
}
```
ou 
```json
{
  "description": "Nova descrição"
}
```



**Resposta:** Código: 200 OK

Exemplo:

```json
{
  "id": "9ba4c848-7021-4343-bd22-6684a8b056e1",
  "title": "Novo título",
  "description": "Nova descrição",
  "completed_at": null,
  "created_at": "2025-04-28T10:00:00Z",
  "updated_at": "2025-04-28T11:00:00Z"
}
```
---

### 4. **DELETE - /tasks/:id**

**Requisição**:
**Deleta uma tarefa existente pelo id.**

 **id:** ID da tarefa a ser deletada.

**Resposta:** Código: 200 OK
Exemplo:

```json
{
  "message": "Tarefa deletada com sucesso"
}
```
---

### 5. **PATCH - /tasks/:id/complete**

**Requisição**:
**Marca uma tarefa como concluída ou não, alterando o campo completed_at.**

 **id:**  ID da tarefa a ser marcada como completa ou não.

**Resposta:** Código: 200 OK
Exemplo:

```json
{
  "id": "9ba4c848-7021-4343-bd22-6684a8b056e1",
  "title": "Exemplo de Task",
  "description": "Descrição da task",
  "completed_at": "2025-04-28T11:00:00Z",
  "created_at": "2025-04-28T10:00:00Z",
  "updated_at": "2025-04-28T11:00:00Z"
}

```
---

## Importação de Tarefas via CSV 
Ao importar um arquivo CSV, cada linha do arquivo criará uma nova tarefa no banco de dados.
O arquivo CSV deve ter uma estrutura com title e description, separados por vírgula. Cada linha representa uma nova tarefa.

```csv
title,description
"Task 1","Descrição da Task 1"
"Task 2","Descrição da Task 2"
```
---

# Pré-requisitos
Antes de executar este projeto, você precisa ter instalado em sua máquina:

  - Node.js (versão 18 ou superior recomendada)
  
  - Gerenciador de pacotes como o npm (instalado junto com o Node.js) ou o yarn.
  
  - Git (opcional, para clonar o repositório).
  
  - Insomnia ou outro cliente de API (opcional, para testar as rotas mais facilmente).

Além disso, para rodar o projeto localmente, é necessário:

  1. Clonar o repositório ou baixar os arquivos do projeto.
  2. Instalar as dependências:
     ```
      npm install
     ```
3. Executar o servidor:
    ```
    npm run dev
   ```
---

## Como executar o projeto:

1. **Salvar o README.md** no seu projeto.
2. **Subir o código para o GitHub**: Caso ainda não tenha feito isso, você pode inicializar um repositório e enviar o código da sua API.
3. **Insomnia**: Crie ou baixe um arquivo `insomnia.json` para testar os endpoints e coloque ele em uma pasta chamada `insomnia` dentro do projeto. Depois, no Insomnia, basta importar o arquivo para testar os endpoints.


