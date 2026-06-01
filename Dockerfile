# ===== Build =====
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ===== Runtime =====
FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
# Apenas dependências de produção (express + runtime Angular SSR)
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
# Saída do build (browser + server)
COPY --from=build /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/gstarcad-site/server/server.mjs"]
