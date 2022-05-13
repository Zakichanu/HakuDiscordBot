import DJS, { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Bot information',
    description: 'Répertorie toutes les commandes',

    slash: true,

    options: [
        {
            name: 'information',
            description: "💡 En savoir plus sur le bot",
            type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        },
        {
            name: 'alerts',
            description: "🚨 Commandes textes",
            type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        },
        {
            name: 'soundboard',
            description: "🎵 Commandes vocales",
            type: DJS.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        }
    ],


    callback: ({ interaction }) => {
        try {
            // Récupération du subcommand
            const subcommand = interaction.options.getSubcommand();



            const embed = new MessageEmbed()
                .setTitle("Haku 🐉")
                .setColor('PURPLE')
                .setThumbnail("https://c.tenor.com/Air2y_Be114AAAAC/haku-chihiro.gif")
                .setURL("https://github.com/Zakichanu/HakuDiscordBot")


            if (subcommand === 'information') {
                embed.setDescription("Un bot communautaire qui mettra de l'ambiance au sein de votre serveur Discord, il est fait pour " +
                    "les amateurs de discord et ce sont les utilisateurs qui l'alimentent, enjoy. Plusieurs commandes sont disponibles : ")
                embed.addFields([
                    {
                        name: '🚨 Les commandes textuelles',
                        value: 'Pour voir en détail : /help alerts'
                    },
                    {
                        name: '🎵 Les commandes vocales',
                        value: 'Pour voir en détail : /help soundboard'
                    }
                ])
            } else if (subcommand === 'alerts') {
                embed.setTitle("Haku 🐉 Section des alertes")
                // embed.addFields([
                //     {
                //         name: '🚨 /dealabs subscribe <channel-text>',
                //         value: 'Souscription à une alerte Dealabs'
                //     },
                //     {
                //         name: '🚨 /dealabs unsubscribe',
                //         value: "Désinscription à l'alerte Dealabs"
                //     }
                // ])
            } else if (subcommand === 'soundboard') {
                embed.setTitle("Haku 🐉 Section de l'audio")
                embed.addFields([
                    {
                        name: '🎵/buzzer',
                        value: 'Emet le son de Question Pour un Champion'
                    },
                    {
                        name: '🎵/circus',
                        value: "Quand dans le vocal c'est le cirque, autant y mettre de l'ambiance"
                    },
                    {
                        name: '🎵/dog',
                        value: 'Aboie'
                    },
                    {
                        name: '🎵/prout',
                        value: 'Ce bot flatule en echo'
                    },
                    {
                        name: '🎵/siuu',
                        value: 'Cri du goat'
                    },
                    {
                        name: '🎵/gmk',
                        value: 'Il envoie sa voiture en enfer'
                    },
                    {
                        name: '🎵/olala',
                        value: 'Il a rien apporté'
                    },
                    {
                        name: '🎵/dehors',
                        value: 'DEHOOOOORS'
                    },
                    {
                        name: '🎵/lait',
                        value: 'Il est lent ce lait'
                    },
                    {
                        name: '🎵/uwu',
                        value: 'UwU'
                    },
                    {
                        name: '🎵/bander',
                        value: 'Ça me fait bander'
                    },
                ])


                if ((interaction.guildId === '776066783622201344') || (interaction.guildId === '932674235388817408')) {
                    embed.addField('[PRIVE]🎵/sami', 'Sami qui pète')
                    embed.addField('[PRIVE]🎵/wallah', 'WAllah de Sami')
                    embed.addField('[PRIVE]🎵/bag', 'Bag qui rage (saturation au max)')
                    embed.addField('[PRIVE]🎵/sexe', "DEMANDE MOI CE QUE J'AIME")
                    embed.addField('[PRIVE]🎵/bellebite', "SORS LE MIELZER")
                }
            }


            return embed
        } catch (error) {
            throw error;
        }

    }


} as ICommand