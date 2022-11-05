FROM node:latest as build-stage
WORKDIR /app
COPY ./apn-frontend/package*.json ./
RUN npm install
COPY ./apn-frontend .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY ./apn-devops/nginx.conf /etc/nginx/nginx.conf
