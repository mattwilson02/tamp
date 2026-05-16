import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const drinks = [
  {
    name: 'Espresso',
    slug: 'espresso',
    category: 'espresso',
    difficultyRank: 2,
    hasInteractiveWorkflow: true,
    description:
      'The foundation of all espresso-based drinks. A concentrated shot pulled through finely ground coffee at high pressure.',
    longDescription:
      'Espresso is the bedrock of the cafe world. Roughly 7–9g of finely ground coffee is compacted into a portafilter basket and 9 bars of pressure forces hot water through the puck in 25–30 seconds, yielding a 1:2 ratio of syrupy, concentrated coffee topped with crema.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: null,
      servingTempCelsius: null,
      cupSizeMl: 36,
    },
  },
  {
    name: 'Ristretto',
    slug: 'ristretto',
    category: 'espresso',
    difficultyRank: 3,
    hasInteractiveWorkflow: false,
    description:
      'A shorter, more concentrated espresso. Same dose, half the yield — sweeter and more intense.',
    longDescription:
      'Ristretto uses the same dose as espresso but pulls only half the liquid, capturing the sweeter, more aromatic early part of the extraction while leaving behind the bitter late compounds.',
    spec: {
      doseGrams: 18,
      yieldGrams: 18,
      extractionTimeSec: [15, 20],
      milkTextureTarget: null,
      servingTempCelsius: null,
      cupSizeMl: 18,
    },
  },
  {
    name: 'Lungo',
    slug: 'lungo',
    category: 'espresso',
    difficultyRank: 1,
    hasInteractiveWorkflow: false,
    description:
      'A long espresso with a higher water ratio. More bitter and less intense than a standard shot.',
    longDescription:
      'Lungo means "long" in Italian. More water is passed through the puck than a standard espresso, resulting in a larger, more bitter drink that still differs fundamentally from an Americano — the water passes through the coffee rather than being added after.',
    spec: {
      doseGrams: 18,
      yieldGrams: 54,
      extractionTimeSec: [35, 45],
      milkTextureTarget: null,
      servingTempCelsius: null,
      cupSizeMl: 54,
    },
  },
  {
    name: 'Americano',
    slug: 'americano',
    category: 'espresso',
    difficultyRank: 1,
    hasInteractiveWorkflow: false,
    description:
      "Espresso diluted with hot water. Similar strength to filter coffee but with espresso's character.",
    longDescription:
      'An Americano is made by pulling a standard espresso shot and adding hot water to dilute it. The espresso goes in first to preserve the crema on top. The result has a similar strength to brewed coffee but retains the roast character of espresso.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: null,
      servingTempCelsius: null,
      cupSizeMl: 180,
    },
  },
  {
    name: 'Flat White',
    slug: 'flat-white',
    category: 'milk',
    difficultyRank: 3,
    hasInteractiveWorkflow: true,
    description:
      'A double ristretto with a thin layer of velvety microfoam. Originated in Australia and New Zealand.',
    longDescription:
      'The flat white is a smaller, stronger milk drink than a latte. It uses a double ristretto base and a small amount of perfectly textured microfoam — thin enough to allow latte art but with more coffee character than a latte. The ratio of coffee to milk is higher, making it a favourite of those who want milk without sacrificing espresso intensity.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [20, 25],
      milkTextureTarget: 'thin microfoam, 60–65°C',
      servingTempCelsius: 62,
      cupSizeMl: 160,
    },
  },
  {
    name: 'Cappuccino',
    slug: 'cappuccino',
    category: 'milk',
    difficultyRank: 3,
    hasInteractiveWorkflow: true,
    description:
      'Equal parts espresso, steamed milk, and stiff microfoam. The classic Italian morning drink.',
    longDescription:
      'A traditional cappuccino is divided roughly into thirds: one third espresso, one third steamed milk, one third thick microfoam. The foam should be dry enough to sit proud of the cup rim. Italian cappuccinos are typically consumed in the morning — ordering one after 11am is considered a cultural faux pas in Italy.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: 'dry microfoam, 60–65°C',
      servingTempCelsius: 62,
      cupSizeMl: 180,
    },
  },
  {
    name: 'Latte',
    slug: 'latte',
    category: 'milk',
    difficultyRank: 2,
    hasInteractiveWorkflow: true,
    description:
      'Espresso with a generous pour of steamed milk and a thin layer of microfoam. The most forgiving milk drink to make.',
    longDescription:
      'A latte (short for caffè latte, "milk coffee") has the highest milk-to-espresso ratio of the standard milk drinks. A double espresso is topped with around 200ml of steamed milk and a thin coating of microfoam. Its larger volume and generous milk content make it more forgiving to pour and a great canvas for latte art.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: 'thin microfoam, 60–65°C',
      servingTempCelsius: 65,
      cupSizeMl: 300,
    },
  },
  {
    name: 'Cortado',
    slug: 'cortado',
    category: 'milk',
    difficultyRank: 3,
    hasInteractiveWorkflow: true,
    description: 'Equal parts espresso and warm milk. Spanish in origin — "cortado" means cut.',
    longDescription:
      'The cortado uses a 1:1 ratio of espresso to warm milk. The milk is steamed to a lower temperature and with less foam than a flat white — its purpose is to cut the acidity of the espresso rather than add sweetness or texture. Served in a small glass, typically 90–120ml.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: 'minimal foam, 55–60°C',
      servingTempCelsius: 58,
      cupSizeMl: 90,
    },
  },
  {
    name: 'Macchiato',
    slug: 'macchiato',
    category: 'milk',
    difficultyRank: 2,
    hasInteractiveWorkflow: false,
    description:
      'An espresso "stained" with a small dollop of foamed milk. Macchiato means marked in Italian.',
    longDescription:
      'The espresso macchiato is a single or double espresso with just enough steamed milk or foam to temper the intensity without turning it into a milk drink. It sits between a straight espresso and a cortado — strong, with the barest suggestion of dairy.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: 'small dollop of foam',
      servingTempCelsius: null,
      cupSizeMl: 60,
    },
  },
  {
    name: 'Piccolo Latte',
    slug: 'piccolo-latte',
    category: 'milk',
    difficultyRank: 3,
    hasInteractiveWorkflow: false,
    description:
      'A ristretto topped with warm, silky milk in a small glass. Intense flavour with latte-like texture.',
    longDescription:
      'The piccolo latte (Italian for "small") uses a ristretto base instead of a full espresso shot, giving it a sweeter, more concentrated flavour. It\'s served in a small 90–100ml glass topped with silky steamed milk — producing a drink with the texture of a flat white but the punch of a ristretto.',
    spec: {
      doseGrams: 18,
      yieldGrams: 18,
      extractionTimeSec: [15, 20],
      milkTextureTarget: 'silky microfoam, 60–65°C',
      servingTempCelsius: 62,
      cupSizeMl: 100,
    },
  },
  {
    name: 'Mocha',
    slug: 'mocha',
    category: 'milk',
    difficultyRank: 1,
    hasInteractiveWorkflow: false,
    description:
      'Espresso, chocolate sauce, and steamed milk. A crowd-pleaser that bridges coffee and hot chocolate.',
    longDescription:
      'A mocha combines a double espresso with chocolate sauce or powder and steamed milk. The chocolate cuts the bitterness of the espresso and adds sweetness, making it one of the most accessible espresso drinks for those new to coffee. Often finished with whipped cream.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: 'thin microfoam, 65°C',
      servingTempCelsius: 65,
      cupSizeMl: 350,
    },
  },
  {
    name: 'Cold Brew',
    slug: 'cold-brew',
    category: 'cold',
    difficultyRank: 1,
    hasInteractiveWorkflow: false,
    description:
      'Coffee steeped in cold water for 12–24 hours. Smooth, low-acid, and highly caffeinated.',
    longDescription:
      'Cold brew is made by steeping coarsely ground coffee in cold or room-temperature water for an extended period, typically 12–24 hours. The slow extraction produces a concentrate that is naturally sweet, smooth, and low in acidity compared to hot-brewed coffee. Diluted 1:1 with water or milk before serving.',
    spec: {
      doseGrams: 100,
      yieldGrams: null,
      extractionTimeSec: null,
      milkTextureTarget: null,
      servingTempCelsius: 4,
      cupSizeMl: 300,
    },
  },
  {
    name: 'Iced Latte',
    slug: 'iced-latte',
    category: 'cold',
    difficultyRank: 1,
    hasInteractiveWorkflow: false,
    description:
      'Espresso poured over ice and topped with cold milk. Quick to make and endlessly customisable.',
    longDescription:
      'An iced latte is simply a double espresso poured directly over ice, then topped with cold milk. The ice chills the espresso rapidly. Unlike a cold brew, it retains the brightness and character of freshly pulled espresso. Popular in warm climates and as an afternoon coffee.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: null,
      servingTempCelsius: 4,
      cupSizeMl: 350,
    },
  },
  {
    name: 'Affogato',
    slug: 'affogato',
    category: 'espresso',
    difficultyRank: 1,
    hasInteractiveWorkflow: false,
    description:
      'A scoop of vanilla gelato "drowned" in a shot of hot espresso. Dessert and coffee in one.',
    longDescription:
      'Affogato means "drowned" in Italian. A scoop of vanilla gelato or ice cream is placed in a small glass and a freshly pulled espresso shot is poured directly over it. The hot espresso melts the edges of the gelato, creating a warm-cold, bitter-sweet experience that sits somewhere between a dessert and a coffee.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: null,
      servingTempCelsius: null,
      cupSizeMl: 120,
    },
  },
  {
    name: 'Irish Coffee',
    slug: 'irish-coffee',
    category: 'espresso',
    difficultyRank: 2,
    hasInteractiveWorkflow: false,
    description: 'Hot coffee with Irish whiskey and brown sugar, topped with softly whipped cream.',
    longDescription:
      'Irish coffee was invented in 1943 by chef Joe Sheridan at Foynes Airport in Ireland. A measure of Irish whiskey and brown sugar are stirred into hot coffee, then lightly whipped cream is floated on top by pouring it over the back of a spoon. The cream should sit proud — you drink the hot coffee through the cold cream.',
    spec: {
      doseGrams: 18,
      yieldGrams: 36,
      extractionTimeSec: [25, 30],
      milkTextureTarget: 'lightly whipped cream',
      servingTempCelsius: 70,
      cupSizeMl: 240,
    },
  },
];

async function main() {
  console.log('Seeding drinks...');

  for (const drink of drinks) {
    await prisma.drink.upsert({
      where: { slug: drink.slug },
      update: drink,
      create: drink,
    });
    console.log(`  ✓ ${drink.name}`);
  }

  console.log(`\nSeeded ${drinks.length} drinks.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
