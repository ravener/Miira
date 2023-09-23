const rolesLevel = [
    '630980373374828544',
    '739111130034733108',
    '739111062682730507'
];

const staffUserIds = [
    '337197857566228480',
    '260016245225684992',
    '675733770610933761',
    '280107437720076288',
    '133050854499418113',
    '203932549746130944',
    '212983149125304321',
    '752845997662666752',
    '687004886922952755',
    '959278677789663302',
    '969663617828020224'
];

const channelCreationActions = [
    'Avatar GFX Commission',
    'Previous Megacollab Avatar',
    'Banner GFX Commission',
    'Previous Megacollab Banner',
    'Overlay GFX Commission',
    'Endless Mirage Skin'
];

const rolesToRemove = [

];

const shopItems = [
    { name: 'Tokens Boost X2 72h', value: '1,000 ₥', id: 'tokens-boost', desc: 'Obtain a X2 Token Boost per message sent in the next 72h.', class: 'Augments', isReturnable: false }, //Coded
    { name: 'Novice Active Member Role', value: '5,000 ₥', id: 'active-novice-role', desc: 'Obtain a role in the server that displays you\'re an active user along with a badge for all of your future collab materials.', class: 'Roles', isReturnable: false  }, //Coded
    { name: 'Avatar GFX Commission', value: '10,000 ₥', id: 'avatar-com', desc: 'Request a custom Avatar GFX Commission.', class: 'Commissions', isReturnable: false  }, //Coded
    { name: 'Advanced Active Member Role', value: '20,000 ₥', id: 'active-advanced-role', desc: 'Obtain a role in the server that displays you\'re an active user along with a badge for all of your future collab materials.', class: 'Roles', isReturnable: false  }, //Coded
    { name: 'Mirage I Perk', value: '50,000 ₥', id: 'mirage-one', desc: 'Be able to claim the Mirage I Paid perk for one collab.', class: 'Collab Perks', isReturnable: false  }, //Coded
    { name: 'Previous Megacollab Avatar', value: '50,000 ₥', id: 'avatar-collab-pre', desc: 'Obtain a customized Megacollab avatar with any of the previous designs.', class: 'Commissions', isReturnable: false  }, //Coded
    { name: 'Banner GFX Commission', value: '70,000 ₥', id: 'banner-com', desc: 'Request a custom Banner GFX Commission.', class: 'Commissions', isReturnable: false  }, //Coded
    { name: 'Previous Megacollab Banner', value: '70,000 ₥', id: 'banner-collab-pre', desc: 'Obtain a customized Megacollab banner with any of the previous designs.', class: 'Commissions', isReturnable: false  }, //Coded
    { name: 'Overlay GFX Commission', value: '80,000 ₥', id: 'overlay-com', desc: 'Request a custom Stream Overlay GFX Commission.', class: 'Commissions', isReturnable: false }, //Coded
    { name: 'Ultimate Active Member Role', value: '80,000 ₥', id: 'active-ultimate-role', desc: 'Obtain a role on top of the server that displays you\'re an active user along with a special badge for all of your future collab materials.', class: 'Roles', isReturnable: false }, //Coded
    { name: 'Endless Mirage Skin', value: '200,000 ₥', id: 'mirage-skin', desc: 'Obtain the current Megacollab\'s skin customized with your name and images.', class: 'Collab Perks', isReturnable: false }, //Coded
    { name: 'Collab Early Access', value: '300,000 ₥', id: 'early-access', desc: 'Obtain Early Access for the next megacollab.', class: 'Collab Perks', isReturnable: false },
    { name: 'Permanent X2 Boost', value: '300,000 ₥', id: 'perma-boost', desc: 'Obtain a permanent X2 Token Boost per message sent.', class: 'Augments', isReturnable: false }, //Coded
    { name: 'Global Boost', value: '300,000 ₥', id: 'global-boost', desc: 'Set a global boost of X4 tokens for 24 Hours.', class: 'Augments', isReturnable: false }, //Coded
    { name: 'Prestige Boost', value: '800,000 ₥', id: 'prestige-boost', desc: 'Get +1 Prestige Level.', class: 'Collab Perks', isReturnable: false },
    { name: 'Owner\'s maid suit pics', value: '10,000,000 ₥', id: 'feet', desc: 'owo', class: 'Extra', isReturnable: false }
    // Add more items as needed, ensuring each item is an object with 'name' and 'value'
];

const nonPurchaseableBackgrounds = [
    { name: 'Prestige Background', value: 'Obtained by participating on collabs.' , id: 'pres-bg', desc: 'Special prestige profile cosmetic obtained by participating on collabs.', class: 'Cosmetics', type: 'background', isReturnable: true },
    { name: 'Prestige Background Plus', value: 'Obtained by participating on 3+ collabs.', id: 'pres-bg-plus', desc: 'Special prestige profile cosmetic obtained by participating more than 3 collabs.', class: 'Cosmetics', type: 'background', isReturnable: true },
    { name: 'Premium Background', value: 'Obtained by purchagin premium.', id: 'premium-bg', desc: 'Special **premium** profile cosmetic.', class: 'Cosmetics', type: 'background', isReturnable: true },
    { name: 'Premium Background Plus', value: 'Obtained by purchasing a high premium tier.', id: 'premium-bg-plus', desc: 'Special **premium plus** profile cosmetic.', class: 'Cosmetics', type: 'background', isReturnable: true },
    { name: 'Staff Background', value: 'Obtained by being staff.', id: 'staff-bg', desc: 'Special profile cosmetic for staff.', class: 'Cosmetics', type: 'background', isReturnable: true }
]

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const premiumTiers = [
    {
        name: 'Mirage I', 
        description: 'Starter premium role with 2 perks, both tied to the megacollabs.' , 
        roleId: '963221388892700723',
        cost: 5,
        generalRenewalPrice: 2,
        deluxePrice: 2,
        deluxeExtraPrice: 2,
        perks: [
            {
                name: "Premium Avatar",
                description: "Obtain a special desgined avatar for the current collab.",
                restrictions: "Only same picked character in the collab.",
                renewalPrice: 1,
                individualPrice: 5,
                singleUse: true,
            },
            {
                name: "Premium Cover",
                description: "Obtain a special designed profile cover for your osu! profile.",
                restrictions: "Only same picked character in the collab.",
                renewalPrice: 1,
                individualPrice: 5,
                singleUse: true,
            }
        ],
        decay: true,  
        extra: 'This tier includes bump inmunity, a special profile cosmetic for the server and a special badge for the osu! me section.'     
    },
    {
        name: 'Mirage II', 
        description: 'This tier includes more extra materials, tied to the megacollabs.' , 
        roleId: '767452000777535488',
        cost: 10,
        generalRenewalPrice: 4,
        deluxePrice: 2,
        deluxeExtraPrice: 2,
        perks: [
            {
                name: "Premium Animated Banner",
                description: "Obtain a special animated banner for your me! section.",
                restrictions: "Any character can be used.",
                renewalPrice: 2,
                individualPrice: 10,
                singleUse: true,
            },
            {
                name: "Premium Forum Signature",
                description: "Obtain a special signature, usable in the osu! forums.",
                restrictions: "Any character can be used.",
                renewalPrice: 2,
                individualPrice: 10,
                singleUse: true,
            }
        ],
        decay: true,
        extra: 'This tier includes bump inmunity, a special profile cosmetic for the server and a special badge for the osu! me section.'      
    },
    {
        name: 'Mirage III', 
        description: 'This tier includes more extra materials, tied to the megacollabs.' , 
        roleId: '1146645094699642890',
        cost: 15,
        generalRenewalPrice: 6,
        deluxePrice: 2,
        deluxeExtraPrice: 2,
        perks: [
            {
                name: "Premium Animated Stream Overlay",
                description: "Obtain a special animated stream overlay.",
                restrictions: "Images and fields will have restrictions by the design itself.",
                renewalPrice: 3,
                individualPrice: 15,
                singleUse: true,
            },
            {
                name: "Premium Desktop Wallpaper",
                description: "Obtain a special desktop wallpaper.",
                restrictions: "Any character can be used.",
                renewalPrice: 2,
                individualPrice: 10,
                singleUse: true,
            },
            {
                name: "Premium Collab Poster",
                description: "Obtain a printable poster of the current megacollab.",
                restrictions: "Any character can be used.",
                renewalPrice: 2,
                individualPrice: 10,
                singleUse: true,
            }
        ],
        decay: true,
        extra: 'This tier includes bump inmunity, a special profile cosmetic for the server and a special badge for the osu! me section.'      
    }, 
    {
        name: 'Mirage IV', 
        description: 'This tier includes early delivery for the collabs, along no premium decay after collabs.' , 
        roleId: '787388728795987969',
        cost: 20,
        generalRenewalPrice: 4,
        deluxePrice: 2,
        deluxeExtraPrice: 2,
        perks: [
            {
                name: "Early Collab Delivery",
                description: "Obtain the collab materials before public release.",
                restrictions: "At least 1 week before and only applies for main collab materials.",
                renewalPrice: null,
                individualPrice: null,
                singleUse: false,
            }
        ],
        decay: false,
        extra: 'This tier includes bump inmunity, no premium role decay, a special profile cosmetic for the server and a special badge for the osu! me section.'      
    },
    {
        name: 'Mirage V', 
        description: 'This tier includes a customized osu! skin and an extra set of collab materials.' , 
        roleId: '787388721255153694',
        cost: 40,
        generalRenewalPrice: 16,
        deluxePrice: 1,
        deluxeExtraPrice: 1,
        perks: [
            {
                name: "Megacollab Themed osu! skin",
                description: "Obtain the collab's osu! skin customized for you.",
                restrictions: "Any character and texts can be used.",
                renewalPrice: 6,
                individualPrice: 20,
                singleUse: true,
            },
            {
                name: "Extra Collab Materials",
                description: "Obtain an extra set of the current megacollab materials.",
                restrictions: "Any character can be used.",
                renewalPrice: 6,
                individualPrice: 20,
                singleUse: true,
            }
        ],
        decay: false,
        extra: 'This tier includes bump inmunity, no premium role decay, a special profile cosmetic for the server and a special badge for the osu! me section.'      
    },
    {
        name: 'Mirage VI', 
        description: 'This tier includes early access to the collabs, access to the PSD templates and access to the staff chat.' , 
        roleId: '787723186556108840',
        cost: 100,
        generalRenewalPrice: 20,
        deluxePrice: 1,
        deluxeExtraPrice: 1,
        perks: [
            {
                name: "Megacollab Early Access",
                description: "Pick a character for the collab before the public opening.",
                restrictions: null,
                renewalPrice: 10,
                individualPrice: 60,
                singleUse: true,
            },
            {
                name: "Access to PSD templates",
                description: "Get access to all the PSD templates of all of the megacollabs.",
                restrictions: null,
                renewalPrice: null,
                individualPrice: null,
                singleUse: false,
            },
            {
                name: "Access to the staff chat",
                description: "Get direct contact with the server staff.",
                restrictions: null,
                renewalPrice: null,
                individualPrice: null,
                singleUse: false,
            }
        ],
        decay: false,
        extra: 'This tier includes bump inmunity, no premium role decay, a special profile cosmetic for the server and a special badge for the osu! me section.'      
    },
    {
        name: 'Mirage VII', 
        description: 'This tier doesn\'t need to renew perks bellow it, gets a customized Endless Mirage Hoodie, can host their own megacollab with us, has direct megacollab pool influence and has free access to the deluxe collabs.' , 
        roleId: '861679323739717642',
        cost: 250,
        generalRenewalPrice: null,
        deluxePrice: null,
        deluxeExtraPrice: null,
        perks: [
            {
                name: "No Perk Renewal",
                description: "No renewal for all of the premium perks bellow this tier.",
                restrictions: null,
                renewalPrice: null,
                individualPrice: null,
                singleUse: false,
            },
            {
                name: "Custom Endless Mirage Hoodie",
                description: "Obtain an Endless Mirage themed hoodie with your name on it.",
                restrictions: null,
                renewalPrice: 20,
                individualPrice: 30,
                singleUse: true,
            },
            {
                name: "Host your own Megacollab",
                description: "Be able to host your own megacollab with designs made by us and your influence.",
                restrictions: null,
                renewalPrice: 50,
                individualPrice: 150,
                singleUse: true,
            },
            {
                name: "Megacollab Pooling Influence",
                description: "Add any series that you would like into the collab.",
                restrictions: "Series need to fit the topic of the collab.",
                renewalPrice: null,
                individualPrice: null,
                singleUse: false,
            }
        ],
        decay: false,
        extra: 'This tier includes bump inmunity, no premium role decay, a special profile cosmetic for the server and a special badge for the osu! me section.'      
    }
]

const MirageFormat = Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const suggestionChannelID = '880953549561954314';

const botId = '959278677789663302';
const guildId = "630281137998004224"

const timeInterval = 5000; // Define the time interval in milliseconds
const blacklistedChannels = ['630995793670701065', '746040634548289606', '1118649160858599487', '781152261023596584', '795652942299791370'];
const comboInterval = 5 * 60 * 1000; // 3 minutes in milliseconds
const blacklistedChars = ['>', '<', '??', 't!', 'http', '!', ':']; // Add any characters you want to blacklist here
const welcomeChannelID = '713108912764616704';

// Schedule the daily decay to run at a specific time (e.g., 2:00 AM UTC)
const dailyCheckHour = 0; // Adjust this as needed
const dailyCheckMinute = 0;

module.exports = {
    rolesLevel,
    staffUserIds,
    romanNumerals,
    rolesToRemove,
    shopItems,
    MirageFormat,
    suggestionChannelID,
    botId,
    premiumTiers,
    guildId,
    timeInterval,
    blacklistedChannels,
    comboInterval,
    nonPurchaseableBackgrounds,
    blacklistedChars,
    welcomeChannelID,
    dailyCheckHour,
    dailyCheckMinute,
    channelCreationActions
};