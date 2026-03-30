import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';
const { SlashCommandBuilder } = require('discord.js');

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

const REMOVE_TIMEOUT_COMMAND = new SlashCommandBuilder()
    .setName('removetimeout')
    .setDescription('[Admin] zdejmij timeout')
    .addStringOption(option => option.setName('userId').setDescription('ID usera do usunięcia timeoutu').setRequired(true))
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)

const ALL_COMMANDS = [SHAKE_COMMAND, GIF_COMMAND, REMOVE_TIMEOUT_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
