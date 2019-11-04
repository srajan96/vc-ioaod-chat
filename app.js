const express=require('express')
const path=require('path')
const app=express()

const APP_PORT=3000;
var locations=[];
app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')

app.get('/join',(req,res)=>{
    res.render('join')
}) 
app.get('/vcroom',(req,res)=>{
    console.log(req.query.n)
    res.render('vcroom',{'lname':req.query.n})
}) 
app.get('/',(req,res)=>{
    res.render('index')
})


app.use(express.static('public'))
const server=app.listen(APP_PORT,()=>{
    console.log(`App running on port ${APP_PORT}`)

})

const io=require('socket.io').listen(server)
io.on('connection', function(socket) {
    socket.on('chatter', function(message) {
        console.log('message : ' + message);
        io.emit("chatter",message)
    });

    socket.on("newjoinee",(loc)=>{
        locations.push(loc)
        console.log(locations)
    })

  });
