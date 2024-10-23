# Base image
FROM node:20-alpine as base 

WORKDIR /data
COPY package.json package-lock.json /data/
ENV PATH=/data/node_modules/.bin:$PATH

EXPOSE 3000

# Development dependencies
FROM base as development

ENV NODE_ENV=development
RUN npm install --include=dev

USER node
WORKDIR /data/app

# Utiliser CMD pour le développement
CMD ["npm", "run", "dev"]

# Production image
FROM base as build

RUN npm install

COPY . /data/app
WORKDIR /data/app

RUN npm run build

# Create the server image
FROM node:20-alpine as production 
ENV NODE_ENV=production

COPY --from=build /data/app/dist /build/dist
COPY --from=build /data/app/package.json /data/app/package-lock.json /build/

WORKDIR /build

RUN npm install --only=production


USER node

# Utiliser ENTRYPOINT pour le démarrage en production
ENTRYPOINT ["npm", "run", "preview"]
