const express = require('express')

const app = express()

const courses = [
    {id: 1, name: 'bingo'},
    {id: 2, name: 'bongo'},
    {id: 3, name: 'bango'},
    ]

app.get('/',(req, res) => {
    res.send('Yummy bingo')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(obj => obj.id === parseInt(req.params.id))
    if (!course) res.status(404).send(`Course with the id of ${req.params.id} does not exist`)
    res.send(course)
})



//Environment variable PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Yummy ${port}`)
})