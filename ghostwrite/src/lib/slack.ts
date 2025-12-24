export async function sendSlackNotification({
    title,
    message,
    link,
}: {
    title: string;
    message: string;
    link?: string;
}) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
        console.warn('SLACK_WEBHOOK_URL not configured');
        return;
    }

    const payload = {
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: title,
                    emoji: true,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: message,
                },
            },
        ],
    };

    if (link) {
        payload.blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `<${link}|Click here to view>`,
            },
        } as any);
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Slack notification failed: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}
