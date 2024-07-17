FROM ubuntu:latest
LABEL authors="artur"

ENTRYPOINT ["top", "-b"]

# Use uma imagem Node.js como base
FROM node:18

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Copie o arquivo de configuração do Prisma
COPY prisma/schema.prisma ./prisma/

# Instale o Prisma CLI
RUN npm install prisma --save-dev

# Gere o cliente Prisma
RUN npx prisma generate

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]