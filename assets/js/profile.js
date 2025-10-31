// ==================== PROFILE COMPONENT ====================

// Profile Component
const Profile = ({ onBack, onLogout, onNavigateToOrderTracking, onNavigateToMenu, onOpenCart }) => {
    const { t } = window.useTranslation();
    // Default navigation functions for backward compatibility
    const navigateToOrderTracking = onNavigateToOrderTracking || ((orderNumber) => {
        window.location.hash = `#order-tracking/${orderNumber}`;
    });
    const navigateToMenu = onNavigateToMenu || (() => {
        window.location.hash = '#menu';
    });
    const openCart = onOpenCart || (() => {
        // Default behavior - could navigate to menu or do nothing
        navigateToMenu();
    });
    const [userProfile, setUserProfile] = React.useState(null);
    const [orders, setOrders] = React.useState([]);
    const [activeTab, setActiveTab] = React.useState('profile');
    const [editingProfile, setEditingProfile] = React.useState(false);
    const [favorites, setFavorites] = React.useState([]);
    const [showReorderConfirm, setShowReorderConfirm] = React.useState(false);
    const [reorderOrder, setReorderOrder] = React.useState(null);
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [toastType, setToastType] = React.useState('success');
    const [isReordering, setIsReordering] = React.useState(false);
    const [quickReorderLoading, setQuickReorderLoading] = React.useState(new Set());

    React.useEffect(() => {
        // Load user profile, orders, and favorites from localStorage
        const profile = storage.get('userProfile');
        const userOrders = storage.get('orders', []);
        const userFavorites = storage.get('favorites', []);

        setUserProfile(profile);
        setOrders(userOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        setFavorites(userFavorites);
    }, []);

    const handleSaveProfile = () => {
        storage.set('userProfile', userProfile);
        setEditingProfile(false);
    };

    const handleReorder = (order) => {
        setReorderOrder(order);
        setShowReorderConfirm(true);
    };

    const confirmReorder = () => {
        if (!reorderOrder || isReordering) return;

        setIsReordering(true);

        try {
            // Add items from the order to cart
            const cart = storage.get('cart', []);
            const itemsAdded = reorderOrder.items.length;

            // Check for duplicate items and merge quantities
            reorderOrder.items.forEach(orderItem => {
                const existingItemIndex = cart.findIndex(cartItem =>
                    cartItem.id === orderItem.id &&
                    cartItem.selectedOptions === orderItem.selectedOptions
                );

                if (existingItemIndex >= 0) {
                    // Item already exists, increase quantity
                    cart[existingItemIndex].quantity += orderItem.quantity;
                } else {
                    // Add new item
                    cart.push({...orderItem});
                }
            });

            storage.set('cart', cart);

            // Show success toast
            setToastMessage(`${itemsAdded} item${itemsAdded > 1 ? 's' : ''} added to cart!`);
            setToastType('success');
            setShowToast(true);

            // Hide toast after 3 seconds
            setTimeout(() => setShowToast(false), 3000);

            // Close confirmation dialog
            setShowReorderConfirm(false);
            setReorderOrder(null);

            // Open cart modal after a short delay
            setTimeout(() => openCart(), 500);

        } catch (error) {
            // Show error toast
            setToastMessage('Failed to reorder items. Please try again.');
            setToastType('error');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } finally {
            setIsReordering(false);
        }
    };

    const handleQuickReorder = (order) => {
        if (quickReorderLoading.has(order.id)) return;

        setQuickReorderLoading(prev => new Set(prev).add(order.id));

        try {
            // Add items from the order to cart
            const cart = storage.get('cart', []);
            const itemsAdded = order.items.length;

            // Check for duplicate items and merge quantities
            order.items.forEach(orderItem => {
                const existingItemIndex = cart.findIndex(cartItem =>
                    cartItem.id === orderItem.id &&
                    cartItem.selectedOptions === orderItem.selectedOptions
                );

                if (existingItemIndex >= 0) {
                    // Item already exists, increase quantity
                    cart[existingItemIndex].quantity += orderItem.quantity;
                } else {
                    // Add new item
                    cart.push({...orderItem});
                }
            });

            storage.set('cart', cart);

            // Show success toast
            setToastMessage(`${itemsAdded} item${itemsAdded > 1 ? 's' : ''} added to cart!`);
            setToastType('success');
            setShowToast(true);

            // Hide toast after 3 seconds
            setTimeout(() => setShowToast(false), 3000);

            // Open cart modal after a short delay
            setTimeout(() => openCart(), 500);

        } catch (error) {
            // Show error toast
            setToastMessage('Failed to reorder items. Please try again.');
            setToastType('error');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } finally {
            setQuickReorderLoading(prev => {
                const newSet = new Set(prev);
                newSet.delete(order.id);
                return newSet;
            });
        }
    };

    const cancelReorder = () => {
        setShowReorderConfirm(false);
        setReorderOrder(null);
    };

    // Calculate user statistics
    const getUserStats = () => {
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
        const favoriteItems = favorites.length;
        const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

        return { totalOrders, totalSpent, favoriteItems, avgOrderValue };
    };

    const stats = getUserStats();

    // Generate avatar initials
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    if (!userProfile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon name="user" className="text-3xl text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome!</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">Create your profile by placing your first order</p>
                    <button
                        onClick={navigateToMenu}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Start Ordering
                    </button>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: 'user' },
        { id: 'orders', label: 'Orders', icon: 'history' },
        { id: 'favorites', label: 'Favorites', icon: 'heart' },
        { id: 'settings', label: 'Settings', icon: 'cog' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            <Header title="My Profile" showBack onBackClick={onBack} />

            <div className="max-w-4xl mx-auto p-4 pb-24">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 card-hover-lift">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {getInitials(userProfile.name)}
                            </div>
                            <button
                                onClick={() => setEditingProfile(true)}
                                className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border-2 border-white"
                                aria-label="Edit profile"
                            >
                                <Icon name="camera" className="text-gray-600 text-sm" />
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-800 mb-1">{userProfile.name}</h1>
                            <p className="text-gray-600 mb-4">{userProfile.phone}</p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-500">{stats.totalOrders}</div>
                                    <div className="text-sm text-gray-600">Orders</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-500">{BD_CONTEXT.currencySymbol}{stats.totalSpent}</div>
                                    <div className="text-sm text-gray-600">Total Spent</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-pink-500">{stats.favoriteItems}</div>
                                    <div className="text-sm text-gray-600">Favorites</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-500">{BD_CONTEXT.currencySymbol}{stats.avgOrderValue.toFixed(0)}</div>
                                    <div className="text-sm text-gray-600">Avg Order</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-lg p-1 mb-6">
                    <div className="flex">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                            >
                                <Icon name={tab.icon} className="text-sm" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 card-hover-lift">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                                {!editingProfile && (
                                    <button
                                        onClick={() => setEditingProfile(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl transition-colors"
                                    >
                                        <Icon name="edit" className="text-sm" />
                                        <span>Edit</span>
                                    </button>
                                )}
                            </div>

                            {editingProfile ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={userProfile.name}
                                            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={userProfile.phone}
                                            onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={userProfile.email || ''}
                                            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setEditingProfile(false)}
                                            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                        <Icon name="user" className="text-gray-400 mr-4" />
                                        <div>
                                            <div className="text-sm text-gray-500">Full Name</div>
                                            <div className="font-medium text-gray-800">{userProfile.name}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                        <Icon name="phone" className="text-gray-400 mr-4" />
                                        <div>
                                            <div className="text-sm text-gray-500">Phone Number</div>
                                            <div className="font-medium text-gray-800">{userProfile.phone}</div>
                                        </div>
                                    </div>
                                    {userProfile.email && (
                                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                            <Icon name="envelope" className="text-gray-400 mr-4" />
                                            <div>
                                                <div className="text-sm text-gray-500">Email Address</div>
                                                <div className="font-medium text-gray-800">{userProfile.email}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Order History</h3>
                                {orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon name="receipt" className="text-2xl text-gray-400" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h4>
                                        <p className="text-gray-500 mb-6">Your order history will appear here</p>
                                        <button
                                            onClick={navigateToMenu}
                                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        >
                                            Start Ordering
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map(order => (
                                            <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow card-hover-lift">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <div className="font-semibold text-gray-800">Order #{order.id}</div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Icon name="calendar" className="text-xs" />
                                                            {new Date(order.timestamp).toLocaleDateString()} at {new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-orange-500">
                                                            {BD_CONTEXT.currencySymbol}{order.total}
                                                        </div>
                                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' :
                                                            order.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-700'
                                                        }`}>
                                                            <div className={`w-2 h-2 rounded-full ${
                                                                order.status === 'completed' ? 'bg-green-500' :
                                                                order.status === 'preparing' ? 'bg-yellow-500' :
                                                                order.status === 'ready' ? 'bg-blue-500' :
                                                                'bg-gray-500'
                                                            }`}></div>
                                                            {order.status.replace('-', ' ')}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Icon name="box" className="text-xs" />
                                                        {order.items.length} items • {order.orderType}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => navigateToOrderTracking(order.id)}
                                                            className="flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors text-sm font-medium"
                                                        >
                                                            <Icon name="mapMarkerAlt" className="text-xs" />
                                                            Track
                                                        </button>
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={() => handleReorder(order)}
                                                                className="flex items-center gap-1 px-2 py-1 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition-colors text-xs font-medium"
                                                                title="Review items before reordering"
                                                            >
                                                                <Icon name="eye" className="text-xs" />
                                                                Review
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuickReorder(order)}
                                                                disabled={quickReorderLoading.has(order.id)}
                                                                className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-orange-400 disabled:to-red-400 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-sm text-sm font-medium"
                                                            >
                                                                {quickReorderLoading.has(order.id) ? (
                                                                    <Icon name="spinner" className="animate-spin text-xs" />
                                                                ) : (
                                                                    <Icon name="sync" className="text-xs" />
                                                                )}
                                                                {quickReorderLoading.has(order.id) ? 'Adding...' : 'Reorder'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Order Items Preview */}
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <div className="flex flex-wrap gap-1 mb-2">
                                                        {order.items.slice(0, 3).map((item, index) => (
                                                            <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                                                {item.name}
                                                            </span>
                                                        ))}
                                                        {order.items.length > 3 && (
                                                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                                                                +{order.items.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Favorites Tab */}
                    {activeTab === 'favorites' && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 card-hover-lift">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Favorite Items</h3>
                            {favorites.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon name="heart" className="text-2xl text-pink-400" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No favorites yet</h4>
                                    <p className="text-gray-500 mb-6">Items you mark as favorite will appear here</p>
                                    <button
                                        onClick={navigateToMenu}
                                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        {t('browse_menu')}
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {favorites.map(item => (
                                        <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                                    <Icon name="utensils" className="text-orange-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                                                    <p className="text-sm text-gray-500">{BD_CONTEXT.currencySymbol}{item.price}</p>
                                                </div>
                                                <Icon name="heart" className="text-pink-500" />
                                            </div>
                                            <button
                                                onClick={navigateToMenu}
                                                className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm text-sm"
                                            >
                                                View in Menu
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 card-hover-lift">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">App Settings</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Icon name="bell" className="text-gray-400" />
                                            <div>
                                                <div className="font-medium text-gray-800">Push Notifications</div>
                                                <div className="text-sm text-gray-500">Receive order updates</div>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-green-500 rounded-full relative">
                                            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Icon name="globe" className="text-gray-400" />
                                            <div>
                                                <div className="font-medium text-gray-800">Language</div>
                                                <div className="text-sm text-gray-500">Choose your preferred language</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">English</span>
                                            <Icon name="chevronRight" className="text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 card-hover-lift">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Account</h3>
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <Icon name="signOutAlt" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reorder Confirmation Modal */}
            {showReorderConfirm && reorderOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{zIndex: 9999}}>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon name="sync" className="text-2xl text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Reorder Items</h3>
                            <p className="text-gray-600">
                                Add {reorderOrder.items.length} item{reorderOrder.items.length > 1 ? 's' : ''} from Order #{reorderOrder.id} to your cart?
                            </p>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Order Total:</span>
                                <span className="font-semibold text-gray-800">{BD_CONTEXT.currencySymbol}{reorderOrder.total}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Items:</span>
                                <span className="text-sm text-gray-800">{reorderOrder.items.length}</span>
                            </div>
                        </div>

                        {/* Item Preview */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Items to add:</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {reorderOrder.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm bg-white p-2 rounded-lg border">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <Icon name="utensils" className="text-xs text-orange-600" />
                                            </div>
                                            <span className="text-gray-800 font-medium">{item.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-800 font-medium">{BD_CONTEXT.currencySymbol}{item.price}</div>
                                            <div className="text-gray-600">×{item.quantity}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={cancelReorder}
                                disabled={isReordering}
                                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-semibold rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReorder}
                                disabled={isReordering}
                                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2"
                            >
                                {isReordering ? (
                                    <>
                                        <Icon name="spinner" className="animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    'Add to Cart'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transition-all duration-300 max-w-sm ${
                    toastType === 'success'
                        ? 'bg-green-500 text-white'
                        : toastType === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-blue-500 text-white'
                }`}>
                    <Icon
                        name={toastType === 'success' ? 'checkCircle' : toastType === 'error' ? 'times' : 'infoCircle'}
                        className="text-lg flex-shrink-0"
                    />
                    <span className="font-medium text-sm">{toastMessage}</span>
                    <button
                        onClick={() => setShowToast(false)}
                        className="ml-2 hover:bg-black hover:bg-opacity-20 rounded-full p-1 transition-colors flex-shrink-0"
                    >
                        <Icon name="times" className="text-sm" />
                    </button>
                </div>
            )}
        </div>
    );
};