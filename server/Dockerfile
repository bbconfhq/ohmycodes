FROM golang:1.18-alpine
WORKDIR /app

RUN apk add gcc musl-dev

COPY . .
RUN go mod download

# RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o app .
RUN go build -o /server

RUN mkdir /static
COPY ./static /static

EXPOSE 3000

CMD ["/server"]