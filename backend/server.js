const helpers = require("./helpers.js")
const beatTypes = require("./beatTypes")
const express = require("express")
var cors = require("cors")
const bodyParser = require("body-parser")



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

router.post('/classifyBeat',(req,res) => {
    const {beat} = req.body
    const sym = helpers.getRandomFromArray(beatTypes.beatSymbols)
    res.json({
        res:{
            symbol: sym,
            name : beatTypes.beatNames[sym]
        }
    })
})

app.use("/api",router)

app.listen(API_PORT,() => console.log(`Listening on port: ${API_PORT}`))
