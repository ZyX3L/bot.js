heroku buildpacks:set heroku/nodejs

const Discord = require('discord.js');
const client = new Discord.Client();
client.login('NjU5MzU4ODEyMjgwNzE3MzEy.XgNKmQ.g0AozV3u0E_zadlDwSLRTkwMOGg');

var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = 'defango.aternos.me'; // Your MC server IP or hostname address
var mcPort = 25565; // Your MC server port (25565 is the default)

client.on('message', message => {
    if (message.content === mcCommand) {
        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = '*Bro land is currently offline*';
            if(body.online) {
                status = '**Bro land** is **online**  -  ';
                if(body.players.now) {
                    status += '**' + body.players.now + '** people are playing!';
                } else {
                    status += '*Nobody is playing!*';
                }
            }
            message.reply(status);
        });
    }
});
