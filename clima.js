const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});    

app.post("/", function(req, res){
    
    console.log("post received");
    
    const latitud = req.body.latitude;
    const longitud = req.body.longitude;
    const urlLatLon = "https://api.openweathermap.org/data/2.5/weather?lat="+latitud+"&lon="+longitud+"&units=metric&appid=3fc181ffc9d57a1d942c506b9af7f0ec";
    

    const nomeCidade = req.body.cidade;
    const urlCity = "https://api.openweathermap.org/data/2.5/weather?q="+nomeCidade+"&appid=3fc181ffc9d57a1d942c506b9af7f0ec&units=metric"
    
    if(nomeCidade){
        var url = urlCity;
    }else if(latitud && longitud){
        var url = urlLatLon;
    }else
        alert("preencha corretamente os campos!");

    https.get(url, function (response) {
        console.log(response.statusCode);
      

        response.on("data", function (data) {
            const climaData = JSON.parse(data);
            console.log(climaData);
            const temp = climaData.main.temp;
            res.write("<h1>temperatura em "+climaData.name+": " + temp + " graus Celsius. lat =" + climaData.coord.lat + ", lon =" + climaData.coord.lon + "</h1>");
            res.write("<p>sensação terminca de: " + climaData.main.feels_like + " com " + climaData.weather[0].description + "</p>");

            var iconeID = climaData.weather[0].icon;
            var imgLogo = "https://openweathermap.org/img/wn/" + iconeID + "@2x.png";
            res.write("<img src=" + imgLogo + ">");
            res.send();
        })
    })
})

//-21.21      -47.76

app.listen(3000, function () {
    console.log("server is runing");
})

/*

    */