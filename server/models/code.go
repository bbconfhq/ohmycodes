package models

import (
	"time"
)

type Code struct {
	ID        string    `gorm:"primaryKey"                 json:"id"`
	Ip        string    `gorm:"not null"                   json:"ip"      validate:"required,ip4_addr"`
	Title     string    `gorm:"type:varchar(191);not null" json:"title"   validate:"required,max=191"`
	Content   string    `gorm:"not null"                   json:"content" validate:"required"`
	CreatedAt time.Time `gorm:"not null"                   json:"created_at"`
	ExpiredAt time.Time `gorm:"not null"                   json:"expired_at"`
}
