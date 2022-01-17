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

    console.log('Haku est prêt')

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['932674235388817408']
    })
})


// Commande discrete
client.on('messageCreate', async (message) => {
    try {
        if (message.content === "?bag") {
            const player = createAudioPlayer();

            const resource = createAudioResource(path.join('./sound/', 'Nrv.mp3'), {
                inputType: StreamType.Arbitrary,

            });

            player.play(resource);

            await entersState(player, AudioPlayerStatus.Playing, 5e3);
            const member = message.member as GuildMember

            if (member.voice.channel) {
                const connection = joinVoiceChannel({
                    channelId: member.voice.channelId as string,
                    guildId: message.guildId as string,
                    adapterCreator: message.guild!.voiceAdapterCreator as DiscordGatewayAdapterCreator,
                });

                try {
                    await entersState(connection, VoiceConnectionStatus.Ready, 30e3);

                    connection.subscribe(player)

                    message.reply({
                        content: 'Ca rage par ici'
                    })
                } catch (error) {
                    connection.destroy();
                    throw error;
                }
            } else {

                message.reply({
                    content: "❌ | Vous devez rejoindre un salon vocal pour pouvoir exécuter cette commande"
                })
            }

        }

        if (message.content === "?sami") {
            const player = createAudioPlayer();

            const resource = createAudioResource(path.join('./sound/', 'Sami.mov'), {
                inputType: StreamType.Arbitrary,

            });

            player.play(resource);

            await entersState(player, AudioPlayerStatus.Playing, 5e3);
            const member = message.member as GuildMember

            if (member.voice.channel) {
                const connection = joinVoiceChannel({
                    channelId: member.voice.channelId as string,
                    guildId: message.guildId as string,
                    adapterCreator: message.guild!.voiceAdapterCreator as DiscordGatewayAdapterCreator,
                });

                try {
                    await entersState(connection, VoiceConnectionStatus.Ready, 30e3);

                    connection.subscribe(player)

                    message.reply({
                        content: 'OHHH LES TENDERS LA'
                    })
                } catch (error) {
                    connection.destroy();
                    throw error;
                }
            } else {

                message.reply({
                    content: "❌ | Vous devez rejoindre un salon vocal pour pouvoir exécuter cette commande"
                })
            }

        }
    } catch (error) {
        throw error;
    }
});



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