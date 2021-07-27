const express = require('express')

const app = express()

app.get('/',(req, res) => {
    res.send('Yummy bingo')
})

app.get('/api/courses', (req, res) => {
    res.send([1,2,3,4,5,6])
})


//Environment variable PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Yummy 3000')
})