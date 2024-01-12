const { connectToMongoDB } = require('../../mongo');
const localFunctions = require('../../functions');
const localConstants = require('../../constants');
const { TextInputStyle } = require('discord.js');
const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('@discordjs/builders');

module.exports = {
    data: {
        name: 'verify-payment'
    },
    async execute(int, client) {
        const modal = new ModalBuilder()
            .setCustomId(`verify-paypal`)
            .setTitle('Verify your Payment.');

        const email = new TextInputBuilder()
            .setCustomId('email')
            .setLabel('Input your paypal email to verify the payment')
            .setPlaceholder('example@gmail.com')
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        modal.addComponents(new ActionRowBuilder().addComponents(email));

        await int.showModal(modal);
    }
}