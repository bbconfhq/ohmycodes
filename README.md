# ohmycodes

1. Create empty `live.db` in `server`

On Windows:
```shell
fsutil file createNew server/live.db 0
```

On Mac, or Linux:
```shell
touch server/live.db
```

2. Using `docker-compose` to launch

```shell
docker-compose up --build
```