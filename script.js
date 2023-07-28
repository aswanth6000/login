const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const session = require("express-session");
const cookieParser = require("cookie-parser");


app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret : "my-key",
    resave : false,
    saveUninitialized: false,
}))

const PORT = process.env.PORT || 8000;

const isLoggedIn = (req, res, next)=>{
    if(req.session.userDetails){
        res.locals.userLoggedIn = true;
    }else{
        res.locals.userLoggedIn = false;
    }
    next()
}
app.use(isLoggedIn);

app.get("/",(req,res)=>{
    res.render("login",{data : data})
})
app.get("/home", (req,res)=>{
    const userDetails = req.session.userDetails;
    if(res.locals.userLoggedIn){
        res.render("index",{userDetails : userDetails})
    }else{
        res.redirect("/")
    }
})
const data = {
    anjali: {
      fullname : "Anjali vinod",
      password: "password123",
      age: 30,
      address: "123 Main Street",
      place: "kannur",
      phoneNumber: "555-1234",
      image : " https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    anu: {
      fullname: "Anu mol joseph",
      password: "secret456",
      age: 25,
      address: "456 Park Avenue",
      place: "Kollam",
      phoneNumber: "555-5678",
      image : "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg"
    },
  };
  app.post('/login',(req,res)=>{
    const {username, password } = req.body
    if(data.hasOwnProperty(username)){
        if(data[username].password === password){
            req.session.userDetails = data[username];
            const oneHour = 60 * 60 *1000;
            res.cookie("userCookie", username, {maxAge : oneHour, httpOnly : true});
            res.redirect("/home")
        }else{
            res.json({success : false, message : "Incorrect Password !!"})
        }
    }else{
        res.json({success : false, message : "User not found !! "})
    }

})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.json({success : false, message : "logout failed"})
        }else{
            res.redirect('/')
        }
    })
})



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})