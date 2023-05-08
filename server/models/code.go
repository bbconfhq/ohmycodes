package models

import (
	"time"
)

type Code struct {
	ID        string    `gorm:"primaryKey"                  json:"id"`
	Ip        string    `gorm:"not null;default:'0.0.0.0'"  json:"ip"`
	Name      string    `gorm:"type:varchar(191);not null"  json:"name"     validate:"required;max=191"`
	Title     string    `gorm:"type:varchar(191);not null"  json:"title"    validate:"required;max=191"`
	Content   string    `gorm:"not null"                    json:"content"  validate:"required"`
	Language  string    `gorm:"not null"                    json:"language" validate:"required;max=191"`
	CreatedAt time.Time `gorm:"not null"                    json:"created_at"`
	ExpiredAt time.Time `gorm:"not null"                    json:"expired_at"`
}
