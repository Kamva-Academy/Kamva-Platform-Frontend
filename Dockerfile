FROM node:latest as build
WORKDIR /app

ARG REACT_APP_SENTRY_DNS
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID

COPY ./package.json ./yarn.lock ./
RUN yarn --production
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN yarn run build

FROM nginx:latest as production
ENV SERVER_NAME = _
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx
COPY ./nginx.conf.template /etc/nginx/templates/
COPY --from=build /app/build /var/www/public
