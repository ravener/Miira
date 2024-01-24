const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, getUserAgentAppendix, AttachmentBuilder } = require('discord.js');
const { SelectMenuBuilder, ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { connectToMongoDB } = require('../../mongo');
const localFunctions = require('../../functions');
const localConstants = require('../../constants');
const buttonCache = new Map();

module.exports = {
  data: {
    name: 'select-collab'
  },
  async execute(int, client) {
    await int.deferReply({ ephemeral: true });
    const userId = int.user.id;
    const { collection, client: mongoClient } = await connectToMongoDB("Collabs");
    const { collection: userCollection, client: mongoClientUsers } = await connectToMongoDB("OzenCollection");
    const guild = client.guilds.cache.get(localConstants.guildId);
    const guildMember = guild.members.cache.get(userId);
    try {
      const userCollabs = await localFunctions.getUserCollabs(userId, userCollection);
      let userOsuData = await localFunctions.getOsuData(userId, userCollection);
      let collab = await localFunctions.getCollab(int.values[0], collection);
      let collabColor;
      if (typeof collab.color === "undefined") {
        collabColor = await localFunctions.getMeanColor(collab.thumbnail);
        await localFunctions.setCollabColor(collab.name, collabColor, collection);
      } else {
        collabColor = collab.color;
      }
      const userInCollab = userCollabs.find(e => e.collabName === collab.name) ? true : false;
      let components = [];
      let embeds = [];
      let URLstring = '';
      const logoColored = await localFunctions.changeHueFromUrl(localConstants.mirageLogo, collabColor, `./assets/coloredLogos/logo-${collabColor}.png`);
      if (typeof collab.spreadsheetID !== "undefined") {
        URLstring = `[Spreadsheet](https://docs.google.com/spreadsheets/d/${collab.spreadsheetID})`
      }
      const dashboardEmbed = new EmbedBuilder()
        .setColor(collabColor)
        .setURL('https://endlessmirage.net/')

      let extraString = '';

      if (collab.user_cap !== 0) {
        extraString = `User Limit: ${collab.user_cap}\n`
      } else {
        extraString = "Unlimited\n"
      }

      dashboardEmbed.addFields(
        {
          name: "‎",
          value: `┌ Type: ${localFunctions.capitalizeFirstLetter(collab.type)}\n├ Topic: ${localFunctions.capitalizeFirstLetter(collab.topic)}\n└ Status: ${localFunctions.capitalizeFirstLetter(collab.status)}\n`,
          inline: true
        }
      );

      dashboardEmbed.addFields(
        {
          name: "‎",
          value: `┌ Class: ${localFunctions.capitalizeFirstLetter(collab.restriction)}\n├ Opening date: <t:${parseInt(collab.opening)}:R>\n└ ${extraString}`,
          inline: true
        }
      );

      components = new ActionRowBuilder();

      const userData = await localFunctions.getOsuData(userId, userCollection);
      if (userData) {
        components.addComponents(
          new ButtonBuilder()
            .setCustomId('profile-collab')
            .setLabel('🎫 General Profile')
            .setStyle('Primary'),
        )
      } else {
        components.addComponents(
          new ButtonBuilder()
            .setCustomId('link-osu')
            .setLabel('🔗 Link your osu! Account')
            .setStyle('Success'),
        )
      }

      let tier = 0;
      let prestigeLevel = 0;
      let prestige = guildMember.roles.cache.find(role => localConstants.prestigeRolesIDs.includes(role.id));
      if (typeof prestige !== "undefined") {
        prestige = prestige.name

        prestigeLevel = parseInt(prestige.replace('Prestige ', ''));
      }
      const userTier = await localFunctions.getUserTier(userId, userCollection);
      if (userTier) {
        console.log(userTier);
        tier = localFunctions.premiumToInteger(userTier.name);
      } else if (guildMember.roles.cache.has('743505566617436301')) {
        let premiumDetails = await localFunctions.assignPremium(int, userId, userCollection, guildMember);
        tier = localFunctions.premiumToInteger(premiumDetails[0].name);
      }

      let infoValue = "";

      if (userInCollab) {
        if (collab.restriction === "deluxe"/*&& user doesn't have extra mats purchased*/) {
          /*add a button to purchase extra mats*/
        }
        components.addComponents(
          new ButtonBuilder()
            .setCustomId('profile-pick')
            .setLabel('🛅 Collab Profile')
            .setStyle('Primary'),
        )
        switch (collab.status) {
          case 'delivered':
            components.addComponents(
              new ButtonBuilder()
                .setCustomId('download-collab')
                .setLabel('⬇️ Download')
                .setStyle('Primary'),
            )
            break;
          case 'completed':
            components.addComponents(
              new ButtonBuilder()
                .setCustomId('download-collab')
                .setLabel('⬇️ Download')
                .setStyle('Primary'),
            )
            break;
          case 'early delivery':
            if (tier >= 4) {
              components.addComponents(
                new ButtonBuilder()
                  .setCustomId('download-collab')
                  .setLabel('⬇️ Download')
                  .setStyle('Primary'),
              )
            }
            break;
        }
      } else {
        switch (collab.restriction) {
          case "staff":
            switch (collab.status) {
              case 'open':
                if (guildMember.roles.cache.has('961891383365500938')) {
                  infoValue = "**As a Staff member, you can participate in this collab!**"
                  components.addComponents(
                    new ButtonBuilder()
                      .setCustomId('join-collab')
                      .setLabel('✅ Join')
                      .setStyle('Success'),
                  )
                } else {
                  infoValue = "**This collab is hosted for staff only!**"
                }
                break;
              case 'full':
                infoValue = "**This collab is full!**"
                break;
              default:
                infoValue = "**This collab is hosted for staff only!**"
                break;
            }
            break;
          case "deluxe":
            switch (collab.status) {
              case 'open':
                if (false /*user has entry for the collab*/) {
                  infoValue = "**You have an entry ticket for a deluxe collab!**";
                  components.addComponents(
                    new ButtonBuilder()
                      .setCustomId('join-collab')
                      .setLabel('✅ Join')
                      .setStyle('Success'),
                  )
                } else {
                  infoValue = "**To participate in this collab, you have to pay an entry fee**";
                  components.addComponents(
                    new ButtonBuilder()
                      .setCustomId('deluxe-collab-entry')
                      .setLabel('⚙️ Buy Entry')
                      .setStyle('Success'),
                  )
                }
                break;
              case 'on design':
                if (false /*user has entry for the collab*/) {
                  infoValue = "**You have an entry ticket for a deluxe collab!**";
                  components.addComponents(
                    new ButtonBuilder()
                      .setCustomId('join-collab')
                      .setLabel('✅ Join')
                      .setStyle('Success'),
                  )
                } else {
                  infoValue = "**To participate in this collab, you have to pay an entry fee**";
                  components.addComponents(
                    new ButtonBuilder()
                      .setCustomId('deluxe-collab-entry')
                      .setLabel('⚙️ Buy Entry')
                      .setStyle('Success'),
                  )
                }
                break;
              case 'full':
                infoValue = "**This collab is full!**";
                break;
              default:
                infoValue = "**This is a paid entry collab! To participate, you can buy an entry when this collab is on design or open."
                break;
            }
            break;
          case "megacollab":
            switch (collab.status) {
              case 'open':
                infoValue = "**Join for free to this massive osu! project!**";
                components.addComponents(
                  new ButtonBuilder()
                    .setCustomId('join-collab')
                    .setLabel('✅ Join')
                    .setStyle('Success'),
                )
                break;
              case 'early access':
                let userPerks = await localFunctions.getPerks(userId, userCollection);
                infoValue = "**Peak premium users are now picking!**";
                if (typeof userPerks.find(e => e.name === 'Megacollab Early Access') !== "undefined" && collab.restriction === 'megacollab') {
                  infoValue = "**Thank you for purchasing early access!**";
                  components.addComponents(
                    new ButtonBuilder()
                      .setCustomId('join-collab')
                      .setLabel('✅ Join')
                      .setStyle('Success'),
                  )
                }
                break;
              case 'full':
                infoValue = "**This collab is full! Wow!**";
                break;
              default:
                infoValue = "**Massive collab hosted for free!** Endless Mirage have the history of hosting massive user collaborations since 2018 and we don't seem to be stopping anytime soon!";
                break;
            }
            break;
          case "prestige":
            switch (collab.status) {
              case 'open':
                if (prestigeLevel >= 4) {
                  infoValue = "**You're able to participate in this collab!**";
                  components.addComponents(
                    new ButtonBuilder()
                      .setCustomId('join-collab')
                      .setLabel('✅ Join')
                      .setStyle('Success'),
                  )
                } else {
                  infoValue = "**Collab only for prestige 4+ users!**";
                }
                break;
              case 'full':
                infoValue = "**This collab is full!**";
                break;
              default:
                infoValue = "**Collab only for prestige 4+ users!**";
                break;
            }
            break;
          case "experimental":
            switch (collab.status) {
              case 'open':
                if (prestigeLevel >= 4 || tier >= 1) {
                  infoValue = "**You're able to participate in this collab!**";
                  components.addComponents(
                    new ButtonBuilder()
                      .setCustomId('join-collab')
                      .setLabel('✅ Join')
                      .setStyle('Success'),
                  )
                } else {
                  infoValue = "**This collab is a experiment. Only prestige 4+ and premium can join!**";
                }
                break;
              case 'full':
                infoValue = "**This collab is full!**";
                break;
              default:
                infoValue = "**This collab is a experiment. Only prestige 4+ and premium can join!**";
                break;
            }
            break;
          case "none":
            switch (collab.status) {
              case 'open':
                infoValue = "**You're able to participate in this collab!**";
                components.addComponents(
                  new ButtonBuilder()
                    .setCustomId('join-collab')
                    .setLabel('✅ Join')
                    .setStyle('Success'),
                )
                break;
              case 'full':
                infoValue = "**This collab is full!**";
                break;
              default:
                infoValue = "**There is no restrictions for this collab! How awewsome**";
                break;
            }
            break;
        }
      }

      dashboardEmbed.setDescription(`**\`\`\`\n🏐 ${collab.name}\`\`\`**                                                                                                        Please check the __**${URLstring}**__ for character availability and participants.`);

      if (infoValue.length !== 0) {
        dashboardEmbed.addFields(
          {
            name: "‎",
            value: `${infoValue}`
          }
        )
      }


      if (userId === '687004886922952755') {
        components.addComponents(
          new ButtonBuilder()
            .setCustomId('admin-collab')
            .setLabel('⚙️ Admin')
            .setStyle('Secondary'),
        )
      }

      dashboardEmbed.setFooter({ text: 'Endless Mirage | Collabs Dashboard', iconURL: 'attachment://footer.png' })
      embeds.push(dashboardEmbed);

      if (collab.designs.length !== 0) {
        let i = 0;
        let designName;

        for (const design in collab.designs) {
          switch (design) {
            case 'av':
              designName = 'Avatar';
              break;
            case 'ba':
              designName = 'Banner';
              break;
            case 'ca':
              designName = 'Card';
              break;
            case 'he':
              designName = "Header";
              break;
            case 'wa':
              designName = "Wallpaper";
              break;
            case 'ov':
              designName = "Overlay";
              break;
            case 'sk':
              designName = "Skin";
              break;
            case 'po':
              designName = "Poster";
              break;
          }
          let embed = new EmbedBuilder()
            .setURL('https://endlessmirage.net/')
            .setImage(collab.designs[design]);

          embeds.push(embed);
          i++;
        }
      }

      buttonCache.set(int.user.id, {
        collab: collab.name,
        osuData: userOsuData,
        userCollabData: userCollabs
      })

      const attachment = new AttachmentBuilder(collab.thumbnail, {
        name: "thumbnail.png"
      });

      await int.editReply({
        content: '',
        files: [attachment,
          {
            attachment: `./assets/coloredLogos/logo-${collabColor}.png`,
            name: 'footer.png'
          }
        ],
        embeds: embeds,
        components: [components],
      })

    } catch (e) {
      console.log(e)
      await int.editReply('Something went wrong...')
    } finally {
      mongoClient.close();
      mongoClientUsers.close();
    }
  },
  buttonCache: buttonCache
};