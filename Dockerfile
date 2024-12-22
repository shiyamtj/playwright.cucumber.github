FROM mcr.microsoft.com/playwright:v1.49.1-noble

ENV CI=true

COPY .  /app

WORKDIR /app

RUN chmod -R 755  /app