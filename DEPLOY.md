# Publicar no EasyPanel

O site é SSR (Node) e já tem `Dockerfile`. A forma mais simples é **GitHub + Dockerfile**.

## 1. Antes de publicar (preencher dados reais)
- `src/content/company.ts` → WhatsApp, e-mail, telefone, `url` (seu domínio).
- `scripts/generate-seo.mjs` → `BASE_URL` igual ao `url` acima.
- `src/content/products.ts` → conferir preços.
- `public/og-default.svg` → trocar por um PNG 1200×630 (opcional).

## 2. Enviar o código para o GitHub
No diretório `F:/dev/gstarcad`:
```bash
git init
git add .
git commit -m "Site GstarCAD"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/gstarcad-site.git
git push -u origin main
```

## 3. Criar o App no EasyPanel
1. **Project** → **+ Service** → **App**.
2. **Source**: GitHub → selecione o repositório `gstarcad-site` (branch `main`).
3. **Build**: tipo **Dockerfile** (o EasyPanel detecta o `Dockerfile` na raiz).
4. **Deploy** — ele faz `npm ci`, `npm run build` e sobe o servidor.

## 4. Porta e domínio
- Em **Domains**, aponte para a porta **4000** (o servidor escuta em `PORT`, default 4000).
- Adicione seu domínio (ex.: `www.seudominio.com.br`) e ative HTTPS (Let's Encrypt).

## 4.1 Variáveis de ambiente (Environment)
Configure no EasyPanel (aba **Environment** do App):

| Variável | Obrigatória | Descrição |
|---|---|---|
| `AGENDOR_TOKEN` | **Sim** (p/ CRM) | Token da API do Agendor. Sem ele, os formulários só usam WhatsApp. |
| `AGENDOR_FUNNEL_ID` | Não | ID do funil. Default `891975` (Funil de Vendas). |
| `AGENDOR_STAGE_ID` | Não | ID da raia. Default `3780288` (Contato). |
| `PORT` | Não | Porta do servidor. Default `4000`. |

> O token **não** está no código (repo é público). Ele é lido só pelo servidor.
> Os formulários (proposta, download, pop-up de saída) enviam o lead para `/api/lead`,
> que cria a **Pessoa** + **Negócio** na raia **Contato** do **Funil de Vendas** do Agendor.

## 5. Atualizações
A cada `git push`, clique em **Deploy** (ou ative deploy automático). O sitemap/llms.txt
são regenerados no build automaticamente.

---

### Alternativa: build local + registry
```bash
docker build -t gstarcad-site .
docker run -p 4000:4000 gstarcad-site   # testar local em http://localhost:4000
```
Depois faça push para um registry e, no EasyPanel, use **App → Source: Docker Image**.
