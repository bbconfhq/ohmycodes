package main

import (
	"github.com/gwanryo/ohmycodes/database"
	"github.com/gwanryo/ohmycodes/handlers"
	"github.com/gwanryo/ohmycodes/repository"
	"github.com/joho/godotenv"
	"os"

	"flag"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	port = flag.String("port", ":3000", "Port to listen on")
	prod = flag.Bool("prod", false, "Enable prefork in Production")
)

func main() {
	flag.Parse()

	if err := godotenv.Load(".env"); err != nil {
		panic(err)
	}

	dsn := os.Getenv("DB_DSN")
	db := database.Connect(dsn)
	repository.Initialize(db)

	// Create fiber app
	app := fiber.New(fiber.Config{
		Prefork: *prod, // go run app.go -prod
	})

	// Middleware
	app.Use(recover.New())
	app.Use(logger.New())

	handlers.Initialize(app)

	// Setup static files
	app.Static("/", "./static/public")

	// Listen on port 3000
	log.Fatal(app.Listen(*port))
}
