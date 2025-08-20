package main

import (
	"github.com/gin-gonic/gin"
)

type User struct {
	ID string `jason:"id"`
	Name string `jason:"name"`
}

func getUsers(c *gin.Context){
	user := []User{{ID:"1", Name:"Nutkamol"}}
	
	c.JSON(200, user)
}

func main(){
	r := gin.Default()
	
	r.GET("/users", getUsers)

	r.Run(":8080")
}