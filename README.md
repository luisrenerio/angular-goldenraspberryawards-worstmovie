# 🏆 Golden Raspberry Awards - Web Interface

Esta é a interface web desenvolvida em **Angular** para visualizar e gerenciar os dados do *Prêmio Framboesa de Ouro (Golden Raspberry Awards)*. O projeto consome a API https://challenge.outsera.tech/api/movies e permite a consulta facilitada dos vencedores e dos intervalos de prêmios entre produtores.

## 🛠️ Tecnologias e Especificações

*   **Framework:** Angular 19
*   **UI Component Library:** Angular Material
*   **Estilização:** SCSS (Sass) com suporte a Temas e Design Responsivo
*   **Gerenciamento de Estado:** RxJS
*   **Testes:** Jasmine

## 🖥️ Requisitos do Ambiente

Para rodar o projeto localmente, você precisará ter instalado:

### 1. Node.js
Recomendado a versão **18.x ou superior** (LTS).
*   [Download Node.js](https://nodejs.org/)
*   **Verificação:** `node -v`

### 2. Angular CLI
Interface de linha de comando para o Angular.
*   **Instalação:** `npm install -g @angular/cli`
*   **Verificação:** `ng v`

## 🚀 Como Rodar a Aplicação

Siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <https://github.com/luisrenerio/angular-goldenraspberryawards-worstmovie>
    cd angular-goldenraspberryawards-worstmovie
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    ng serve
    ```

4.  **Acesse o Dashboard:**
    Abra o navegador em `http://localhost:4200`.


## 🧪 Testes Unitários

Para garantir a qualidade dos componentes e serviços, execute os testes com:
```bash
ng test
