// ==================== MAIN APP COMPONENT ====================

// Routing configuration
const ROUTES = {
    home: '/',
    menu: '/menu/:branchName',
    itemDetail: '/menu/:branchName/:itemName',
    checkout: '/checkout',
    'order-tracking': '/order-tracking/:orderNumber',
    profile: '/profile',
    favorites: '/favorites'
};

// Helper function to find order by order number
const findOrderByNumber = (orderNumber) => {
    // Try to find order in localStorage
    const savedOrders = storage.get('orders', []);
    return savedOrders.find(order => order.id === orderNumber) || null;
};

// Helper function to get current path
const getCurrentPath = () => {
    return window.location.pathname || '/';
};

// Helper function to get view and params from path
const getViewFromPath = (path) => {
    // Check for exact matches first
    const routeEntries = Object.entries(ROUTES);
    for (const [view, routePath] of routeEntries) {
        if (routePath === path) {
            return { view, params: {} };
        }
        
        // Check for parameterized routes
        if (routePath.includes(':branchName') && path.startsWith('/menu/')) {
            const menuPath = path.replace('/menu/', '');
            const pathParts = menuPath.split('/');
            
            if (pathParts.length === 1) {
                // /menu/:branchName
                const branchName = pathParts[0];
                if (branchName) {
                    // Get branches to map URL-friendly name back to branch id
                    const branches = storage.get('branches', []);
                    const branch = branches.find(b => {
                        const urlFriendlyName = b.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                        return urlFriendlyName === branchName;
                    });
                    
                    return { 
                        view: 'menu', 
                        params: { 
                            branchName: branchName,
                            branchId: branch ? branch.id : null
                        } 
                    };
                }
            } else if (pathParts.length === 2) {
                // /menu/:branchName/:itemName
                const [branchName, itemName] = pathParts;
                if (branchName && itemName) {
                    // Get branches to map URL-friendly name back to branch id
                    const branches = storage.get('branches', []);
                    const branch = branches.find(b => {
                        const urlFriendlyName = b.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                        return urlFriendlyName === branchName;
                    });
                    
                    return { 
                        view: 'itemDetail', 
                        params: { 
                            branchName: branchName,
                            branchId: branch ? branch.id : null,
                            itemName: itemName
                        } 
                    };
                }
            }
        }
        
        // Check for order-tracking route
        if (routePath.includes(':orderNumber') && path.startsWith('/order-tracking/')) {
            const orderNumber = path.replace('/order-tracking/', '');
            if (orderNumber) {
                return { 
                    view: 'order-tracking', 
                    params: { 
                        orderNumber: orderNumber
                    } 
                };
            }
        }
    }
    
    return { view: 'home', params: {} };
};

// Helper function to build path from view and params
const buildPath = (view, params = {}) => {
    let path = ROUTES[view] || '/';
    
    if (view === 'menu' && params.branchName) {
        path = path.replace(':branchName', params.branchName);
    } else if (view === 'itemDetail' && params.branchName && params.itemName) {
        path = path.replace(':branchName', params.branchName).replace(':itemName', params.itemName);
    } else if (view === 'order-tracking' && params.orderNumber) {
        path = path.replace(':orderNumber', params.orderNumber);
    }
    
    return path;
};

// Helper function to navigate to a view
const navigateTo = (view, replace = false, params = {}) => {
    const path = buildPath(view, params);
    if (replace) {
        window.history.replaceState({ view, params }, '', path);
    } else {
        window.history.pushState({ view, params }, '', path);
    }
};

// Main App Component
const App = () => {
    const { t } = window.useTranslation();
    const [currentView, setCurrentView] = React.useState('home');
    const [currentParams, setCurrentParams] = React.useState({});
    const [selectedBranchId, setSelectedBranchId] = React.useState(null);
    const [cart, setCart] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [showCart, setShowCart] = React.useState(false);
    const [selectedItemName, setSelectedItemName] = React.useState(null);
    const [orderData, setOrderData] = React.useState(null);
    const [placedOrder, setPlacedOrder] = React.useState(null);
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [toastType, setToastType] = React.useState('success');

    // Navigation helper
    const navigateToView = (view, params = {}) => {
        setCurrentView(view);
        setCurrentParams(params);
        navigateTo(view, false, params); // Use pushState for user navigation
        window.scrollTo(0, 0); // Scroll to top on navigation
    };

    // Set view without navigation (for URL changes)
    const setViewWithoutNavigation = (view, params = {}) => {
        setCurrentView(view);
        setCurrentParams(params);
    };

    // Helper function to calculate item price
    const calculateItemPrice = (item) => {
        const basePrice = item.variant ? item.variant.price : (item.price || 0);
        const addonsPrice = (item.addons || []).reduce((total, addon) => total + (addon.price || 0), 0);
        return (basePrice + addonsPrice) * (item.quantity || 1);
    };

    // Load initial state from storage
    React.useEffect(() => {
        const savedCart = storage.get('cart', []);
        // Repair any cart items that might be missing required properties
        const repairedCart = savedCart.map(item => ({
            ...item,
            quantity: item.quantity || 1,
            totalPrice: item.totalPrice || calculateItemPrice(item)
        }));
        setCart(repairedCart);

        const savedFavorites = storage.get('favorites', []);
        // Ensure favorites have required properties for MenuItem component
        const updatedFavorites = savedFavorites.map(fav => ({
            ...fav,
            description: fav.description || t('delicious_dish_from_menu'),
            badges: fav.badges || []
        }));
        setFavorites(updatedFavorites);

        const savedBranchId = storage.get('selectedBranchId');
        if (savedBranchId) {
            setSelectedBranchId(savedBranchId);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    React.useEffect(() => {
        storage.set('cart', cart);
    }, [cart]);

    // Save favorites to localStorage whenever it changes
    React.useEffect(() => {
        storage.set('favorites', favorites);
    }, [favorites]);

    // Handle branch selection
    const handleBranchSelect = (branch) => {
        setSelectedBranchId(branch.id);
        storage.set('selectedBranchId', branch.id);
        // Create URL-friendly branch name
        const urlFriendlyName = branch.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        navigateToView('menu', { branchName: urlFriendlyName });
    };

    // Handle adding item to cart
    const handleAddToCart = (item) => {
        // Ensure item has required properties
        const cartItem = {
            ...item,
            description: item.description || t('delicious_dish_from_menu'),
            badges: item.badges || [],
            addons: item.addons || [],
            quantity: item.quantity || 1,
            totalPrice: item.totalPrice || calculateItemPrice(item)
        };

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(
            cartItem =>
                cartItem.id === item.id &&
                JSON.stringify(cartItem.variant) === JSON.stringify(item.variant) &&
                JSON.stringify(cartItem.addons.sort((a, b) => a.name.localeCompare(b.name))) ===
                JSON.stringify(item.addons.sort((a, b) => a.name.localeCompare(b.name)))
        );

        if (existingItemIndex !== -1) {
            // Update quantity of existing item
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += cartItem.quantity;
            updatedCart[existingItemIndex].totalPrice += cartItem.totalPrice;
            setCart(updatedCart);
        } else {
            // Add new item to cart
            setCart([...cart, cartItem]);
        }

        // Show toast notification
        setToastMessage('Item added to cart');
        setToastType('success');
        setShowToast(true);
    };

    // Handle viewing item details
    const handleViewItemDetails = (item) => {
        setSelectedItemName(item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''));
        // Create URL-friendly branch name
        const branches = storage.get('branches', []);
        const currentBranch = branches.find(b => b.id === selectedBranchId);
        if (currentBranch) {
            const urlFriendlyBranchName = currentBranch.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            const urlFriendlyItemName = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            navigateToView('itemDetail', { branchName: urlFriendlyBranchName, itemName: urlFriendlyItemName });
        }
    };

    // Handle updating cart item quantity
    const handleUpdateCartItemQuantity = (index, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveCartItem(index);
            return;
        }

        const updatedCart = [...cart];
        const item = updatedCart[index];

        // Ensure item has required properties with defaults
        if (!item.quantity || item.quantity <= 0) {
            item.quantity = 1;
        }
        if (!item.totalPrice || item.totalPrice <= 0) {
            // Calculate base price from variant or original price
            const basePrice = item.variant ? item.variant.price : (item.price || 0);
            const addonsPrice = (item.addons || []).reduce((total, addon) => total + (addon.price || 0), 0);
            item.totalPrice = (basePrice + addonsPrice) * item.quantity;
        }

        const unitPrice = item.totalPrice / item.quantity;
        item.quantity = newQuantity;
        item.totalPrice = unitPrice * newQuantity;
        setCart(updatedCart);
    };

    // Handle removing cart item
    const handleRemoveCartItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    // Handle checkout
    const handleCheckout = (data) => {
        setOrderData(data);
        navigateToView('checkout');
        setShowCart(false);
    };

    // Handle placing order
    const handlePlaceOrder = (order) => {
        setPlacedOrder(order);
        setCart([]); // Clear the cart after successful order
        
        // Save order to localStorage for persistence
        const savedOrders = storage.get('orders', []);
        const updatedOrders = [...savedOrders, order];
        storage.set('orders', updatedOrders);
        
        navigateToView('order-tracking', { orderNumber: order.id });
    };

    // Handle toggle favorite
    const handleToggleFavorite = (item) => {
        const isFavorite = favorites.some(fav => fav.id === item.id);
        if (isFavorite) {
            // Remove from favorites
            setFavorites(favorites.filter(fav => fav.id !== item.id));
        } else {
            // Add to favorites
            const branches = storage.get('branches', []);
            const branch = branches.find(b => b.id === selectedBranchId);
            setFavorites([...favorites, {
                id: item.id,
                name: item.name,
                description: item.description || '',
                price: item.price,
                image: item.image,
                category: item.category,
                badges: item.badges || [],
                rating: item.rating,
                reviewCount: item.reviewCount,
                isNew: item.isNew || false,
                branchId: selectedBranchId,
                branchName: branch?.name,
                addedAt: new Date().toISOString()
            }]);
        }
    };

    // Get current item for item detail page
    const getCurrentItem = () => {
        if (!selectedBranchId || !selectedItemName) return null;
        const menu = storage.get('menu', {});
        const branchItems = menu[selectedBranchId] || [];
        // Find item by URL-friendly name
        return branchItems.find(item => {
            const urlFriendlyName = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return urlFriendlyName === selectedItemName;
        }) || null;
    };

    // Handle back navigation
    const handleBack = () => {
        if (currentView === 'menu') {
            navigateToView('home');
        } else if (currentView === 'itemDetail') {
            // Go back to menu
            const branches = storage.get('branches', []);
            const currentBranch = branches.find(b => b.id === selectedBranchId);
            if (currentBranch) {
                const urlFriendlyName = currentBranch.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                navigateToView('menu', { branchName: urlFriendlyName });
            }
        } else if (currentView === 'checkout') {
            navigateToView('menu');
            setShowCart(true);
        } else if (currentView === 'order-tracking') {
            navigateToView('home');
        } else if (currentView === 'profile') {
            navigateToView('home');
        } else if (currentView === 'favorites') {
            navigateToView('home');
        }
    };

    // Calculate cart items count
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Calculate favorites count
    const favoritesCount = favorites.length;

    // Handle URL routing
    React.useEffect(() => {
        const handlePopState = (event) => {
            const path = getCurrentPath();
            const { view, params } = getViewFromPath(path);
            
            // Check if view requires additional state
            if (view === 'menu' && !params.branchId) {
                // If trying to access menu without branch in URL, redirect to home
                navigateTo('home', true);
                setViewWithoutNavigation('home');
                window.scrollTo(0, 0);
            } else if (view === 'itemDetail' && (!params.branchId || !params.itemName)) {
                // If trying to access item detail without branch or item in URL, redirect to home
                navigateTo('home', true);
                setViewWithoutNavigation('home');
                window.scrollTo(0, 0);
            } else if (view === 'checkout' && !orderData) {
                // If trying to access checkout without order data, redirect to home
                navigateTo('home', true);
                setViewWithoutNavigation('home');
                window.scrollTo(0, 0);
            } else if (view === 'order-tracking') {
                // For order-tracking, check if we have the order or can find it by order number
                const orderFromParams = params.orderNumber ? findOrderByNumber(params.orderNumber) : null;
                if (placedOrder || orderFromParams) {
                    setViewWithoutNavigation(view, params);
                    window.scrollTo(0, 0);
                    // If we found an order by number but don't have it as placedOrder, set it
                    if (orderFromParams && !placedOrder) {
                        setPlacedOrder(orderFromParams);
                    }
                } else {
                    // If trying to access order-tracking without order, redirect to home
                    navigateTo('home', true);
                    setViewWithoutNavigation('home');
                    window.scrollTo(0, 0);
                }
            } else {
                setViewWithoutNavigation(view);
                window.scrollTo(0, 0);
                // If navigating to menu, set the branch from URL params
                if (view === 'menu' && params.branchId) {
                    setSelectedBranchId(params.branchId);
                    storage.set('selectedBranchId', params.branchId);
                }
                // If navigating to item detail, set the branch and item from URL params
                if (view === 'itemDetail' && params.branchId && params.itemName) {
                    setSelectedBranchId(params.branchId);
                    setSelectedItemName(params.itemName);
                    storage.set('selectedBranchId', params.branchId);
                }
            }
        };

        // Set initial view based on current URL
        const initialPath = getCurrentPath();
        const { view: initialView, params: initialParams } = getViewFromPath(initialPath);
        
        // Check if initial view requires additional state
        if (initialView === 'menu' && !initialParams.branchId) {
            navigateTo('home', true);
            setViewWithoutNavigation('home');
        } else if (initialView === 'itemDetail' && (!initialParams.branchId || !initialParams.itemName)) {
            navigateTo('home', true);
            setViewWithoutNavigation('home');
        } else if (initialView === 'checkout' && !orderData) {
            navigateTo('home', true);
            setViewWithoutNavigation('home');
        } else if (initialView === 'order-tracking') {
            // For order-tracking, check if we have the order or can find it by order number
            const orderFromParams = initialParams.orderNumber ? findOrderByNumber(initialParams.orderNumber) : null;
            if (placedOrder || orderFromParams) {
                setViewWithoutNavigation(initialView, initialParams);
                // If we found an order by number but don't have it as placedOrder, set it
                if (orderFromParams && !placedOrder) {
                    setPlacedOrder(orderFromParams);
                }
            } else {
                navigateTo('home', true);
                setViewWithoutNavigation('home');
            }
        } else {
            setViewWithoutNavigation(initialView);
            // If initial view is menu, set the branch from URL params
            if (initialView === 'menu' && initialParams.branchId) {
                setSelectedBranchId(initialParams.branchId);
                storage.set('selectedBranchId', initialParams.branchId);
            }
            // If initial view is item detail, set the branch and item from URL params
            if (initialView === 'itemDetail' && initialParams.branchId && initialParams.itemName) {
                setSelectedBranchId(initialParams.branchId);
                setSelectedItemName(initialParams.itemName);
                storage.set('selectedBranchId', initialParams.branchId);
            }
        }

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [selectedBranchId, orderData, placedOrder]);

    // Admin panel access (hidden feature)
    React.useEffect(() => {
        const handleKeyPress = (e) => {
            // Cmd+K or Ctrl+K to focus search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[placeholder*="Search"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
            {/* Desktop Header Navigation */}
            <div className="hidden lg:block bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 z-40 sticky top-0">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-20">
                        {/* Enhanced Branding */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <Icon name="qrcode" className="text-white text-lg" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                        {t('smart_qr_menu')}
                                    </h1>
                                    <p className="text-xs text-gray-500 -mt-1">{t('bangladesh_restaurant')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Navigation */}
                        <nav className="flex items-center space-x-2">
                            <button
                                onClick={() => navigateToView('home')}
                                className={`nav-item flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    currentView === 'home'
                                        ? 'text-orange-600 bg-orange-50 shadow-sm active'
                                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                                }`}
                            >
                                <Icon name="home" className="mr-2 text-lg" />
                                {t('home')}
                            </button>
                            <button
                                onClick={() => navigateToView('favorites')}
                                className={`nav-item flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all relative ${
                                    currentView === 'favorites'
                                        ? 'text-orange-600 bg-orange-50 shadow-sm active'
                                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                                }`}
                            >
                                <Icon name="heart" className="mr-2 text-lg" />
                                {t('favorites')}
                                {favoritesCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg badge-pulse">
                                        {favoritesCount > 9 ? '9+' : favoritesCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setShowCart(true)}
                                className="nav-item flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50/50 transition-all relative"
                            >
                                <Icon name="shoppingCart" className="mr-2 text-lg" />
                                {t('cart')}
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg badge-pulse">
                                        {cartItemsCount > 9 ? '9+' : cartItemsCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => navigateToView('profile')}
                                className={`nav-item flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    currentView === 'profile'
                                        ? 'text-orange-600 bg-orange-50 shadow-sm active'
                                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                                }`}
                            >
                                <Icon name="user" className="mr-2 text-lg" />
                                {t('profile')}
                            </button>
                        </nav>

                        {/* Enhanced Language Toggle */}
                        <div className="flex items-center space-x-4">
                            <LanguageToggle />
                        </div>
                    </div>
                </div>
            </div>

            {/* Render current view */}
            {currentView === 'home' && (
                <Home onBranchSelect={handleBranchSelect} />
            )}

            {currentView === 'favorites' && (
                <Favorites
                    onBack={handleBack}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewItemDetails}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                />
            )}

            {currentView === 'menu' && selectedBranchId && (
                <Menu
                    branchId={selectedBranchId}
                    onBack={handleBack}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewItemDetails}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                    cartItemsCount={cartItemsCount}
                    onOpenCart={() => setShowCart(true)}
                />
            )}

            {currentView === 'itemDetail' && selectedBranchId && selectedItemName && (
                <ItemDetail
                    item={getCurrentItem()}
                    onBack={handleBack}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.some(fav => fav.id === getCurrentItem()?.id)}
                />
            )}

            {currentView === 'checkout' && orderData && (
                <Checkout
                    orderData={orderData}
                    onBack={handleBack}
                    onPlaceOrder={handlePlaceOrder}
                />
            )}

            {currentView === 'order-tracking' && (placedOrder || currentParams.orderNumber) && (
                <OrderTracking
                    order={placedOrder || findOrderByNumber(currentParams.orderNumber)}
                    onBack={handleBack}
                />
            )}

            {currentView === 'profile' && (
                <Profile
                    onBack={handleBack}
                    onLogout={() => {
                        storage.remove('userProfile');
                        navigateToView('home');
                    }}
                    onNavigateToOrderTracking={(orderNumber) => navigateToView('order-tracking', { orderNumber })}
                    onNavigateToMenu={() => navigateToView('menu')}
                    onOpenCart={() => setShowCart(true)}
                />
            )}

            {/* Footer */}
            <Footer />

            {/* Enhanced Bottom Navigation - Mobile Only */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-60">
                {/* Background with subtle blur */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-t border-gray-200"></div>

                {/* Main Navigation Items */}
                <div className="relative pt-2 pb-1 px-4">
                    <div className="flex justify-around items-end">
                        <button
                            onClick={() => navigateToView('home')}
                            className={`mobile-nav-item flex flex-col items-center p-2 rounded-xl transition-all ${
                                currentView === 'home'
                                    ? 'text-orange-600 bg-orange-50 active'
                                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                            }`}
                        >
                            <Icon name="home" className="text-lg mb-0.5" />
                            <span className="text-xs font-medium">Home</span>
                        </button>

                        <button
                            onClick={() => navigateToView('favorites')}
                            className={`mobile-nav-item flex flex-col items-center p-2 rounded-xl transition-all relative ${
                                currentView === 'favorites'
                                    ? 'text-orange-600 bg-orange-50 active'
                                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                            }`}
                        >
                            <Icon name="heart" className="text-lg mb-0.5" />
                            <span className="text-xs font-medium">Favorites</span>
                            {favoritesCount > 0 && (
                                <span className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                                    {favoritesCount > 9 ? '9+' : favoritesCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => navigateToView('menu')}
                            className={`mobile-nav-item flex flex-col items-center p-2 rounded-xl transition-all ${
                                currentView === 'menu'
                                    ? 'text-orange-600 bg-orange-50 active'
                                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                            }`}
                        >
                            <Icon name="utensils" className="text-lg mb-0.5" />
                            <span className="text-xs font-medium">Menu</span>
                        </button>

                        <button
                            onClick={() => navigateToView('profile')}
                            className={`mobile-nav-item flex flex-col items-center p-2 rounded-xl transition-all ${
                                currentView === 'profile'
                                    ? 'text-orange-600 bg-orange-50 active'
                                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                            }`}
                        >
                            <Icon name="user" className="text-lg mb-0.5" />
                            <span className="text-xs font-medium">Profile</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Cart Modal */}
            <Cart
                isOpen={showCart}
                onClose={() => setShowCart(false)}
                items={cart}
                onUpdateQuantity={handleUpdateCartItemQuantity}
                onRemoveItem={handleRemoveCartItem}
                onCheckout={handleCheckout}
            />

            {/* Toast Notification */}
            <Toast
                message={toastMessage}
                type={toastType}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));