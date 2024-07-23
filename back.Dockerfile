FROM node:22

WORKDIR /app

COPY package*.json ./

# Instalar as dependências
RUN npm install

COPY . .

CMD ["npx", "json-server", "db.json", "--port", "3001","--host","0.0.0.0", "--delay" ,"2000"]
