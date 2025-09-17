package main

import (
	"fmt"
	"os"
	"database/sql"
	_"github.com/lib/pq"
	"log"
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
		log.Fatal("failed to conect to database")
	}

	log.Println("succesfully to connected to database")
}

func main(){
	initDB()
}