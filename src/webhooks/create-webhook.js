module.exports = {
  createWebhook: async (client, channel, webhookName, description) => {
    channel
      .createWebhook({
        name: webhookName,
        description: description,
      })
      .then((webhook) => {
        client.webhooks.set(`${webhookName}`, webhook);
        console.log(
          `Created a webhook ${webhook.name} in channel: #${channel.name} - ${channel.id}`
        );
      })
      .catch((error) =>
        console.error(`Error while creating a webhook, ${error}`)
      );
  },
};
