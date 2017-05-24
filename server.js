const express = require('express')
const app = express()
const r = require('rethinkdb')
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }))


r.connect({ host: 'localhost', port: 28015 }).then(function (conn) {
  r.conn = conn
})

app.use('/add', express.static('public'))

app.post('/', function (req, res) {
  r
    .db('students')
    .table('studentlist')
    .insert(req.body)
    .run(r.conn)
    .then(re => {
      res.redirect('/')
    })
})
app.get('/', function (req, res) {
  r
    .db('students')
    .table('studentlist')
    .run(r.conn)
    .then(cur => cur.toArray())
    .then(data => {
      res.send(JSON.stringify(data, null, 2))
    })
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})
