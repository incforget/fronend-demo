// ==================== MENU COMPONENT ====================

// Menu Component
const Menu = ({ branchId, onBack, onAddToCart, onViewDetails, onToggleFavorite, favorites, cartItemsCount, onOpenCart }) => {
    const { t } = window.useTranslation();
    const [branch, setBranch] = React.useState(null);
    const [menuItems, setMenuItems] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sortBy, setSortBy] = React.useState('popularity');
    const [filters, setFilters] = React.useState({
        vegetarian: false,
        spicy: false,
        containsNuts: false
    });
    const [showFilters, setShowFilters] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Load branch and menu data
        const branches = storage.get('branches', []);
        const selectedBranch = branches.find(b => b.id === branchId);
        const menu = storage.get('menu', {});

        setBranch(selectedBranch);
        setMenuItems(menu[branchId] || []);

        // Extract categories
        const allCategories = ['All', ...new Set(menu[branchId]?.map(item => item.category) || [])];
        setCategories(allCategories);

        setLoading(false);
    }, [branchId]);

    const isItemFavorite = (item) => {
        return favorites.some(fav => fav.id === item.id);
    };

    const getFilteredAndSortedItems = () => {
        let filtered = menuItems;

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply filters
        if (filters.vegetarian) {
            filtered = filtered.filter(item => item.isVegetarian);
        }
        if (filters.spicy) {
            filtered = filtered.filter(item => item.badges.includes('spicy'));
        }
        if (filters.containsNuts) {
            filtered = filtered.filter(item => item.containsNuts);
        }

        // Sort items
        if (sortBy === 'popularity') {
            filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        } else if (sortBy === 'price-low-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high-low') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'new') {
            filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        }

        return filtered;
    };

    const filteredItems = getFilteredAndSortedItems();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header title={t('menu')} showBack onBackClick={onBack} />
                <div className="max-w-6xl mx-auto p-4 lg:p-6">
                    <Loading type="skeleton" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header title={branch ? branch.name : 'Menu'} showBack onBackClick={onBack} />

            {branch && (
                <div className="relative">
                    <div className="h-64 lg:h-80 relative overflow-hidden">
                        <img src={branch.coverImage} alt={branch.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img src={branch.logo} alt={branch.name} className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl border-4 border-white shadow-xl" />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                        <Icon name="check" className="text-white text-xs" />
                                    </div>
                                </div>
                                <div className="text-white">
                                    <h1 className="text-2xl lg:text-3xl font-bold mb-1">{branch.name}</h1>
                                    <div className="flex items-center space-x-4 text-sm lg:text-base">
                                        <div className="flex items-center">
                                            <Icon name="mapMarkerAlt" className="mr-1" />
                                            <span>{branch.address}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Icon name="clock" className="mr-1" />
                                            <span>{t('open_until')} 10 PM</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                            <Icon name="star" className="text-yellow-400 mr-1 text-sm" />
                                            <span className="font-semibold">4.8</span>
                                            <span className="text-xs ml-1">({branch.reviewCount || '2.3k'} {t('reviews')})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
                {/* Search Bar */}
                <div className="max-w-6xl m-auto p-1 lg:p-2">
                    <div className="relative max-w-lg mx-auto">
                        <label htmlFor="menu-search" className="sr-only">{t('search_for_dishes')}</label>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Icon name="search" className="text-gray-400 text-lg" />
                        </div>
                        <input
                            id="menu-search"
                            type="text"
                            placeholder={t('search_for_delicious_dishes')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-1 lg:py-2 bg-gray-50 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all duration-300 text-base shadow-sm"
                            aria-describedby="search-help"
                        />
                        <div id="search-help" className="sr-only">{t('search_help')}</div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 mobile-touch-friendly"
                                aria-label={t('clear_search')}
                            >
                                <Icon name="times" className="text-lg" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="max-w-6xl my-1 mx-auto p-0.5 lg:px-4 pb-2">
                    <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2 mobile-scroll-smooth" role="tablist" aria-label={t('menu_categories')}>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                role="tab"
                                aria-selected={selectedCategory === category}
                                aria-controls={`category-${category}`}
                                className={`px-2 sm:px-3 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus-visible focus:outline-none mobile-touch-friendly text-xs sm:text-sm flex-shrink-0 mobile-xs-padding mobile-xs-text ${
                                    selectedCategory === category
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                title={category}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort and Filter Controls */}
                <div className="max-w-6xl mx-auto flex items-center justify-between px-3 lg:px-4 pb-2">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-1.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="popularity">{t('most_popular')}</option>
                                <option value="price-low-high">{t('price_low_high')}</option>
                                <option value="price-high-low">{t('price_high_low')}</option>
                                <option value="new">{t('newest_first')}</option>
                            </select>
                            <Icon name="chevronDown" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center px-3 py-1.5 rounded-xl font-medium transition-all duration-300 ${
                            showFilters
                                ? 'bg-orange-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Icon name="filter" className="mr-2" />
                        {t('filters')}
                        <Icon name={showFilters ? "chevronUp" : "chevronDown"} className="ml-2 text-sm" />
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="max-w-6xl mx-auto px-3 lg:px-4 pb-2 border-t border-gray-100">
                        <div className="pt-2">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">{t('dietary_preferences')}</h3>
                            <div className="flex flex-wrap gap-2">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={filters.vegetarian}
                                        onChange={(e) => setFilters({...filters, vegetarian: e.target.checked})}
                                        className="sr-only"
                                    />
                                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border-2 transition-all duration-200 ${
                                        filters.vegetarian
                                            ? 'bg-green-50 border-green-300 text-green-700'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}>
                                        <Icon name="leaf" className={`text-sm ${filters.vegetarian ? 'text-green-600' : 'text-gray-400'}`} />
                                        <span className="text-sm font-medium">{t('vegetarian')}</span>
                                    </div>
                                </label>
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={filters.spicy}
                                        onChange={(e) => setFilters({...filters, spicy: e.target.checked})}
                                        className="sr-only"
                                    />
                                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border-2 transition-all duration-200 ${
                                        filters.spicy
                                            ? 'bg-red-50 border-red-300 text-red-700'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}>
                                        <Icon name="fire" className={`text-sm ${filters.spicy ? 'text-red-600' : 'text-gray-400'}`} />
                                        <span className="text-sm font-medium">{t('spicy')}</span>
                                    </div>
                                </label>
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={filters.containsNuts}
                                        onChange={(e) => setFilters({...filters, containsNuts: e.target.checked})}
                                        className="sr-only"
                                    />
                                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border-2 transition-all duration-200 ${
                                        filters.containsNuts
                                            ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}>
                                        <Icon name="exclamationTriangle" className={`text-sm ${filters.containsNuts ? 'text-yellow-600' : 'text-gray-400'}`} />
                                        <span className="text-sm font-medium">{t('contains_nuts')}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Menu Items */}
            <div className="max-w-6xl mx-auto p-3 lg:p-6">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-16 lg:py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                                <Icon name="search" className="text-3xl text-orange-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('no_dishes_found')}</h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm || Object.values(filters).some(f => f) || selectedCategory !== 'All'
                                    ? t('try_adjusting_filters')
                                    : t('no_menu_items')}
                            </p>
                            {(searchTerm || Object.values(filters).some(f => f) || selectedCategory !== 'All') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilters({ vegetarian: false, spicy: false, containsNuts: false });
                                        setSelectedCategory('All');
                                    }}
                                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    {t('clear_all_filters')}
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                                {selectedCategory === 'All' ? t('all_dishes') : selectedCategory}
                                <span className="text-gray-500 font-normal ml-2">({filteredItems.length})</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-6" role="grid" aria-label={t('menu_items')}>
                            {filteredItems.map((item, index) => (
                                <div key={item.id} className="stagger-animation" role="gridcell">
                                    <MenuItem
                                        item={item}
                                        onAddToCart={onAddToCart}
                                        onViewDetails={onViewDetails}
                                        onToggleFavorite={onToggleFavorite}
                                        isFavorite={isItemFavorite(item)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Floating Cart Button */}
            <button
                onClick={onOpenCart}
                className="fixed bottom-20 right-6 z-50 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group focus-visible mobile-touch-friendly"
                aria-label={`${t('open_cart')}${cartItemsCount > 0 ? ` ${t('items_in_cart').replace('items', cartItemsCount)}` : ''}`}
                aria-describedby="cart-count"
            >
                <Icon name="shoppingCart" className="text-xl" />
                {cartItemsCount > 0 && (
                    <span
                        id="cart-count"
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                        aria-label={`${cartItemsCount} ${t('items_in_cart')}`}
                    >
                        {cartItemsCount}
                    </span>
                )}
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </div>
    );
};