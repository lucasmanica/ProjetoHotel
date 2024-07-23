FROM node:22

WORKDIR /app

COPY package*.json ./

# Instalar as dependências
RUN npm install

COPY . .

ENTRYPOINT ["bash","run.sh"]
