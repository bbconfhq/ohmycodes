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

2. Copy .env.sample to .env

```shell
cp .env.sample .env
```

3. Launch server each

```shell
yarn dev      # Frontend
go run app.go # Server
```

4. Or, use docker

```shell
docker-compose run
```