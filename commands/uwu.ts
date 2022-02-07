import { GuildMember, MessageAttachment } from "discord.js";
import path from 'path'
import { joinVoiceChannel, DiscordGatewayAdapterCreator, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus } from '@discordjs/voice';
import { ICommand } from "wokcommands";

export default {
    category: 'Audio Soundboard',
    description: 'Uwuuuu',
    slash: true,



    callback: async ({ interaction }) => {
        try {
            const player = createAudioPlayer();

            const resource = createAudioResource(path.join('./sound/', 'Uwu.mp3'), {
                inputType: StreamType.Arbitrary,

            });

            player.play(resource);

            await entersState(player, AudioPlayerStatus.Playing, 5e3);



            const member = interaction.member as GuildMember

            if (member.voice.channel) {
                const connection = joinVoiceChannel({
                    channelId: member.voice.channelId as string,
                    guildId: interaction.guildId as string,
                    adapterCreator: interaction.guild!.voiceAdapterCreator as DiscordGatewayAdapterCreator,
                });

                try {
                    await entersState(connection, VoiceConnectionStatus.Ready, 30e3);

                    connection.subscribe(player)

                    return new 'UwU'
                } catch (error) {
                    connection.destroy();
                    throw error;
                }
            } else {
                return "❌ | Vous devez rejoindre un salon vocal pour pouvoir exécuter cette commande"
            }
        } catch (error) {
            throw error;
        }




    },
} as ICommand
