const path = require('path')
const express = require('express')
var handlebars  = require('express-handlebars')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

//HTTP logger
app.use(morgan('combined'))

//template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}))

//set view, engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'resources\\view'))

app.get('/', (req, res) => {
  res.render('home')
})
app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})