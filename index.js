const express = require('express')
const app = express();
const path = require('path')
const ejs = require('ejs')
const PORT = process.env.PORT || 5000

// app.use(express.static(path.join(__dirname, 'public')))
// app.set('views', __dirname + '/views');
// app.engine('html', ejs.renderFile);

app.engine('html', require('ejs').renderFile);

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/views/pages/index.html');
 })

//last line
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// express()
  
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'html')
//   .get('/', (req, res) => res.render('pages/index.html'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))