# Catálogo de Produtos

Este é um projeto de aplicativo de catálogo de produtos desenvolvido como parte de um desafio técnico. O aplicativo consome dados da API [DummyJSON](https://dummyjson.com/) para listar, filtrar, ordenar e exibir detalhes de produtos.

## **Funcionalidades**

- **Tela de Login e Cadastro:**

  - Utiliza Firebase Auth para autenticação.
  - Gerenciamento de formulários feito com `react-hook-form`.

- **Dashboard de Produtos:**

  - Listagem de produtos com dados consumidos da API.
  - Filtro por categoria e nota.
  - Ordenação por preço e ordem alfabética.
  - Pesquisa por nome de produtos.
  - Renderização de imagens dos produtos.
  - Alternância entre os modos Dark e Light.

- **Detalhes dos Produtos:**

  - Visualização detalhada de cada produto ao clicar nele.
  - Edição de informações de produtos em um formulário interativo.

- **Estilização e Responsividade:**
  - Construído com Material-UI e Styled Components.
  - Totalmente responsivo para diferentes dispositivos.

## **Tecnologias Utilizadas**

- **Front-end:** ReactJS, Redux, Material-UI, Styled Components.
- **Back-end:** Firebase Auth para autenticação.
- **Outras Bibliotecas:**
  - `react-hook-form` para gerenciamento de formulários.
  - `axios` para chamadas de API.
  - `date-fns` para manipulação de datas.
  - Biblioteca para renderização de QR Codes e códigos de barras.

## **Como Executar o Projeto**

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. **Instale as Dependências:**

   ```bash
   cd desafio
   npm install
   ```

3. **Configuração de Variáveis de Ambiente:**
   - Subi meu ENV para que não precisem criar novas variaveis de ambiente (sei que subir o ENV para o github não é o ideal, mas as variáveis nesse não são tao sensiveis), mas caso queiram criar um ENV de vocês, sigam os passos a baixo, caso queiram usar o meu, sigam para o próximo passo.
   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     ```
   - Substitua `your_api_key`, `your_auth_domain`, e `your_project_id` pelos valores correspondentes do Firebase.

4. **Inicie o Projeto:**

   ```bash
   npm run dev
   ```

5. **Acesse a Aplicação:**
   - Abra o navegador e acesse `http://localhost:3000`.

## **Estrutura do Projeto**

```
├── app/
│   ├── auth/           # Páginas de login e cadastro
│   ├── Products/       # Páginas e controladores de produtos
│   ├── styles/         # Estilos globais
│   └── StoreProvider/  # Configuração de estados globais
├── common/components/  # Componentes reutilizáveis (Dark Mode, Produtos, etc.)
├── lib/                # Configurações e slices do Redux
├── public/             # Dados estáticos e imagens
├── utils/              # Funções utilitárias (formatação, helpers, etc.)
└── __tests__/          # Testes unitários
```

---

**Autor:** Luiz Vithor Galvão Alves de Oliveira

**E-mail:** luizvithorprofissional@gmail.com
