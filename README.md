
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


<br />

---

### Run Development Server with Docker


1. Just run:
    ```bash
    npm dev:docker
    ```
<br />

2. Open [http://localhost:3001](http://localhost:3001) in your browser.


<br />

### Run Developer Server with PNPM

1. Install PNPM `v8.x`:
    - Option #1: Install PNPM globally with NPM
      ```bash
      npm install -g pnpm@8.x
      ```

    - Option #2: If you have at least Node `v18.x` just use corepack within the project directory to use PNPM locally
      ```bash
      corepack enable && corepack install
      ``` 
<br />

2. Install dependencies
    ```bash
    pnpm install
    ```
<br />

4. Run dev server
    ```bash
    pnpm dev
    ```
<br />

5. Open [http://localhost:3001](http://localhost:3001) in your browser.