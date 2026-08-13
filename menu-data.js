/**
 * Hotel Diamond Palace Lords Plaza's Bakery
 * Menu Data Configuration (Nepalgunj, Nepal)
 */

const MENU_DATA = {
  categories: [
    { id: 'muffins', label: 'MUFFINS', icon: 'fa-cookie' },
    { id: 'pastries', label: 'PASTRIES', icon: 'fa-bread-slice' },
    { id: 'cake', label: 'CAKE', icon: 'fa-cake-candles' },
    { id: 'cookies', label: 'COOKIES', icon: 'fa-cookie-bite' },
    { id: 'doughnuts', label: 'DOUGHNUTS', icon: 'fa-circle-dot' },
    { id: 'patties', label: 'PATTIES', icon: 'fa-cheese' }
  ],
  items: {
    'muffins': [
      {
        id: 'muffin-choco-vanilla',
        name: 'Choco Vanilla Muffin',
        price: '150',
        description: 'Moist vanilla batter swirled with rich chocolate fudge, baked fresh in our hotel ovens.',
        image: 'assets/muffin_choco_vanilla.jpg'
      },
      {
        id: 'muffin-choco-nuts',
        name: 'Chocolate Nuts Muffin',
        price: '180',
        description: 'Double chocolate chip muffin loaded with crunchy roasted almonds and cashews.',
        image: 'assets/muffin_choco_nuts.jpg'
      },
      {
        id: 'muffin-banana-filling',
        name: 'Banana Filling Muffin',
        price: '160',
        description: 'Warm spiced banana muffin with a liquid sweet banana puree core.',
        image: 'assets/muffin_banana.jpg'
      },
      {
        id: 'muffin-strawberry-filling',
        name: 'Strawberry Filling Muffin',
        price: '180',
        description: 'Light golden muffin filled with fresh strawberry compote, dusted with powdered sugar.',
        image: 'assets/muffin_strawberry.jpg'
      },
      {
        id: 'muffin-coconut-filling',
        name: 'Coconut Filling Muffin',
        price: '160',
        description: 'Soft vanilla muffin stuffed with sweetened toasted coconut flakes.',
        image: 'assets/muffin_coconut.jpg'
      }
    ],
    'pastries': [
      {
        id: 'croissant-butter',
        name: 'Butter Croissant',
        price: '120',
        description: 'Classic flaky, multi-layered French croissant made with premium butter.',
        image: 'assets/croissant_butter.jpg'
      },
      {
        id: 'croissant-chocolate',
        name: 'Chocolate Filling Croissant',
        price: '180',
        description: 'Flaky baked croissant filled with premium melted dark chocolate ganache.',
        image: 'assets/croissant_chocolate.jpg'
      },
      {
        id: 'croissant-almond',
        name: 'Almond Filling Croissant',
        price: '220',
        description: 'Crispy sliced-almond topped croissant with a sweet almond frangipane cream interior.',
        image: 'assets/croissant_almond.jpg'
      },
      {
        id: 'croissant-cheese',
        name: 'Cheese Croissant',
        price: '180',
        description: 'Savory layered croissant stuffed and baked with sharp cheddar and mozzarella.',
        image: 'assets/croissant_cheese.jpg'
      },
      {
        id: 'croissant-strawberry',
        name: 'Strawberry Filling Croissant',
        price: '180',
        description: 'Baked croissant filled with organic strawberry glaze.',
        image: 'assets/croissant_strawberry.jpg'
      },
      {
        id: 'croissant-mango',
        name: 'Mango Filling Croissant',
        price: '180',
        description: 'Tropical twist croissant filled with a sweet and tangy mango compote.',
        image: 'assets/croissant_mango.jpg'
      },
      {
        id: 'apple-denise',
        name: 'Apple Denise',
        price: '190',
        description: 'Crispy Danish pastry filled with warm caramelized apples and cinnamon glaze.',
        image: 'assets/apple_denise.jpg'
      },
      {
        id: 'cinnamon-roll',
        name: 'Cinnamon Roll',
        price: '160',
        description: 'Soft sweet roll swirled with cinnamon sugar, topped with rich cream cheese frosting.',
        image: 'assets/cinnamon_roll.jpg'
      }
    ],
    'cake': [
      {
        id: 'cake-apple',
        name: 'Apple Cake (Slice)',
        price: '280',
        description: 'Moist spiced cake layered with baked fresh apples, cinnamon, and a light sugar glaze.',
        image: 'assets/cake_apple.jpg'
      },
      {
        id: 'cake-carrot',
        name: 'Carrot Cake (Slice)',
        price: '280',
        description: 'Spiced cake packed with grated carrots, walnuts, and layered with smooth cream cheese frosting.',
        image: 'assets/cake_carrot.jpg'
      },
      {
        id: 'cake-cheese',
        name: 'Cheesecake (Slice)',
        price: '350',
        description: 'New York style velvety rich cheesecake on a buttery graham cracker crust.',
        image: 'assets/cake_cheese.jpg'
      },
      {
        id: 'cake-choco-banana',
        name: 'Chocolate Banana Cake (Slice)',
        price: '280',
        description: 'Fudge chocolate cake infused with banana cream layers and dark cocoa shaving toppings.',
        image: 'assets/cake_choco_banana.jpg'
      },
      {
        id: 'cake-choco-brownie',
        name: 'Chocolate Brownie Cake (Slice)',
        price: '320',
        description: 'Dense, chewy chocolate brownie cake topped with hot fudge and cocoa dust.',
        image: 'assets/cake_choco_brownie.jpg'
      }
    ],
    'cookies': [
      {
        id: 'cookie-butter',
        name: 'Butter Cookie',
        price: '120',
        description: 'Rich, melt-in-your-mouth shortbread cookie baked with real sweet cream butter.',
        image: 'assets/cookie_butter.jpg'
      },
      {
        id: 'cookie-oatmeal',
        name: 'Oatmeal Cookie',
        price: '140',
        description: 'Chewy rolled oats cookie packed with sweet raisins and a touch of nutmeg spice.',
        image: 'assets/cookie_oatmeal.jpg'
      },
      {
        id: 'cookie-sugar-free',
        name: 'Sugar Free Cookie',
        price: '150',
        description: 'Deliciously baked sugar-free vanilla cookie sweetened naturally.',
        image: 'assets/cookie_sugar_free.jpg'
      },
      {
        id: 'cookie-salted-zeera',
        name: 'Salted Zeera Cookie',
        price: '120',
        description: 'Savory and sweet crispy cookies flavored with roasted cumin seeds and sea salt.',
        image: 'assets/cookie_salted_zeera.jpg'
      },
      {
        id: 'cookie-choco-nuts',
        name: 'Choco Nuts Cookie',
        price: '160',
        description: 'Crunchy chocolate chip cookie loaded with roasted walnuts, almonds, and cashew bits.',
        image: 'assets/cookie_choco_nuts.jpg'
      },
      {
        id: 'cookie-coconut',
        name: 'Coconut Cookie',
        price: '130',
        description: 'Crispy edge cookie infused with coconut milk and topped with toasted coconut shreds.',
        image: 'assets/cookie_coconut.jpg'
      },
      {
        id: 'cookie-mix-grain',
        name: 'Mix Grain Bar',
        price: '180',
        description: 'Healthy breakfast bar baked with pumpkin seeds, flax, rolled oats, and honey.',
        image: 'assets/cookie_mix_grain.jpg'
      },
      {
        id: 'cookie-strawberry-almond',
        name: 'Strawberry Almond Cookie',
        price: '150',
        description: 'Sweet cookie topped with sliced almonds and a dollop of strawberry jam.',
        image: 'assets/cookie_strawberry_almond.jpg'
      },
      {
        id: 'cookie-marble',
        name: 'Marble Cookie',
        price: '150',
        description: 'Beautiful swirled pattern cookie blending rich cocoa and vanilla bean dough.',
        image: 'assets/cookie_marble.jpg'
      }
    ],
    'doughnuts': [
      {
        id: 'doughnut-plain',
        name: 'Plain Doughnut',
        price: '80',
        description: 'Classic soft yeast doughnut dusted with powdered icing sugar.',
        image: 'assets/doughnut_plain.jpg'
      },
      {
        id: 'doughnut-chocolate',
        name: 'Chocolate Doughnut',
        price: '120',
        description: 'Soft ring doughnut dipped in rich milk chocolate glaze and topped with sprinkles.',
        image: 'assets/doughnut_chocolate.jpg'
      },
      {
        id: 'doughnut-choco-vanilla',
        name: 'Chocolate Vanilla Doughnut',
        price: '120',
        description: 'Ring doughnut glazed half in vanilla cream, half in dark chocolate ganache.',
        image: 'assets/doughnut_choco_vanilla.jpg'
      },
      {
        id: 'doughnut-strawberry-filling',
        name: 'Strawberry Filling Doughnut',
        price: '130',
        description: 'Soft glazed shell doughnut bursting with fresh strawberry jelly center.',
        image: 'assets/doughnut_strawberry.jpg'
      },
      {
        id: 'doughnut-coconut-cream',
        name: 'Coconut Cream Doughnut',
        price: '120',
        description: 'Filled doughnut with coconut custard, topped with white chocolate glaze and shredded coconut.',
        image: 'assets/doughnut_coconut.jpg'
      }
    ],
    'patties': [
      {
        id: 'patty-chocolate',
        name: 'Chocolate Patty',
        price: '180',
        description: 'Flaky baked puff pastry shell filled with warm chocolate fudge syrup.',
        image: 'assets/patty_chocolate.jpg'
      },
      {
        id: 'patty-grilled-mushroom',
        name: 'Grilled Mushroom Patty',
        price: '220',
        description: 'Savory golden puff pastry pocket stuffed with garlic grilled mushrooms and herbs.',
        image: 'assets/patty_grilled_mushroom.jpg'
      },
      {
        id: 'patty-roasted-potato',
        name: 'Roasted Potato Patty',
        price: '190',
        description: 'Spiced roasted potatoes stuffed inside a crispy, layered baked pastry pocket.',
        image: 'assets/patty_roasted_potato.jpg'
      },
      {
        id: 'patty-cheese',
        name: 'Cheese Patty',
        price: '190',
        description: 'Rich mozzarella and cheddar blend stuffed inside a warm, golden pastry puff.',
        image: 'assets/patty_cheese.jpg'
      },
      {
        id: 'patty-saitan-chhoila',
        name: 'Saitan Chhoila Patty',
        price: '250',
        description: 'Unique savory patty stuffed with Nepalese style spiced saitan chhoila fillings.',
        image: 'assets/patty_saitan_chhoila.jpg'
      }
    ]
  }
};

// Export for node testing if needed, otherwise declare on window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MENU_DATA;
} else {
  window.MENU_DATA = MENU_DATA;
}
