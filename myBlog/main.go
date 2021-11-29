package main

import (
	"html/template"
	"net/http"
)

func main() {
	//mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("static"))

	port := "8080"
	http.HandleFunc("/", indexHandler)
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	//http.Handle("/static", fs)
	http.ListenAndServe(":"+port, nil)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	tpl := template.Must(template.ParseFiles("static/index.html"))
	tpl.Execute(w, nil)
}
