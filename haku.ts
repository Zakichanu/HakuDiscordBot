import DiscordJS, { GuildMember, Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import { joinVoiceChannel, DiscordGatewayAdapterCreator, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus } from '@discordjs/voice';
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()


// FLAGS
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]


})


// Connexion du bot
client.on('ready', () => {

    console.log('Haku est prêt !')

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['932674235388817408', '776066783622201344']
    }).setCategorySettings([
        {
            name: 'Audio Soundboard',
            emoji: '🎵'
        },
        {
            name: 'Help',
            emoji: '💡'
        }
    ])
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



client.login(process.env.TOKEN)