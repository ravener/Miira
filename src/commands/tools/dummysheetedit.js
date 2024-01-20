const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { connectToMongoDB } = require('../../mongo');
const { connectToSpreadsheet } = require('../../googleSheets');
const localFunctions = require('../../functions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('editsheet')
        .setDescription('(Admin Only).')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(int, client) {
        await int.deferReply({ ephemeral: true });
        if (int.user.id !== '687004886922952755') return;
        const cellDB = "B3";
        try {
            const interval = (Math.floor(Math.random() * 7) + 1)*1000;
            const doc = await connectToSpreadsheet('1uyHuFB5rnNo6aXG3AuDHXtkc-xfHJKDgKi5jxamwp6I');
            const sheet = doc.sheetsByIndex[7];
            await sheet.loadCells();
            const coord = localFunctions.excelSheetCoordinateToRowCol(cellDB);
            const cell = sheet.getCell(coord.row, coord.col);
            console.log(cell);
            cell.value = "Hello World!";
            cell.borders = { bottom: { style: 'SOLID_MEDIUM', colorStyle: { rgbColor: { red: 0.8549019607843137, green: 0.2823529411764706, blue: 0.2823529411764706 }}}};
            cell.textFormat = { italic: true, strikethrough: true };
            const wait = new Promise(resolve => setTimeout(resolve, interval)); 
            await sheet.saveUpdatedCells();

            await int.editReply('Sheet edited.')
            console.log('A cell in the sheet has been updated.');

        } catch (e) {
            await int.editReply('Error.')
            console.error('Error updating cell:', e);
        }
    },
}