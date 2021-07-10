const express = require('express')
const cors = require('cors')

const app = express()
const post = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const db = require('./app/models/')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    .then(() => {
        console.log(`Database Connected!`)
    }).catch((err) =>{
        console.log(`Cannot connect to the database!`, err)
        process.exit()
    });

app.get('/', (_req,res) => {
  res.json({
      message: "Welcome to our website"
  })
})

require('./app/routes/post.routes')(app)

const PORT = 8000
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})