# Tinan
The Discord Bot for the AvdanOS Community Discord server, made using discord.js v13.8.
# How to contribute
## Forking
Step 1: Make a contribution fork of this repository.
## Setting up a Discord bot
Step 2: Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in with your account.

Step 3: Click on the "New Application" button near your profile picture on the upper right side of your screen and create a new application. Name it anything you want.

Step 4: Click on the "Bot" button on the left side of your screen and create a new bot.

### Step 5. Invite your bot to your server.
Step 5.1: Click on "OAuth2", afterwards "URL Generator". Select `bot` and `applications.commands`.

Step 5.2: Select "Administrator" in the list of bot permissions.

Step 5.3: Copy the link in the bottom of the page and paste it into your search bar. Select the server where you want your bot to be in the dropdown list.

Step 6: Reset your bot's token and copy it. It will be used later.
## Making it work
Step 7: Inside the `src` folder, make a `.env` file, and type `DISCORD_TOKEN=your token` and `PREFIX=your prefix`

### Step 8. Get your Discord server ID
Step 8.1: Enable developer mode by going into Settings (near your profile picture in the bottom) > Advanced > Developer Mode.

Step 8.2: Copy your server ID by right clicking the server icon and clicking "Copy ID".

Step 9: Inside the src > commands folder, open `cmdHandler.js` and in the 57th line, replace the number in a string with your ID.

Step 10: In your terminal, run `npm install`. It will install all the modules needed to run the bot.

Step 11: Run `cd src` and afterwards `node .` to launch the bot.
## How to make commands
Step 12: In the commands folder, there's 2 `example.js` files. You can use them as a reference to build new commands.
## Pull requests
Step 13: Remember to put a short and concise list of changes to make the review process easier.
