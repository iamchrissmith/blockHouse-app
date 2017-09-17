# BlockHouses - Application

This repo holds the MEAN (Mongo, Express, AngularJS and Node.js) application for running the BlockHouses Application.  [View the contract repo](https://github.com/iamchrissmith/blockHouses-contracts) for more information about the contracts and how to set them up locally.

You can view the application yourself by getting the contracts installed locally and visiting the Heroku app (see contract repo for instructions).

## To run the application yourself:

1. Clone this repo into a common directory with your contract directory
2. `cd blockHouses-app`
3. `npm install && bower install`
4. `node server.js`
5. Ensure your TestRPC blockchain is running and has your deployed contracts.
6. Now you can visit http://localhost:8080 to interact with the application.

## Description and Screenshots of the application

Since this app requires a running blockchain, that might be a lot of setup for you.  Do you want to see what the app does without all that?  Here are some screenshots and video captures to show off what the app does:

When you first visit the app you'll be presented with the welcome/introduction screen.  You will see the blockchain accounts available to you in the navigation:

![Changing Accounts](documentation/changing-accounts.gif?raw=true)

In the account bar, you can change accounts, view your balance, and switch between Wei and Ether. The Navigation bar will respond to your account changes and only show you links to the areas of the website your blockchain account is authorized to view.

Next you should navigate over to the Houses page to view the houses in your chain:

![View Houses](documentation/BlockHouses - Houses.png?raw=true)

On the house details page, you can view the blockchain address of the house, the address of the house's owner and other details the owner has loaded into the application (such as square footage, number of bedrooms/bathrooms, etc).  Additionally the application, will load the history of the house from the chain including title transfer, sales, price changes, and putting the house on the market or taking it off.  In the second tab you will be able to see a chart of the sale prices of the house through its history.

![Viewing House Details](documentation/viewing-house-details.gif?raw=true)

If you are the owner of the house, you can edit these details for the house:

On the blockchain details:  

* Change its price
* Mark it for sale or not for sale
* Transfer Ownership

Off the blockchain details:

* House name
* Size
* House type (moveable/stationary)
* Number of Bedrooms
* Number of bathrooms
* description
* Current address

![Editing House Details](documentation/editing-house-details.gif?raw=true)

If you owned a house that was purchased, you have a balance stored in the blockchain contract for that house.  You can withdraw that amount into your account by visiting the house page and clicking Withdraw once we have confirmed your balance on the blockchain.

![Withdrawing Balance](documentation/BlockHouses - Withdraw.png?raw=true)

Lastly, if you control the blockchain account that owns the application (i.e. the blockhub contract owner), you can add and remove admins.  Admins are the accounts able to create houses on the chain.  In real life, these would be the house manufacturers.  In the admin page, you can enter the address of a new admin and remove existing admins (other than yourself).

![Managing Admins](documentation/managing-admins.gif?raw=true)
