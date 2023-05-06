package handlers

import (
	"github.com/bbconfhq/ohmycodes/handlers/code"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Initialize(app *fiber.App) {
	// Create a /api/v1 endpoint
	v1 := app.Group("/api/v1", logger.New())

	c := v1.Group("/code", logger.New())
	c.Get("/", code.GetList)
	c.Post("/", code.Post)
	c.Get("/:uid", code.GetOne)
}
