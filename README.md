# Tinan

The Discord Bot for the AvdanOS Community Discord server, made using discord.js v13.8.

## Setup

1. Make a contribution fork of this repository.

2. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in with your account.

3. Click on the "New Application" button near your profile picture on the upper right side of your screen and create a new application. Name it anything you want.

4. Click on the "Bot" button on the left side of your screen and create a new bot.

5. Invite the bot to your server:

   1. Click on "OAuth2", afterward "URL Generator". Select `bot` and `applications.commands`.

   2. Select "Administrator" in the list of bot permissions.

   3. Copy the link at the bottom of the page and paste it into your search bar. Select the server where you want your bot to be in the dropdown list.

6. Reset your bot's token and copy it. It will be used later.

7. Inside the `src` folder, make a `.env` file, and type `DISCORD_TOKEN=your token` and `PREFIX=your prefix`.

8. Get your Discord server ID:

   1. Enable developer mode by going into Settings (near your profile picture at the bottom) > Advanced > Developer Mode.

   2. Copy your server ID by right clicking the server icon and clicking "Copy ID".

9. Inside the `src/commands` folder, open `cmdHandler.js` and find `const goosStanding`, and replace the number in the parentheses (after `message.guild.emojis.fetch`) with the copied ID.

10. In terminal, run `npm install` to install all the necessary modules/

11. Run `cd src` and `node .` to launch the bot.

## Adding commands

In the commands folder, there are 2 `example.js` files. You can use them as a reference to build new commands.

## Contribution

Remember to put a short and concise list of changes to make the review process easier. **Pull Requests on this repository won't be reviewed often due to the main focus being the Desktop Environment.**
