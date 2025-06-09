# Controle de Investimento - Frontend

Este projeto é o frontend de uma aplicação para gerenciar investimentos, permitindo cadastro, listagem, edição e exclusão de ativos financeiros. Ele está integrado a um backend RESTful.

## Funcionalidades
- **Cadastrar investimento**: Adicione informações sobre seus investimentos (nome, tipo, valor e data).
- **Listar investimentos**: Veja uma tabela com todos os investimentos cadastrados.
- **Editar investimento**: Modifique os detalhes de um investimento existente.
- **Excluir investimento**: Remova investimentos da lista.
- **Validações de formulário**:
  - Todos os campos devem ser preenchidos.
  - O valor investido não pode ser negativo ou zero.
  - A data do investimento não pode ser futura.

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para criação de interfaces de usuário.
- **TypeScript**: Tipagem estática para maior segurança e produtividade no código.
- **Tailwind CSS**: Framework de CSS para estilização rápida e eficiente.
- **Axios**: Cliente HTTP para integração com o backend.

## Integração com o Backend
O frontend espera que o backend esteja rodando em `http://localhost:4000/api/investments` (ajuste a URL em `src/services/api.ts` se necessário). As respostas do backend devem seguir o padrão:
- Listagem: `{ "investments": [ ... ] }`
- Cadastro/Edição: `{ "data": { ... } }`

## Como Rodar o Projeto Localmente

### Pré-requisitos
- **Node.js** e **npm** (ou yarn) instalados em sua máquina.
- Backend da aplicação rodando (consulte a documentação do backend).

### Passo a passo
1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Instale as dependências:**
  ```bash
  npm run dev
  ```

4. **Abra a aplicação em seu navegador:**
  ```bash
  http://localhost:3000
  ```
