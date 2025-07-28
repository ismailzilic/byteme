module.exports = {
  fetchWebhooks: async (client, channel, webhookName) => {
    channel
      .fetchWebhooks()
      .then((fetchedWebhooks) => {
        if (webhookName) {
          return client.webhooks.filter(
            (wh) => wh.name === fetchedWebhooks.name
          );
        }
        return client.webhooks;
      })
      .catch((error) => {
        console.error(`Error while fetching webhooks ${error}`);
      });
  },
};
