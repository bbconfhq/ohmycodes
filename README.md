# ohmycodes

## Getting Started

1. Create empty `live.db` in `server`

On Windows:
```shell
fsutil file createNew server/live.db 0
```

On Mac, or Linux:
```shell
touch server/live.db
```

2. We offer docker images in Docker Hub

```shell
docker-compose build -f docker-compose.yml
```

3. Or, launch server each

```shell
yarn dev      # Frontend
go run app.go # Server
```

## Push to Docker Hub
How to push latest image to Docker Hub

Using `docker-compose` to build image

```shell
docker-compose up --build -f docker-compose.dev.yml
```

### Frontend
1. Tag latest image

```shell
docker image tag ohmycodes_frontend:latest gwanryo/ohmycodes-frontend:latest
```

2. Push it

```shell
docker push gwanryo/ohmycodes-frontend:latest
```

### Server
1. Tag latest image

```shell
docker image tag ohmycodes_server:latest gwanryo/ohmycodes-server:latest
```

2. Push it

```shell
docker push gwanryo/ohmycodes-server:latest
```
