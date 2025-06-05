FROM node:18-alpine as builder

RUN npm install -g @angular/cli@19
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .


EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]