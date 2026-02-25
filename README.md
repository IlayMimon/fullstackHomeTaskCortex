# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # fullstackHomeTaskCortex

    This repository contains a React + Vite frontend and Firebase Cloud Functions (TypeScript).

    ## Prerequisites

    - Node.js 18+ (the `functions` folder targets Node 24 for production; use a recent Node locally)
    - npm
    - Firebase CLI: `npm install -g firebase-tools`

    ## Install dependencies

    From the project root:

    ```bash
    npm install
    ```

    Then install functions dependencies (inside `functions`):

    ```bash
    cd functions
    npm install
    cd ..
    ```

    ## Run frontend locally

    Start the Vite dev server from the project root:

    ```bash
    npm run dev
    ```

    Open the URL Vite prints (commonly http://localhost:5173).

    ## Run Firebase Functions locally (emulator)

    From the `functions` folder run the `serve` script which builds TypeScript and starts the emulator:

    ```bash
    cd functions
    npm run serve
    ```

    This compiles TypeScript into `lib/` and starts the Firebase emulator for functions. The emulator output shows local endpoints and logs.

    For an interactive functions shell you can run:

    ```bash
    cd functions
    npm run shell
    ```

    ## Build & deploy

    - Build the frontend for production:

    ```bash
    npm run build
    ```

    - Deploy functions to Firebase (requires `firebase login` and project selection):

    ```bash
    cd functions
    npm run deploy
    ```

    ## Useful scripts

    - Frontend dev: `npm run dev`
    - Frontend build: `npm run build`
    - Frontend tests: `npm run test`
    - Functions serve (emulator): `cd functions && npm run serve`
    - Functions build: `cd functions && npm run build`

    ## Troubleshooting

    - If the emulator fails to start, make sure the Firebase CLI is installed and no other process uses the required ports.
    - If TypeScript reports missing module types for frontend libs (for example `@ant-design/plots`), add `src/types/ant-design-plots.d.ts` with:

    ```ts
    declare module '@ant-design/plots';
    ```

    ## Optional improvements I can add

    - Add a `Contributing` or `Environment` section with required env vars and examples.
    - Add a script to run frontend + functions concurrently (using `concurrently` or `npm-run-all`).

    Tell me which of the optional improvements you'd like and I'll add them.
````
