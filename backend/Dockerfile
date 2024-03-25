#########################################
#   DEVELOPMENT STAGE
#########################################
FROM node:21-alpine as development

RUN apk add --no-cache libc6-compat

ENV NODE_ENV development

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm install

COPY --chown=node:node . .

USER node

CMD ["npm", "run", "start"]


#########################################
#   BUILD STAGE
#########################################

FROM node:21-alpine as build

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

RUN npm ci --production && npm cache clean --force

USER node

#########################################
#   PRODUCTION STAGE
########################################

FROM node:21-alpine as production

WORKDIR /app

RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules

USER node

CMD ["node", "dist/final.js"]
