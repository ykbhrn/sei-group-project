import React from 'react'

export const HeightInfoBox = (props) => {
  const height = parseInt(props.plantInfo.height)
  const inches = height / 2.54
  let statement = ''
  
  if (height < 5){
    statement = `At only ${height} centimeters tall, this plant is tiny`
  } else if (height < 15) {
    statement = `Standing at ${height} centimeters or ${inches.toFixed(1)} inches in height, this plant would be a lovely addition to a stack of books, or sat next to a lamp`
  } else if (height < 25) {
    statement = `As this plant is ${height} centimeters or ${inches.toFixed(1)} inches tall, this plant could fit perfectly on a side table or accompany other ornaments`
  } else if (height < 50) {
    statement = `Standing at ${height} centimeters or ${inches.toFixed(1)} inches, this plant could be a centrepiece of it's own`
  } else if (height < 100) {
    statement = `Standing at ${height} centimeters or ${inches.toFixed(1)} inches, this plant could be a fairly impressive centrepiece of it's own`
  } else if (height < 200) {
    statement = `Standing at ${height / 100} meters or ${(inches / 12).toFixed(1)} feet, this plant commands it's own space`
  } else if (height < 270) {
    statement = `Standing at ${height / 100} meters or ${(inches / 12).toFixed(1)} feet, this plant is huge`
  } else if (height < 350) {
    statement = `Standing at ${height / 100} meters or ${(inches / 12).toFixed(1)} feet, this is one big plant, make sure to measure your ceiling height as it won't fit in most modern properties`
  } else if (height >= 350) {
    statement = `Standing at ${height / 100} meters or ${(inches / 12).toFixed(1)} feet, This can't really be called a houseplant any more.`
  } 


  return (
    <p>{statement}</p>
  )
}
