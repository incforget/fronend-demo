// Simple i18n implementation without react-i18next
const translations = {
  en: {
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
    "network_error": "Network error. Please try again.",

    // Home page
    "explore_our_menu": "Explore Our Menu",
    "discover_authentic_cuisine": "Discover authentic Bangladeshi cuisine with our innovative QR menu system.",
    "order_in_seconds": "Order in seconds with our digital menu system",
    "smart_qr_menu": "Smart QR Menu",
    "bangladesh_restaurant": "Bangladesh Restaurant",
    "experience_authentic_cuisine": "Experience authentic Bangladeshi cuisine with our innovative QR menu system.",
    "our_menu": "Our Menu",

    // Navigation
    "view_menu": "View Menu",
    "browse_menu": "Browse Menu",
    "add_delicious_items": "Add some delicious items from our menu to get started with your order",

    // Footer
    "all_rights_reserved": "All rights reserved.",
    "privacy_policy": "Privacy Policy",
    "terms_of_service": "Terms of Service",
    "faq": "FAQ",
    "contact": "Contact",
    "contact_us": "Contact Us",
    "contact_info": "Contact Info",
    "contact_support": "Contact Support",

    // Forms
    "contact_number": "Contact Number",
    "enter_contact_number": "Enter your contact number",

    // Menu component
    "search_for_dishes": "Search for dishes",
    "search_for_delicious_dishes": "Search for delicious dishes...",
    "search_help": "Search through menu items by name or description",
    "clear_search": "Clear search",
    "menu_categories": "Menu categories",
    "most_popular": "Most Popular",
    "price_low_high": "Price: Low to High",
    "price_high_low": "Price: High to Low",
    "newest_first": "Newest First",
    "filters": "Filters",
    "dietary_preferences": "Dietary Preferences",
    "contains_nuts": "Contains Nuts",
    "no_dishes_found": "No dishes found",
    "try_adjusting_filters": "Try adjusting your search or filters to find more options.",
    "no_menu_items": "This restaurant hasn't added any menu items yet.",
    "clear_all_filters": "Clear all filters",
    "all_dishes": "All Dishes",
    "menu_items": "Menu items",
    "open_cart": "Open cart",
    "items_in_cart": "items in cart",

    // MenuItem component
    "new": "New",
    "remove_from_favorites": "Remove from favorites",
    "add_to_favorites": "Add to favorites",
    "view_details": "View details",
    "details": "Details",
    "add": "Add",

    // Branch info
    "open_until": "Open until",
    "reviews": "reviews",

    // Defaults
    "delicious_dish_from_menu": "Delicious dish from our menu"
  },
  bn: {
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
    "network_error": "নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।",

    // Home page
    "explore_our_menu": "আমাদের মেনু অন্বেষণ করুন",
    "discover_authentic_cuisine": "আমাদের উদ্ভাবনী QR মেনু সিস্টেমের মাধ্যমে প্রকৃত বাংলাদেশী রন্ধনশৈলী আবিষ্কার করুন।",
    "order_in_seconds": "আমাদের ডিজিটাল মেনু সিস্টেমের মাধ্যমে সেকেন্ডে অর্ডার করুন",
    "smart_qr_menu": "স্মার্ট QR মেনু",
    "bangladesh_restaurant": "বাংলাদেশ রেস্টুরেন্ট",
    "experience_authentic_cuisine": "আমাদের উদ্ভাবনী QR মেনু সিস্টেমের মাধ্যমে প্রকৃত বাংলাদেশী রন্ধনশৈলী উপভোগ করুন।",
    "our_menu": "আমাদের মেনু",

    // Navigation
    "view_menu": "মেনু দেখুন",
    "browse_menu": "মেনু ব্রাউজ করুন",
    "add_delicious_items": "আপনার অর্ডার শুরু করতে আমাদের মেনু থেকে কিছু সুস্বাদু আইটেম যোগ করুন",

    // Footer
    "all_rights_reserved": "সমস্ত অধিকার সংরক্ষিত।",
    "privacy_policy": "গোপনীয়তা নীতি",
    "terms_of_service": "সেবা শর্তাবলী",
    "faq": "প্রশ্নোত্তর",
    "contact": "যোগাযোগ",
    "contact_us": "যোগাযোগ করুন",
    "contact_info": "যোগাযোগ তথ্য",
    "contact_support": "সাপোর্টের সাথে যোগাযোগ করুন",

    // Forms
    "contact_number": "যোগাযোগ নম্বর",
    "enter_contact_number": "আপনার যোগাযোগ নম্বর লিখুন",

    // Menu component
    "search_for_dishes": "খাবার খুঁজুন",
    "search_for_delicious_dishes": "সুস্বাদু খাবার খুঁজুন...",
    "search_help": "নাম বা বিবরণ দিয়ে মেনু আইটেম খুঁজুন",
    "clear_search": "খোঁজা পরিষ্কার করুন",
    "menu_categories": "মেনু ক্যাটাগরি",
    "most_popular": "সবচেয়ে জনপ্রিয়",
    "price_low_high": "দাম: কম থেকে বেশি",
    "price_high_low": "দাম: বেশি থেকে কম",
    "newest_first": "নতুন প্রথম",
    "filters": "ফিল্টার",
    "dietary_preferences": "খাদ্য পছন্দ",
    "contains_nuts": "বাদাম আছে",
    "no_dishes_found": "কোন খাবার পাওয়া যায়নি",
    "try_adjusting_filters": "আরও অপশন খুঁজে পেতে আপনার খোঁজা বা ফিল্টার পরিবর্তন করুন।",
    "no_menu_items": "এই রেস্টুরেন্ট এখনও কোন মেনু আইটেম যোগ করেনি।",
    "clear_all_filters": "সমস্ত ফিল্টার পরিষ্কার করুন",
    "all_dishes": "সমস্ত খাবার",
    "menu_items": "মেনু আইটেম",
    "open_cart": "কার্ট খুলুন",
    "items_in_cart": "কার্টে আইটেম",

    // MenuItem component
    "new": "নতুন",
    "remove_from_favorites": "প্রিয় থেকে সরান",
    "add_to_favorites": "প্রিয়তে যোগ করুন",
    "view_details": "বিস্তারিত দেখুন",
    "details": "বিস্তারিত",
    "add": "যোগ করুন",

    // Branch info
    "open_until": "খোলা থাকবে",
    "reviews": "রিভিউ",

    // Defaults
    "delicious_dish_from_menu": "আমাদের মেনু থেকে সুস্বাদু খাবার"
  }
};

// Global language state
let currentLanguage = BD_CONTEXT.language || 'en';
const languageListeners = [];

// Translation function
window.t = function(key) {
  return translations[currentLanguage] && translations[currentLanguage][key] ? translations[currentLanguage][key] : key;
};

// Notify all listeners when language changes
function notifyLanguageChange() {
  languageListeners.forEach(callback => callback(currentLanguage));
}

// Simple hook-like function for React components
window.useTranslation = function() {
  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    const listener = (newLang) => {
      setLanguage(newLang);
    };
    languageListeners.push(listener);
    return () => {
      const index = languageListeners.indexOf(listener);
      if (index > -1) {
        languageListeners.splice(index, 1);
      }
    };
  }, []);

  return {
    t: window.t,
    i18n: {
      language: language,
      changeLanguage: function(lang) {
        currentLanguage = lang;
        BD_CONTEXT.language = lang;
        localStorage.setItem('i18nextLng', lang);
        notifyLanguageChange();
      }
    }
  };
};