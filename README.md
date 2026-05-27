# Endo Companion – Diário de Sintomas

Aplicação em React + Vite para registro de sintomas relacionados à endometriose.[web:181]

## Clonar o projeto

```bash
git clone https://github.com/<seu-usuario>/<nome-do-repo>.git
cd <nome-do-repo>
```

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse no navegador o endereço exibido no terminal (geralmente `http://localhost:5173`).[web:181]

## Deploy no GitHub Pages

1. Ajustar `base` no `vite.config.js`:

```js
export default defineConfig({
  // ...
  base: "/<nome-do-repo>/",
});
```

2. Instalar `gh-pages` (se ainda não tiver):

```bash
npm install gh-pages --save-dev
```

3. Adicionar scripts no `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Rodar o deploy:

```bash
npm run deploy
```

5. No GitHub, em **Settings → Pages**, selecionar:
   - Source: **Deploy from a branch**
   - Branch: `gh-pages`, pasta `/ (root)`.[web:58][web:71]