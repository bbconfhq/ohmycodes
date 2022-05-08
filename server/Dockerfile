FROM golang:1.18-alpine
WORKDIR /app

RUN apk add gcc musl-dev dumb-init

COPY . .
RUN go mod download
RUN go build -o ./server

EXPOSE 4000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/app/server", "-prod"]