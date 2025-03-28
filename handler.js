const { IncomingWebhook } = require('@slack/webhook');

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

exports.sendToSlack = async (event) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // Parse the SNS event
    const snsMessage = JSON.parse(event.Records[0].Sns.Message);
    console.log('Parsed SNS message:', JSON.stringify(snsMessage, null, 2));
    
    // Create the Slack message
    const message = {
      text: `*New Alert Notification*\n${JSON.stringify(snsMessage, null, 2)}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: 'New Alert Notification',
            emoji: true
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '```' + JSON.stringify(snsMessage, null, 2) + '```'
          }
        }
      ]
    };

    console.log('Sending message to Slack:', JSON.stringify(message, null, 2));
    
    // Send the message to Slack
    const result = await webhook.send(message);
    console.log('Slack webhook response:', JSON.stringify(result, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent to Slack successfully' })
    };
  } catch (error) {
    console.error('Error:', error);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message to Slack' })
    };
  }
}; 