import DJS from 'discord.js';
import { ICommand } from "wokcommands";
import dealabsSub from "../schema/dealabsSub";

export default {
    category: 'Alert',
    description: 'Soyez alerter des meilleurs deals hot de la journée',
    slash: true,

    minArgs: 1,
    expectedArgs: '<channel>',


    options: [
        {
            name: 'subscribe',
            description: "Inscription à l'alerte",
            type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [
                {
                    name: 'channel',
                    description: 'Salon textuel ciblé',
                    required: true,
                    type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
                }
            ]

        },
        {
            name: 'unsubscribe',
            description: "Désinscription à l'alerte",
            type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        } 
    ],


    callback: async ({ interaction }) => {
        try {

            // Récupération du subcommand
            const subcommand = interaction.options.getSubcommand();

            //Récupération des options
            const target = interaction.options.getChannel('channel')

            // Désinscription à l'alerte Dealabs
            if (subcommand === 'unsubscribe') {
                const isAlreadyInserted = await dealabsSub.find({ guildId: interaction.guildId })
                if (isAlreadyInserted.length > 0) {
                    await dealabsSub.deleteOne({ guildId: interaction.guildId })

                    return "✅ Vous avez été désinscrit de l'alerte Dealabs !"
                }else{
                    return "❌ Vous n'avez jamais été inscrit à l'alerte !"
                }

            }

            // Inscription
            else if(subcommand === 'subscribe'){
                if (!target || target.type !== 'GUILD_TEXT') {
                    return '❌ Veuillez choisir un salon textuel pour souscrire à cette alerte'
                }
                const isAlreadyInserted = await dealabsSub.find({ guildId: interaction.guildId, channelId: target.id })
    
                if (isAlreadyInserted.length > 0) {
                    return '❌ Vous avez déjà souscrit à cette alerte sur ce channel textuel : ' + target.name
                } else {
                    await dealabsSub.findOneAndRemove({ guildId: interaction.guildId })
    
    
                    await new dealabsSub({
                        guildId: interaction.guildId,
                        channelId: target.id,
    
                    }).save()
    
                    return "✅ Vous avez souscrit à l'alerte de dealabs sur ce channel textuel : " + target.name + ' !'
                }
            }
            // Si pas de subcommand
            else{
                return "📌 Choisir l'option subscribe ou unsubscrire pour exécuter la commande"
            }

            
        } catch (error) {
            throw error;
        }
    },
} as ICommand