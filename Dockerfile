FROM node:11-alpine
WORKDIR /app
COPY . .
RUN npm install --quiet
EXPOSE 3000
CMD npm run start