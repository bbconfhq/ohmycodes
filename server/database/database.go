package database

import (
	"fmt"
	"github.com/bbconfhq/ohmycodes/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
)

// Connect with database
func Connect(dsn string) *gorm.DB {
	// define error here to prevent overshadowing the global DB
	var err error

	// Create todos sqlite file & Config GORM config
	// GORM performs single create, update, delete operations in transactions by default to ensure database data integrity
	db, err = gorm.Open(sqlite.Open(dsn), &gorm.Config{})

	// Connect to database
	if err != nil {
		// Database was connected
		panic("failed to connect database")
	}

	fmt.Println("Database successfully connected")

	// AutoMigrate run auto migration for gorm model
	err = db.AutoMigrate(&models.Code{})

	if err != nil {
		panic("Database migration failed")
	}

	fmt.Println("Connected with Database")

	return db
}
