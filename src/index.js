const path = require('path')
const express = require('express')
var handlebars  = require('express-handlebars')
const morgan = require('morgan')
const app = express()
const port = 3000

const route = require('./routes')

app.use(express.static(path.join(__dirname, 'public')))

//HTTP logger
app.use(morgan('combined'))

//middleware
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}))

//set view, engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'resources\\view'))

//route init
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})