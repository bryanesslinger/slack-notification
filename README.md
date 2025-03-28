# Slack Notification Service

This service receives messages from AWS SNS and forwards them to a Slack channel using webhooks.

## Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI
- A Slack workspace with admin access
- AWS SNS topic named "ALERT_NOTIFICATIONS"

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a Slack Webhook:
   - Go to your Slack workspace
   - Create a new app or select an existing one
   - Enable Incoming Webhooks
   - Create a new webhook for your desired channel
   - Copy the webhook URL

3. Set up environment variables:
   ```bash
   export SLACK_WEBHOOK_URL="your-slack-webhook-url"
   ```

4. Deploy the service:
   ```bash
   npm run deploy
   ```

## Testing

To test the service, you can publish a message to your SNS topic:

```bash
aws sns publish --topic-arn arn:aws:sns:region:account-id:ALERT_NOTIFICATIONS --message "{\"test\": \"Hello from SNS!\"}"
```

## Project Structure

- `handler.js`: Contains the Lambda function that processes SNS messages and sends them to Slack
- `serverless.yml`: Serverless Framework configuration
- `package.json`: Project dependencies and scripts
- `.eslintrc.json`: ESLint configuration

## Development

- Run linting: `npm run lint`
- Deploy changes: `npm run deploy` 