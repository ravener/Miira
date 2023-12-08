const { connectToMongoDB } = require('../../mongo');
const localFunctions = require('../../functions');
const localConstants = require('../../constants');
const { EmbedBuilder } = require('discord.js');
const { SelectMenuBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { premiumBuyCache } = require('../buttons/premium-buy');
const { perkCache } = require('../buttons/perks-buy');
const { renewalCache } = require('../buttons/renew-perks');
const { upgradeCache } = require('../buttons/upgrade-tier');

module.exports = {
    data: {
        name: 'add-content-to-cart'
    },
    async execute(int, client) {
        await int.deferReply({ ephemeral: true });
        const { collection, client: mongoClient } = await connectToMongoDB("OzenCollection");
        const allMaps = [premiumBuyCache, perkCache, renewalCache, upgradeCache];
        const userId = int.user.id;
        const pendingItems = int.values;
        const initializedMap = [premiumBuyCache, perkCache, renewalCache, upgradeCache].find(map => map.size > 0);
        const initializedMapIndex = [premiumBuyCache, perkCache, renewalCache, upgradeCache].findIndex(map => map.size > 0);
        let newCart = [];
        const allOptions = initializedMap.get(int.user.id).choices;
        let fullChoices = allOptions.filter(obj => pendingItems.includes(obj.name))
        console.log(fullChoices);

        let addedToCartEmbed = new EmbedBuilder()
            .setColor('#f26e6a')
            .setImage('https://puu.sh/JPffc/3c792e61c9.png')  

        mainProcess: try {
            let contentString = "";
            let userTier = await localFunctions.getUserTier(userId, collection);
            let tierInChoices = await fullChoices.find((element) => element.type === "Tier");
            let perkInChoices = await fullChoices.find((element) => element.type === "Perk");
            let perksInChoices = await fullChoices.filter((element) => element.type === "Perk");
            let renewalInChoices = await fullChoices.find((element) => element.type === "Renewal");
            let renewalsInChoices = await fullChoices.filter((element) => element.type === "Renewal");
            let upgradeInChoices = await fullChoices.find((element) => element.type === "Upgrade");
            let upgradesInChoices = await fullChoices.filter((element) => element.type === "Upgrade");
            if (userTier && tierInChoices) {
                if (userTier.name === tierInChoices.name) {
                    int.editReply("You cannot add the tier you already have.");
                    break mainProcess; 
                }
            }
            if (perkInChoices && tierInChoices) {
                int.editReply("You cannot add the tier and the perks of that tier at the same time. The tier itself already includes both perks");
                break mainProcess;
            }
            let cartItems = await localFunctions.getCart(userId, collection);
            if (cartItems) {
                newCart = cartItems;
            }
            let tierCheckChoices = [];
            let tierCheckCart = [];
            let tierInCart = await cartItems.find((element) => element.type === "Tier");
            let upgradeInCart = await cartItems.find((element) => element.type === "Upgrade");
            let perksInCart = await cartItems.filter((element) => element.type === "Perk");
            let renewalsInCart = await cartItems.filter((element) => element.type === "Renewal");
            if (renewalsInCart.length && cartItems.filter((element) => element.name === userTier.name) && renewalInChoices) {
                int.editReply("You cannot add a renewal for a perk while you have a renewal for your tier in your cart.");
                break mainProcess;
            }
            if (tierInChoices) {
                tierCheckChoices = tierInChoices;
            }
            if (upgradeInChoices) {
                tierCheckChoices = upgradeInChoices;
            }
            if (tierInCart) {
                tierCheckCart = tierInCart;
            }
            if (upgradeInCart) {
                tierCheckCart = upgradeInCart;
            }

            if (Object.keys(tierCheckChoices).length && perksInCart.length) {
                for (tier of localConstants.premiumTiers) {
                    if (localFunctions.premiumToInteger(tierCheckChoices.name) >= localFunctions.premiumToInteger(tier.name) && (Object.keys(tier.perks.filter(obj => perksInCart.includes(obj.name))).length)) {
                        int.editReply("You cannot add this tier while having perks that its purchase includes. Please remove the perks of your cart first before adding.");
                        break mainProcess;
                    }
                }
            } else if (Object.keys(tierCheckCart).length && perkInChoices) {
                for (tier of localConstants.premiumTiers) {
                    if (localFunctions.premiumToInteger(tierCheckCart.name) >= localFunctions.premiumToInteger(tier.name) && (tier.perks.filter(obj => perksInChoices.includes(obj.name)))) {
                        console.log('wtf');
                        int.editReply("You cannot add this perk while having a tier that includes it in your cart. Please remove the tier of your cart first before adding.");
                        break mainProcess;
                    }
                }
            }
            if (tierInCart && tierInChoices) {
                if (tierInCart.name === tierInChoices.name) {
                    int.editReply("You already have this tier in your cart.");
                    break mainProcess;
                }
            }
            if (upgradeInCart && upgradesInChoices) {
                if (upgradeInCart.name === upgradesInChoices.name) {
                    int.editReply("You already have this upgrade in your cart.");
                    break mainProcess;
                }
            }
            for (perk of perksInCart) {
                if (perksInChoices.find((element) => element.name === perk.name)) {
                    int.editReply("You already have this perk in your cart.");
                    break mainProcess;
                }
            }
            for (renewal of renewalsInCart) {
                if (renewalsInChoices.find((element) => element.name === renewal.name)) {
                    int.editReply("You already have a renewal for this perk in your cart.");
                    break mainProcess; 
                }
            }

            if (tierInCart) {
                console.log(`T ${tierInChoices}`);
                newCart = newCart.filter(obj => obj.type !== "Tier");
                newCart.push(tierInChoices);
            }
            if (perkInChoices) {
                console.log(`P ${perksInChoices}`);
                newCart = newCart.concat(perksInChoices);
            }
            if (renewalInChoices) {
                console.log(`R ${renewalInChoices}`);
                newCart = newCart.concat(renewalsInChoices);
            }
            if (upgradeInChoices) {
                console.log(`U ${upgradesInChoices}`);
                newCart = newCart.filter(obj => obj.type !== "Upgrade");
                newCart = newCart.concat(upgradesInChoices);
            }

            for (content of fullChoices) {
                contentString = contentString.concat(`\n • `, `**Name:** ${content.name} - Price: **${content.price}$** - **Type:** ${content.type}`);
            }
            console.log(newCart);
            await localFunctions.setCart(userId, newCart, collection);
            allMaps[initializedMapIndex].delete(int.user.id);
            addedToCartEmbed.setDescription(`\`\`\`🚀 Content added to your cart\`\`\`${contentString}`); 
            mainComponents = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('premium-info')
                    .setLabel('✒️ Continue Shopping')
                    .setStyle('Primary'),
                new ButtonBuilder()
                    .setCustomId('shopping-cart')
                    .setLabel('✅ Check your cart')
                    .setStyle('Primary'),
            ) 
            int.editReply({
                content: '',
                embeds: [addedToCartEmbed],
                components: [mainComponents],
            });

        } catch (e) {
            console.log(e);
            mongoClient.close();
        }    
    }
}