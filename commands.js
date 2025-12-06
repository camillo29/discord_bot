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
    description: 'shake command',
    type: 1,
    integration_types: [0, 1],
    contexts: [0, 1, 2],
}

const ALL_COMMANDS = [SHAKE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
