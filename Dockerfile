FROM node:16-alpine as builder

ARG NUXT_ENV_WS_URL
ARG NUXT_ENV_API_URL
ARG NUXT_ENV_GOOGLE_LOGIN_URL
ARG NUXT_ENV_FACEBOOK_LOGIN_URL
ARG NODE_ENV

RUN mkdir /app

COPY ./package*.json /app/

WORKDIR /app

RUN npm install

COPY . .
RUN npm run generate

FROM nginx:1.19.0
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./.docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
