module.exports = {
  createWebhook: async (channel, webhookName, description) => {
    channel
      .createWebhook({
        name: webhookName,
        description: description,
      })
      .then((webhook) => {
        console.log(
          `Created a webhook ${webhook.name} in channel: #${channel.name} - ${channel.id}`
        );
      })
      .catch((error) =>
        console.error(`Error while creating a webhook, ${error}`)
      );
  },
};
