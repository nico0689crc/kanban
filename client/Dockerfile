# Stage 1
FROM node:18-alpine As build-stage
WORKDIR /client
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE $REACT_DOCKER_PORT

RUN npm run build
CMD npm run start