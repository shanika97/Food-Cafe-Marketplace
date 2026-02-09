export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
};

export type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  cafeName: string;
  tags: string[];
  isPopular: boolean;
  isOnSale: boolean;
  salePrice?: number;
  nutritionInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
};

export type Review = {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
};

export type PromoBanner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
};

export const categories: Category[] = [
{
  id: 'beverages',
  name: 'Beverages',
  description: 'Refreshing drinks from coffee to smoothies',
  image:
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
  itemCount: 8
},
{
  id: 'pastries',
  name: 'Pastries',
  description: 'Freshly baked croissants, muffins & more',
  image:
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
  itemCount: 6
},
{
  id: 'meals',
  name: 'Meals',
  description: 'Hearty burgers, pasta, and salads',
  image:
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  itemCount: 7
},
{
  id: 'snacks',
  name: 'Snacks',
  description: 'Quick bites like fries and nachos',
  image:
  'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80',
  itemCount: 5
},
{
  id: 'desserts',
  name: 'Desserts',
  description: 'Sweet treats and indulgent cakes',
  image:
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80',
  itemCount: 6
},
{
  id: 'breakfast',
  name: 'Breakfast',
  description: 'Start your day with pancakes & eggs',
  image:
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
  itemCount: 5
}];


export const foodItems: FoodItem[] = [
// Beverages
{
  id: 'bev-1',
  name: 'Caramel Macchiato',
  description:
  'Espresso with vanilla syrup, milk, and caramel drizzle. A perfect balance of sweet and bold.',
  price: 5.99,
  image:
  'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=80',
  categoryId: 'beverages',
  rating: 4.8,
  reviewCount: 234,
  cafeName: 'Bean & Brew',
  tags: ['Hot', 'Coffee', 'Sweet'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 250, protein: '10g', carbs: '34g', fat: '7g' }
},
{
  id: 'bev-2',
  name: 'Iced Matcha Latte',
  description:
  'Premium Japanese matcha whisked with oat milk over ice. Earthy and refreshing.',
  price: 6.49,
  image:
  'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80',
  categoryId: 'beverages',
  rating: 4.6,
  reviewCount: 189,
  cafeName: 'Green Leaf Cafe',
  tags: ['Cold', 'Tea', 'Healthy'],
  isPopular: true,
  isOnSale: true,
  salePrice: 4.99,
  nutritionInfo: { calories: 180, protein: '6g', carbs: '24g', fat: '5g' }
},
{
  id: 'bev-3',
  name: 'Mango Tango Smoothie',
  description:
  'Fresh mango, banana, and coconut milk blended to tropical perfection.',
  price: 7.99,
  image:
  'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80',
  categoryId: 'beverages',
  rating: 4.9,
  reviewCount: 312,
  cafeName: 'Tropical Blends',
  tags: ['Cold', 'Smoothie', 'Vegan'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 320, protein: '4g', carbs: '58g', fat: '8g' }
},
{
  id: 'bev-4',
  name: 'Classic Cold Brew',
  description: 'Slow-steeped for 20 hours. Smooth, bold, and never bitter.',
  price: 4.49,
  image:
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
  categoryId: 'beverages',
  rating: 4.7,
  reviewCount: 456,
  cafeName: 'Bean & Brew',
  tags: ['Cold', 'Coffee', 'Strong'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 5, protein: '0g', carbs: '0g', fat: '0g' }
},
{
  id: 'bev-5',
  name: 'Berry Blast Smoothie',
  description:
  'Mixed berries, Greek yogurt, and honey for a protein-packed treat.',
  price: 8.49,
  image:
  'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80',
  categoryId: 'beverages',
  rating: 4.5,
  reviewCount: 178,
  cafeName: 'Tropical Blends',
  tags: ['Cold', 'Smoothie', 'Protein'],
  isPopular: false,
  isOnSale: true,
  salePrice: 6.99,
  nutritionInfo: { calories: 290, protein: '12g', carbs: '42g', fat: '6g' }
},
// Pastries
{
  id: 'pas-1',
  name: 'Butter Croissant',
  description:
  'Flaky, golden layers of pure French butter. Baked fresh every morning.',
  price: 3.99,
  image:
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
  categoryId: 'pastries',
  rating: 4.9,
  reviewCount: 567,
  cafeName: 'Paris Bakehouse',
  tags: ['Baked', 'Breakfast', 'Classic'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 340, protein: '6g', carbs: '38g', fat: '18g' }
},
{
  id: 'pas-2',
  name: 'Blueberry Muffin',
  description:
  'Bursting with fresh blueberries and topped with crunchy streusel.',
  price: 4.49,
  image:
  'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80',
  categoryId: 'pastries',
  rating: 4.6,
  reviewCount: 234,
  cafeName: 'Sweet Crumbs',
  tags: ['Baked', 'Fruit', 'Sweet'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 380, protein: '5g', carbs: '52g', fat: '16g' }
},
{
  id: 'pas-3',
  name: 'Chocolate Croissant',
  description: 'Buttery croissant filled with rich dark chocolate batons.',
  price: 4.99,
  image:
  'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80',
  categoryId: 'pastries',
  rating: 4.8,
  reviewCount: 445,
  cafeName: 'Paris Bakehouse',
  tags: ['Baked', 'Chocolate', 'Indulgent'],
  isPopular: true,
  isOnSale: true,
  salePrice: 3.99,
  nutritionInfo: { calories: 420, protein: '7g', carbs: '45g', fat: '24g' }
},
{
  id: 'pas-4',
  name: 'Cinnamon Roll',
  description:
  'Soft, gooey swirl of cinnamon sugar with cream cheese frosting.',
  price: 5.49,
  image:
  'https://images.unsplash.com/photo-1609127102567-8a9a21dc27d8?w=800&q=80',
  categoryId: 'pastries',
  rating: 4.7,
  reviewCount: 389,
  cafeName: 'Sweet Crumbs',
  tags: ['Baked', 'Sweet', 'Comfort'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 480, protein: '6g', carbs: '68g', fat: '20g' }
},
// Meals
{
  id: 'meal-1',
  name: 'Classic Smash Burger',
  description:
  'Double smashed patties, American cheese, pickles, and special sauce on a brioche bun.',
  price: 14.99,
  image:
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  categoryId: 'meals',
  rating: 4.9,
  reviewCount: 892,
  cafeName: 'Burger Joint',
  tags: ['Beef', 'American', 'Hearty'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 780, protein: '42g', carbs: '48g', fat: '45g' }
},
{
  id: 'meal-2',
  name: 'Truffle Mushroom Pasta',
  description:
  'Creamy fettuccine with wild mushrooms, parmesan, and truffle oil.',
  price: 18.99,
  image:
  'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
  categoryId: 'meals',
  rating: 4.7,
  reviewCount: 345,
  cafeName: 'Pasta Palace',
  tags: ['Italian', 'Vegetarian', 'Gourmet'],
  isPopular: true,
  isOnSale: true,
  salePrice: 15.99,
  nutritionInfo: { calories: 680, protein: '18g', carbs: '72g', fat: '34g' }
},
{
  id: 'meal-3',
  name: 'Mediterranean Salad',
  description:
  'Crisp romaine, feta, olives, cucumber, tomatoes with lemon herb dressing.',
  price: 12.99,
  image:
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
  categoryId: 'meals',
  rating: 4.5,
  reviewCount: 267,
  cafeName: 'Green Garden',
  tags: ['Healthy', 'Vegetarian', 'Fresh'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 380, protein: '12g', carbs: '28g', fat: '24g' }
},
{
  id: 'meal-4',
  name: 'Spicy Chicken Sandwich',
  description:
  'Crispy fried chicken, spicy mayo, pickles, and coleslaw on a toasted bun.',
  price: 13.99,
  image:
  'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&q=80',
  categoryId: 'meals',
  rating: 4.8,
  reviewCount: 534,
  cafeName: 'Cluck & Co',
  tags: ['Chicken', 'Spicy', 'Crispy'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 720, protein: '38g', carbs: '52g', fat: '38g' }
},
{
  id: 'meal-5',
  name: 'Grilled Salmon Bowl',
  description:
  'Herb-crusted salmon over quinoa with roasted vegetables and tahini drizzle.',
  price: 19.99,
  image:
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
  categoryId: 'meals',
  rating: 4.6,
  reviewCount: 198,
  cafeName: 'Ocean Fresh',
  tags: ['Seafood', 'Healthy', 'Protein'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 520, protein: '42g', carbs: '38g', fat: '22g' }
},
// Snacks
{
  id: 'snk-1',
  name: 'Loaded Cheese Fries',
  description:
  'Crispy fries smothered in cheddar, bacon bits, and sour cream.',
  price: 8.99,
  image:
  'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&q=80',
  categoryId: 'snacks',
  rating: 4.7,
  reviewCount: 423,
  cafeName: 'Fry Factory',
  tags: ['Cheesy', 'Comfort', 'Shareable'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 680, protein: '18g', carbs: '58g', fat: '42g' }
},
{
  id: 'snk-2',
  name: 'Supreme Nachos',
  description:
  'Tortilla chips loaded with beef, jalapeños, cheese, guac, and salsa.',
  price: 11.99,
  image:
  'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80',
  categoryId: 'snacks',
  rating: 4.8,
  reviewCount: 567,
  cafeName: 'Nacho Libre',
  tags: ['Mexican', 'Spicy', 'Shareable'],
  isPopular: true,
  isOnSale: true,
  salePrice: 9.99,
  nutritionInfo: { calories: 890, protein: '28g', carbs: '72g', fat: '52g' }
},
{
  id: 'snk-3',
  name: 'Mozzarella Sticks',
  description: 'Golden fried mozzarella with marinara dipping sauce.',
  price: 7.99,
  image:
  'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800&q=80',
  categoryId: 'snacks',
  rating: 4.5,
  reviewCount: 289,
  cafeName: 'Fry Factory',
  tags: ['Cheesy', 'Fried', 'Classic'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 520, protein: '22g', carbs: '38g', fat: '32g' }
},
{
  id: 'snk-4',
  name: 'Chicken Wings',
  description:
  'Crispy wings tossed in your choice of buffalo, BBQ, or honey garlic.',
  price: 12.99,
  image:
  'https://images.unsplash.com/photo-1608039829572-9b0e1347a7a5?w=800&q=80',
  categoryId: 'snacks',
  rating: 4.9,
  reviewCount: 712,
  cafeName: 'Wing Stop',
  tags: ['Chicken', 'Spicy', 'Crispy'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 640, protein: '48g', carbs: '12g', fat: '44g' }
},
// Desserts
{
  id: 'des-1',
  name: 'New York Cheesecake',
  description:
  'Rich, creamy cheesecake with graham cracker crust and berry compote.',
  price: 8.99,
  image:
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
  categoryId: 'desserts',
  rating: 4.9,
  reviewCount: 678,
  cafeName: 'Sweet Tooth',
  tags: ['Cake', 'Creamy', 'Classic'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 480, protein: '8g', carbs: '42g', fat: '32g' }
},
{
  id: 'des-2',
  name: 'Chocolate Lava Cake',
  description:
  'Warm chocolate cake with molten center, served with vanilla ice cream.',
  price: 9.99,
  image:
  'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80',
  categoryId: 'desserts',
  rating: 4.8,
  reviewCount: 534,
  cafeName: 'Cocoa Dreams',
  tags: ['Chocolate', 'Warm', 'Indulgent'],
  isPopular: true,
  isOnSale: true,
  salePrice: 7.99,
  nutritionInfo: { calories: 580, protein: '8g', carbs: '62g', fat: '34g' }
},
{
  id: 'des-3',
  name: 'Tiramisu',
  description: 'Layers of espresso-soaked ladyfingers and mascarpone cream.',
  price: 8.49,
  image:
  'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
  categoryId: 'desserts',
  rating: 4.7,
  reviewCount: 389,
  cafeName: 'Pasta Palace',
  tags: ['Italian', 'Coffee', 'Creamy'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 420, protein: '6g', carbs: '48g', fat: '22g' }
},
{
  id: 'des-4',
  name: 'Salted Caramel Gelato',
  description: 'Artisan Italian gelato with swirls of salted caramel.',
  price: 6.99,
  image:
  'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&q=80',
  categoryId: 'desserts',
  rating: 4.6,
  reviewCount: 267,
  cafeName: 'Gelato Bar',
  tags: ['Ice Cream', 'Sweet', 'Cold'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 320, protein: '4g', carbs: '38g', fat: '18g' }
},
{
  id: 'des-5',
  name: 'Apple Pie à la Mode',
  description:
  'Warm cinnamon apple pie with a scoop of vanilla bean ice cream.',
  price: 7.99,
  image:
  'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80',
  categoryId: 'desserts',
  rating: 4.8,
  reviewCount: 445,
  cafeName: 'Sweet Tooth',
  tags: ['Pie', 'Warm', 'Classic'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 520, protein: '5g', carbs: '68g', fat: '26g' }
},
// Breakfast
{
  id: 'brk-1',
  name: 'Fluffy Pancake Stack',
  description:
  'Three buttermilk pancakes with maple syrup, butter, and fresh berries.',
  price: 11.99,
  image:
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
  categoryId: 'breakfast',
  rating: 4.8,
  reviewCount: 567,
  cafeName: 'Morning Glory',
  tags: ['Sweet', 'Classic', 'Filling'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 680, protein: '12g', carbs: '98g', fat: '28g' }
},
{
  id: 'brk-2',
  name: 'Eggs Benedict',
  description:
  'Poached eggs, Canadian bacon, hollandaise on a toasted English muffin.',
  price: 14.99,
  image:
  'https://images.unsplash.com/photo-1608039829572-9b0e1347a7a5?w=800&q=80',
  categoryId: 'breakfast',
  rating: 4.7,
  reviewCount: 389,
  cafeName: 'Brunch Club',
  tags: ['Eggs', 'Classic', 'Savory'],
  isPopular: true,
  isOnSale: true,
  salePrice: 12.99,
  nutritionInfo: { calories: 580, protein: '28g', carbs: '32g', fat: '38g' }
},
{
  id: 'brk-3',
  name: 'Avocado Toast',
  description:
  'Smashed avocado on sourdough with poached eggs, chili flakes, and microgreens.',
  price: 13.99,
  image:
  'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80',
  categoryId: 'breakfast',
  rating: 4.6,
  reviewCount: 456,
  cafeName: 'Green Garden',
  tags: ['Healthy', 'Trendy', 'Vegetarian'],
  isPopular: true,
  isOnSale: false,
  nutritionInfo: { calories: 420, protein: '18g', carbs: '38g', fat: '24g' }
},
{
  id: 'brk-4',
  name: 'French Toast',
  description:
  'Thick brioche slices dipped in vanilla custard, griddled golden.',
  price: 12.99,
  image:
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
  categoryId: 'breakfast',
  rating: 4.8,
  reviewCount: 334,
  cafeName: 'Morning Glory',
  tags: ['Sweet', 'Indulgent', 'Classic'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 620, protein: '14g', carbs: '78g', fat: '28g' }
},
{
  id: 'brk-5',
  name: 'Full English Breakfast',
  description: 'Eggs, bacon, sausage, beans, mushrooms, tomatoes, and toast.',
  price: 16.99,
  image:
  'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
  categoryId: 'breakfast',
  rating: 4.9,
  reviewCount: 289,
  cafeName: 'Brunch Club',
  tags: ['Hearty', 'Savory', 'Traditional'],
  isPopular: false,
  isOnSale: false,
  nutritionInfo: { calories: 980, protein: '48g', carbs: '58g', fat: '62g' }
}];


export const reviews: Review[] = [
{
  id: 'rev-1',
  productId: 'meal-1',
  userName: 'Sarah M.',
  userAvatar:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  rating: 5,
  comment:
  "Best burger I've ever had! The patties are perfectly seasoned and the special sauce is incredible.",
  date: '2024-01-15',
  helpful: 24
},
{
  id: 'rev-2',
  productId: 'meal-1',
  userName: 'Mike R.',
  userAvatar:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  rating: 5,
  comment:
  'Juicy, flavorful, and the brioche bun is so soft. Will definitely order again!',
  date: '2024-01-12',
  helpful: 18
},
{
  id: 'rev-3',
  productId: 'bev-1',
  userName: 'Emily K.',
  userAvatar:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  rating: 5,
  comment: 'Perfect caramel to espresso ratio. My go-to morning drink!',
  date: '2024-01-10',
  helpful: 32
},
{
  id: 'rev-4',
  productId: 'des-1',
  userName: 'James L.',
  userAvatar:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  rating: 4,
  comment: 'Creamy and delicious. The berry compote adds a nice tartness.',
  date: '2024-01-08',
  helpful: 15
},
{
  id: 'rev-5',
  productId: 'pas-1',
  userName: 'Lisa T.',
  userAvatar:
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  rating: 5,
  comment: "Flaky, buttery perfection. Tastes like I'm in Paris!",
  date: '2024-01-05',
  helpful: 28
}];


export const promoBanners: PromoBanner[] = [
{
  id: 'promo-1',
  title: '20% Off Your First Order',
  subtitle: 'Use code WELCOME20 at checkout',
  image:
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
  ctaText: 'Order Now',
  ctaLink: '/category/meals',
  bgColor: 'from-orange-500 to-amber-500'
},
{
  id: 'promo-2',
  title: 'Free Delivery This Weekend',
  subtitle: 'On orders over $25',
  image:
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80',
  ctaText: 'Shop Now',
  ctaLink: '/category/meals',
  bgColor: 'from-emerald-500 to-teal-500'
}];


export const getItemsByCategory = (categoryId: string): FoodItem[] => {
  return foodItems.filter((item) => item.categoryId === categoryId);
};

export const getPopularItems = (): FoodItem[] => {
  return foodItems.filter((item) => item.isPopular);
};

export const getTopRatedItems = (limit: number = 6): FoodItem[] => {
  return [...foodItems].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

export const getSaleItems = (): FoodItem[] => {
  return foodItems.filter((item) => item.isOnSale);
};

export const getItemById = (id: string): FoodItem | undefined => {
  return foodItems.find((item) => item.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter((review) => review.productId === productId);
};

export const searchItems = (query: string): FoodItem[] => {
  const lowerQuery = query.toLowerCase();
  return foodItems.filter(
    (item) =>
    item.name.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.cafeName.toLowerCase().includes(lowerQuery) ||
    item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};