
# Shopify
Backend API facilitating CRUD operations for logistics company and with some additional features

# Installation
## Requirements
1. [NodeJS](https://nodejs.org/en/download/)
2. [MongoDB](https://docs.mongodb.com/manual/installation/)

## Commands to run this project locally

### Install the project and its dependencies
`npm install`

### Run this project
`npm start`

# Routes

| Methods |TYPE| Description   | End Point   |  
| ----------- | ----------- |  ----------- | ----------- |
| Create an item          | POST       |  Creates a new product in the inventory      |  /create      |
| Get an item by id          | GET       |  Fetches a product by its id      |  /get?id=1234      |  
| Get paginated item          | GET        |  Fetch a product by page number and limit      |/get?page=1&limit=1 |
| Update an item         | PUT        |  Updates the provided field of an item by its id     | /update |
| Delete an item       | DELETE        |  Deletes an item by its id      |/delete |

# Examples of Requests

## 1. Create item
	curl --location --request POST 'http://localhost:8000/create' \ 
	--header 'Content-Type: application/json' \ 
	--data-raw '{
		"name": "Football",
		"company": "Just Do it",
		"quantity": 16,
		"unit_price": 100,
		"image_url": "https://unsplash.com/photos/JO19K0HDDXI",
		"thumbnail_url": "https://dog.ceo/api/breeds/image/random"
	}'
	
	
## 2. Read item by its id
	curl --location --request GET 'http://localhost:8000/fetch?id=61e49ce00c7047ee67008eed'
	

## 4. Read item by page number and limit
## 5. Update item
	curl --location --request PUT
	'http://localhost:8000/update?id=61e49ce00c7047ee67008eed' \ 
	--header 'Content-Type: application/json' \
	--data-raw '{
		"company": "Never Give Up"
	}'
	
## 6. Delete item
	curl --location --request DELETE 'http://localhost:8000/delete?id=61e49ce00c7047ee67008eeb' \
	--header 'Content-Type: application/json' \
	--data-raw '{
	"comment": "Not in Stock"
	}'
	
## 7. Undo the deleted item
	curl --location --request POST 'http://localhost:8000/undo?id=61e49ce00c7047ee67008eea' \
	--header 'Content-Type: application/json' \
	--data-raw ''
	
