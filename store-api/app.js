require('dotenv').config()
require('express-async-errors')
//async errors

const express  = require('express')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const app = express()

//middleware
app.use(express.json())

//routes 

app.get('/', (req,res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products</a>')
})


app.use('/api/v1/products',productsRouter )

//products routes

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async ()=> {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening in ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()
