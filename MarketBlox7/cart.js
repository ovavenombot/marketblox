// ================================
//   MARKETBLOX — CART DRAWER JS
// ================================

let cart = JSON.parse(localStorage.getItem('mb_cart') || '[]');

const CDN = 'img/sab/';

const CATALOGUE = [
  // === Steal A Brainrot — Best Sellers ===
  { id: 'los-mobilis', name: 'Los Mobilis', price: '$3.67', priceNum: 3.67, original: '$4.99', emoji: '🧠', img: 'https://shoplox.fun/cdn/shop/files/893D78FA-11F1-49FF-8F55-01B98FF3F91A_L0_001_1772893035_transformed.png?v=1772894197&width=600', game: 'Steal A Brainrot', category: 'bs' },
  { id: '67', name: '67', price: '$3.99', priceNum: 3.99, original: '$5.99', emoji: '🧠', img: CDN+'Fourtyone.webp?v=1774440710', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'tic-tac-sahur', name: 'Tic Tac Sahur', price: '$14.99', priceNum: 14.99, original: '', emoji: '⏰', img: CDN+'Time_moving_slow.webp?v=1774472345', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'esok-sekolah', name: 'Esok Sekolah', price: '$4.99', priceNum: 4.99, original: '', emoji: '📚', img: 'https://shoplox.fun/cdn/shop/files/A44A802D-A2E7-491A-866A-5F914DDFDD22_L0_001_1772893043_transformed.png?v=1772894488&width=600', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'cursed-burguru', name: 'Cursed Burguru & Fryuru', price: '$149.99', priceNum: 149.99, original: '', emoji: '👹', img: 'https://shoplox.fun/cdn/shop/files/592D66A2-CA6D-40BF-A5F6-4DA5F5800D9D_L0_001_1773433104_transformed.png?v=1773435717&width=600', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'money-puggy', name: 'Money Money Puggy', price: '$5.99', priceNum: 5.99, original: '', emoji: '💰', img: CDN+'Money_money_puggy.webp?v=1774473238', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'garama-madundung', name: 'Garama and Madundung', price: '$11.82', priceNum: 11.82, original: '', emoji: '🧠', img: CDN+'garama.png?v=1772554533', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'mieteteira-bicicleteira', name: 'Mieteteira Bicicleteira', price: '$3.83', priceNum: 3.83, original: '', emoji: '🚲', img: CDN+'Mieteteira_Bicicleteira.webp?v=1774440837', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'rainbow-67', name: 'Rainbow 67', price: '$3.99', priceNum: 3.99, original: '', emoji: '🌈', img: CDN+'19huvx6UUqEqApXv3EVf6XByNfnpa7nlKDQ9RhPy.png?v=1772554536', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-67', name: 'Los 67', price: '$4.49', priceNum: 4.49, original: '', emoji: '🧠', img: CDN+'Los-67.webp?v=1774440852', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-combinasionas', name: 'Los Combinasionas', price: '$3.48', priceNum: 3.48, original: '', emoji: '🧠', img: CDN+'Stop_taking_my_chips_im_just_a_baybeh.webp?v=1774441398', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-grande-combinasion', name: 'La Grande Combinasion', price: '$2.13', priceNum: 2.13, original: '', emoji: '🧠', img: CDN+'Carti.webp?v=1774441553', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'list-list-list-sahur', name: 'List List List Sahur', price: '$5.00', priceNum: 5.00, original: '', emoji: '📜', img: CDN+'List_List_List_Sahur.webp?v=1774440284', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'sab-25', name: '25', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: CDN+'Rework_aebeb151-06eb-42a2-9814-66878e233737.webp?v=1774440296', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-25', name: 'Los 25', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: CDN+'Transparent_Los_25.webp?v=1774440284', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'radioactive-esok-sekolah', name: 'Radioactive Esok Sekolah', price: '$6.99', priceNum: 6.99, original: '', emoji: '☢️', img: CDN+'zdoWfcL5BIEnAKNFwpzr6FOYl5A9yUAOToi5CgfI.png?v=1772554539', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-extinct-grande', name: 'La Extinct Grande', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: CDN+'La_Extinct_Grande_13cd69bf-040c-4950-8c07-e08ff16bc2d6.webp?v=1774473337', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chicleteira-noelteira', name: 'Chicleteira Noelteira', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: CDN+'Noel.webp?v=1774441045', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chicleteira-bicicleteira', name: 'Chicleteira Bicicleteira', price: '$5.00', priceNum: 5.00, original: '', emoji: '🚲', img: CDN+'Chicleteira_57e3b1d6-970d-4210-9b37-67389c13e26f.webp?v=1774440894', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-chicleteiras', name: 'Los Chicleteiras', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: CDN+'Los_ditos_1.webp?v=1774440837', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chicleteirina-bicicleteirina', name: 'Chicleteirina Bicicleteirina', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: CDN+'Chicliterita_bicicliterita.webp?v=1774440837', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'burrito-bandito', name: 'Burrito Bandito', price: '$5.00', priceNum: 5.00, original: '', emoji: '🌯', img: CDN+'PoTaTo.webp?v=1774440837', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-nooo-my-hotspotsitos', name: 'Los Nooo My Hotspotsitos', price: '$5.00', priceNum: 5.00, original: '', emoji: '📶', img: CDN+'LosNooMyHotspotsitos_1.webp?v=1774441723', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-candies', name: 'Los Candies', price: '$5.00', priceNum: 5.00, original: '', emoji: '🍬', img: CDN+'Candy_21.webp?v=1774440156', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'nooo-my-hotspot', name: 'Nooo My Hotspot', price: '$5.00', priceNum: 5.00, original: '', emoji: '📶', img: CDN+'NoMyHotspot.webp?v=1774442212', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-hotspotsitos', name: 'Los Hotspotsitos', price: '$5.00', priceNum: 5.00, original: '', emoji: '📶', img: CDN+'Loshotspotsitos_1.webp?v=1774442298', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-spooky-combinasionas', name: 'Los Spooky Combinasionas', price: '$5.00', priceNum: 5.00, original: '', emoji: '👻', img: CDN+'Lospookycombi.webp?v=1774442107', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'eviledon', name: 'Eviledon', price: '$5.00', priceNum: 5.00, original: '', emoji: '👾', img: CDN+'Eviledonn.webp?v=1774473392', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'bacuru-and-egguru', name: 'Bacuru and Egguru', price: '$5.00', priceNum: 5.00, original: '', emoji: '🥚', img: CDN+'Bacuru_and_Egguru.webp?v=1774473855', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chimino', name: 'Chimino', price: '$5.00', priceNum: 5.00, original: '', emoji: '🧠', img: CDN+'Chimino.jpg?v=1774474870', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-jolly-grande', name: 'La Jolly Grande', price: '$5.00', priceNum: 5.00, original: '', emoji: '🎄', img: CDN+'LaJollyGrande.jpg?v=1774474753', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'guest-666', name: 'Guest 666', price: '$20.00', priceNum: 20.00, original: '', emoji: '👤', img: CDN+'Guest666.jpg?v=1774474378', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'galaxy-esok-sekolah', name: 'Galaxy Esok Sekolah', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌌', img: CDN+'vwYda5eS9EJtjewiyrNXruu6ciMWvMrdZpXx3Zlg.png?v=1772554534', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'cursed-esok-sekolah-bs', name: 'Cursed Esok Sekolah', price: '$10.00', priceNum: 10.00, original: '', emoji: '😈', img: CDN+'HSAUS1yOmtI23BnkwXT7bF3u7bDqDOEDuq7zEmUe.png?v=1772554535', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'money-money-reindeer', name: 'Money Money Reindeer', price: '$30.00', priceNum: 30.00, original: '', emoji: '🦌', img: CDN+'MoneyMoneyReindeer.webp?v=1774473867', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'rainbow-esok-sekolah', name: 'Rainbow Esok Sekolah', price: '$7.99', priceNum: 7.99, original: '', emoji: '🌈', img: CDN+'0bzYBcoSygGVu6Qg9MS3r4dbkYzgU5ihmZilfQbp.png?v=1772554532', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'radioactive-los-67', name: 'Radioactive Los 67', price: '$9.99', priceNum: 9.99, original: '', emoji: '☢️', img: CDN+'V9A3YVLidj6xyWCXWkcRFSTBaL9wNYuyqhyN4Ddf.png?v=1772554530', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-jolly-combinasionas', name: 'Los Jolly Combinasionas', price: '$10.00', priceNum: 10.00, original: '', emoji: '🎄', img: CDN+'Los_jollycombos.webp?v=1774440191', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'celularcini-viciosini', name: 'Celularcini Viciosini', price: '$10.00', priceNum: 10.00, original: '', emoji: '📱', img: CDN+'DO_NOT_GRAB_MY_PHONE21_21.webp?v=1774440284', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-burritos', name: 'Los Burritos', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌯', img: CDN+'LosBurritos.webp?v=1774441344', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-spooky-grande', name: 'La Spooky Grande', price: '$10.00', priceNum: 10.00, original: '', emoji: '👻', img: CDN+'Spooky_Grande_5e78e830-5cf7-447d-ab05-0133a6c2d3eb.webp?v=1774441592', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-planitos', name: 'Los Planitos', price: '$19.99', priceNum: 19.99, original: '', emoji: '🌿', img: CDN+'Los_Planitos.webp?v=1774442656', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'lovin-rose', name: 'Lovin Rose', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌹', img: CDN+'Lovin_Rose.webp?v=1774471928', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-mi-gatitos', name: 'Los Mi Gatitos', price: '$10.00', priceNum: 10.00, original: '', emoji: '😸', img: CDN+'Los_Ay_Mi_Gatitos.webp?v=1774471628', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'jolly-jolly-sahur', name: 'Jolly Jolly Sahur', price: '$10.00', priceNum: 10.00, original: '', emoji: '🎄', img: CDN+'JollyJollySahur.webp?v=1774471537', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-ginger-sekolah', name: 'La Ginger Sekolah', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌿', img: CDN+'Esok_Ginger.webp?v=1774472278', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'lavadorito-spinito', name: 'Lavadorito Spinito', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌀', img: CDN+'Lavadorito_Spinito.webp?v=1774471481', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-secret-combinasion', name: 'La Secret Combinasion', price: '$10.69', priceNum: 10.69, original: '', emoji: '🔐', img: CDN+'Lasecretcombinasion.webp?v=1774471477', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chillin-chili', name: 'Chillin Chili', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌶️', img: CDN+'Chilin.webp?v=1774472299', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'ketchuru-and-musturu', name: 'Ketchuru and Musturu', price: '$10.00', priceNum: 10.00, original: '', emoji: '🥫', img: CDN+'Ketchuru.webp?v=1774472307', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-tacoritas', name: 'Los Tacoritas', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌮', img: CDN+'My_kids_will_also_rob_you.webp?v=1774473144', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-primos', name: 'Los Primos', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧠', img: CDN+'LosPrimos.webp?v=1774473196', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'nuclearo-dinossauro', name: 'Nuclearo Dinossauro', price: '$10.00', priceNum: 10.00, original: '', emoji: '☢️', img: CDN+'Nuclearo_Dinosauro.webp?v=1774473272', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'las-sis', name: 'Las Sis', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧠', img: CDN+'Las_Sis.webp?v=1774473495', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-bros', name: 'Los Bros', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧠', img: CDN+'BROOOOOOOO.webp?v=1774473540', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-cupids', name: 'Los Cupids', price: '$10.00', priceNum: 10.00, original: '', emoji: '💘', img: CDN+'Los_Cupids2.webp?v=1774473801', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-romantic-grande', name: 'La Romantic Grande', price: '$10.00', priceNum: 10.00, original: '', emoji: '💕', img: CDN+'La_Romantic_Grande2.webp?v=1774473808', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'noo-my-heart', name: 'Noo my Heart', price: '$10.00', priceNum: 10.00, original: '', emoji: '💔', img: CDN+'NooMyLoveheart.webp?v=1774473826', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-taco-combinasion', name: 'La Taco Combinasion', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌮', img: CDN+'LaTacoCombinasion.jpg?v=1774473923', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chipso-and-queso', name: 'Chipso and Queso', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧀', img: CDN+'ChipsoandQueso.jpg?v=1774473874', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'orcaledon', name: 'Orcaledon', price: '$10.00', priceNum: 10.00, original: '', emoji: '🐋', img: CDN+'Orcaledon.png?v=1774473169', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-puggies', name: 'Los Puggies', price: '$10.00', priceNum: 10.00, original: '', emoji: '🐶', img: CDN+'LosPuggies.png?v=1774473123', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'cursed-los-67', name: 'Cursed Los 67', price: '$12.99', priceNum: 12.99, original: '', emoji: '😈', img: CDN+'UzeZunAcSYBlPpINhSc4C3ZW0Ckc8owRmlPfDMZx.png?v=1772554537', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'nacho-spyder', name: 'Nacho Spyder', price: '$14.99', priceNum: 14.99, original: '', emoji: '🕷️', img: CDN+'Nacho_Spyder.webp?v=1774437312', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'mariachi-corazoni', name: 'Mariachi Corazoni', price: '$15.00', priceNum: 15.00, original: '', emoji: '🎸', img: CDN+'MariachiCora.webp?v=1774473627', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-sahur-combinasion', name: 'La Sahur Combinasion', price: '$15.00', priceNum: 15.00, original: '', emoji: '🌙', img: CDN+'Sahuria.webp?v=1774473639', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chicleteira-cupideira', name: 'Chicleteira Cupideira', price: '$20.00', priceNum: 20.00, original: '', emoji: '💘', img: CDN+'Chicleteira_Cupideira.webp?v=1774473831', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'donkeyturbo-express', name: 'Donkeyturbo Express', price: '$15.00', priceNum: 15.00, original: '', emoji: '🚂', img: CDN+'DonkeyturboExpress.webp?v=1774473872', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'gobblino-uniciclino', name: 'Gobblino Uniciclino', price: '$15.00', priceNum: 15.00, original: '', emoji: '🦄', img: CDN+'GobblinoUniciclino.jpg?v=1774474793', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-sekolahs', name: 'Los Sekolahs', price: '$20.00', priceNum: 20.00, original: '', emoji: '📚', img: CDN+'Los_Sekolahs2.webp?v=1774440175', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'graipuss-medussi', name: 'Graipuss Medussi', price: '$20.00', priceNum: 20.00, original: '', emoji: '🦑', img: CDN+'Graipuss.webp?v=1774442656', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'chill-puppy', name: 'Chill Puppy', price: '$20.00', priceNum: 20.00, original: '', emoji: '🐶', img: CDN+'Chill_Puppy.webp?v=1774442656', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'arcadopus', name: 'Arcadopus', price: '$20.00', priceNum: 20.00, original: '', emoji: '🎮', img: CDN+'Arcadopus.webp?v=1774442656', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'mi-gatito', name: 'Mi Gatito', price: '$20.00', priceNum: 20.00, original: '', emoji: '😺', img: CDN+'Mi_GatitoHD.webp?v=1774473844', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'festive-67', name: 'Festive 67', price: '$25.00', priceNum: 25.00, original: '', emoji: '🎊', img: CDN+'TransparentFestive67.webp?v=1774440284', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'los-amigos', name: 'Los Amigos', price: '$30.00', priceNum: 30.00, original: '', emoji: '🤝', img: CDN+'Los_Amigos.webp?v=1774437954', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'cooki-and-milki', name: 'Cooki and Milki', price: '$30.00', priceNum: 30.00, original: '', emoji: '🍪', img: CDN+'Cooki_and_milki.webp?v=1774471464', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'capitano-moby', name: 'Capitano Moby', price: '$30.00', priceNum: 30.00, original: '', emoji: '🐋', img: CDN+'CapitanoMoby_8d0a0442-3dac-4494-bc64-a0edc1098a94.jpg?v=1774474526', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'fragrama-and-chocrama', name: 'Fragrama and Chocrama', price: '$30.00', priceNum: 30.00, original: '', emoji: '🍫', img: CDN+'FragramaandChocrama.jpg?v=1774474047', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'spooky-and-pumpky', name: 'Spooky and Pumpky', price: '$30.00', priceNum: 30.00, original: '', emoji: '🎃', img: CDN+'SpookyandPumpky.png?v=1774474197', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'gold-gold-gold', name: 'Gold Gold Gold', price: '$35.00', priceNum: 35.00, original: '', emoji: '🪙', img: CDN+'Gold_Gold_Gold1.webp?v=1774471893', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'noo-my-gold', name: 'Noo my Gold', price: '$50.00', priceNum: 50.00, original: '', emoji: '💰', img: CDN+'Noo_my_Gold.webp?v=1774473648', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'cloverat-clapat', name: 'Cloverat Clapat', price: '$40.00', priceNum: 40.00, original: '', emoji: '🍀', img: CDN+'Cloverat_Clapat.webp?v=1774471908', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-food-combinasion', name: 'La Food Combinasion', price: '$40.00', priceNum: 40.00, original: '', emoji: '🍽️', img: CDN+'La_Food_Combination.webp?v=1774471920', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'la-casa-boo', name: 'La Casa Boo', price: '$40.00', priceNum: 40.00, original: '', emoji: '👻', img: CDN+'LaCasaBoo.png?v=1774473265', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'rosey-and-teddy', name: 'Rosey and Teddy', price: '$50.00', priceNum: 50.00, original: '', emoji: '🌹', img: CDN+'Rosey_and_Teddy.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'quesadillo-vampiro', name: 'Quesadillo Vampiro', price: '$10.00', priceNum: 10.00, original: '', emoji: '🧄', img: CDN+'VampiroQuesa.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'quesadilla-crocodila', name: 'Quesadilla Crocodila', price: '$5.00', priceNum: 5.00, original: '', emoji: '🐊', img: CDN+'QuesadillaCrocodilla.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'pot-hotspot', name: 'Pot Hotspot', price: '$10.00', priceNum: 10.00, original: '', emoji: '📶', img: CDN+'Pot_Hotspot.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'popcuru-and-fizzuru', name: 'Popcuru and Fizzuru', price: '$15.00', priceNum: 15.00, original: '', emoji: '🍿', img: CDN+'Popuru_and_Fizzuru.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'rang-ring-bus', name: 'Rang Ring Bus', price: '$19.99', priceNum: 19.99, original: '', emoji: '🚌', img: CDN+'RingRangBus2.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'sammyni-fattini', name: 'Sammyni Fattini', price: '$25.00', priceNum: 25.00, original: '', emoji: '🧠', img: CDN+'Sammyni_Fattini.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'rosetti-tualetti', name: 'Rosetti Tualetti', price: '$20.00', priceNum: 20.00, original: '', emoji: '🌸', img: CDN+'Rossetti_Tualetti.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'secret-lucky-block-single', name: 'Secret Lucky Block', price: '$1.00', priceNum: 1.00, original: '', emoji: '🎲', img: CDN+'SecretLuckyBlock.png', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'w-or-l', name: 'W or L', price: '$12.00', priceNum: 12.00, original: '', emoji: '🧠', img: CDN+'WorL.jpg', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'ventoliero-pavonero', name: 'Ventoliero Pavonero', price: '$20.00', priceNum: 20.00, original: '', emoji: '🌪️', img: CDN+'Ventoliero_Pavonero.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'tuff-toucan', name: 'Tuff Toucan', price: '$20.00', priceNum: 20.00, original: '', emoji: '🦜', img: CDN+'TuffToucan.webp', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'tralaledon', name: 'Tralaledon', price: '$20.00', priceNum: 20.00, original: '', emoji: '🧠', img: CDN+'Tralaledon.png?v=1774473210', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'tang-tang-keletang', name: 'Tang Tang Keletang', price: '$10.00', priceNum: 10.00, original: '', emoji: '🔔', img: CDN+'TangTangVfx.webp?v=1774472049', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'tacorita-bicicleta', name: 'Tacorita Bicicleta', price: '$10.00', priceNum: 10.00, original: '', emoji: '🌮', img: CDN+'Gonna_rob_you_twin.webp?v=1774441359', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'swaggy-bros', name: 'Swaggy Bros', price: '$10.00', priceNum: 10.00, original: '', emoji: '😎', img: CDN+'SwaggyBros.jpg?v=1774474450', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'swag-soda', name: 'Swag Soda', price: '$10.00', priceNum: 10.00, original: '', emoji: '🥤', img: CDN+'SwagSoda.png?v=1774472825', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'spaghetti-tualetti', name: 'Spaghetti Tualetti', price: '$10.00', priceNum: 10.00, original: '', emoji: '🍝', img: CDN+'Spaghettitualetti.webp?v=1774473307', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'spinny-hammy', name: 'Spinny Hammy', price: '$20.00', priceNum: 20.00, original: '', emoji: '🐹', img: CDN+'Spinny_Hammy_c873c8b7-22fd-4613-822c-ac9e8a207a9a.webp?v=1774442738', game: 'Steal A Brainrot', category: 'bs' },
  { id: 'snailo-clovero', name: 'Snailo Clovero', price: '$20.00', priceNum: 20.00, original: '', emoji: '🐌', img: CDN+'Snailo_Clovero.webp?v=1774473643', game: 'Steal A Brainrot', category: 'bs' },
  // === Steal A Brainrot — New Brainrots ===
  // === Steal A Brainrot — Bundles ===
  { id: 'secret-lucky-block-10x', name: '10x Secret Lucky Block', price: '$6.82', priceNum: 6.82, original: '', emoji: '📦', img: 'https://shoplox.fun/cdn/shop/files/55FFCAE9-D233-42C4-B4FA-8F2A99F7E3C6_L0_001_1774660671_transformed.png', game: 'Steal A Brainrot', category: 'bundles' },
  { id: 'divine-secret-lucky-block-10x', name: '10x Divine Secret Lucky Block', price: '$9.82', priceNum: 9.82, original: '', emoji: '✨', img: CDN+'10x-Divine-Secret-Lucky-Block.png?v=1777656477', game: 'Steal A Brainrot', category: 'bundles' },
  // === Steal A Brainrot — Cyber Brainrots ===
  { id: 'cyber-strawberrita', name: 'Cyber Strawberrita', price: '$5.04', priceNum: 5.04, original: '', emoji: '🤖', img: CDN+'Cyber-Strawberrita.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-esok-sekolah', name: 'Cyber Esok Sekolah', price: '$6.64', priceNum: 6.64, original: '', emoji: '🤖', img: CDN+'Cyber-Esok-Sekolah.png?v=1777656693', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-dj-panda', name: 'Cyber DJ Panda', price: '$8.04', priceNum: 8.04, original: '', emoji: '🤖', img: CDN+'Cyber-DJ-Panda.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-los-burritos', name: 'Cyber Los Burritos', price: '$8.44', priceNum: 8.44, original: '', emoji: '🤖', img: CDN+'Cyber-Los-Burritos.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-money-money-puggy', name: 'Cyber Money Money Puggy', price: '$11.04', priceNum: 11.04, original: '', emoji: '🤖', img: CDN+'Cyber-Money-Money-Puggy.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-ketchuru-and-musturu', name: 'Cyber Ketchuru and Musturu', price: '$16.04', priceNum: 16.04, original: '', emoji: '🤖', img: CDN+'Cyber-Ketchuru-and-Musturu.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-ketupat-kepat', name: 'Cyber Ketupat Kepat', price: '$17.04', priceNum: 17.04, original: '', emoji: '🤖', img: CDN+'Cyber-Ketupat-Kepat.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-lavadorito-spinito', name: 'Cyber Lavadorito Spinito', price: '$17.04', priceNum: 17.04, original: '', emoji: '🤖', img: CDN+'Cyber-Lavadorito-Spinito.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-tang-tang-keletang', name: 'Cyber Tang Tang Keletang', price: '$17.04', priceNum: 17.04, original: '', emoji: '🤖', img: CDN+'Cyber-Tang-Tang-Keletang.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-la-secret-combinasion', name: 'Cyber La Secret Combinasion', price: '$21.04', priceNum: 21.04, original: '', emoji: '🤖', img: CDN+'Cyber-La-Secret-Combinasion.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-ventoliero-pavonero', name: 'Cyber Ventoliero Pavonero', price: '$29.04', priceNum: 29.04, original: '', emoji: '🤖', img: CDN+'Cyber-Ventoliero-Pavonero.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-cash-or-card', name: 'Cyber Cash or Card', price: '$48.04', priceNum: 48.04, original: '', emoji: '🤖', img: CDN+'Cyber-Cash-or-Card.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-burguro-and-fryuro', name: 'Cyber Burguro And Fryuro', price: '$48.35', priceNum: 48.35, original: '', emoji: '🤖', img: CDN+'Cyber-Burguro-And-Fryuro.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-celestial-pegasus', name: 'Cyber Celestial Pegasus', price: '$53.41', priceNum: 53.41, original: '', emoji: '🤖', img: CDN+'Cyber-Celestial-Pegasus.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-capitano-moby', name: 'Cyber Capitano Moby', price: '$58.04', priceNum: 58.04, original: '', emoji: '🤖', img: CDN+'Cyber-Capitano-Moby.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-la-food-combinasion', name: 'Cyber La Food Combinasion', price: '$59.17', priceNum: 59.17, original: '', emoji: '🤖', img: CDN+'Cyber-La-Food-Combinasion.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-cerberus', name: 'Cyber Cerberus', price: '$73.04', priceNum: 73.04, original: '', emoji: '🤖', img: CDN+'Cyber-Cerberus.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-sammyni-fattini', name: 'Cyber Sammyni Fattini', price: '$73.04', priceNum: 73.04, original: '', emoji: '🤖', img: CDN+'Cyber-Sammyni-Fattini.png', game: 'Steal A Brainrot', category: 'cyber' },
  { id: 'cyber-dragon-cannelloni', name: 'Cyber Dragon Cannelloni', price: '$231.85', priceNum: 231.85, original: '', emoji: '🤖', img: CDN+'Cyber-Dragon-Cannelloni.png', game: 'Steal A Brainrot', category: 'cyber' },
  // === Steal A Brainrot — Divine Brainrots ===
  { id: 'divine-67', name: 'Divine 67', price: '$2.98', priceNum: 2.98, original: '', emoji: '👑', img: CDN+'Divine-67.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-los-combinasionas', name: 'Divine Los Combinasionas', price: '$4.98', priceNum: 4.98, original: '', emoji: '👑', img: CDN+'Divine-Los-Combinasionas.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-esok-sekolah', name: 'Divine Esok Sekolah', price: '$6.23', priceNum: 6.23, original: '', emoji: '👑', img: CDN+'Divine-Esok-Sekolah.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-los-67', name: 'Divine Los 67', price: '$6.34', priceNum: 6.34, original: '', emoji: '👑', img: CDN+'Divine-Los-67.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-money-money-puggy', name: 'Divine Money Money Puggy', price: '$12.14', priceNum: 12.14, original: '', emoji: '👑', img: CDN+'Divine-Money-Money-Puggy.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-nuclearo-dinossauro', name: 'Divine Nuclearo Dinossauro', price: '$12.89', priceNum: 12.89, original: '', emoji: '👑', img: CDN+'Divine-Nuclearo-Dinossauro.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-ketupat-kepat', name: 'Divine Ketupat Kepat', price: '$14.37', priceNum: 14.37, original: '', emoji: '👑', img: CDN+'Divine-Ketupat-Kepat.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-spaghetti-tualetti', name: 'Divine Spaghetti Tualetti', price: '$16.56', priceNum: 16.56, original: '', emoji: '👑', img: CDN+'Divine-Spaghetti-Tualetti.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-ketchuru-and-musturu', name: 'Divine Ketchuru and Musturu', price: '$17.35', priceNum: 17.35, original: '', emoji: '👑', img: CDN+'Divine-Ketchuru-and-Musturu.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-tang-tang-keletang', name: 'Divine Tang Tang Keletang', price: '$17.76', priceNum: 17.76, original: '', emoji: '👑', img: CDN+'Divine-Tang-Tang-Keletang.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-lavadorito-spinito', name: 'Divine Lavadorito Spinito', price: '$18.53', priceNum: 18.53, original: '', emoji: '👑', img: CDN+'Divine-Lavadorito-Spinito.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-la-secret-combinasion', name: 'Divine La Secret Combinasion', price: '$28.84', priceNum: 28.84, original: '', emoji: '👑', img: CDN+'Divine-La-Secret-Combinasion.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-tictac-sahur', name: 'Divine Tictac Sahur', price: '$32.17', priceNum: 32.17, original: '', emoji: '👑', img: CDN+'Divine-Tictac-Sahur.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-garama-and-madundung', name: 'Divine Garama and Madundung', price: '$38.60', priceNum: 38.60, original: '', emoji: '👑', img: CDN+'Divine-Garama-and-Madundung.png?v=1777656466', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-burguro-and-fryuro', name: 'Divine Burguro And Fryuro', price: '$53.04', priceNum: 53.04, original: '', emoji: '👑', img: CDN+'Divine-Burguro-And-Fryuro.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-popcuru-and-fizzuru', name: 'Divine Popcuru and Fizzuru', price: '$64.44', priceNum: 64.44, original: '', emoji: '👑', img: CDN+'Divine-Popcuru-and-Fizzuru.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-capitano-moby', name: 'Divine Capitano Moby', price: '$67.98', priceNum: 67.98, original: '', emoji: '👑', img: CDN+'Divine-Capitano-Moby.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-celestial-pegasus', name: 'Divine Celestial Pegasus', price: '$68.94', priceNum: 68.94, original: '', emoji: '👑', img: CDN+'Divine-Celestial-Pegasus.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-cerberus', name: 'Divine Cerberus', price: '$78.92', priceNum: 78.92, original: '', emoji: '👑', img: CDN+'Divine-Cerberus.png', game: 'Steal A Brainrot', category: 'divine' },
  { id: 'divine-dragon-cannelloni', name: 'Divine Dragon Cannelloni', price: '$276.40', priceNum: 276.40, original: '', emoji: '👑', img: CDN+'Divine-Dragon-Cannelloni.png', game: 'Steal A Brainrot', category: 'divine' },
  // === Steal A Brainrot — Index Bases ===
  { id: 'candy-base-index', name: 'Candy Base (Index)', price: '$36.79', priceNum: 36.79, original: '', emoji: '🍬', img: 'https://shoplox.fun/cdn/shop/files/F355082A-8DD7-4F8E-B731-6A1989C80FCC_L0_001_1772900729_transformed.png', game: 'Steal A Brainrot', category: 'index' },
  { id: 'galaxy-base-index', name: 'Galaxy Base (Index)', price: '$43.44', priceNum: 43.44, original: '', emoji: '🌌', img: 'https://shoplox.fun/cdn/shop/files/IMG_2891.png', game: 'Steal A Brainrot', category: 'index' },
  { id: 'yin-yang-base-index', name: 'Yin Yang Base (Index)', price: '$43.44', priceNum: 43.44, original: '', emoji: '☯️', img: 'https://shoplox.fun/cdn/shop/files/DC8646F9-6757-48D9-94CE-60E0B0A06C64_L0_001_1772893078_transformed.png', game: 'Steal A Brainrot', category: 'index' },
  { id: 'divine-base-index', name: 'Divine Base (Index)', price: '$56.59', priceNum: 56.59, original: '', emoji: '✨', img: CDN+'Divine-Base-Index.png', game: 'Steal A Brainrot', category: 'index' },
  { id: 'radioactive-base-index', name: 'Radioactive Base (Index)', price: '$60.59', priceNum: 60.59, original: '', emoji: '☢️', img: 'https://shoplox.fun/cdn/shop/files/463AC312-21FC-493B-88AE-3B9BA9623C52_L0_001_1772892947_transformed.png', game: 'Steal A Brainrot', category: 'index' },
  // === Steal A Brainrot — OP Brainrots ===
  { id: 'celestial-pegasus', name: 'Celestial Pegasus', price: '$29.99', priceNum: 29.99, original: '', emoji: '🦄', img: CDN+'Celestial_Pegasus.webp?v=1774471912', game: 'Steal A Brainrot', category: 'op' },
  { id: 'hydra-dragon', name: 'Hydra Dragon Cannelloni', price: '$82.99', priceNum: 82.99, original: '', emoji: '🐉', img: CDN+'Hydra_Dragon_Cannelloni.webp?v=1774471623', game: 'Steal A Brainrot', category: 'op' },
  { id: 'ketupat-kepat', name: 'Ketupat Kepat', price: '$6.97', priceNum: 6.97, original: '', emoji: '💎', img: CDN+'KetupatKepat.webp?v=1774472312', game: 'Steal A Brainrot', category: 'op' },
  { id: 'dragon-cannelloni', name: 'Dragon Cannelloni', price: '$97.28', priceNum: 97.28, original: '', emoji: '🐉', img: CDN+'Nah_uh.webp?v=1774472295', game: 'Steal A Brainrot', category: 'op' },
  { id: 'fortunu-and-cashuru', name: 'Fortunu and Cashuru', price: '$30.00', priceNum: 30.00, original: '', emoji: '🤑', img: CDN+'Fortunu_and_Coinuru1.webp?v=1774437187', game: 'Steal A Brainrot', category: 'op' },
  { id: 'cerberus', name: 'Cerberus', price: '$50.00', priceNum: 50.00, original: '', emoji: '🐺', img: CDN+'Cerberus.webp?v=1774471619', game: 'Steal A Brainrot', category: 'op' },
  { id: 'ketupat-bros', name: 'Ketupat Bros', price: '$80.00', priceNum: 80.00, original: '', emoji: '💎', img: CDN+'Ketupat_Bros.webp?v=1774472151', game: 'Steal A Brainrot', category: 'op' },
  { id: 'ginger-gerat', name: 'Ginger Gerat', price: '$500.00', priceNum: 500.00, original: '', emoji: '💎', img: CDN+'GingerGerat_1.webp?v=1774472177', game: 'Steal A Brainrot', category: 'op' },
  { id: 'dragon-gingerini', name: 'Dragon Gingerini', price: '$275.00', priceNum: 275.00, original: '', emoji: '🐉', img: CDN+'DragonGingerini.webp?v=1774471533', game: 'Steal A Brainrot', category: 'op' },
  { id: 'la-supreme-combinasion', name: 'La Supreme Combinasion', price: '$300.00', priceNum: 300.00, original: '', emoji: '👑', img: CDN+'LaSupremeCombinasion.jpg?v=1774474571', game: 'Steal A Brainrot', category: 'op' },
  { id: 'love-love-bear', name: 'Love Love Bear', price: '$777.00', priceNum: 777.00, original: '', emoji: '🐻', img: CDN+'Love_Love_Bear.webp?v=1774440086', game: 'Steal A Brainrot', category: 'op' },
  { id: 'tirilikalika-tirilikalako', name: 'Tirilikalika Tirilikalako', price: '$300.00', priceNum: 300.00, original: '', emoji: '🧠', img: CDN+'TirilikalikaTirilikalakoTransparent.webp?v=1774438108', game: 'Steal A Brainrot', category: 'op' },
  { id: 'griffin', name: 'Griffin', price: '$499.00', priceNum: 499.00, original: '', emoji: '🦅', img: CDN+'Griffin.webp?v=1774437284', game: 'Steal A Brainrot', category: 'op' },
  { id: 'antonio', name: 'Antonio', price: '$300.00', priceNum: 300.00, original: '', emoji: '🧠', img: CDN+'Antonio.jpg?v=1774475208', game: 'Steal A Brainrot', category: 'op' },
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
  // === Sailor Piece — Bundles ===
  { id: 'gpo-bundle-triple-warrior', name: 'Spirit Warrior + Sun Incarnate + Dual Wielder', price: '$20.79', priceNum: 20.79, original: '', emoji: '⚔️', img: 'https://www.sailorpiecewiki.com/images/hero/spiritwarrior.webp',          game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-spirit-warrior', name: 'Spirit Warrior + Spirit Outfit',               price: '$9.09',  priceNum: 9.09,  original: '', emoji: '⚔️', img: 'https://www.sailorpiecewiki.com/images/hero/spiritwarrior.webp',          game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-sun-incarnate',  name: 'Sun Incarnate + Sun Outfit',                   price: '$9.09',  priceNum: 9.09,  original: '', emoji: '☀️', img: 'https://www.sailorpiecewiki.com/images/hero/sungod.webp',                 game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-dual-wielder',   name: 'Dual Wielder + Dual Outfit',                   price: '$9.09',  priceNum: 9.09,  original: '', emoji: '⚔️', img: 'https://www.sailorpiecewiki.com/images/hero/dualwielder.webp',            game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-anti-magic',     name: 'Anti Magic + Demon Wing',                      price: '$8.44',  priceNum: 8.44,  original: '', emoji: '🦋', img: 'https://www.sailorpiecewiki.com/images/hero/antimagic.webp',              game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-world-quad',     name: 'The World + Cosmic Being + Great Mage + Dragon Goddess', price: '$27.94', priceNum: 27.94, original: '', emoji: '🌍', img: 'https://www.sailorpiecewiki.com/images/hero/melee-theworld.webp',  game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-world-trio',     name: 'The World + Cosmic Being + Great Mage',        price: '$19.49', priceNum: 19.49, original: '', emoji: '🌍', img: 'https://www.sailorpiecewiki.com/images/hero/melee-theworld.webp',         game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-the-world',      name: 'The World + World Outfit',                     price: '$8.44',  priceNum: 8.44,  original: '', emoji: '🌍', img: 'https://www.sailorpiecewiki.com/images/hero/melee-theworld.webp',         game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-cosmic-being',   name: 'Cosmic Being + Cosmic Body',                   price: '$8.44',  priceNum: 8.44,  original: '', emoji: '🌌', img: 'https://www.sailorpiecewiki.com/images/hero/melee-cosmicbeing.webp',     game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-great-mage',     name: 'Great Mage + Mage Outfit',                     price: '$8.44',  priceNum: 8.44,  original: '', emoji: '🔮', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-greatmage.webp',      game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-dragon-goddess', name: 'Dragon Goddess + Blossom Outfit',              price: '$8.44',  priceNum: 8.44,  original: '', emoji: '🐉', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-dragongoddess.webp',  game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-atomic-trio',    name: 'Atomic + Strongest Shinobi + Abyssal Empress', price: '$21.77', priceNum: 21.77, original: '', emoji: '⚛️', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-atomic.webp',          game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-ice-queen',      name: 'Ice Queen + Ice Queen Outfit',                 price: '$8.77',  priceNum: 8.77,  original: '', emoji: '❄️', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-icequeen.webp',        game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-moon-slayer',    name: 'Moon Slayer + Moon Outfit',                    price: '$8.77',  priceNum: 8.77,  original: '', emoji: '🌙', img: 'https://www.sailorpiecewiki.com/images/hero/melee-moonslayer.webp',       game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-atomic-shinobi', name: 'Atomic + Strongest Shinobi',                   price: '$15.92', priceNum: 15.92, original: '', emoji: '⚛️', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-atomic.webp',          game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-abyssal-shinobi',name: 'Abyssal Empress + Strongest Shinobi',          price: '$15.59', priceNum: 15.59, original: '', emoji: '🌊', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-abyssalempress.webp',  game: 'Sailor Piece', category: 'bundles' },
  { id: 'gpo-bundle-boosts',         name: 'x2 Money + x2 Gems + x2 EXP + x2 Luck',       price: '$7.47',  priceNum: 7.47,  original: '', emoji: '💎', img: '',                                                                          game: 'Sailor Piece', category: 'bundles' },
  // === Sailor Piece — Products ===
  { id: 'gpo-2x-money',             name: '2x Money',             price: '$1.62',  priceNum: 1.62,  original: '', emoji: '💰', img: 'https://assetsdelivery.eldorado.gg/v7/_offers-v2_/f27dc565-3aac-4aa5-915d-07d6d465a445_Offer_20260411161927_8711387Large.png?w=255', game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-2x-gems',              name: '2x Gems',              price: '$2.59',  priceNum: 2.59,  original: '', emoji: '💎', img: 'https://assetsdelivery.eldorado.gg/v7/_offers-v2_/eef97083-6752-43d8-a690-a6ddd5fff0ee_Offer_20260319125227_6267811Large.png?w=255', game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-2x-exp',               name: '2x EXP',               price: '$1.94',  priceNum: 1.94,  original: '', emoji: '⭐', img: 'https://assetsdelivery.eldorado.gg/v7/_offers-v2_/eef97083-6752-43d8-a690-a6ddd5fff0ee_Offer_20260319125331_5051063Large.png?w=255', game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-2x-luck',              name: '2x Luck Drop',         price: '$4.22',  priceNum: 4.22,  original: '', emoji: '🍀', img: 'img/gpo/2x-luck.png', game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-2x-drops',             name: '2x Drops',             price: '$5.52',  priceNum: 5.52,  original: '', emoji: '🎁', img: 'https://assetsdelivery.eldorado.gg/v7/_offers-v2_/b7b92726-2229-4d7f-84bc-c3203b969935_Offer_20260424094004_2603723Large.png?w=255', game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-solo-hunter',          name: 'Solo Hunter',          price: '$5.84',  priceNum: 5.84,  original: '', emoji: '🎯', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-solohunter.webp',        game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-cursed-king',          name: 'Cursed King',          price: '$5.19',  priceNum: 5.19,  original: '', emoji: '👑', img: 'https://www.sailorpiecewiki.com/images/hero/melee-curseking.webp',           game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-limitless-sorcerer',   name: 'Limitless Sorcerer',   price: '$4.54',  priceNum: 4.54,  original: '', emoji: '🔮', img: 'https://www.sailorpiecewiki.com/images/hero/melee-limitlesssorcerer.webp',   game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-excalibur',            name: 'Excalibur',            price: '$3.24',  priceNum: 3.24,  original: '', emoji: '⚔️', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-excalibur.webp',          game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-manipulator',          name: 'Manipulator',          price: '$6.17',  priceNum: 6.17,  original: '', emoji: '🌀', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-manipulator.webp',        game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-qin-shi',              name: 'Qin Shi',              price: '$5.52',  priceNum: 5.52,  original: '', emoji: '🏯', img: 'https://www.sailorpiecewiki.com/images/hero/melee-qinshi.webp',              game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-shadow',               name: 'Shadow',               price: '$6.49',  priceNum: 6.49,  original: '', emoji: '🌑', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-shadowsword.webp',        game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-cursed-vessel',        name: 'Cursed Vessel',        price: '$3.24',  priceNum: 3.24,  original: '', emoji: '⚗️', img: 'https://www.sailorpiecewiki.com/images/hero/melee-cursedvessel.webp',        game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-vampire-king',         name: 'Vampire King',         price: '$5.84',  priceNum: 5.84,  original: '', emoji: '🧛', img: 'https://www.sailorpiecewiki.com/images/hero/melee-vampireking.webp',         game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-strongest-today',      name: 'Strongest of Today',   price: '$6.82',  priceNum: 6.82,  original: '', emoji: '💪', img: 'https://www.sailorpiecewiki.com/images/hero/melee-strongestoftoday.webp',   game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-strongest-history',    name: 'Strongest in History', price: '$7.14',  priceNum: 7.14,  original: '', emoji: '🏆', img: 'https://www.sailorpiecewiki.com/images/hero/melee-strongestinhistory.webp', game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-king-of-heroes',       name: 'King of Heroes',       price: '$7.79',  priceNum: 7.79,  original: '', emoji: '👑', img: 'https://www.sailorpiecewiki.com/images/hero/melee-kingofheroes.webp',        game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-demon-king',           name: 'Demon King',           price: '$8.12',  priceNum: 8.12,  original: '', emoji: '👹', img: 'https://www.sailorpiecewiki.com/images/hero/melee-demonking.webp',           game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-shadow-monarch',       name: 'Shadow Monarch',       price: '$8.44',  priceNum: 8.44,  original: '', emoji: '🌑', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-shadowmonarch.webp',      game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-sin-of-pride',         name: 'Sin of Pride',         price: '$8.12',  priceNum: 8.12,  original: '', emoji: '😈', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-sinofpride.webp',         game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-blessed-maiden',       name: 'Blessed Maiden',       price: '$8.77',  priceNum: 8.77,  original: '', emoji: '👼', img: 'https://www.sailorpiecewiki.com/images/hero/melee-blessedmaiden.webp',       game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-true-manipulator',     name: 'True Manipulator',     price: '$9.09',  priceNum: 9.09,  original: '', emoji: '🌀', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-truemanipulator.webp',    game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-corrupted-excalibur',  name: 'Corrupted Excalibur',  price: '$8.77',  priceNum: 8.77,  original: '', emoji: '⚔️', img: 'https://www.sailorpiecewiki.com/images/hero/melee-corruptedexcalibur.webp',  game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-strongest-shinobi',    name: 'Strongest Shinobi',    price: '$9.09',  priceNum: 9.09,  original: '', emoji: '🥷', img: 'https://www.sailorpiecewiki.com/images/hero/melee-strongestshinobi.webp',    game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-atomic',               name: 'Atomic',               price: '$9.42',  priceNum: 9.42,  original: '', emoji: '⚛️', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-atomic.webp',             game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-abyssal-empress',      name: 'Abyssal Empress',      price: '$9.09',  priceNum: 9.09,  original: '', emoji: '🌊', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-abyssalempress.webp',    game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-moon-slayer',          name: 'Moon Slayer',          price: '$9.09',  priceNum: 9.09,  original: '', emoji: '🌙', img: 'https://www.sailorpiecewiki.com/images/hero/melee-moonslayer.webp',          game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-ice-queen',            name: 'Ice Queen',            price: '$9.09',  priceNum: 9.09,  original: '', emoji: '❄️', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-icequeen.webp',           game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-the-world',            name: 'The World',            price: '$9.74',  priceNum: 9.74,  original: '', emoji: '🌍', img: 'https://www.sailorpiecewiki.com/images/hero/melee-theworld.webp',            game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-cosmic-being',         name: 'Cosmic Being',         price: '$9.74',  priceNum: 9.74,  original: '', emoji: '🌌', img: 'https://www.sailorpiecewiki.com/images/hero/melee-cosmicbeing.webp',         game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-great-mage',           name: 'Great Mage',           price: '$9.74',  priceNum: 9.74,  original: '', emoji: '🔮', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-greatmage.webp',          game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-dragon-goddess',       name: 'Dragon Goddess',       price: '$9.74',  priceNum: 9.74,  original: '', emoji: '🐉', img: 'https://www.sailorpiecewiki.com/images/hero/weapon-dragongoddess.webp',     game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-anti-magic',           name: 'Anti Magic',           price: '$9.74',  priceNum: 9.74,  original: '', emoji: '🚫', img: 'https://www.sailorpiecewiki.com/images/hero/antimagic.webp',                 game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-spirit-warrior',       name: 'Spirit Warrior',       price: '$10.39', priceNum: 10.39, original: '', emoji: '👻', img: 'https://www.sailorpiecewiki.com/images/hero/spiritwarrior.webp',             game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-sun-incarnate',        name: 'Sun Incarnate',        price: '$10.39', priceNum: 10.39, original: '', emoji: '☀️', img: 'https://www.sailorpiecewiki.com/images/hero/sungod.webp',                    game: 'Sailor Piece', category: 'products' },
  { id: 'gpo-dual-wielder',         name: 'Dual Wielder',         price: '$10.39', priceNum: 10.39, original: '', emoji: '⚔️', img: 'https://www.sailorpiecewiki.com/images/hero/dualwielder.webp',               game: 'Sailor Piece', category: 'products' },
  // === Sailor Piece — Materials ===
  { id: 'gpo-bloodline-stone-10',   name: '10x Bloodline Stone',  price: '$0.32',  priceNum: 0.32,  original: '', emoji: '🪨', img: 'img/gpo/bloodline.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-bloodline-stone-50',   name: '50x Bloodline Stone',  price: '$1.49',  priceNum: 1.49,  original: '', emoji: '🪨', img: 'img/gpo/bloodline.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-bloodline-stone-250',  name: '250x Bloodline Stone', price: '$6.49',  priceNum: 6.49,  original: '', emoji: '🪨', img: 'img/gpo/bloodline.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-bloodline-stone-1000', name: '1000x Bloodline Stone',price: '$22.74', priceNum: 22.74, original: '', emoji: '🪨', img: 'img/gpo/bloodline.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-cosmetic-crate-10',    name: '10x Cosmetic Crate',   price: '$4.54',  priceNum: 4.54,  original: '', emoji: '🎁', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-cosmetic-crate-25',    name: '25x Cosmetic Crate',   price: '$10.39', priceNum: 10.39, original: '', emoji: '🎁', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-cosmetic-crate-50',    name: '50x Cosmetic Crate',   price: '$19.49', priceNum: 19.49, original: '', emoji: '🎁', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-cosmetic-crate-100',   name: '100x Cosmetic Crate',  price: '$35.09', priceNum: 35.09, original: '', emoji: '🎁', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-passive-shard-10',     name: '10x Passive Shard',    price: '$0.32',  priceNum: 0.32,  original: '', emoji: '🔷', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-passive-shard-50',     name: '50x Passive Shard',    price: '$1.49',  priceNum: 1.49,  original: '', emoji: '🔷', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-passive-shard-250',    name: '250x Passive Shard',   price: '$6.49',  priceNum: 6.49,  original: '', emoji: '🔷', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-passive-shard-1000',   name: '1000x Passive Shard',  price: '$22.74', priceNum: 22.74, original: '', emoji: '🔷', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-clan-reroll-10',       name: '10x Clan Reroll',      price: '$0.32',  priceNum: 0.32,  original: '', emoji: '🔄', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-clan-reroll-50',       name: '50x Clan Reroll',      price: '$1.49',  priceNum: 1.49,  original: '', emoji: '🔄', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-clan-reroll-250',      name: '250x Clan Reroll',     price: '$6.49',  priceNum: 6.49,  original: '', emoji: '🔄', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-clan-reroll-1000',     name: '1000x Clan Reroll',    price: '$22.74', priceNum: 22.74, original: '', emoji: '🔄', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-race-reroll-10',       name: '10x Race Reroll',      price: '$0.64',  priceNum: 0.64,  original: '', emoji: '🎲', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-race-reroll-25',       name: '25x Race Reroll',      price: '$1.55',  priceNum: 1.55,  original: '', emoji: '🎲', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-race-reroll-50',       name: '50x Race Reroll',      price: '$2.92',  priceNum: 2.92,  original: '', emoji: '🎲', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-race-reroll-100',      name: '100x Race Reroll',     price: '$4.87',  priceNum: 4.87,  original: '', emoji: '🎲', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-aura-crate-10',        name: '10x Aura Crate',       price: '$3.89',  priceNum: 3.89,  original: '', emoji: '✨', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-aura-crate-25',        name: '25x Aura Crate',       price: '$9.09',  priceNum: 9.09,  original: '', emoji: '✨', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-aura-crate-50',        name: '50x Aura Crate',       price: '$16.89', priceNum: 16.89, original: '', emoji: '✨', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-aura-crate-100',       name: '100x Aura Crate',      price: '$31.19', priceNum: 31.19, original: '', emoji: '✨', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-trait-reroll-10',      name: '10x Trait Reroll',     price: '$0.64',  priceNum: 0.64,  original: '', emoji: '🎰', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-trait-reroll-25',      name: '25x Trait Reroll',     price: '$1.55',  priceNum: 1.55,  original: '', emoji: '🎰', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-trait-reroll-50',      name: '50x Trait Reroll',     price: '$2.92',  priceNum: 2.92,  original: '', emoji: '🎰', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-trait-reroll-100',     name: '100x Trait Reroll',    price: '$4.87',  priceNum: 4.87,  original: '', emoji: '🎰', img: 'img/gpo/material.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-haki-reroll-10',       name: '10x Haki Color Reroll',  price: '$0.38',  priceNum: 0.38,  original: '', emoji: '🎨', img: 'img/gpo/haki.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-haki-reroll-25',       name: '25x Haki Color Reroll',  price: '$0.88',  priceNum: 0.88,  original: '', emoji: '🎨', img: 'img/gpo/haki.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-haki-reroll-50',       name: '50x Haki Color Reroll',  price: '$1.62',  priceNum: 1.62,  original: '', emoji: '🎨', img: 'img/gpo/haki.jpg', game: 'Sailor Piece', category: 'materials' },
  { id: 'gpo-haki-reroll-100',      name: '100x Haki Color Reroll', price: '$2.92',  priceNum: 2.92,  original: '', emoji: '🎨', img: 'img/gpo/haki.jpg', game: 'Sailor Piece', category: 'materials' },
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
  if (item.game.includes('Sailor Piece') || item.game.includes('Grand Piece')) return 'gpo';
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
