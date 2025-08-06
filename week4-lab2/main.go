package main

import (
	"fmt"
)

func main()  {
	//var name string = "Nutkamol"
	var age int = 21

	email := "piriyatanasrub_n@silpakorn.edu"
	gpa := 3.77

	firstname , lastname := "Nutkamol" , "Piriyatanasrub"

	fmt.Printf("Name %s %s, age %d, email %s, gpa %.2f\n", firstname, lastname, age, email, gpa)
}