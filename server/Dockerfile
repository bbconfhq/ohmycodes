FROM golang:1.15 AS build
WORKDIR /go/src/server
COPY . .
RUN go mod download

# Builds the application as a staticly linked one, to allow it to run on alpine
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o app .

# Moving the binary to the 'final Image' to make it smaller
FROM alpine:latest
WORKDIR /app

RUN mkdir ./static
COPY ./static ./static
COPY --from=build /go/src/server/app .
EXPOSE 3000

CMD ["./app"]