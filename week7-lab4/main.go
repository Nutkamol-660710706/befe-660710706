package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"github.com/gin-gonic/gin"
	_"github.com/lib/pq"
)

func getEnv(key, defaultValue string) string{
	if value := os.Getenv(key); value != ""{
		return  value
	}
	return defaultValue
}

var db *sql.DB

func initDB(){

	var err error

	host := getEnv("DB_HOST", "")
	name := getEnv("DB_NAME", "")
	user := getEnv("DB_USER", "")
	password := getEnv("DB_PASSWORD", "")
	port := getEnv("DB_PORT", "")

	conSt := fmt.Sprintf("host=%s name=%s user=%s password=%s port=%s sslmode=disable", host, name, user, password, port)

	db, err = sql.Open("postgres", conSt)
	
	if err != nil{
		log.Fatal("failed to open database")
	}

	err = db.Ping()
	log.Println(err)
	if err != nil{
		log.Fatal("failed to conect to database", err)
	}

	log.Println("succesfully to connected to database")
}



func main() {
	initDB()
	
	r := gin.Default()

	r.GET("/health", func(c *gin.Context){
		err := db.Ping()
		if err !=nil{
			c.JSON(http.StatusServiceUnavailable, gin.H{"message" : "UnHealthy" , "error":err})
		}
		c.JSON(200, gin.H{"message" : "healthy"})
		
	})

	// api := r.Group("/api/v1")
	// {
	// 	api.GET("/books", getBooks)
	// 	api.GET("/books/:id", getBook)
	// 	api.POST("/books", createBook)
	// 	api.PUT("/books/:id", updateBook)
	// 	api.DELETE("/books/:id", deleteBook)
	// }

	r.Run(":8080")
}
