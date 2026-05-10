// ================================
//   MARKETBLOX — CART DRAWER JS
// ================================

let cart = JSON.parse(localStorage.getItem('mb_cart') || '[]');

const CATALOGUE = [
  // === Steal A Brainrot — Best Sellers ===
  { id: 'los-mobilis', name: 'Los Mobilis', price: '$3.67', priceNum: 3.67, original: '$4.99', emoji: '🧠', img: 'https://shoplox.fun/cdn/shop/files/893D78FA-11F1-49FF-8F55-01B98FF3F91A_L0_001_1772893035_transformed.png?v=1772894197&width=600', game: 'Steal A Brainrot', category: 'bs' },
  { id: '67', name: '67', price: '$3.99', priceNum: 3.99, original: '$5.99', emoji: '🧠', img: 'https://shoplox.fun/cdn/shop/files/3259EDFA-F6E7-46C2-B754-14EC5A50E3F7_L0_001_1772892952_transformed_89db3a18-dcae-4929-95a1-4e255c02e871.png?v=1772894142&width=600', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'tic-tac-sahur', name: 'Tic Tac Sahur', price: '$14.99', priceNum: 14.99, original: '', emoji: '⏰', img: 'https://shoplox.fun/cdn/shop/files/1BA47741-08E2-499B-8F0C-939AC4D72980_L0_001_1772893039_transformed.png?v=1772894455&width=600', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'esok-sekolah', name: 'Esok Sekolah', price: '$4.99', priceNum: 4.99, original: '', emoji: '📚', img: 'https://shoplox.fun/cdn/shop/files/A44A802D-A2E7-491A-866A-5F914DDFDD22_L0_001_1772893043_transformed.png?v=1772894488&width=600', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'cursed-burguru', name: 'Cursed Burguru & Fryuru', price: '$149.99', priceNum: 149.99, original: '', emoji: '👹', img: 'https://shoplox.fun/cdn/shop/files/592D66A2-CA6D-40BF-A5F6-4DA5F5800D9D_L0_001_1773433104_transformed.png?v=1773435717&width=600', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'money-puggy', name: 'Money Money Puggy', price: '$5.99', priceNum: 5.99, original: '', emoji: '💰', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'sigma-cat', name: 'Sigma Cat', price: '$12.99', priceNum: 12.99, original: '', emoji: '⚡', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'garama-madundung', name: 'Garama and Madundung', price: '$11.82', priceNum: 11.82, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'mieteteira-bicicleteira', name: 'Mieteteira Bicicleteira', price: '$3.83', priceNum: 3.83, original: '', emoji: '🚲', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'rainbow-67', name: 'Rainbow 67', price: '$3.99', priceNum: 3.99, original: '', emoji: '🌈', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-67', name: 'Los 67', price: '$4.49', priceNum: 4.49, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-combinasionas', name: 'Los Combinasionas', price: '$3.48', priceNum: 3.48, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-grande-combinasion', name: 'La Grande Combinasion', price: '$2.13', priceNum: 2.13, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'list-list-list-sahur', name: 'List List List Sahur', price: '$5.00', priceNum: 5.00, original: '', emoji: '📜', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'sab-25', name: '25', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-25', name: 'Los 25', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'radioactive-esok-sekolah', name: 'Radioactive Esok Sekolah', price: '$6.99', priceNum: 6.99, original: '', emoji: '☢️', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-extinct-grande', name: 'La Extinct Grande', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chicleteira-noelteira', name: 'Chicleteira Noelteira', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chicleteira-bicicleteira', name: 'Chicleteira Bicicleteira', price: '$5.00', priceNum: 5.00, original: '', emoji: '🚲', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-chicleteiras', name: 'Los Chicleteiras', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chicleteirina-bicicleteirina', name: 'Chicleteirina Bicicleteirina', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'burrito-bandito', name: 'Burrito Bandito', price: '$5.00', priceNum: 5.00, original: '', emoji: '🌯', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-nooo-my-hotspotsitos', name: 'Los Nooo My Hotspotsitos', price: '$5.00', priceNum: 5.00, original: '', emoji: '📶', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-candies', name: 'Los Candies', price: '$5.00', priceNum: 5.00, original: '', emoji: '🍬', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'nooo-my-hotspot', name: 'Nooo My Hotspot', price: '$5.00', priceNum: 5.00, original: '', emoji: '📶', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-hotspotsitos', name: 'Los Hotspotsitos', price: '$5.00', priceNum: 5.00, original: '', emoji: '📶', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-spooky-combinasionas', name: 'Los Spooky Combinasionas', price: '$5.00', priceNum: 5.00, original: '', emoji: '👻', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'eviledon', name: 'Eviledon', price: '$5.00', priceNum: 5.00, original: '', emoji: '👾', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'bacuru-and-egguru', name: 'Bacuru and Egguru', price: '$5.00', priceNum: 5.00, original: '', emoji: '🥚', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chimino', name: 'Chimino', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-jolly-grande', name: 'La Jolly Grande', price: '$5.00', priceNum: 5.00, original: '', emoji: '🎄', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'guest-666', name: 'Guest 666', price: '$20.00', priceNum: 20.00, original: '', emoji: '👤', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'galaxy-esok-sekolah', name: 'Galaxy Esok Sekolah', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌌', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'cursed-esok-sekolah-bs', name: 'Cursed Esok Sekolah', price: '$10.00', priceNum: 10.00, original: '', emoji: '😈', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'money-money-reindeer', name: 'Money Money Reindeer', price: '$30.00', priceNum: 30.00, original: '', emoji: '🦌', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'rainbow-esok-sekolah', name: 'Rainbow Esok Sekolah', price: '$7.99', priceNum: 7.99, original: '', emoji: '🌈', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'radioactive-los-67', name: 'Radioactive Los 67', price: '$9.99', priceNum: 9.99, original: '', emoji: '☢️', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-jolly-combinasionas', name: 'Los Jolly Combinasionas', price: '$10.00', priceNum: 10.00, original: '', emoji: '🎄', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'celularcini-viciosini', name: 'Celularcini Viciosini', price: '$10.00', priceNum: 10.00, original: '', emoji: '📱', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-burritos', name: 'Los Burritos', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌯', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-spooky-grande', name: 'La Spooky Grande', price: '$10.00', priceNum: 10.00, original: '', emoji: '👻', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-planitos', name: 'Los Planitos', price: '$19.99', priceNum: 19.99, original: '', emoji: '🌿', img: '', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'lovin-rose', name: 'Lovin Rose', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌹', img: '', game: 'Steal A Brainrot', category: 'bs' },
  // === Steal A Brainrot — New Brainrots ===
  { id: 'bananito', name: 'Bananito', price: '$8.88', priceNum: 8.88, original: '', emoji: '🍌', img: '', game: 'Steal A Brainrot', category: 'new' },
  { id: 'camera-ramena', name: 'Camera Ramena', price: '$10.00', priceNum: 10.00, original: '', emoji: '📷', img: '', game: 'Steal A Brainrot', category: 'new' },
  { id: 'strawberrita', name: 'Strawberrita', price: '$15.00', priceNum: 15.00, original: '', emoji: '🍓', img: '', game: 'Steal A Brainrot', category: 'new' },
  { id: 'cash-or-card', name: 'Cash or Card', price: '$36.82', priceNum: 36.82, original: '', emoji: '💳', img: '', game: 'Steal A Brainrot', category: 'new' },
  { id: 'los-chillis', name: 'Los Chillis', price: '$46.04', priceNum: 46.04, original: '', emoji: '🌶️', img: '', game: 'Steal A Brainrot', category: 'new' },
  { id: 'gym-bros', name: 'Gym Bros', price: '$60.00', priceNum: 60.00, original: '', emoji: '💪', img: '', game: 'Steal A Brainrot', category: 'new' },
  { id: 'kalika-bros', name: 'Kalika Bros', price: '$76.04', priceNum: 76.04, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot', category: 'new' },
  { id: 'digi-narwhal', name: 'Digi Narwhal', price: '$116.04', priceNum: 116.04, original: '', emoji: '🐬', img: '', game: 'Steal A Brainrot', category: 'new' },
  // === Steal A Brainrot — Bundles ===
  { id: 'secret-lucky-block-10x', name: '10x Secret Lucky Block', price: '$6.82', priceNum: 6.82, original: '', emoji: '📦', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'egg-lucky-block-10x', name: '10x Egg Lucky Block', price: '$9.42', priceNum: 9.42, original: '', emoji: '🥚', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'divine-secret-lucky-block-10x', name: '10x Divine Secret Lucky Block', price: '$9.82', priceNum: 9.82, original: '', emoji: '✨', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'bike-bundle', name: 'Bike Bundle', price: '$11.98', priceNum: 11.98, original: '', emoji: '🚲', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'noo-bundle', name: 'Noo Bundle', price: '$13.27', priceNum: 13.27, original: '', emoji: '📶', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'triple-duo', name: 'Triple Duo', price: '$20.13', priceNum: 20.13, original: '', emoji: '🎁', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'burger-bundle', name: 'Burger Bundle', price: '$22.86', priceNum: 22.86, original: '', emoji: '🍔', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'snack-bundle', name: 'Snack Bundle', price: '$23.87', priceNum: 23.87, original: '', emoji: '🍟', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'sleigh-bundle', name: 'Sleigh Bundle', price: '$24.87', priceNum: 24.87, original: '', emoji: '🛷', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'tictac-sahur-bundle', name: 'Tictac Sahur Bundle', price: '$30.00', priceNum: 30.00, original: '', emoji: '⏰', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'fishing-bundle', name: 'Fishing Bundle', price: '$38.97', priceNum: 38.97, original: '', emoji: '🎣', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'garama-madundung-bundle', name: 'Garama and Madundung Bundle', price: '$41.87', priceNum: 41.87, original: '', emoji: '📦', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'grande-bundle', name: 'Grande Bundle', price: '$52.98', priceNum: 52.98, original: '', emoji: '🎁', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'dessert-bundle', name: 'Dessert Bundle', price: '$57.34', priceNum: 57.34, original: '', emoji: '🍰', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'mythological-bundle', name: 'Mythological Bundle', price: '$70.32', priceNum: 70.32, original: '', emoji: '⚡', img: '', game: 'Steal A Brainrot', category: 'bundles' },
  // === Steal A Brainrot — Cyber Brainrots ===
  { id: 'cyber-strawberrita', name: 'Cyber Strawberrita', price: '$5.04', priceNum: 5.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-esok-sekolah', name: 'Cyber Esok Sekolah', price: '$6.64', priceNum: 6.64, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-dj-panda', name: 'Cyber DJ Panda', price: '$8.04', priceNum: 8.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-los-burritos', name: 'Cyber Los Burritos', price: '$8.44', priceNum: 8.44, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-money-money-puggy', name: 'Cyber Money Money Puggy', price: '$11.04', priceNum: 11.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-ketchuru-and-musturu', name: 'Cyber Ketchuru and Musturu', price: '$16.04', priceNum: 16.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-ketupat-kepat', name: 'Cyber Ketupat Kepat', price: '$17.04', priceNum: 17.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-lavadorito-spinito', name: 'Cyber Lavadorito Spinito', price: '$17.04', priceNum: 17.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-tang-tang-keletang', name: 'Cyber Tang Tang Keletang', price: '$17.04', priceNum: 17.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-la-secret-combinasion', name: 'Cyber La Secret Combinasion', price: '$21.04', priceNum: 21.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-ventoliero-pavonero', name: 'Cyber Ventoliero Pavonero', price: '$29.04', priceNum: 29.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-cash-or-card', name: 'Cyber Cash or Card', price: '$48.04', priceNum: 48.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-burguro-and-fryuro', name: 'Cyber Burguro And Fryuro', price: '$48.35', priceNum: 48.35, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-celestial-pegasus', name: 'Cyber Celestial Pegasus', price: '$53.41', priceNum: 53.41, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-capitano-moby', name: 'Cyber Capitano Moby', price: '$58.04', priceNum: 58.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-la-food-combinasion', name: 'Cyber La Food Combinasion', price: '$59.17', priceNum: 59.17, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-cerberus', name: 'Cyber Cerberus', price: '$73.04', priceNum: 73.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-sammyni-fattini', name: 'Cyber Sammyni Fattini', price: '$73.04', priceNum: 73.04, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-dragon-cannelloni', name: 'Cyber Dragon Cannelloni', price: '$231.85', priceNum: 231.85, original: '', emoji: '🤖', img: '', game: 'Steal A Brainrot', category: 'cyber' },
  // === Steal A Brainrot — Divine Brainrots ===
  { id: 'divine-67', name: 'Divine 67', price: '$2.98', priceNum: 2.98, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-los-combinasionas', name: 'Divine Los Combinasionas', price: '$4.98', priceNum: 4.98, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-esok-sekolah', name: 'Divine Esok Sekolah', price: '$6.23', priceNum: 6.23, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-los-67', name: 'Divine Los 67', price: '$6.34', priceNum: 6.34, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-money-money-puggy', name: 'Divine Money Money Puggy', price: '$12.14', priceNum: 12.14, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-nuclearo-dinossauro', name: 'Divine Nuclearo Dinossauro', price: '$12.89', priceNum: 12.89, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-ketupat-kepat', name: 'Divine Ketupat Kepat', price: '$14.37', priceNum: 14.37, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-spaghetti-tualetti', name: 'Divine Spaghetti Tualetti', price: '$16.56', priceNum: 16.56, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-ketchuru-and-musturu', name: 'Divine Ketchuru and Musturu', price: '$17.35', priceNum: 17.35, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-tang-tang-keletang', name: 'Divine Tang Tang Keletang', price: '$17.76', priceNum: 17.76, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-lavadorito-spinito', name: 'Divine Lavadorito Spinito', price: '$18.53', priceNum: 18.53, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-la-secret-combinasion', name: 'Divine La Secret Combinasion', price: '$28.84', priceNum: 28.84, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-tictac-sahur', name: 'Divine Tictac Sahur', price: '$32.17', priceNum: 32.17, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-garama-and-madundung', name: 'Divine Garama and Madundung', price: '$38.60', priceNum: 38.60, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-burguro-and-fryuro', name: 'Divine Burguro And Fryuro', price: '$53.04', priceNum: 53.04, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-popcuru-and-fizzuru', name: 'Divine Popcuru and Fizzuru', price: '$64.44', priceNum: 64.44, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-capitano-moby', name: 'Divine Capitano Moby', price: '$67.98', priceNum: 67.98, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-celestial-pegasus', name: 'Divine Celestial Pegasus', price: '$68.94', priceNum: 68.94, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-cerberus', name: 'Divine Cerberus', price: '$78.92', priceNum: 78.92, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-dragon-cannelloni', name: 'Divine Dragon Cannelloni', price: '$276.40', priceNum: 276.40, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'divine' },
  // === Steal A Brainrot — Index Bases ===
  { id: 'aquatic-base-index', name: 'Aquatic Base (Index)', price: '$16.71', priceNum: 16.71, original: '', emoji: '💧', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'halloween-base-index', name: 'Halloween Base (Index)', price: '$16.71', priceNum: 16.71, original: '', emoji: '🎃', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'christmas-base-index', name: 'Christmas Base (Index)', price: '$17.89', priceNum: 17.89, original: '', emoji: '🎄', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'lava-base-index', name: 'Lava Base (Index)', price: '$33.79', priceNum: 33.79, original: '', emoji: '🌋', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'candy-base-index', name: 'Candy Base (Index)', price: '$36.79', priceNum: 36.79, original: '', emoji: '🍬', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'galaxy-base-index', name: 'Galaxy Base (Index)', price: '$43.44', priceNum: 43.44, original: '', emoji: '🌌', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'yin-yang-base-index', name: 'Yin Yang Base (Index)', price: '$43.44', priceNum: 43.44, original: '', emoji: '☯️', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'divine-base-index', name: 'Divine Base (Index)', price: '$56.59', priceNum: 56.59, original: '', emoji: '✨', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'radioactive-base-index', name: 'Radioactive Base (Index)', price: '$60.59', priceNum: 60.59, original: '', emoji: '☢️', img: '', game: 'Steal A Brainrot', category: 'index' },
  { id: 'cursed-base-index', name: 'Cursed Base (Index)', price: '$64.22', priceNum: 64.22, original: '', emoji: '💀', img: '', game: 'Steal A Brainrot', category: 'index' },
  // === Steal A Brainrot — OP Brainrots ===
  { id: 'celestial-pegasus', name: 'Celestial Pegasus', price: '$29.99', priceNum: 29.99, original: '', emoji: '🦄', img: 'https://shoplox.fun/cdn/shop/files/B8436553-A201-4696-829E-275846CC601B_L0_001_1772893045_transformed_6d823985-692a-4d66-bf5c-d896fdf39dc7.png?v=1772899995&width=600', game: 'Steal A Brainrot', category: 'op' },
  { id: 'hydra-dragon', name: 'Hydra Dragon Cannelloni', price: '$82.99', priceNum: 82.99, original: '', emoji: '🐉', img: 'https://shoplox.fun/cdn/shop/files/rn-image_picker_lib_temp_c68b6230-5e72-401e-b654-791cefec5fa2.png?v=1773698190&width=600', game: 'Steal A Brainrot', category: 'op' },
  { id: 'ketupat-kepat', name: 'Ketupat Kepat', price: '$6.97', priceNum: 6.97, original: '', emoji: '💎', img: '', game: 'Steal A Brainrot', category: 'op' },
  { id: 'dragon-cannelloni', name: 'Dragon Cannelloni', price: '$97.28', priceNum: 97.28, original: '', emoji: '🐉', img: '', game: 'Steal A Brainrot', category: 'op' },
  { id: 'fortunu-and-cashuru', name: 'Fortunu and Cashuru', price: '$30.00', priceNum: 30.00, original: '', emoji: '🤑', img: '', game: 'Steal A Brainrot', category: 'op' },
  { id: 'cerberus', name: 'Cerberus', price: '$50.00', priceNum: 50.00, original: '', emoji: '🐺', img: '', game: 'Steal A Brainrot', category: 'op' },
  { id: 'ketupat-bros', name: 'Ketupat Bros', price: '$80.00', priceNum: 80.00, original: '', emoji: '💎', img: '', game: 'Steal A Brainrot', category: 'op' },
  { id: 'ginger-gerat', name: 'Ginger Gerat', price: '$500.00', priceNum: 500.00, original: '', emoji: '💎', img: '', game: 'Steal A Brainrot', category: 'op' },
  { id: 'dragon-gingerini', name: 'Dragon Gingerini', price: '$275.00', priceNum: 275.00, original: '', emoji: '🐉', img: '', game: 'Steal A Brainrot', category: 'op' },
  { id: 'la-supreme-combinasion', name: 'La Supreme Combinasion', price: '$300.00', priceNum: 300.00, original: '', emoji: '👑', img: '', game: 'Steal A Brainrot', category: 'op' },
  { id: 'love-love-bear', name: 'Love Love Bear', price: '$777.00', priceNum: 777.00, original: '', emoji: '🐻', img: '', game: 'Steal A Brainrot', category: 'op' },
  // === Steal A Brainrot — General ===
  { id: 'los-mi-gatitos', name: 'Los Mi Gatitos', price: '$10.00', priceNum: 10.00, original: '', emoji: '😸', img: '', game: 'Steal A Brainrot' },
  { id: 'jolly-jolly-sahur', name: 'Jolly Jolly Sahur', price: '$10.00', priceNum: 10.00, original: '', emoji: '🎄', img: '', game: 'Steal A Brainrot' },
  { id: 'la-ginger-sekolah', name: 'La Ginger Sekolah', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌿', img: '', game: 'Steal A Brainrot' },
  { id: 'lavadorito-spinito', name: 'Lavadorito Spinito', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌀', img: '', game: 'Steal A Brainrot' },
  { id: 'la-secret-combinasion', name: 'La Secret Combinasion', price: '$10.69', priceNum: 10.69, original: '', emoji: '🔐', img: '', game: 'Steal A Brainrot' },
  { id: 'chillin-chili', name: 'Chillin Chili', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌶️', img: '', game: 'Steal A Brainrot' },
  { id: 'ketchuru-and-musturu', name: 'Ketchuru and Musturu', price: '$10.00', priceNum: 10.00, original: '', emoji: '🥫', img: '', game: 'Steal A Brainrot' },
  { id: 'los-tacoritas', name: 'Los Tacoritas', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌮', img: '', game: 'Steal A Brainrot' },
  { id: 'los-primos', name: 'Los Primos', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot' },
  { id: 'nuclearo-dinossauro', name: 'Nuclearo Dinossauro', price: '$10.00', priceNum: 10.00, original: '', emoji: '☢️', img: '', game: 'Steal A Brainrot' },
  { id: 'las-sis', name: 'Las Sis', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot' },
  { id: 'los-bros', name: 'Los Bros', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot' },
  { id: 'los-cupids', name: 'Los Cupids', price: '$10.00', priceNum: 10.00, original: '', emoji: '💘', img: '', game: 'Steal A Brainrot' },
  { id: 'la-romantic-grande', name: 'La Romantic Grande', price: '$10.00', priceNum: 10.00, original: '', emoji: '💕', img: '', game: 'Steal A Brainrot' },
  { id: 'noo-my-heart', name: 'Noo my Heart', price: '$10.00', priceNum: 10.00, original: '', emoji: '💔', img: '', game: 'Steal A Brainrot' },
  { id: 'la-taco-combinasion', name: 'La Taco Combinasion', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌮', img: '', game: 'Steal A Brainrot' },
  { id: 'chipso-and-queso', name: 'Chipso and Queso', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧀', img: '', game: 'Steal A Brainrot' },
  { id: 'orcaledon', name: 'Orcaledon', price: '$10.00', priceNum: 10.00, original: '', emoji: '🐋', img: '', game: 'Steal A Brainrot' },
  { id: 'los-puggies', name: 'Los Puggies', price: '$10.00', priceNum: 10.00, original: '', emoji: '🐶', img: '', game: 'Steal A Brainrot' },
  { id: 'cursed-los-67', name: 'Cursed Los 67', price: '$12.99', priceNum: 12.99, original: '', emoji: '😈', img: '', game: 'Steal A Brainrot' },
  { id: 'nacho-spyder', name: 'Nacho Spyder', price: '$14.99', priceNum: 14.99, original: '', emoji: '🕷️', img: '', game: 'Steal A Brainrot' },
  { id: 'mariachi-corazoni', name: 'Mariachi Corazoni', price: '$15.00', priceNum: 15.00, original: '', emoji: '🎸', img: '', game: 'Steal A Brainrot' },
  { id: 'la-sahur-combinasion', name: 'La Sahur Combinasion', price: '$15.00', priceNum: 15.00, original: '', emoji: '🌙', img: '', game: 'Steal A Brainrot' },
  { id: 'chicleteira-cupideira', name: 'Chicleteira Cupideira', price: '$20.00', priceNum: 20.00, original: '', emoji: '💘', img: '', game: 'Steal A Brainrot' },
  { id: 'donkeyturbo-express', name: 'Donkeyturbo Express', price: '$15.00', priceNum: 15.00, original: '', emoji: '🚂', img: '', game: 'Steal A Brainrot' },
  { id: 'gobblino-uniciclino', name: 'Gobblino Uniciclino', price: '$15.00', priceNum: 15.00, original: '', emoji: '🦄', img: '', game: 'Steal A Brainrot' },
  { id: 'los-sekolahs', name: 'Los Sekolahs', price: '$20.00', priceNum: 20.00, original: '', emoji: '📚', img: '', game: 'Steal A Brainrot' },
  { id: 'graipuss-medussi', name: 'Graipuss Medussi', price: '$20.00', priceNum: 20.00, original: '', emoji: '🦑', img: '', game: 'Steal A Brainrot' },
  { id: 'chill-puppy', name: 'Chill Puppy', price: '$20.00', priceNum: 20.00, original: '', emoji: '🐶', img: '', game: 'Steal A Brainrot' },
  { id: 'arcadopus', name: 'Arcadopus', price: '$20.00', priceNum: 20.00, original: '', emoji: '🎮', img: '', game: 'Steal A Brainrot' },
  { id: 'mi-gatito', name: 'Mi Gatito', price: '$20.00', priceNum: 20.00, original: '', emoji: '😺', img: '', game: 'Steal A Brainrot' },
  { id: 'festive-67', name: 'Festive 67', price: '$25.00', priceNum: 25.00, original: '', emoji: '🎊', img: '', game: 'Steal A Brainrot' },
  { id: 'los-amigos', name: 'Los Amigos', price: '$30.00', priceNum: 30.00, original: '', emoji: '🤝', img: '', game: 'Steal A Brainrot' },
  { id: 'cooki-and-milki', name: 'Cooki and Milki', price: '$30.00', priceNum: 30.00, original: '', emoji: '🍪', img: '', game: 'Steal A Brainrot' },
  { id: 'capitano-moby', name: 'Capitano Moby', price: '$30.00', priceNum: 30.00, original: '', emoji: '🐋', img: '', game: 'Steal A Brainrot' },
  { id: 'fragrama-and-chocrama', name: 'Fragrama and Chocrama', price: '$30.00', priceNum: 30.00, original: '', emoji: '🍫', img: '', game: 'Steal A Brainrot' },
  { id: 'gold-gold-gold', name: 'Gold Gold Gold', price: '$35.00', priceNum: 35.00, original: '', emoji: '🪙', img: '', game: 'Steal A Brainrot' },
  { id: 'cloverat-clapat', name: 'Cloverat Clapat', price: '$40.00', priceNum: 40.00, original: '', emoji: '🍀', img: '', game: 'Steal A Brainrot' },
  { id: 'la-food-combinasion', name: 'La Food Combinasion', price: '$40.00', priceNum: 40.00, original: '', emoji: '🍽️', img: '', game: 'Steal A Brainrot' },
  { id: 'la-casa-boo', name: 'La Casa Boo', price: '$40.00', priceNum: 40.00, original: '', emoji: '👻', img: '', game: 'Steal A Brainrot' },
  { id: 'griffin', name: 'Griffin', price: '$499.00', priceNum: 499.00, original: '', emoji: '🦅', img: '', game: 'Steal A Brainrot' },
  { id: 'antonio', name: 'Antonio', price: '$300.00', priceNum: 300.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot' },
  { id: 'quesadillo-vampiro', name: 'Quesadillo Vampiro', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧄', img: '', game: 'Steal A Brainrot' },
  { id: 'quesadilla-crocodila', name: 'Quesadilla Crocodila', price: '$5.00', priceNum: 5.00, original: '', emoji: '🐊', img: '', game: 'Steal A Brainrot' },
  { id: 'pot-hotspot', name: 'Pot Hotspot', price: '$10.00', priceNum: 10.00, original: '', emoji: '📶', img: '', game: 'Steal A Brainrot' },
  { id: 'popcuru-and-fizzuru', name: 'Popcuru and Fizzuru', price: '$15.00', priceNum: 15.00, original: '', emoji: '🍿', img: '', game: 'Steal A Brainrot' },
  { id: 'rang-ring-bus', name: 'Rang Ring Bus', price: '$19.99', priceNum: 19.99, original: '', emoji: '🚌', img: '', game: 'Steal A Brainrot' },
  { id: 'sammyni-fattini', name: 'Sammyni Fattini', price: '$25.00', priceNum: 25.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot' },
  { id: 'rosey-and-teddy', name: 'Rosey and Teddy', price: '$50.00', priceNum: 50.00, original: '', emoji: '🌹', img: '', game: 'Steal A Brainrot' },
  { id: 'rosetti-tualetti', name: 'Rosetti Tualetti', price: '$20.00', priceNum: 20.00, original: '', emoji: '🌸', img: '', game: 'Steal A Brainrot' },
  { id: 'secret-lucky-block-single', name: 'Secret Lucky Block', price: '$1.00', priceNum: 1.00, original: '', emoji: '🎲', img: '', game: 'Steal A Brainrot' },
  { id: 'w-or-l', name: 'W or L', price: '$12.00', priceNum: 12.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot' },
  { id: 'ventoliero-pavonero', name: 'Ventoliero Pavonero', price: '$20.00', priceNum: 20.00, original: '', emoji: '🌪️', img: '', game: 'Steal A Brainrot' },
  { id: 'tuff-toucan', name: 'Tuff Toucan', price: '$20.00', priceNum: 20.00, original: '', emoji: '🦜', img: '', game: 'Steal A Brainrot' },
  { id: 'tralaledon', name: 'Tralaledon', price: '$20.00', priceNum: 20.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot' },
  { id: 'tirilikalika-tirilikalako', name: 'Tirilikalika Tirilikalako', price: '$300.00', priceNum: 300.00, original: '', emoji: '🧠', img: '', game: 'Steal A Brainrot' },
  { id: 'tang-tang-keletang', name: 'Tang Tang Keletang', price: '$10.00', priceNum: 10.00, original: '', emoji: '🔔', img: '', game: 'Steal A Brainrot' },
  { id: 'tacorita-bicicleta', name: 'Tacorita Bicicleta', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌮', img: '', game: 'Steal A Brainrot' },
  { id: 'swaggy-bros', name: 'Swaggy Bros', price: '$10.00', priceNum: 10.00, original: '', emoji: '😎', img: '', game: 'Steal A Brainrot' },
  { id: 'swag-soda', name: 'Swag Soda', price: '$10.00', priceNum: 10.00, original: '', emoji: '🥤', img: '', game: 'Steal A Brainrot' },
  { id: 'spooky-and-pumpky', name: 'Spooky and Pumpky', price: '$30.00', priceNum: 30.00, original: '', emoji: '🎃', img: '', game: 'Steal A Brainrot' },
  { id: 'spaghetti-tualetti', name: 'Spaghetti Tualetti', price: '$10.00', priceNum: 10.00, original: '', emoji: '🍝', img: '', game: 'Steal A Brainrot' },
  { id: 'spinny-hammy', name: 'Spinny Hammy', price: '$20.00', priceNum: 20.00, original: '', emoji: '🐹', img: '', game: 'Steal A Brainrot' },
  { id: 'snailo-clovero', name: 'Snailo Clovero', price: '$20.00', priceNum: 20.00, original: '', emoji: '🐌', img: '', game: 'Steal A Brainrot' },
  { id: 'noo-my-gold', name: 'Noo my Gold', price: '$50.00', priceNum: 50.00, original: '', emoji: '💰', img: '', game: 'Steal A Brainrot' },
  // Rivals
  { id: 'rivals-legendary-key',    name: 'Legendary Key Bundle [x1.1k]', price: '$33.67', priceNum: 33.67, original: '',      emoji: '🗝️', img: 'https://shoplox.fun/cdn/shop/files/lengendary_key_bundle.png?v=1774785605&width=600',                                           game: 'Rivals' },
  { id: 'rivals-ultra-key',        name: 'Ultra Key Bundle [x450]',       price: '$15.67', priceNum: 15.67, original: '',      emoji: '🗝️', img: 'https://shoplox.fun/cdn/shop/files/ultra_key_bundle.png?v=1774785602&width=600',                                              game: 'Rivals' },
  { id: 'rivals-heavy-duty',       name: 'Heavy Duty Bundle',             price: '$13.99', priceNum: 13.99, original: '',      emoji: '⚔️', img: 'https://shoplox.fun/cdn/shop/files/heavy_duty_dunble_rival.png?v=1774785611&width=600',                                       game: 'Rivals' },
  { id: 'rivals-classic-bundle',   name: 'Classic Bundle',                price: '$8.49',  priceNum: 8.49,  original: '',      emoji: '⚔️', img: 'https://shoplox.fun/cdn/shop/files/class_bundle_rival.png?v=1774785615&width=600',                                           game: 'Rivals' },
  { id: 'rivals-season-pass-level',name: '+10 Season Pass Level',         price: '$7.49',  priceNum: 7.49,  original: '',      emoji: '🎫', img: 'https://shoplox.fun/cdn/shop/files/10_seasib_pass_rival.png?v=1774785600&width=600',                                          game: 'Rivals' },
  { id: 'rivals-pixel-bundle',     name: 'Pixel Bundle',                  price: '$6.99',  priceNum: 6.99,  original: '',      emoji: '⚔️', img: 'https://shoplox.fun/cdn/shop/files/pixel_bundle_rival_e781146f-5926-4a9e-af10-c3c6b6d07607.png?v=1774785614&width=600',     game: 'Rivals' },
  { id: 'rivals-skin-case-1',      name: 'Skin Case 1 [x3]',             price: '$5.89',  priceNum: 5.89,  original: '',      emoji: '🎁', img: 'https://shoplox.fun/cdn/shop/files/x3_skin_case.png?v=1774785609&width=600',                                                 game: 'Rivals' },
  { id: 'rivals-skin-case-2',      name: 'Skin Case 2 [x3]',             price: '$5.69',  priceNum: 5.69,  original: '',      emoji: '🎁', img: 'https://shoplox.fun/cdn/shop/files/x3_skin_case_2.png?v=1774785611&width=600',                                               game: 'Rivals' },
  { id: 'rivals-skin-case-3',      name: 'Skin Case 3 [x3]',             price: '$5.69',  priceNum: 5.69,  original: '',      emoji: '🎁', img: 'https://shoplox.fun/cdn/shop/files/skin_case_3x_3.png?v=1774785608&width=600',                                               game: 'Rivals' },
  { id: 'rivals-exogun-bundle',    name: 'ExoGun Bundle',                 price: '$4.99',  priceNum: 4.99,  original: '',      emoji: '🔫', img: 'https://shoplox.fun/cdn/shop/files/exogun_bundle.png?v=1774785614&width=600',                                                game: 'Rivals' },
  { id: 'rivals-prime-season-pass',name: 'Prime Season Pass',             price: '$4.99',  priceNum: 4.99,  original: '$6.99', emoji: '🎫', img: 'https://shoplox.fun/cdn/shop/files/prime_pass_rival.png?v=1774785599&width=600',                                             game: 'Rivals' },
  { id: 'rivals-medkit-bundle',    name: 'Medkit Bundle',                 price: '$1.99',  priceNum: 1.99,  original: '',      emoji: '💊', img: 'https://shoplox.fun/cdn/shop/files/medkit_bundle.png?v=1774785614&width=600',                                                game: 'Rivals' },
  { id: 'rivals-rpg-bundle',       name: 'RPG Bundle',                    price: '$0.99',  priceNum: 0.99,  original: '',      emoji: '🚀', img: 'https://shoplox.fun/cdn/shop/files/rpg_bundle.png?v=1774785613&width=600',                                                   game: 'Rivals' },
  // Blox Fruits
  { id: 'bf-permanent-dragon',   name: 'Permanent Dragon',   price: '$30.99', priceNum: 30.99, original: '', emoji: '🐉', img: 'https://shoplox.fun/cdn/shop/files/Dragon_1.webp?v=1774785573&width=600',                                                                                                  game: 'Blox Fruits' },
  { id: 'bf-permanent-control',  name: 'Permanent Control',  price: '$25.00', priceNum: 25.00, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Control.webp?v=1774785571&width=600',                                                                                                   game: 'Blox Fruits' },
  { id: 'bf-permanent-kitsune',  name: 'Permanent Kitsune',  price: '$24.00', priceNum: 24.00, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Kitsune.webp?v=1774785568&width=600',                                                                                                   game: 'Blox Fruits' },
  { id: 'bf-permanent-yeti',     name: 'Permanent Yeti',     price: '$18.00', priceNum: 18.00, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Yeti.webp?v=1774785567&width=600',                                                                                                      game: 'Blox Fruits' },
  { id: 'bf-permanent-tiger',    name: 'Permanent Tiger',    price: '$17.00', priceNum: 17.00, original: '', emoji: '🐯', img: 'https://shoplox.fun/cdn/shop/files/Tiger.webp?v=1774785564&width=600',                                                                                                     game: 'Blox Fruits' },
  { id: 'bf-permanent-dough',    name: 'Permanent Dough',    price: '$15.00', priceNum: 15.00, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Dough.webp?v=1774785566&width=600',                                                                                                     game: 'Blox Fruits' },
  { id: 'bf-permanent-mammoth',  name: 'Permanent Mammoth',  price: '$13.75', priceNum: 13.75, original: '', emoji: '🦣', img: 'https://shoplox.fun/cdn/shop/files/Mammoth_0c289336-ee44-4c57-be82-91bcca203002.webp?v=1774785575&width=600',                                                              game: 'Blox Fruits' },
  { id: 'bf-permanent-spirit',   name: 'Permanent Spirit',   price: '$13.75', priceNum: 13.75, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Spirit.webp?v=1774785563&width=600',                                                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-gas',      name: 'Permanent Gas',      price: '$13.50', priceNum: 13.50, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_35mub835mub835mu.png?v=1774785559&width=600',                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-venom',    name: 'Permanent Venom',    price: '$13.25', priceNum: 13.25, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_6dr87w6dr87w6dr8_f0796a33-fbf3-4d3b-97de-862ae1561bd6.png?v=1774785558&width=600',                              game: 'Blox Fruits' },
  { id: 'bf-permanent-t-rex',    name: 'Permanent T-Rex',    price: '$12.75', priceNum: 12.75, original: '', emoji: '🦕', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_az6esgaz6esgaz6e.png?v=1774785564&width=600',                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-portal',   name: 'Permanent Portal',   price: '$11.00', priceNum: 11.00, original: '', emoji: '🌀', img: 'https://shoplox.fun/cdn/shop/files/Portal.webp?v=1774785561&width=600',                                                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-creation', name: 'Permanent Creation', price: '$9.75',  priceNum: 9.75,  original: '', emoji: '✨', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_a6tyifa6tyifa6ty.png?v=1774785561&width=600',                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-buddha',   name: 'Permanent Buddha',   price: '$8.50',  priceNum: 8.50,  original: '', emoji: '🧘', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_z7l0j4z7l0j4z7l0.png?v=1774785557&width=600',                                                                   game: 'Blox Fruits' },
];

function getProduct(id) { return CATALOGUE.find(p => p.id === id); }

function saveCart() { localStorage.setItem('mb_cart', JSON.stringify(cart)); }

function renderCart() {
  const items = document.getElementById('drawerItems');
  const empty = document.getElementById('drawerEmpty');
  const footer = document.getElementById('drawerFooter');
  const count = document.getElementById('cartCount');
  const suggestions = document.getElementById('drawerSuggestions');

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.priceNum * i.qty, 0);

  if (count) {
    count.textContent = totalItems;
    count.classList.toggle('visible', totalItems > 0);
  }
  const titleCount = document.getElementById('drawerCount');
  if (titleCount) titleCount.textContent = totalItems;

  if (cart.length === 0) {
    if (items) items.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    if (footer) footer.style.display = 'none';
    if (suggestions) suggestions.style.display = 'none';
    return;
  }

  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';
  if (suggestions) suggestions.style.display = 'block';

  if (items) {
    items.innerHTML = cart.map((item, idx) => `
      <div class="drawer-item">
        ${idx === cart.length - 1 ? '<div class="di-new-badge">NEW</div>' : ''}
        <div class="drawer-item-img">
          ${item.img ? `<img src="${item.img}" alt="${item.name}" onerror="this.parentElement.innerHTML='${item.emoji}'"/>` : item.emoji}
        </div>
        <div class="drawer-item-info">
          <div class="drawer-item-name">${item.name}</div>
          <div class="drawer-item-game">${item.game || 'Steal A Brainrot'}</div>
          <div class="drawer-item-price-row">
            <span class="drawer-item-price" data-usd="${item.priceNum}">${typeof MB_CURRENCY !== 'undefined' ? MB_CURRENCY.formatPrice(item.priceNum) : item.price}</span>
            ${item.original ? `<span class="drawer-item-original">${item.original}</span>` : ''}
          </div>
        </div>
        <div class="drawer-item-qty">
          <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
        </div>
        <button class="drawer-item-remove" onclick="removeItem(${idx})">🗑</button>
      </div>
    `).join('');
  }

  const subtotalEl = document.getElementById('drawerSubtotal');
  const totalEl = document.getElementById('drawerTotal');
  const priceStr = typeof MB_CURRENCY !== 'undefined' ? MB_CURRENCY.formatPrice(totalPrice) : `$${totalPrice.toFixed(2)}`;
  if (subtotalEl) subtotalEl.textContent = priceStr;
  if (totalEl)    totalEl.textContent    = priceStr;
}

function addToCart(productId, showDrawer = true) {
  const product = getProduct(productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
  saveCart();
  renderCart();
  if (showDrawer) openCart();
  showToast(`✅ ${product.name} added!`);
}

function removeItem(idx) { cart.splice(idx, 1); saveCart(); renderCart(); }

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart();
  renderCart();
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ================================
// CHECKOUT — REDIRECT TO CHECKOUT PAGE
// ================================
async function drawerCheckout() {
  const termsChecked = document.getElementById('drawerTerms').checked;
  if (!termsChecked) {
    const label = document.getElementById('drawerTermsLabel');
    if (label) { label.style.color = '#ff5252'; setTimeout(() => label.style.color = '', 2000); }
    showToast('⚠️ Please agree to the terms first');
    return;
  }
  if (cart.length === 0) return;
  window.location.href = 'checkout';
}

function showToast(msg) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  toast.innerHTML = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function getGameKey(item) {
  if (!item.game) return 'sab';
  if (item.game.includes('Blox Fruits')) return 'bf';
  if (item.game.includes('Grand Piece')) return 'gpo';
  if (item.game.includes('Rivals') || item.game === 'Rivals') return 'rivals';
  return 'sab';
}

function renderSuggestions(currentId) {
  const row = document.getElementById('suggestionsRow');
  if (!row) return;

  const gameViews = JSON.parse(localStorage.getItem('mb_game_views') || '{}');
  const gameRank = Object.entries(gameViews).sort((a, b) => b[1] - a[1]).map(e => e[0]);

  const available = CATALOGUE.filter(p => p.id !== currentId);

  const sorted = gameRank.length === 0 ? available : [...available].sort((a, b) => {
    const aRank = gameRank.indexOf(getGameKey(a));
    const bRank = gameRank.indexOf(getGameKey(b));
    return (aRank === -1 ? 999 : aRank) - (bRank === -1 ? 999 : bRank);
  });

  const suggestions = sorted.slice(0, 6);

  row.innerHTML = suggestions.map(p => `
    <div class="suggestion-card" onclick="addToCart('${p.id}')">
      <div class="suggestion-img">
        ${p.img ? `<img src="${p.img}" alt="${p.name}" onerror="this.parentElement.innerHTML='${p.emoji}'"/>` : p.emoji}
      </div>
      <div class="suggestion-info">
        <div class="suggestion-name">${p.name}</div>
        <div class="suggestion-price" data-usd="${p.priceNum}">${typeof MB_CURRENCY !== 'undefined' ? MB_CURRENCY.formatPrice(p.priceNum) : p.price}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  renderSuggestions('');
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
});
