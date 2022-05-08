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

2. Using `docker-compose` to launch for development

```shell
docker-compose up --build -f docker-compose.dev.yml
```

3. Or, we offer docker images in Docker Hub

```shell
docker-compose build -f docker-compose.yml
```


## Push to Docker Hub
How to push latest image to Docker Hub

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
