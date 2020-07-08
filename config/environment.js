
const trefleToken = process.env.TREFLE_TOKEN
const pexelsHeader = { Authorization: process.env.PEXELS_KEY }
const mapToken = process.env.LOCATION_TOKEN

console.log('env trefle = ', trefleToken)

module.exports = {
  trefleToken,
  pexelsHeader,
  mapToken
}