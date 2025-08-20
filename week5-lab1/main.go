package main

import(
	"github.com/gin-gonic/gin"
)

type User struct{
	ID string `jason:"id"`
	Name string `jason:"name"`
} 

func main()  {
	r := gin.Default()

	r.GET("/users" , func(c *gin.Context) {
		user := []User{{ID:"1", Name: "Nutkamol"}}
		c.JSON(200,user)
	})

	r.Run(":8080")
}