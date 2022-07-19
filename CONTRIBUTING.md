# Tinan Contributing Guide

## Prerequisites

If you want to contribute to this repository, you need basic knowledge of JavaScript and discord.js. 

The bot is getting rewritten in TypeScript, so it's also strongly recommended for you to understand TypeScript.

For code convention:

- 2 space indent, no tab.

- const by default and let for reassignable.

- Use SCREAMING_SNAKE_CASE naming for const and camelCase naming for let and var.

## Forking

Step 1: Make a contribution fork of this repository.

## Setting up a Discord bot

Step 2: Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in with your account.

Step 3: Click on the "New Application" button near your profile picture on the upper right side of your screen and create a new application. Name it anything you want.

Step 4: Click on the "Bot" button on the left side of your screen and create a new bot.

### Step 5. Invite your bot to your server.

Step 5.1: Click on "OAuth2", afterward "URL Generator". Select `bot` and `applications.commands`.

Step 5.2: Select "Administrator" in the list of bot permissions.

Step 5.3: Copy the link at the bottom of the page and paste it into your search bar. Select the server where you want your bot to be in the dropdown list.

Step 6: Reset your bot's token and copy it. It will be used later.

## Making it work

# **Step 7: .env magic (huge for devs to not add it into the repo)**

## **Step 7.1: Inside the *`src`* folder, make a *`.env`* file.**

## **Step 7.2: Type *`DISCORD_TOKEN='your bot token'`***

## Step 8: Creating config.json

Step 8.1: Set the prefix you want. (for example: t!)

Step 9: In your terminal, run `npm install`. It will install all the modules needed to run the bot.

Step 10: Run `cd src` and afterward `node .` to launch the bot.

## Optional config.json stuff

Step 1: Create a channel (or channels) in your server and name it/them anything you want.

If you haven't enabled Developer Mode, you can do so by going into Settings > Advanced > Developer Mode.

Step 2: Copy your channel's ID by right clicking on it and selecting `Copy ID`.

Step 3: Paste the channel's ID into your config.json file.

## How to make commands

If you want to make commands for the bot, you can look at the example commands in the `examples` folder.

## Pull requests

Remember to put a short and concise list of changes to make the review process easier, and all PRs should get reviewed by peer before merging.

# ***PLEASE SUBMIT A PR, NO DIRECT COMMITS!***
![image](https://user-images.githubusercontent.com/51555391/176925763-cdfd57ba-ae1e-4bf3-85e9-b3ebd30b1d59.png)
