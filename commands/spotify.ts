import { GuildMember } from "discord.js";
import path from 'path'
import { joinVoiceChannel, DiscordGatewayAdapterCreator, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus } from '@discordjs/voice';
import { ICommand } from "wokcommands";




var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '14238c86f0c94ddaaecf85c5e9c8f07a',
  clientSecret: '075f85c79a094016a230a578a4524ff4',
  redirectUri: 'http://www.example.com/callback'
});



export default {
    category: 'Alert',
    description: 'Spotify bot',

    slash: true,
    testOnly: true,



    callback: async ({ interaction }) => {
        try {
            spotifyApi.setAccessToken('BQDMWrvQsqCBXsvwT2-9bseQ8atIqOhSoSfdFhYypQx9hzlxI4a6icaIMI_jixu2BuPtCsCtWdJBZg8XNTHkS4rXwc82Oj3LeY1qgQXONpcWVt4g9OxD45ByXG3vGx17kiKTaY-btdKQh4R7j0dsBbijTqAou1a_4fE');
            spotifyApi.getUser('31egucmp7jilfd6dmqp4iwygk7yy')

                .then(function(data: { body: any; }) {
                    console.log('Some information about this user', data.body);
                }, function(err: any) {
                    console.log('Something went wrong!', err);
                });
                return "test";
        } catch (error) {
            throw error;
        }




    },
} as ICommand