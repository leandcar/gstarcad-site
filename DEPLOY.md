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
| `DRIVE_FILE_ID` | Não | ID do instalador no Google Drive (usado em `/download/trial`). Tem prioridade sobre `site-config`. |
| `FILES_DIR` | Não | (Alternativa ao Drive) Pasta de instaladores servidos em `/arquivos` (volume). Ex.: `/data/arquivos`. |

> O token **não** está no código (repo é público). Ele é lido só pelo servidor.
> Os formulários (proposta, download, pop-up de saída) enviam o lead para `/api/lead`,
> que cria a **Pessoa** + **Negócio** na raia **Contato** do **Funil de Vendas** do Agendor.

## 4.2 Subdomínios de campanha (`campanha.tltec.com.br`)

Cada landing de campanha pode ser servida em um **subdomínio próprio**, na raiz `/`,
mantendo a URL bonita (ex.: `linha2026.tltec.com.br`). O mesmo conteúdo continua
acessível em `tltec.com.br/campanhas/<slug>` (essa é a URL canônica para SEO).

**Como criar uma nova campanha + subdomínio:**

1. **Conteúdo** — em `src/content/campaigns.ts`, adicione/edite a campanha e defina o
   apelido do subdomínio:
   ```ts
   { slug: 'linha-gstarcad-2026', subdomain: 'linha2026', /* ... */ }
   ```
   O subdomínio aceita **o `subdomain`** (`linha2026`) **ou o próprio `slug`**
   (`linha-gstarcad-2026`). Confirme que `baseDomain` em `src/content/site-config.ts`
   é o seu domínio real (`tltec.com.br`).

2. **DNS** — crie um registro apontando o subdomínio para o mesmo servidor do app
   (CNAME para o host do EasyPanel, ou A para o IP). Mais prático: um **wildcard**
   `*.tltec.com.br` cobre todos os subdomínios de uma vez.

3. **EasyPanel** — no mesmo App, aba **Domains**, adicione o domínio
   `linha2026.tltec.com.br` (porta **4000**) e ative HTTPS. Com wildcard de DNS, basta
   adicionar cada subdomínio aqui conforme for criando campanhas (o Let's Encrypt emite
   o certificado por domínio).

4. **Deploy** — faça `git push` e **Deploy**. Pronto: `linha2026.tltec.com.br` abre a
   campanha; `tltec.com.br` continua mostrando a home.

> Como funciona: a raiz `/` é renderizada no servidor (SSR) e decide pelo cabeçalho
> `Host` se mostra a **home** (domínio principal) ou a **campanha** (subdomínio).
> Servidor e navegador usam a mesma lógica, então não há quebra de hidratação.

## 4.3 Domínios alternativos (apontam para a Home)

Além do principal, o site atende domínios alternativos/typo. Eles estão listados em
`src/content/site-config.ts` → `domains`:

```ts
domains: ['gstarcadoficial.com.br', 'gstarcade.com.br', 'gestarcad.com.br']
```

Para cada domínio alternativo:
1. **DNS** — aponte o apex `@` (e o `www`) para o IP do servidor. Para também ter
   campanhas nele, use um wildcard `*.dominio.com.br`.
2. **EasyPanel → Domains** — adicione `dominio.com.br` e `www.dominio.com.br`
   (porta **4000**, HTTPS) no mesmo App.

O apex e o `www` de qualquer domínio mostram a **Home**; subdomínios abrem a campanha
correspondente. As páginas usam `canonical` apontando para o domínio principal
(`COMPANY.url`), então não há problema de conteúdo duplicado nos buscadores.

> Para adicionar mais domínios no futuro, basta incluí-los no array `domains` e
> configurá-los no DNS/EasyPanel.

## 4.4 Instalador de avaliação (download via Google Drive)

O instalador (~507 MB) **não** vai no Git/Docker. Ele fica no **Google Drive** e o
servidor faz **proxy/stream** na rota `/download/trial` — o usuário baixa pela nossa
URL, sem sair da página e sem ver o Drive (a tela de "aviso de antivírus" é tratada
automaticamente; suporta retomada/Range).

> ⚠️ O "Provedor de Armazenamento → Google Drive" do EasyPanel é para **backups**, não
> serve este download. Use um Google Drive comum (pessoal/empresa).

1. **Subir e compartilhar** — envie o `GstarCAD2027EN_x64.exe` para o Google Drive.
   Clique com o botão direito → **Compartilhar** → "Acesso geral" = **Qualquer pessoa
   com o link** (papel: Leitor).
2. **Pegar o ID** — no link `https://drive.google.com/file/d/`**`<ID>`**`/view?...`,
   copie a parte `<ID>`.
3. **Configurar** — duas opções (a env tem prioridade):
   - **EasyPanel → Environment:** `DRIVE_FILE_ID=<ID>` (recomendado — troca sem rebuild); ou
   - `src/content/site-config.ts` → `trialDownload.driveId = '<ID>'`.
4. **Deploy** e teste: `https://www.gstarcadoficial.com.br/download/trial` deve baixar o `.exe`.

> Para publicar uma nova versão, suba o novo arquivo no Drive e atualize o `DRIVE_FILE_ID`
> (e o `name`/`size` em `site-config.ts`, se mudar).

### Alternativa: volume no EasyPanel
Se preferir não usar o Drive, dá para servir de um volume: monte `/data/arquivos`,
defina `FILES_DIR=/data/arquivos`, suba o `.exe` lá e aponte `trialDownload.url` para
`/arquivos/GstarCAD2027EN_x64.exe`.

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
