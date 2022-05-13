import DiscordJS, { GuildMember, Intents, MessageEmbed, TextChannel } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
dotenv.config();
import dealabsSub from "./schema/dealabsSub";
import functions from './module/functions';
// Cache of brokenDeal array
let brokenDealsLength = 0;

// Cache of brokenDeal array
let brokenDealsTmp: {
    title: string; url: string; img: string; upvote: string; price: string; username: string;
    insertedTime: string, expiredTime: string;
}[] = [];


// FLAGS
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]


})


// Connexion du bot
client.on('ready', async () => {

    await mongoose.connect(
        process.env.MONGO_URI || '',
        {
            keepAlive: true,
        }
    )
    console.log(new Date().toLocaleString() + ' Haku est là !!')

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['932674235388817408', '776066783622201344'],
        botOwners: ['301865289006579713']
    }).setCategorySettings([
        {
            name: 'Bot information',
            emoji: '💡'
        },
        {
            name: 'Audio Soundboard',
            emoji: '🎵'
        },
        {
            name: 'Alert',
            emoji: '🚨'
        }
    ]).setDisplayName('Haku 🐉')
})



// Quitter le channel quand il y a personne
client.on('voiceStateUpdate', (oldState, newState) => {
    try {
        if (newState.guild.me?.voice.channelId === oldState.channelId) {
            if (oldState.channel?.members.size === 1) {
                oldState.guild.me!.voice.disconnect("Disconnect cause anyone")
            }
        }
    } catch (error) {
        throw error;
    }

})

if (process.env.NODE_ENV === 'production') {
    client.login(process.env.TOKEN_PROD)
} else if (process.env.NODE_ENV === 'development') {
    client.login(process.env.TOKEN_DEV)
}
console.log(process.env.NODE_ENV)

