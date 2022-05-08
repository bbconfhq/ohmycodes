package repository

import "gorm.io/gorm"

var (
	Code CodeRepo
)

func Initialize(database *gorm.DB) {
	Code = InitializeCodeRepo(database)
}
