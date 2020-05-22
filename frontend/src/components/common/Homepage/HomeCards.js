import React from 'react'
import { getAllPlants } from '../../../lib/api'


class HomeCards extends React.Component {
  state = {
    allPlants: [],
    plantImages: [
      'https://cdn.shopify.com/s/files/1/0758/3437/products/Rubber_Tree_j_800x.jpg?v=1588070475',
      'https://cdn.shopify.com/s/files/1/0758/3437/products/Bagonia_j_800x.jpg?v=1588069906',
      'https://cdn.shopify.com/s/files/1/0758/3437/products/Devils_Ivy_j_600x.jpg?v=1588073704',
      'https://cdn.shopify.com/s/files/1/0758/3437/products/Peace_Lily_j_600x.jpg?v=1588070744',
      'https://cdn.shopify.com/s/files/1/0758/3437/products/Calathea_Medallion_600x.jpg?v=1588163139',
      'https://cdn.shopify.com/s/files/1/0758/3437/products/Alacosia_j_600x.jpg?v=1588070019',
      'https://cdn.shopify.com/s/files/1/0758/3437/products/180912-G_T_LupeWhiteLarge_001_600x.jpg?v=1587555061',
      'https://cdn.shopify.com/s/files/1/0758/3437/products/Chinese_Money_Plant_j_600x.jpg?v=1588069154',
      'https://cdn.shopify.com/s/files/1/0758/3437/products/Asparagus_Fern_fuzzy_j_600x.jpg?v=1588068258'
    ]
  }

  render() {
    return (
      <section>
        
        <div className="columns">
        <div className="column">
          {this.state.plantImages.slice(0, 3).map((image, i) => (
            
              <figure key={i}
                className="image is-square">
                <img src={image} alt="plant" />
              </figure>
            
          ))}
          </div>
          <div className="column is-hidden-mobile">
            {this.state.plantImages.slice(3, 6).map((image, i) => (
              
                <figure key={i}
                  className="image is-square">
                  <img src={image} alt="plant" />
                </figure>
              
            ))}
          </div>
          <div className="column is-hidden-mobile">
            {this.state.plantImages.slice(6, 9).map((image, i) => (
              
                <figure key={i}
                  className="image is-square">
                  <img src={image} alt="plant" />
                </figure>
              
            ))}
          </div>
        </div>
      </section>
      
    )
  }
}

export default HomeCards