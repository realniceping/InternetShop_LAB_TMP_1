require('dotenv').config()

const express  = require('express')
const sequelize = require('./db') //DB object
const models = require('./models/models') //DB connection
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5050

const app = express()
app.use(cors()) // use CORS
app.use(express.json()) // parse JSON
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//Error handling // last middleware
app.use(errorHandler)

app.get("/hello", (req, res) => {
    return res.json({"hi" : "ni hao"}).end();
})

app.get('/', (req, res) => {
    res.status(200).json({message: 'Working...'})
})

const start = async () => { // func for DB connection
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("---------------------");
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`); console.log("---------------------");});
        
    } catch(e) {
        console.log(e)
    }
}

start()

