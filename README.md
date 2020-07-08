# SEI Group Project: Plantify
 
## https://plantify-project.herokuapp.com/
 
## **Overview.**
 
It is a social app for houseplant-lovers focused on presenting and trading their plants. 
Users can have photos of their plants displayed on their profile page. Other users can give the offer to trade plants, like, comment on each plant, and they are able to have a private chat.
App has a feature to find plants that are in the user's area via interactive maps. The location of the plant on the map is also shown on a single plant page.

***Timeframe*** for the project was one week

 
## My Team:
* [Yarden Lawson](https://github.com/YBL123)
* [Aino Kytölä](https://github.com/ainokyto) 
* [George Jones](https://github.com/Jompra)
 
![Plantify logo](images/plntify.svg)
 
-------------------------
 
## Brief
 
* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
 
## Get Started
 
Clone or download the repo

Run those commands in terminal:
* **npm i**
* **mongod --dbpath ~/data/db** if you are using MacOS Catalina. Otherwise run **mongod**
* **npm run seed** for seeding
* **npm run start** for both, back-end and front-end
 
## **Technologies used.**
 
#### Front End:
* React
* Axios
* Bulma
* SaSS
* React loader spinner
* React router dom
* Cloudinary
 
#### Back End:
* Express
* Node.js
* MongoDB
* Mongoose
 
#### Dev Tools:
 
* Yarn
* VScode
* Insomnia
* Git
* Github
* Chrome Developer Tools
* Heroku
 
### APIs:
* [Mapbox](https://www.mapbox.com/)
* [Image Moderation](https://www.moderatecontent.com/)
* [Pexels](https://www.pexels.com/api/?locale=en-US)
* [Trefle.io](https://trefle.io/)
* [Wikipedia](https://www.mediawiki.org/wiki/API:Main_page)
 
## How to use the App
 
### Login and  Register
 
Sign up for a new account on the home page.
 
![Home/SignUp page](images/home.png)
 
### Index Page
 
After you sign up for an account, you will be automatically logged in and redirected to the index page. Here you can see plants from all of the users.
 
![Index page](images/index.png)
 
### Single Plant Page
When you click on one of the plants, you will be redirected to the single plant page. Here you can see the name, description, and location of the plant owner.
You can like or comment on the plant, and also you can give an offer to the plant owner.

![Single page](images/single.png)

### Trading functionality

1. When you like some plant, you can send an offer to the plant owner. You must include some of your plants to trade and optionally you can send a message with an offer.

![Offer](images/offer.png)
 
2. The user who got the offer can see it on their profile and can accept or decline it the offer.

![Got Offer](images/gotoffer.png)
 
3. Then user who gave the offer can see on their profile if the offer was accepted or decline if users met, and successfully finished trade, then the user just needs to click the button that trade was finished and it will delete photos of the plants from a portfolio of both users, and they can add new photos of their new plant.

![Response](images/response.png)
 
### Profile Page
The profile page contains offers on user plants and responses on their offers on the top and user portfolio on the bottom of the page.

![Profile page offers](images/profileOffers.png)
![Profile page portfolio](images/profilePortfolio.png)
 
### Maps

If you click on the map on the index page, you will be redirected to the map page where you can see all the plants in your area.
Phrase "Hot plants in your area" is a joke referring to the lame online ads.

![Profile page offers](images/map.png)
 
## Development
 
On the first day of our project week, we've been planning what and have we gonna do.
We made a wireframe on Balsamiq and wrote down the plan of the development process in Trello. So we set our deadlines and wrote down key features which our app must have, and optional features which we gonna do if we have some time left, which Schemas we gonna need, etc.
 
The next day we start to work on a code. We decided not to split up on Front End, and Back End, but each of us had responsibility for different functionalities and some of the functionalities we've been doing in a pairs.
 
My main responsibility was a plant-trading feature and private chat. I was also doing some other smaller tasks and part of the design.
 
## Wins
 
The biggest win of this project was definitely the experience of working in a group. Planning projects together, dividing tasks, group debugging, and problem-solving was a very valuable experience. We were very effective and had no arguments during the whole time of development.
Also, it gave me a lot from the technical side. I have a much better understanding of MongoDB and Express.js.
 
## Challenge
 
Learning how to use GitHub as a group was the biggest challenge on the project. It was the first time experience for all of us, but thanks to good communication, everything went smoothly and we learned a lot about using GitHub. 
 
 
