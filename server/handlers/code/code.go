package code

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gwanryo/ohmycodes/models"
	"github.com/gwanryo/ohmycodes/repository"
	"github.com/gwanryo/ohmycodes/util"
	gonanoid "github.com/matoous/go-nanoid/v2"
)

func GetList(c *fiber.Ctx) error {
	success := true

	result, err := repository.Code.GetRecent()
	if err != nil {
		success = false
	}

	return c.JSON(fiber.Map{
		"success": success,
		"code":    result,
	})
}

func GetOne(c *fiber.Ctx) error {
	success := true

	code := &models.Code{ID: c.Params("uid")}
	result, err := repository.Code.Get(code)
	if err != nil {
		success = false
	}

	return c.JSON(fiber.Map{
		"success": success,
		"code":    result,
	})
}

func Post(c *fiber.Ctx) error {
	success := true

	nid, _ := gonanoid.New(10)
	ip := c.FormValue("Ip", "127.0.0.1")

	code := &models.Code{
		ID:      nid,
		Ip:      util.Ip2Int64(ip),
		Title:   c.FormValue("title", nid),
		Content: c.FormValue("content"),
	}

	err := repository.Code.Create(code)
	if err != nil {
		success = false
	}

	return c.JSON(fiber.Map{
		"success": success,
		"code":    code,
	})
}
