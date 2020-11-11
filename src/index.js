const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const PORT = process.env.PORT || 8000;

const staticPath = path.join(__dirname , "../public");
const viewsPath = path.join(__dirname , "../templates/views");
const partialsPath = path.join(__dirname , "../templates/partials");


app.set("view engine" , "hbs");
app.set("views" , viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));
app.get("" , (req , res)=>{
    res.render('index');
});

app.get("/About" , (req , res)=>{
    res.render('About');
});

app.get("/weather" , (req , res)=>{
    res.render('weather');
});

app.get( '*' , (req , res)=>{
    res.render("404Error");
});

app.listen(PORT , ()=>{
    console.log("listening to the port");
})