// ==================== CONSTANTS ====================

// FontAwesome icons mapping (simplified for demo)
const icons = {
    // Navigation & UI
    home: 'fa-home',
    user: 'fa-user',
    search: 'fa-search',
    filter: 'fa-filter',
    bars: 'fa-bars',
    cog: 'fa-cog',
    signOutAlt: 'fa-sign-out-alt',
    history: 'fa-history',
    edit: 'fa-edit',
    trash: 'fa-trash',
    share: 'fa-share',
    print: 'fa-print',
    download: 'fa-download',
    upload: 'fa-upload',
    sync: 'fa-sync',
    spinner: 'fa-spinner fa-spin',
    lock: 'fa-lock',
    shield: 'fa-shield-alt',
    bell: 'fa-bell',
    envelope: 'fa-envelope',
    qrcode: 'fa-qrcode',
    
    // Actions
    plus: 'fa-plus',
    minus: 'fa-minus',
    check: 'fa-check',
    times: 'fa-times',
    star: 'fa-star',
    heart: 'fa-heart',
    
    // Arrows & Navigation
    arrowLeft: 'fa-arrow-left',
    arrowRight: 'fa-arrow-right',
    chevronDown: 'fa-chevron-down',
    chevronUp: 'fa-chevron-up',
    
    // Food & Restaurant
    utensils: 'fa-utensils',
    shoppingCart: 'fa-shopping-cart',
    shoppingBag: 'fa-shopping-bag',
    fire: 'fa-fire',
    leaf: 'fa-leaf',
    seedling: 'fa-seedling',
    
    // Location & Transport
    mapMarkerAlt: 'fa-map-marker-alt',
    map: 'fa-map',
    truck: 'fa-truck',
    motorcycle: 'fa-motorcycle',
    table: 'fa-table',
    store: 'fa-store',
    
    // Communication
    phone: 'fa-phone',
    clock: 'fa-clock',
    
    // Business & Finance
    receipt: 'fa-receipt',
    tag: 'fa-tag',
    creditCard: 'fa-credit-card',
    moneyBillWave: 'fa-money-bill-wave',
    percentage: 'fa-percentage',
    box: 'fa-box',
    
    // Status & Alerts
    infoCircle: 'fa-info-circle',
    exclamationTriangle: 'fa-exclamation-triangle',
    
    // Additional useful icons
    calendar: 'fa-calendar',
    camera: 'fa-camera',
    cartPlus: 'fa-cart-plus',
    checkCircle: 'fa-check-circle',
    checkDouble: 'fa-check-double',
    clipboard: 'fa-clipboard',
    clipboardCheck: 'fa-clipboard-check',
    comment: 'fa-comment',
    comments: 'fa-comments',
    eye: 'fa-eye',
    eyeSlash: 'fa-eye-slash',
    gift: 'fa-gift',
    globe: 'fa-globe',
    handHoldingHeart: 'fa-hand-holding-heart',
    hashtag: 'fa-hashtag',
    image: 'fa-image',
    images: 'fa-images',
    inbox: 'fa-inbox',
    locationArrow: 'fa-location-arrow',
    paperPlane: 'fa-paper-plane',
    save: 'fa-save',
    thumbsUp: 'fa-thumbs-up',
    thumbsDown: 'fa-thumbs-down',
    trophy: 'fa-trophy',
    userCheck: 'fa-user-check',
    userPlus: 'fa-user-plus',
    users: 'fa-users',
    wifi: 'fa-wifi',
    clipboardList: 'fa-clipboard-list',
    ticket: 'fa-ticket-alt',
    chevronRight: 'fa-chevron-right',
    mapMarker: 'fa-map-marker-alt',
    facebook: 'fa-facebook-f',
    instagram: 'fa-instagram',
    twitter: 'fa-twitter',
    youtube: 'fa-youtube'
};

// Bangladesh context
const BD_CONTEXT = {
    currency: 'BDT',
    currencySymbol: '৳',
    language: 'en', // 'en' or 'bn'
    taxRate: 0.05, // 5% tax
    serviceChargeRate: 0.1, // 10% service charge
    deliveryFee: 50, // Fixed delivery fee in BDT
    minOrderAmount: 200, // Minimum order amount in BDT
    promoCodes: {
        'BDT50OFF': { type: 'fixed', value: 50, minOrder: 300, description: 'Get ৳50 off on orders above ৳300' },
        'FREESHIP': { type: 'shipping', value: 0, minOrder: 500, description: 'Free shipping on orders above ৳500' },
        '10PERCENT': { type: 'percentage', value: 0.1, minOrder: 400, description: 'Get 10% off on orders above ৳400' }
    }
};