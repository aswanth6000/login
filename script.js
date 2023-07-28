const express = require("express")
const app = express();
app.set("view engine", "ejs")

const PORT = process.env.PORT || 8000;

let data = {
    username : "jauhar",
    password : "1234"
}

app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    res.render("login",{data : data})
})
app.get("/home", (req,res)=>{
    res.render("index")
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})