const helpers = require("./helpers.js")
const beatTypes = require("./beatTypes")
const express = require("express")
var cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const {spawn} = require("child_process")

const symbols = ["N","L","R","A","a","J","S","V","F","[","!","]","e","j","E","/","f","x","Q","|"]

const API_PORT = 3001
const app = express()

app.use(cors())

const router = express.Router()

app.use(bodyParser.urlencoded( {extended: false } ))
app.use(bodyParser.json())

router.get('/sayhello',(req,res) => {
    res.send("Hello World!")
})

router.post('/classifybeat',(req,res) => {
    const {beat} = req.body
    const {vals} = beat
    console.log(req.body)
    var py = spawn('python3',["hw.py",...vals])
    var sym = ""
    py.stdout.on('data',function(data){
        sym += data
        sym = sym.slice(0, sym.length - 1)
        res.json({
            sym: sym,
            name : beatTypes.beatNames[sym]
        })
    })

    //const sym = helpers.getRandomFromArray(beatTypes.beatSymbols)
    /*
     * res.json({
        res:{
            symbol: sym,
            name : beatTypes.beatNames[sym]
        }
    })
    */
})

router.post('/xqrs',(req,res)=>{
    const {beats,fs} = req.body
    var py = spawn('python3',["xqrs.py",fs,...beats])
    var inds = ""

    py.stdout.on('data',function(data){
        inds += data
    })

    py.stdout.on('end',()=>{
        inds = inds.split(",").map(ind => parseInt(ind))
        res.json({
            indices:inds
        })
    })
})

app.use("/api",router)

app.listen(API_PORT,() => console.log(`Listening on port: ${API_PORT}`))
