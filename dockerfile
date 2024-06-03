# Etapa de construção
# Use uma imagem Node.js para construir o aplicativo
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produção
# Use uma imagem Nginx para servir o aplicativo
FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
# Copie o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
