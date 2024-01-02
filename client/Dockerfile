# Stage 1
FROM node:18 as build-stage
WORKDIR /client
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
EXPOSE 3000
RUN npm run build
CMD npm run start

# Stage 2
# FROM nginx:1.17.0-alpine
# COPY --from=build-stage /client/out /usr/share/nginx/html
# EXPOSE 3000
# CMD nginx -g 'daemon off;'


# Stage 2 - the production environment
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /client/build /usr/share/nginx/html
# EXPOSE $REACT_DOCKER_PORT
# CMD ["nginx", "-g", "daemon off;"]