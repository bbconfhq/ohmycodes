package repository

import (
	"github.com/gwanryo/ohmycodes/models"
	"gorm.io/gorm"
	"time"
)

type CodeRepo interface {
	Create(data *models.Code) error
	Get(data *models.Code) (*models.Code, error)
	GetRecent() (*[]models.Code, error)
}

type codeRepoImpl struct {
	db *gorm.DB
}

var (
	repo *codeRepoImpl
)

func InitializeCodeRepo(db *gorm.DB) CodeRepo {
	repo = &codeRepoImpl{db: db}
	return repo
}

func (c *codeRepoImpl) Create(data *models.Code) error {
	code := models.Code{
		ID:      data.ID,
		Ip:      data.Ip,
		Title:   data.Title,
		Content: data.Content,
	}
	result := c.db.Create(&code)
	return result.Error
}

func (c *codeRepoImpl) Get(data *models.Code) (*models.Code, error) {
	result := c.db.First(&data)
	return data, result.Error
}

func (c *codeRepoImpl) GetRecent() (*[]models.Code, error) {
	var codes *[]models.Code
	lastWeek := time.Now().AddDate(0, 0, -7)
	result := c.db.
		Where("created_at >= ?", lastWeek).
		Order("created_at desc").
		Find(&codes)
	if result.Error != nil {
		return nil, result.Error
	}
	return codes, nil
}
