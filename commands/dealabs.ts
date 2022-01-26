import path from 'path'
import DJS from 'discord.js'
import { joinVoiceChannel, DiscordGatewayAdapterCreator, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus } from '@discordjs/voice';
import { ICommand } from "wokcommands";
import dealabsSub from "../schema/dealabsSub";


export default {
    category: 'Alert',
    description: 'Soyez alerter des meilleurs deals hot de la journée',

    testOnly: true,
    slash: true,

    minArgs: 1,
    expectedArgs: '<channel>',


    options: [
        {
            name: 'channel',
            description: 'Salon textuel cible',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL

        }
    ],
 

    callback: async ({ interaction }) => {
        try {
            const target = interaction.options.getChannel('channel')
            if (!target || target.type !== 'GUILD_TEXT') {
                return 'Veuillez choisir un salon textuel pour souscrire à cette alerte'
            }
            const isAlreadyInserted = await dealabsSub.find({ guildId: interaction.guildId, channelId: target.id})
            
            if (isAlreadyInserted.length > 0) {
                return 'Vous avez déjà souscrit à cette alerte'
            } else {
                await dealabsSub.findOneAndRemove({guildId: interaction.guildId})


                await new dealabsSub({
                    guildId: interaction.guildId,
                    channelId: target.id,

                }).save()
                
                return "Vous avez souscrit à l'alerte de dealabs"
            }
        } catch (error) {
            throw error;
        }


    },


} as ICommand