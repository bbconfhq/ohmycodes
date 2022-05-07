FROM golang:1.18-alpine
WORKDIR /app

RUN apk add gcc musl-dev dumb-init

COPY . .
RUN go mod download

# RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o app .
RUN go build -o /server

RUN mkdir /static
COPY ./static /static

EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/server", "--prod"]