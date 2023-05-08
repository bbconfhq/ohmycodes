package code

import (
	"github.com/bbconfhq/ohmycodes/models"
	"github.com/bbconfhq/ohmycodes/repository"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"net"
	"time"
)

type Response struct {
	Data  interface{}
	Error int
}

var (
	Validator *validator.Validate
)

func GetList(c *fiber.Ctx) error {
	status, errs := fiber.StatusOK, 0

	result, err := repository.Code.GetRecent()
	if err != nil {
		status, errs = fiber.StatusInternalServerError, 1
		result = nil
	}

	return c.Status(status).JSON(Response{
		Data:  result,
		Error: errs,
	})
}

func GetOne(c *fiber.Ctx) error {
	status, errs := fiber.StatusOK, 0

	code := &models.Code{ID: c.Params("uid")}
	result, err := repository.Code.Get(code)
	if err != nil {
		status, errs = fiber.StatusInternalServerError, 1
		result = nil
	}

	return c.Status(status).JSON(Response{
		Data:  result,
		Error: errs,
	})
}

func Post(c *fiber.Ctx) error {
	status, errs := fiber.StatusOK, 0
	result := &models.Code{}

	if err := c.BodyParser(result); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(Response{
			Data:  nil,
			Error: 1,
		})
	}

	if Validator == nil {
		Validator = validator.New()
	}

	if err := Validator.Struct(result); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(Response{
			Data:  nil,
			Error: 2,
		})
	}

	nid, err := gonanoid.New(10)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(Response{
			Data:  nil,
			Error: 3,
		})
	}

	ips := c.IPs()
	if len(ips) == 0 {
		ips = append(ips, c.IP())
	}
	ip := net.ParseIP(ips[0])
	maskedIp := ip.Mask(net.IPv4Mask(0xFF, 0xFF, 0, 0)).String()

	result = &models.Code{
		ID:        nid,
		Ip:        maskedIp,
		Name:      result.Name,
		Title:     result.Title,
		Content:   result.Content,
		Language:  result.Language,
		ExpiredAt: time.Now().AddDate(0, 0, 7),
	}

	err = repository.Code.Create(result)
	if err != nil {
		status, errs = fiber.StatusInternalServerError, 4
		result = nil
	}

	return c.Status(status).JSON(Response{
		Data:  result,
		Error: errs,
	})
}
