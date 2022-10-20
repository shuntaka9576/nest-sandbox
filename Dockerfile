FROM node:16.13.1-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build && npm prune --production


FROM node:16.13.1-alpine

ENV PORT=3000
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]
