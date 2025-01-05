package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/newtonpp/urlshortener/handler"
	"github.com/newtonpp/urlshortener/store"
)

func main() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},                   // Allowed origins
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // Allowed methods
		AllowHeaders:     []string{"Content-Type", "Authorization"},           // Allowed headers
		AllowCredentials: true,                                                // Allow cookies
	}))

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "Hey Go URL Shortener",
		})
	})

	r.POST("/createshorturl", func(c *gin.Context) {

		handler.CreateShortUrl(c)
	})

	r.GET("/:shorturl", func(ctx *gin.Context) {
		handler.HandleShortUrlRedirect(ctx)
	})

	store.InitializeStore()

	err := r.Run(":8080")

	if err != nil {
		panic(fmt.Sprintln("Failed to start the web server", err))
	}
}
