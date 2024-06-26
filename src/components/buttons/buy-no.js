const { userConfirmationCache } = require('../selectMenus/buy-item');

module.exports = {
    data: {
        name: 'buy-no'
    },
    async execute(int) {
        const userConfirmation = userConfirmationCache.get(int.user.id);
        // User canceled the purchase
        if (userConfirmation) {
            await int.reply({ content: 'Purchase Cancelled.', ephemeral: true });
        }

        // Remove the user's confirmation from the cache
        userConfirmationCache.delete(int.user.id);
    }
};
