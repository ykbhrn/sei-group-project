const axios = require('axios')
const trefleToken = 'S2RkU2JTY2tqbjJPVUV6MFRsYmUvdz09'
const pexelsHeader = { Authorization: '563492ad6f917000010000014e452efa91af4e33bf581f73e3eb261b' }

async function getTrefleInfo(req, res) {
  try {
    console.log('backend recieved: ', req.body)
    const query = req.body.search
    const response = await axios.get(`https://trefle.io/api/plants/?q=${query}&token=${trefleToken}`)
    console.log('BE Response', response.data)
    res.status(200).json(response.data)
  } catch (err) {
    res.json(err)
  }
}

async function getLocation() {
  try {
    const token = 'pk.eyJ1IjoiYWlub2t5dG8iLCJhIjoiY2thNTVmcHo1MGp0NTNtb2FiMDN2Y2lsNSJ9.lYIXm2Oh9WpDzSysWqwnqA'
    const res = await axios.get(`mapbox.com/geocoding/vh/mapbox.places/london.json?access_token=${token}`)
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}

async function photoSearch(req, res) {
  try {
    const randomNumber = Math.floor(Math.random() * 15)
    const searchQuery = req.body.searchquery
    console.log('BE: ', req.body)
    const searchRes = await axios.get(`https://api.pexels.com/v1/search?query=${searchQuery}`, { headers: pexelsHeader })
    const randImage = searchRes.data.photos[randomNumber].src.large2x
    res.status(200).json(randImage)
  } catch (err) {
    res.sendStatus(404)
  }
}


module.exports = {
  getTrefleInfo,
  getLocation,
  photoSearch
}