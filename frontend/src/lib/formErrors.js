export const handlePlantFormErrors = (error) => {
  let name = ''
  let height = ''
  let imageUrl = ''
  let scientificName = ''
  let description = ''
  let location = ''
  console.log('errs: ', error)
  if(error.name){
    name = 'Plant Name is Required'
  }
  if(error.height){
    height = 'Plant Height is Required'
  }
  if(error.scientificName){
    scientificName = 'Scientific Name is Required'
  }
  if(error.imageUrl){
    imageUrl = 'An Image is Required'
  }
  if(error.description){
    description = 'A Description is Required'
  }
  if(error.location){
    location = 'The pick up location of the plant is Required'
  }
  return {errors: { name, height, imageUrl, scientificName, description, location }}
}