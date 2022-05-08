# ohmycodes-server

## Development

### Start the application

```bash
go run app.go
```

### Use local container

```
# Clean packages
make clean-packages

# Generate go.mod & go.sum files
make requirements

# Generate docker image
make build

# Generate docker image with no cache
make build-no-cache

# Run the projec in a local container
make up

# Run local container in background
make up-silent

# Stop container
make stop

# Start container
make start
```

## Production

```bash
docker build -t ohmycodes .
docker run -d -p 3000:3000 ohmycodes
```

Go to http://localhost:3000:
