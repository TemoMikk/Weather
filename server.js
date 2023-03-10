const express = require('express')
const app = express()
const axios = require('axios')
const dotenv = require('dotenv').config()

app.get('/weather', (req, res) => {
  const city = req.query.city
  const API_KEY = process.env.API_KEY
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  axios
    .get(URL)
    .then((response) => {
      const data = response.data
      const temperature = data.main.temp
      res.send({ temperature: temperature })
    })
    .catch((error) => {
      console.log(error)
      res.send({ error: 'error' })
    })
})

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
