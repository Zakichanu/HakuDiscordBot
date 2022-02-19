import DiscordJS, { GuildMember, Intents, MessageEmbed, TextChannel } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import mongoose, { Query } from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
dotenv.config();
import dealabsSub from "./schema/dealabsSub";
import topDeal from "./module/topDeal";


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
            name: 'Audio Soundboard',
            emoji: '🎵'
        },
        {
            name: 'Help',
            emoji: '💡'
        },
        {
            name: 'Alert',
            emoji: '🚨'
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

// Envoie des messages des meilleurs deals tous les jours à 18h

cron.schedule('0 0 20 * * *', async () => {

    const subChannels = await dealabsSub.find({});
    for (const sub of subChannels) {
        const channelToSend = client.channels.cache.get(sub.channelId);

        // Envoyer l'element dans le cas ou il n'est pas 'undifined'
        if (channelToSend != null) {
            (channelToSend as TextChannel).send('🔥🔥🔥**DEAL DU JOUR**🔥🔥🔥')

            for (const deal of topDeal.topDeals) {
                console.log(new Date().toLocaleString() + ' ' + deal);

                const embed = new MessageEmbed()
                    .setTitle('🔥 ' + deal.upvote + ' ' + deal.title)
                    .setColor('RED')
                    .setThumbnail(deal.img)
                    .setURL(deal.url)

                if (deal.price === '') {
                    embed.setDescription('🆓 GRATUIT')
                } else {
                    embed.setDescription('💰 ' + deal.price)
                }

                (channelToSend as TextChannel).send({ embeds: [embed] });
            }
            console.log(new Date().toLocaleString() + ' Deals sent to channel ' + (channelToSend as TextChannel).id);           
        }else {
            // Suppression de l'objet du model car il ne sert à rien
            await dealabsSub.deleteOne(sub);
        }
    }

    // Rendre la liste des deals à vide
    topDeal.topDeals.length = 0;
    console.log(topDeal.topDeals)
});



if(process.env.NODE_ENV === 'production'){
    client.login(process.env.TOKEN_PROD)
}else if(process.env.NODE_ENV === 'development'){
    client.login(process.env.TOKEN_DEV)
}
console.log(process.env.NODE_ENV)

