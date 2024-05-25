const { EmbedBuilder } = require('discord.js');
const { connectToMongoDB } = require('../../mongo');
const localConstants = require('../../constants');
const localFunctions = require('../../functions');
const { collabCache } = require('./manage-pick-collab');

module.exports = {
    data: {
        name: "blacklist-user-collab-admin"
    },
    async execute(int, client) {
        await int.deferReply({ephemeral: true});
        const { collection, client: mongoClient } = await connectToMongoDB("Collabs");
        const { collection: userCollection, client: mongoClientUsers } = await connectToMongoDB("OzenCollection");
        const { collection: blacklistCollection, client: mongoClientBlacklist } = await connectToMongoDB("Blacklist");
        const guild = client.guilds.cache.get(localConstants.guildId);
        const logChannel = guild.channels.cache.get(localConstants.logChannelID);
        const auditChannel = guild.channels.cache.get(localConstants.auditLogChannelID);

        try {
            const collab = collabCache.get(int.user.id).collab;
            const pickFull = collabCache.get(int.user.id).pick;
            let participants = collab.participants;
            const id = pickFull.id;
            const fullParticipation = participants.find((e) => e.id === id);

            await localFunctions.setBlacklist(fullParticipation.discordId, int.fields.getTextInputValue('reason') ? int.fields.getTextInputValue('reason') : "None", blacklistCollection);
            let userCollabs = await localFunctions.getUserCollabs(fullParticipation.discordId, userCollection);
            await localFunctions.unsetCollabParticipation(collab.name, collection, id);
            userCollabs = userCollabs.filter(e => e.collabName !== collab.name);
            await localFunctions.setUserCollabs(fullParticipation.discordId, userCollabs, userCollection);
            await localFunctions.removeCollabParticipant(collab.name, collection, fullParticipation.discordId);
            await localFunctions.unsetParticipationOnSheet(collab, pickFull);

            const leaveEmbed = new EmbedBuilder()
                .setFooter({ text: 'Endless Mirage | New Character Available', iconURL: 'https://puu.sh/JP9Iw/a365159d0e.png' })
                .setColor('#f26e6a')
                .setDescription(`**\`\`\`ml\n📣 New Character Available!\`\`\`**                                                                                                        **${collab.name}**\nName:${pickFull.name}\nID: ${pickFull.id}`)
                .setImage(pickFull.imgURL)
            logChannel.send({ content: `User <@${fullParticipation.discordId}> has been blacklisted from the collabs.\n**Reason:** ${int.fields.getTextInputValue('reason') ? int.fields.getTextInputValue('reason') : "None"}\n**Removed by:** <@${int.user.id}>`, embeds: [leaveEmbed] });

            const auditEmbed = new EmbedBuilder()
                .setFooter({ text: 'Endless Mirage | Audit Log', iconURL: 'https://puu.sh/JP9Iw/a365159d0e.png' })
                .setColor('#f26e6a')
                .setDescription(`**\`\`\`ml\n📣 New Action Taken\`\`\`**                                                                                                        **An user has been blacklisted!**\n\n**Pick Name**: ${pickFull.name}\n**Pick ID**: ${pickFull.id}\n**Ex-Owner**: <@${fullParticipation.discordId}>\n**Removed by**: <@${int.user.id}>\n**Reason**: ${int.fields.getTextInputValue('reason') ? int.fields.getTextInputValue('reason') : "None"}`);
            auditChannel.send({ content: '', embeds: [auditEmbed] });
            await int.editReply('The user has been blacklisted.');
        } finally {
            mongoClient.close();
            mongoClientUsers.close();
            mongoClientBlacklist.close();
        }
    },
};