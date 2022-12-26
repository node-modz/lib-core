FROM node:16.15.1
RUN mkdir /app
WORKDIR /app
RUN npm install -g typescript
#ADD ["./package.json", "./package-lock.json", "./tsconfig.json", "/app/"]
#RUN npm install
#ADD . /app
#CMD ["bash",  "-c",  "npm run start"]

