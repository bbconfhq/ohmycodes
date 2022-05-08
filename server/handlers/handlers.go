package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gwanryo/ohmycodes/handlers/code"
)

func Initialize(app *fiber.App) {
	// Create a /api/v1 endpoint
	v1 := app.Group("/api/v1", logger.New())

	c := v1.Group("/code", logger.New())
	c.Get("/", code.GetList)
	c.Post("/", code.Post)
	c.Get("/:uid", code.GetOne)
}
