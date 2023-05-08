# ohmycodes

## Getting Started

1. Create empty `live.db` in `server` directory:

```shell
# On Windows:
fsutil file createNew server/live.db 0
# On Mac, or Linux:
touch server/live.db
```

2. Copy .env.sample to .env and fill in the values:

```shell
cp .env.sample .env
```

3. Launch the frontend and server:

```shell
yarn dev      # Frontend
go run app.go # Server
```

4. Or, use docker compose to launch both:

```shell
docker-compose run
```