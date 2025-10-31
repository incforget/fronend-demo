// i18n configuration
// Wait for react-i18next to load
if (typeof ReactI18next === 'undefined') {
    console.error('ReactI18next is not loaded. Make sure the CDN script is included.');
} else {
    // Translation resources
    const resources = {
  en: {
    translation: {
      // Common
      "language": "Language",
      "english": "English",
      "bangla": "Bangla",
      "switch_to_bangla": "Switch to Bangla",
      "switch_to_english": "Switch to English",

      // Header
      "menu": "Menu",
      "home": "Home",
      "favorites": "Favorites",
      "cart": "Cart",
      "profile": "Profile",
      "back": "Back",

      // Menu items
      "add_to_cart": "Add to Cart",
      "customize": "Customize",
      "vegetarian": "Vegetarian",
      "spicy": "Spicy",
      "popular": "Popular",

      // Cart
      "your_cart": "Your Cart",
      "empty_cart": "Your cart is empty",
      "subtotal": "Subtotal",
      "tax": "Tax",
      "service_charge": "Service Charge",
      "delivery_fee": "Delivery Fee",
      "discount": "Discount",
      "total": "Total",
      "checkout": "Checkout",
      "clear_cart": "Clear Cart",

      // Checkout
      "order_type": "Order Type",
      "dine_in": "Dine In",
      "takeaway": "Takeaway",
      "delivery": "Delivery",
      "customer_info": "Customer Information",
      "name": "Name",
      "phone": "Phone",
      "email": "Email",
      "address": "Address",
      "special_instructions": "Special Instructions",
      "payment_method": "Payment Method",
      "cash": "Cash",
      "card": "Card",
      "place_order": "Place Order",

      // Order tracking
      "order_status": "Order Status",
      "order_placed": "Order Placed",
      "preparing": "Preparing",
      "ready": "Ready",
      "delivered": "Delivered",

      // Profile
      "personal_info": "Personal Information",
      "order_history": "Order History",
      "total_spent": "Total Spent",
      "avg_order": "Avg Order",

      // Promos
      "promo_code": "Promo Code",
      "apply": "Apply",
      "invalid_code": "Invalid promo code",
      "code_applied": "Promo code applied",

      // Messages
      "order_success": "Order placed successfully!",
      "order_failed": "Failed to place order",
      "network_error": "Network error. Please try again."
    }
  },
  bn: {
    translation: {
      // Common
      "language": "ভাষা",
      "english": "ইংরেজি",
      "bangla": "বাংলা",
      "switch_to_bangla": "বাংলায় পরিবর্তন করুন",
      "switch_to_english": "ইংরেজিতে পরিবর্তন করুন",

      // Header
      "menu": "মেনু",
      "home": "হোম",
      "favorites": "প্রিয়",
      "cart": "কার্ট",
      "profile": "প্রোফাইল",
      "back": "পিছনে",

      // Menu items
      "add_to_cart": "কার্টে যোগ করুন",
      "customize": "কাস্টমাইজ",
      "vegetarian": "নিরামিষ",
      "spicy": "ঝাল",
      "popular": "জনপ্রিয়",

      // Cart
      "your_cart": "আপনার কার্ট",
      "empty_cart": "আপনার কার্ট খালি",
      "subtotal": "সাবটোটাল",
      "tax": "ট্যাক্স",
      "service_charge": "সার্ভিস চার্জ",
      "delivery_fee": "ডেলিভারি ফি",
      "discount": "ডিসকাউন্ট",
      "total": "মোট",
      "checkout": "চেকআউট",
      "clear_cart": "কার্ট খালি করুন",

      // Checkout
      "order_type": "অর্ডার টাইপ",
      "dine_in": "ডাইন ইন",
      "takeaway": "টেকওয়ে",
      "delivery": "ডেলিভারি",
      "customer_info": "কাস্টমার তথ্য",
      "name": "নাম",
      "phone": "ফোন",
      "email": "ইমেইল",
      "address": "ঠিকানা",
      "special_instructions": "বিশেষ নির্দেশনা",
      "payment_method": "পেমেন্ট মেথড",
      "cash": "ক্যাশ",
      "card": "কার্ড",
      "place_order": "অর্ডার করুন",

      // Order tracking
      "order_status": "অর্ডার স্ট্যাটাস",
      "order_placed": "অর্ডার করা হয়েছে",
      "preparing": "প্রস্তুত করা হচ্ছে",
      "ready": "রেডি",
      "delivered": "ডেলিভার করা হয়েছে",

      // Profile
      "personal_info": "ব্যক্তিগত তথ্য",
      "order_history": "অর্ডার হিস্টোরি",
      "total_spent": "মোট খরচ",
      "avg_order": "গড় অর্ডার",

      // Promos
      "promo_code": "প্রমো কোড",
      "apply": "এপ্লাই",
      "invalid_code": "অবৈধ প্রমো কোড",
      "code_applied": "প্রমো কোড এপ্লাই করা হয়েছে",

      // Messages
      "order_success": "অর্ডার সফলভাবে করা হয়েছে!",
      "order_failed": "অর্ডার করতে ব্যর্থ",
      "network_error": "নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।"
    }
  }
};

i18next
  .use(ReactI18next.initReactI18next)
  .init({
    resources,
    lng: BD_CONTEXT.language || 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });
}