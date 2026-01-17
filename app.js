import 'dotenv/config';
import express from 'express';
import {Client, GatewayIntentBits, GuildScheduledEvent} from 'discord.js';
import {
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';
import {getRandomGif, getRandomShake} from './utils.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds]
})

const guildId = '1438117830489935986';
await client.login(process.env.DISCORD_TOKEN).then(r => console.log('logged in', r));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    // Interaction id, type and data
    const {id, type, data, member} = req.body;

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
        return res.send({type: InteractionResponseType.PONG});
    }

    /**
     * Handle slash command requests
     * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
     */
    if (type === InteractionType.APPLICATION_COMMAND) {
        const {name} = data;
        const user = member.user;

        if (name === 'szejk') {
            // Send a message containing random shake gif
            let content = getRandomShake();
            if (content.includes('20251130_124448') || content.includes('20260116_171445') || content.includes('20260116_171512') || content.includes('20260116_171523')) {
                let timeout = 0;
                if (content.includes('20251130_124448') || content.includes('20260116_171445')) {
                    timeout = 5 * 60 * 1000;
                    content =  'Wygrywasz t/o na 5 minut ' + content;
                }
                if (content.includes('20260116_171512')) {
                    timeout = 10 * 60 * 1000;
                    content =  'Wygrywasz t/o na 10 minut ' + content;
                }
                if(content.includes('20260116_171523')) {
                    timeout = 15 * 60 * 1000;
                    content =  'Wygrywasz t/o na 15 minut ' + content;
                }
                if (timeout !== 0) {
                    const guild = await client.guilds.fetch(guildId);
                    const member = await guild.members.fetch(user.id)
                    await member.timeout(timeout, 'Automatyczny timeout za szejk')
                }
            }
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: content
                },
            });
        }

        if (name === 'randomgif') {
            // Send a message containing random gif
            let content = getRandomGif();
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: content
                },
            });
        }

        // if (name === 'nextevent') {
        //     console.log('enter nextevent');
        //     const guildId = '1404891503364411522'; // replace with your server ID
        //     const guild = await client.guilds.fetch(guildId);
        //
        //     const scheduledEvents = await guild.scheduledEvents.fetch();
        //     console.log(scheduledEvents);
        //     //const sortedEvents = events.sort((a, b) => a.scheduled_start_time - b.scheduled_start_time);
        //     const nextEvent = scheduledEvents.first()
        //     console.log(nextEvent);
        //     const date = new Date(nextEvent.scheduledStartTimestamp);
        //     return res.send({
        //         type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        //         data: {
        //             flags: InteractionResponseFlags.IS_COMPONENTS_V2,
        //             components: [
        //                 {
        //                     type: MessageComponentTypes.TEXT_DISPLAY,
        //                     content: `Next event is: ${nextEvent.name} and it is happening at ${date}`,
        //                 }
        //             ]
        //         },
        //     });
        // }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
