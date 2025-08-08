# ByteMe

ByteMe is a Discord bot built using [Discord.js](https://discord.js.org/). This is an app I built for fun and for learning.

## 🛠️ Features:

- Slash command support
- YouTube notifications
- Utility commands

## 📋 Prerequisites

- [Node.js](https://nodejs.org/en/download) LTS (20+ version)
- [Docker Desktop](https://www.docker.com/) or [Docker Compose](https://docs.docker.com/compose/install/)

## Running without Docker:

### 1. Clone the repository

```
git clone https://github.com/ismailzilic/byteme.git
cd byteme
```

### 2. Install dependencies

```
npm install
```

### 3. Set up environment vriables

Create a `.env` file in the root folder and paste the template into it:

```
NODE_ENV=production
DISCORD_BOT_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_bot_application_id
SQLITE_STORAGE=
SQLITE_HOST=
SQLITE_USER=
SQLITE_PASS=
SQLITE_NAME=
```

How to get a _token_ and your _Client ID_ will be explained in the next step.
You can leave the database (SQLITE) variables embpty if you wish to go with the default settings.

### 4. Configure your Discord bot

- **Go to the [Discord Developer Portal](https://discord.com/developers/applications)**  
  Click "New Application", give it a name, and create it.

- **Copy the Bot Token**  
  Under the "Bot" section click "Reset Token" and assign it to DISCORD_BOT_TOKEN environment variable in the `.env` file.

  > ⚠️ Do not share your token!!!

- **Enable Privileged Gateway Intents**  
  Still under the "Bot" section, enable Presence Intent.

- **Copy the Client ID**  
  "General Information" section > "Application ID", copy it and assign it to CLIENT_ID environment variable in the `.env` file.

- **Set up permissions**  
  Under the "Installation" section, uncheck "User install".

  In the install settings add the "bot" scope and select these permissions:
  "Send messages", "Embed Links", "Mention Everyone", "Read Message History", "Send Messages in Threads", "View Channels"
  Or alternatively, you can just assign it an "Administrator" permission.

- **Invite the Bot to Your Server**  
  Use the provided "Install Link" in the "Installation" section.

### 5. Run the bot

```
npm run build
```

## Running with Docker

### 1. Clone the repository

```
git clone https://github.com/ismailzilic/byteme.git
cd byteme
```

### 2. Set up environment vriables

Create a `.env` file in the root folder and paste the template into it:

```
NODE_ENV=production
DISCORD_BOT_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_bot_application_id
SQLITE_STORAGE=
SQLITE_HOST=
SQLITE_USER=
SQLITE_PASS=
SQLITE_NAME=
```

### 3. Run a Docker container

```
docker compose --env-file .env up
```
