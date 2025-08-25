package main

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)

// Student struct
 type Product struct {
	ID       string  `json:"id"`
	Name     string  `json:"name"`
	Type    string  `json:"type"`
	Price     int     `json:"price"`
	Stock      int `json:"stock"`
 }
 
 // In-memory database (ในโปรเจคจริงใช้ database)
 var Products = []Product{
	{ID: "P001", Name: "รองเท้าผ้าใบ Nike Air", Type: "รองเท้า", Price: 2590, Stock: 15},
	{ID: "P002", Name: "กระเป๋าเป้ Anello", Type: "กระเป๋า", Price: 1290, Stock: 8},
	{ID: "P003", Name: "เสื้อยืด Uniqlo U", Type: "เสื้อผ้า", Price: 390, Stock: 25},
	{ID: "P004", Name: "หูฟัง Bluetooth Sony", Type: "อิเล็กทรอนิกส์", Price: 1890, Stock: 12},
	{ID: "P005", Name: "สมุดโน้ต Muji A5", Type: "เครื่องเขียน", Price: 65, Stock: 100},
	{ID: "P006", Name: "ขวดน้ำเก็บอุณหภูมิ", Type: "ของใช้", Price: 450, Stock: 30},
	{ID: "P007", Name: "ลิปสติก MAC Ruby Woo", Type: "เครื่องสำอาง", Price: 990, Stock: 20},
	{ID: "P008", Name: "นาฬิกา Casio G-Shock", Type: "เครื่องประดับ", Price: 3500, Stock: 5},
	{ID: "P009", Name: "กาแฟสำเร็จรูป Nescafe", Type: "อาหาร/เครื่องดื่ม", Price: 120, Stock: 60},
	{ID: "P010", Name: "โทรศัพท์ Samsung A15", Type: "อิเล็กทรอนิกส์", Price: 6990, Stock: 10},
 }

func getProducts(c *gin.Context){
	Type := c.Query("type")
	
	if Type != "" {
		filter := []Product{}
		for _, Product := range Products{
			if fmt.Sprint(Product.Type) == Type {
				filter = append(filter, Product)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, Products)
}

 func main() {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context){
		c.JSON(200, gin.H{"message" : "healthy"})
	})

	api := r.Group("/api/v1")
	{
	api.GET("/products", getProducts)
	}
	

	r.Run(":8080")
 }