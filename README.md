# GCE — Gestão de Certificados e Estudantes

Aplicação **desktop** (Windows / macOS / Linux) construída sobre:

- [Electron](https://www.electronjs.org/) — empacotamento desktop
- [Vite](https://vitejs.dev/) — bundler e dev server
- [React 19](https://react.dev/) + [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS v4](https://tailwindcss.com/) + componentes inspirados em [shadcn/ui](https://ui.shadcn.com)

> Não há servidor web, SSR ou cloud — toda a aplicação corre localmente dentro do Electron.

## Requisitos

- Node.js **20+**
- npm **10+**

## Scripts

| Comando             | Descrição                                                                |
| ------------------- | ------------------------------------------------------------------------ |
| `npm run dev`       | Inicia o Vite e o Electron em paralelo (hot reload).                     |
| `npm run dev:vite`  | Apenas o Vite (útil para depurar a UI no browser em `localhost:8080`).   |
| `npm run build`     | Compila o frontend para `dist/`.                                          |
| `npm run start`     | Faz o build e arranca o Electron a apontar para o `dist/`.                |
| `npm run lint`      | Executa o ESLint sobre todo o código.                                     |
| `npm run format`    | Formata o projecto com Prettier.                                          |

## Estrutura do projecto

```
.
├── electron/                # Processo principal e preload do Electron
│   ├── main.cjs
│   └── preload.cjs
├── src/
│   ├── main.tsx             # Bootstrap do React (SPA)
│   ├── router.tsx           # Configuração do TanStack Router
│   ├── routes/              # Rotas baseadas em ficheiros
│   │   ├── __root.tsx       # Layout raiz + 404 / error boundary
│   │   ├── index.tsx        # Splash screen → redirecciona para /login
│   │   ├── login.tsx        # Ecrã de autenticação
│   │   ├── _app.tsx         # Layout autenticado (sidebar + topbar)
│   │   ├── _app.dashboard.tsx
│   │   ├── _app.students.tsx
│   │   ├── _app.issuance.tsx
│   │   ├── _app.validation.tsx
│   │   ├── _app.history.tsx
│   │   └── _app.settings.tsx
│   ├── components/
│   │   ├── layout/          # AppSidebar, AppTopbar, DesktopBridge
│   │   └── ui/              # Primitivas reutilizáveis (button, popover)
│   ├── lib/                 # Utilidades partilhadas
│   │   ├── desktop.ts       # Ponte tipada para o preload do Electron
│   │   ├── use-document-title.ts
│   │   └── utils.ts
│   ├── styles.css           # Tailwind v4 + design tokens
│   └── routeTree.gen.ts     # Auto-gerado pelo @tanstack/router-plugin
├── index.html               # Ponto de entrada SPA
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Fluxo da aplicação

1. **Splash screen** (`/`) — exibida ao abrir o programa.
2. Após cerca de 1.8s, navega automaticamente para o **ecrã de login** (`/login`).
3. Ao autenticar, o utilizador é levado para o **dashboard** (`/dashboard`),
   dentro do layout aplicacional com sidebar e topbar.
4. A navegação pode ser feita pela sidebar, topbar ou pelo menu nativo do
   Electron (atalhos `Ctrl/⌘+1` a `Ctrl/⌘+5`).

## Convenções

- **Path alias** `@/` aponta para `src/` (definido em `tsconfig.json` e
  `vite-tsconfig-paths`).
- **Cores e raios** ficam em `src/styles.css` como variáveis OKLCH —
  use sempre os tokens (`bg-primary`, `text-muted-foreground`, etc.) em vez de
  valores literais.
- **Componentes** reutilizáveis vivem em `src/components/`; layout em
  `components/layout/`, primitivas de UI em `components/ui/`.
- **Lógica** isolada em `src/lib/` (sem JSX).
