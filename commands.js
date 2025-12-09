import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

const NEXT_EVENT_COMMAND = {
    name: 'nextevent',
    description: 'When is next event',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
};

const SHAKE_COMMAND = {
    name: 'szejk',
    description: 'Wyślij losowy szejkujący gif',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}

const GIF_COMMAND = {
    name: 'randomGif',
    description: 'Wyślij losowy gif',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}

const ALL_COMMANDS = [SHAKE_COMMAND, GIF_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
