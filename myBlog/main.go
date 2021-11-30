package main

import (
	"html/template"
	"net/http"
)

func main() {
	//mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("static"))

	port := "8080"
	mux := http.NewServeMux()
	mux.HandleFunc("/", indexHandler)
	mux.Handle("/static/", http.StripPrefix("/static/", fs))
	//mux.HandleFunc("/")
	//http.Handle("/static", fs)
	http.ListenAndServe(":"+port, mux)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	tpl := template.Must(template.ParseFiles("static/index.html"))
	tpl.Execute(w, nil)
}
