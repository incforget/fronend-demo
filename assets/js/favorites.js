// ==================== FAVORITES COMPONENT ====================

// Favorites Component
const Favorites = ({ onBack, onAddToCart, onViewDetails, onToggleFavorite, favorites }) => {
    const [loading, setLoading] = React.useState(true);
    const [sortBy, setSortBy] = React.useState('recently-added');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [selectedItems, setSelectedItems] = React.useState(new Set());
    const [isSelectionMode, setIsSelectionMode] = React.useState(false);

    React.useEffect(() => {
        // Simulate loading for better UX
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleRemoveFavorite = (itemId) => {
        const item = favorites.find(fav => fav.id === itemId);
        if (item) {
            onToggleFavorite(item);
        }
    };

    const handleToggleFavorite = (item) => {
        onToggleFavorite(item);
    };

    const handleSelectItem = (itemId) => {
        const newSelected = new Set(selectedItems);
        if (newSelected.has(itemId)) {
            newSelected.delete(itemId);
        } else {
            newSelected.add(itemId);
        }
        setSelectedItems(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedItems.size === filteredFavorites.length) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(filteredFavorites.map(item => item.id)));
        }
    };

    const handleBulkRemove = () => {
        selectedItems.forEach(itemId => {
            const item = favorites.find(fav => fav.id === itemId);
            if (item) {
                onToggleFavorite(item);
            }
        });
        setSelectedItems(new Set());
        setIsSelectionMode(false);
    };

    const handleBulkAddToCart = () => {
        selectedItems.forEach(itemId => {
            const item = favorites.find(fav => fav.id === itemId);
            if (item) {
                onAddToCart(item);
            }
        });
        setSelectedItems(new Set());
        setIsSelectionMode(false);
    };

    // Get unique categories from favorites
    const categories = React.useMemo(() => {
        const cats = [...new Set(favorites.map(item => item.category))];
        return ['all', ...cats.sort()];
    }, [favorites]);

    // Filter and sort favorites
    const filteredFavorites = React.useMemo(() => {
        let filtered = favorites.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Sort
        if (sortBy === 'recently-added') {
            filtered.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price-low-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high-low') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    }, [favorites, searchQuery, selectedCategory, sortBy]);

    if (loading) {
        return <Loading type="skeleton" />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            <Header title="My Favorites" showBack onBackClick={onBack} />

            <div className="max-w-7xl mx-auto p-4 pb-20">
                {favorites.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <div className="max-w-md mx-auto">
                            <div className="relative mb-8">
                                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                                    <Icon name="heart" className="text-5xl text-orange-400" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                                    <Icon name="plus" className="text-white text-sm" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">No Favorites Yet</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Discover delicious dishes and save your favorites for quick ordering.
                                Your personalized collection awaits!
                            </p>
                            <button
                                onClick={onBack}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                            >
                                <Icon name="utensils" className="mr-2" />
                                Explore Menu
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header Section */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-1">
                                        My Favorites
                                    </h1>
                                    <p className="text-gray-600">
                                        {filteredFavorites.length} of {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
                                    </p>
                                </div>

                                {/* Selection Mode Toggle */}
                                <div className="flex items-center gap-3">
                                    {isSelectionMode ? (
                                        <>
                                            <button
                                                onClick={handleSelectAll}
                                                className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                                            >
                                                {selectedItems.size === filteredFavorites.length ? 'Deselect All' : 'Select All'}
                                            </button>
                                            {selectedItems.size > 0 && (
                                                <>
                                                    <button
                                                        onClick={handleBulkAddToCart}
                                                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                                                    >
                                                        Add Selected ({selectedItems.size})
                                                    </button>
                                                    <button
                                                        onClick={handleBulkRemove}
                                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                                                    >
                                                        Remove Selected
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setIsSelectionMode(false);
                                                    setSelectedItems(new Set());
                                                }}
                                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setIsSelectionMode(true)}
                                            className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                                        >
                                            Select Multiple
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search favorites..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="relative">
                                    <Icon name="filter" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white transition-all"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>
                                                {category === 'all' ? 'All Categories' : category}
                                            </option>
                                        ))}
                                    </select>
                                    <Icon name="chevronDown" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Sort */}
                                <div className="relative">
                                    <Icon name="bars" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white transition-all"
                                    >
                                        <option value="recently-added">Recently Added</option>
                                        <option value="name">Name (A-Z)</option>
                                        <option value="price-low-high">Price: Low to High</option>
                                        <option value="price-high-low">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                    </select>
                                    <Icon name="chevronDown" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* No Results */}
                        {filteredFavorites.length === 0 && (searchQuery || selectedCategory !== 'all') && (
                            <div className="text-center py-16">
                                <Icon name="search" className="text-6xl text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                    }}
                                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {/* Favorites Grid */}
                        {filteredFavorites.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-6">
                                {filteredFavorites.map((item, index) => (
                                    <div key={item.id} className="stagger-animation" style={{ animationDelay: `${index * 0.1}s` }}>
                                        {/* Selection Checkbox for bulk actions */}
                                        {isSelectionMode && (
                                            <div className="relative mb-2">
                                                <button
                                                    onClick={() => handleSelectItem(item.id)}
                                                    className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-full border-2 transition-all ${
                                                        selectedItems.has(item.id)
                                                            ? 'bg-orange-500 border-orange-500'
                                                            : 'border-gray-300 hover:border-orange-400 bg-white'
                                                    }`}
                                                    aria-label={selectedItems.has(item.id) ? 'Deselect item' : 'Select item'}
                                                >
                                                    {selectedItems.has(item.id) && (
                                                        <Icon name="check" className="text-white text-xs" />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                        <MenuItem
                                            item={{
                                                ...item,
                                                description: item.description || t('delicious_dish_from_menu'),
                                                badges: item.badges || []
                                            }}
                                            onAddToCart={onAddToCart}
                                            onViewDetails={onViewDetails}
                                            onToggleFavorite={handleToggleFavorite}
                                            isFavorite={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};