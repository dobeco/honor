const express = require("express")
const path = require('path')
const app = express()

app.set('secret', 'i2u34y12oi3u4y8')

app.use(require('cors')())
app.use(express.json())
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use(express.static(path.join(__dirname, 'public')));

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(9000, () => {
    console.log('http://localhost:9000');
});