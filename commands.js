import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';
import { SlashCommandBuilder } from 'discord.js';

// const NEXT_EVENT_COMMAND = {
//     name: 'nextevent',
//     description: 'When is next event',
//     type: 1,
//     integration_types: [0, 1],
//     contexts: [0, 1, 2],
// };

const SHAKE_COMMAND = {
    name: 'szejk',
    description: 'Uwaga! Niektóre nagradzają timeoutem',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}

const GIF_COMMAND = {
    name: 'randomgif',
    description: 'Wyślij losowy gif',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}

const REMOVE_COOLDOWN_COMMAND = new SlashCommandBuilder()
    .setName('removecooldown')
    .setDescription('[Admin] zdejmij cooldown')
    .addStringOption((option) => option.setName('userid').setDescription('ID usera do usunięcia cooldownu').setRequired(true))
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)

const ALL_COMMANDS = [SHAKE_COMMAND, GIF_COMMAND, REMOVE_COOLDOWN_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
