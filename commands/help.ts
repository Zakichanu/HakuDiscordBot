import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Help',
    description: 'Répertorie toutes les commandes',

    slash: true,

    callback: ({ interaction }) => {
        try {
            const embed = new MessageEmbed()
                .setTitle("Annuaire des commandes")
                .setColor('PURPLE')
                .addFields([
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
                        name: '🚨 /dealabs subscribe <channel-text>',
                        value: 'Souscription à une alerte Dealabs'
                    },
                    {
                        name: '🚨 /dealabs unsubscribe', 
                        value: "Désinscription à l'alerte Dealabs"
                    }
                ])
                .setThumbnail("https://c.tenor.com/Air2y_Be114AAAAC/haku-chihiro.gif")
                .setURL("https://github.com/Zakichanu/HakuDiscordBot")


            if ((interaction.guildId === '776066783622201344') || (interaction.guildId === '932674235388817408')) {
                embed.addField('[PRIVE]🎵/sami', 'Sami qui pète')
                embed.addField('[PRIVE]🎵/bag', 'Bag qui rage (saturation au max)')
            }

            return embed
        } catch (error) {
            throw error;
        }

    }


} as ICommand