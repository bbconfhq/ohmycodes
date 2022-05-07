package models

import (
	"time"
)

type Code struct {
	ID        string `gorm:"primaryKey"`
	Ip        int64  `gorm:"not null"`
	Title     string `gorm:"type:varchar(191);not null"`
	Content   string `gorm:"not null"`
	CreatedAt time.Time
}
