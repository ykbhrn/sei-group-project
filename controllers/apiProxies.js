const axios = require('axios')

async function getTrefleInfo(req, res) {
  try {
    console.log('backend recieved: ', req.body)
    const query = req.body.search

    const response = await axios.get(`https://trefle.io/api/plants?q=${query}&token=S2RkU2JTY2tqbjJPVUV6MFRsYmUvdz09`)
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


module.exports = {
  getTrefleInfo,
  getLocation

}