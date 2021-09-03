FROM node:12-alpine3.12

# Correr comando dentro del container
RUN mkdir /app
ENV NODE_ENV production
# ubicarme en el directorio app dentro del container
WORKDIR /app

# Copiar los json en el directorio app
COPY package.json yarn.lock .sequelizerc .env ./
RUN yarn install

# Exponer aplicación en el puerto 3000 "de docker"
EXPOSE 3000