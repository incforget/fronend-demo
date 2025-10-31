// ==================== REACT COMPONENTS ====================

// Icon Component
const Icon = ({ name, className = '', solid = false }) => {
    const iconClass = solid ? 'fas' : 'fa';
    return <i className={`${iconClass} ${icons[name] || icons.infoCircle} ${className}`}></i>;
};

// Language Toggle Component
const LanguageToggle = () => {
    const { i18n, t } = window.useTranslation();

    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'bn' : 'en';
        i18n.changeLanguage(newLanguage);
        BD_CONTEXT.language = newLanguage; // Keep BD_CONTEXT in sync for backward compatibility
    };

    return (
        <button
            onClick={toggleLanguage}
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 active:bg-gray-300/80 transition-all duration-200 active:scale-95 shadow-sm"
            aria-label={t('language')}
        >
            <div className="flex items-center space-x-1">
                <span className={`text-sm font-semibold transition-colors ${
                    i18n.language === 'en'
                        ? 'text-orange-600 group-hover:text-orange-700'
                        : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                    {i18n.language === 'en' ? 'EN' : 'বাং'}
                </span>
            </div>

            {/* Enhanced Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg border border-gray-700/50">
                {i18n.language === 'en' ? t('switch_to_bangla') : t('switch_to_english')}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/90"></div>
            </div>
        </button>
    );
};

// Header Component
const Header = ({ title, showBack, showLanguageToggle, onBackClick }) => {
    return (
        <header className={`sticky top-0 z-40 ${showBack || showLanguageToggle ? 'lg:hidden' : ''}`}>
            {/* Background with glass effect */}
            <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50"></div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 via-transparent to-pink-50/30"></div>

            <div className="relative flex items-center justify-between px-4 py-3 min-h-[56px]">
                {showBack && (
                    <button
                        onClick={onBackClick}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 active:bg-gray-300/80 transition-all duration-200 active:scale-95 shadow-sm"
                        aria-label="Go back"
                    >
                        <Icon name="arrowLeft" className="text-gray-700 text-lg" />
                    </button>
                )}

                <div className="flex-1 flex justify-center">
                    <div className="flex items-center space-x-2">
                        {/* App Icon */}
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-sm">
                            <Icon name="qrcode" className="text-white text-sm" />
                        </div>
                        {/* Title */}
                        <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            {title}
                        </h1>
                    </div>
                </div>

                {showLanguageToggle && <LanguageToggle />}

                {!showBack && !showLanguageToggle && <div className="w-10"></div>}
            </div>

            {/* Bottom shadow for depth */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent"></div>
        </header>
    );
};

// Loading Component
const Loading = ({ type = 'spinner' }) => {
    if (type === 'skeleton') {
        return (
            <div className="animate-pulse">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            <div className="aspect-square bg-gray-200"></div>
                            <div className="p-4">
                                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded mb-1"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="flex items-center justify-between">
                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                    <div className="flex space-x-2">
                                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center h-64">
            <div className="text-center">
                <div className="spinner mb-4"></div>
                <p className="text-gray-600 text-sm">Loading delicious options...</p>
            </div>
        </div>
    );
};

// Toast Notification Component
const Toast = ({ message, type, isVisible, onClose }) => {
    React.useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
        <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 z-70 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fade-in`}>
            <div className="flex items-center">
                <Icon name={type === 'success' ? 'check' : type === 'error' ? 'times' : 'infoCircle'} className="mr-2" />
                <span>{message}</span>
            </div>
        </div>
    );
};

// Branch Card Component
const BranchCard = ({ branch, onSelect }) => {
    const { name, address, coverImage, isOpen, rating, reviewCount, openingHours } = branch;

    return (
        <div
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer card-hover-lift group"
            onClick={() => onSelect(branch)}
        >
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={coverImage}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = 'https://picsum.photos/seed/branch-placeholder/800/400.jpg';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
                    isOpen
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                }`}>
                    <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${isOpen ? 'bg-green-200' : 'bg-red-200'}`}></div>
                        {isOpen ? 'Open' : 'Closed'}
                    </div>
                </div>

                {/* Rating Overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                    <div className="flex items-center">
                        <Icon name="star" className="text-yellow-400 mr-1" />
                        <span className="font-bold text-gray-800">{rating}</span>
                        <span className="text-sm text-gray-600 ml-1">({reviewCount})</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">{name}</h3>

                <div className="flex items-start mb-3">
                    <Icon name="mapMarkerAlt" className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">{address}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                        <Icon name="clock" className="mr-2" />
                        <span>{openingHours.open} - {openingHours.close}</span>
                    </div>

                    <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors">
                        {t('view_menu')} →
                    </div>
                </div>
            </div>
        </div>
    );
};

// Menu Item Component
const MenuItem = ({ item, onAddToCart, onViewDetails, onToggleFavorite, isFavorite }) => {
    const { t } = window.useTranslation();
    const { name, description, price, image, badges, rating, reviewCount, isNew } = item;

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border border-gray-100 group">
            <div className="relative aspect-square overflow-hidden">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = 'https://picsum.photos/seed/placeholder/300/200.jpg';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {isNew && (
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                            {t('new')}
                        </div>
                    )}
                    {badges.includes('popular') && (
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {t('popular')}
                        </div>
                    )}
                </div>

                {/* Favorite Button */}
                <button
                    onClick={() => onToggleFavorite(item)}
                    className="absolute top-3 right-3 p-0 rounded-full bg-transparent hover:bg-transparent transition-all duration-200 transform hover:scale-110 shadow-lg group/fav"
                    aria-label={isFavorite ? t('remove_from_favorites') : t('add_to_favorites')}
                >
                    <Icon name="heart" solid={isFavorite} className={`text-lg transition-colors duration-200 ${
                        isFavorite 
                            ? 'text-red-500' 
                            : 'text-gray-600 group-hover/fav:text-red-500'
                    }`} />
                </button>
            </div>
            
            <div className="p-3 lg:p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-base lg:text-lg text-gray-800 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">{name}</h3>
                    <div className="flex items-center ml-2">
                        {badges.includes('spicy') && (
                            <span className="text-red-500 mr-1" title={t('spicy')}>
                                <Icon name="fire" className="text-sm" />
                            </span>
                        )}
                        {badges.includes('vegetarian') && (
                            <span className="text-green-500" title={t('vegetarian')}>
                                <Icon name="leaf" className="text-sm" />
                            </span>
                        )}
                    </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">{description}</p>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            <Icon name="star" className="text-yellow-500 mr-1 text-sm" />
                            <span className="text-sm font-semibold text-gray-800">{rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({reviewCount})</span>
                    </div>
                    
                    <span className="text-lg lg:text-xl font-bold text-gray-800">
                        {BD_CONTEXT.currencySymbol}{price}
                    </span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2 mt-3 lg:mt-4">
                    <button
                        onClick={() => onViewDetails(item)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-2 lg:px-3 rounded-lg text-xs lg:text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                        aria-label={t('view_details')}
                    >
                        <Icon name="infoCircle" className="mr-1 text-sm" />
                        {t('details')}
                    </button>
                    <button
                        onClick={() => onAddToCart(item)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-2 px-2 lg:px-3 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center"
                        aria-label={t('add_to_cart')}
                    >
                        <Icon name="plus" className="mr-1 text-sm" />
                        {t('add')}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Item Detail Page Component
const ItemDetail = ({ item, onBack, onAddToCart, onToggleFavorite, isFavorite }) => {
    const [quantity, setQuantity] = React.useState(1);
    const [selectedVariant, setSelectedVariant] = React.useState((item && item.variants && item.variants.length > 0) ? item.variants[0] : null);
    const [selectedAddons, setSelectedAddons] = React.useState([]);
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const [isImageZoomed, setIsImageZoomed] = React.useState(false);
    const [showReviews, setShowReviews] = React.useState(false);
    const [selectedRating, setSelectedRating] = React.useState(0);

    if (!item) return null;

    const { name, description, price, image, images = [image], badges, rating, reviewCount, variants, addons, nutrition, allergens, prepTime, spiceLevel, reviews = [] } = item;

    const calculatePrice = () => {
        let itemPrice = selectedVariant ? selectedVariant.price : price;
        const addonsPrice = selectedAddons.reduce((total, addon) => total + addon.price, 0);
        return (itemPrice + addonsPrice) * quantity;
    };

    const handleAddToCart = () => {
        const cartItem = {
            ...item,
            quantity,
            variant: selectedVariant,
            addons: selectedAddons,
            totalPrice: calculatePrice()
        };
        onAddToCart(cartItem);
    };

    const toggleAddon = (addon) => {
        if (selectedAddons.find(a => a.name === addon.name)) {
            setSelectedAddons(selectedAddons.filter(a => a.name !== addon.name));
        } else {
            setSelectedAddons([...selectedAddons, addon]);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: name,
                    text: description,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            // Could show a toast notification here
        }
    };

    const renderStars = (rating, interactive = false) => {
        return [...Array(5)].map((_, i) => (
            <button
                key={i}
                className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                onClick={interactive ? () => setSelectedRating(i + 1) : undefined}
                disabled={!interactive}
            >
                <Icon
                    name="star"
                    className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} ${interactive ? 'hover:text-yellow-400' : ''} transition-colors`}
                />
            </button>
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-200">
                <div className="flex items-center justify-between p-4 lg:p-3 max-w-6xl mx-auto">
                    <button
                        onClick={onBack}
                        className="p-3 lg:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-sm"
                        aria-label="Go back"
                    >
                        <Icon name="arrowLeft" className="text-gray-700 text-lg lg:text-base" />
                    </button>

                    <div className="flex items-center space-x-3 lg:space-x-2">
                        <button
                            onClick={handleShare}
                            className="p-3 lg:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-sm"
                            aria-label="Share item"
                        >
                            <Icon name="share" className="text-gray-700 text-sm lg:text-xs" />
                        </button>

                        <button
                            onClick={() => onToggleFavorite && onToggleFavorite(item)}
                            className={`p-3 lg:p-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-sm ${
                                isFavorite
                                    ? 'bg-red-100 text-red-500 hover:bg-red-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Icon name="heart" solid={isFavorite} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <div className="max-w-6xl mx-auto">
                    {/* Desktop: Two Column Layout, Mobile: Stacked */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:min-h-[500px]">
                        {/* Image Column - Left on Desktop, Top on Mobile */}
                        <div className="lg:sticky lg:top-24 lg:self-start">
                            {/* Hero Section - Image Gallery */}
                            <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden lg:max-w-sm lg:mx-auto">
                                <div className="relative aspect-square">
                                    <img
                                        src={images[activeImageIndex] || image}
                                        alt={name}
                                        className={`w-full h-full object-cover transition-transform duration-300 ${
                                            isImageZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                                        }`}
                                        onClick={() => setIsImageZoomed(!isImageZoomed)}
                                        onError={(e) => {
                                            e.target.src = 'https://picsum.photos/seed/item-placeholder/800/800.jpg';
                                        }}
                                    />

                                    {/* Image Navigation Dots */}
                                    {images.length > 1 && (
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                                        index === activeImageIndex
                                                            ? 'bg-white shadow-lg scale-125'
                                                            : 'bg-white/50 hover:bg-white/75'
                                                    }`}
                                                    onClick={() => setActiveImageIndex(index)}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Badges Overlay */}
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        {badges && badges.map((badge, index) => (
                                            <span
                                                key={index}
                                                className="px-3 lg:px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs lg:text-xs font-semibold rounded-full shadow-lg"
                                            >
                                                {badge}
                                            </span>
                                        ))}
                                        {spiceLevel && (
                                            <span className="px-3 lg:px-2 py-1 bg-red-500 text-white text-xs lg:text-xs font-semibold rounded-full shadow-lg flex items-center">
                                                <Icon name="fire" className="mr-1" />
                                                {spiceLevel}
                                            </span>
                                        )}
                                    </div>

                                    {/* Zoom Indicator */}
                                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 lg:px-2 py-1 rounded-full text-xs">
                                        <Icon name={isImageZoomed ? "minus" : "plus"} className="mr-1" />
                                        {isImageZoomed ? 'Zoom Out' : 'Zoom In'}
                                    </div>
                                </div>

                                {/* Thumbnail Strip */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 lg:p-3">
                                        <div className="flex space-x-2 overflow-x-auto">
                                            {images.map((img, index) => (
                                                <button
                                                    key={index}
                                                    className={`flex-shrink-0 w-16 h-16 lg:w-12 lg:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                                        index === activeImageIndex
                                                            ? 'border-white shadow-lg scale-105'
                                                            : 'border-white/50 hover:border-white/75'
                                                    }`}
                                                    onClick={() => setActiveImageIndex(index)}
                                                >
                                                    <img 
                                                        src={img} 
                                                        alt={`${name} ${index + 1}`} 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://picsum.photos/seed/thumb-placeholder/200/200.jpg';
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content Column - Right on Desktop, Bottom on Mobile */}
                        <div className="space-y-6 lg:space-y-4">
                            {/* Basic Info */}
                            <div className="bg-white rounded-2xl p-6 lg:p-4 shadow-sm">
                                <div className="flex items-start justify-between mb-4 lg:mb-3">
                                    <div className="flex-1">
                                        <h1 className="text-2xl lg:text-xl font-bold text-gray-900 mb-2 lg:mb-1">{name}</h1>
                                        <p className="text-gray-600 text-base lg:text-sm leading-relaxed">{description}</p>
                                    </div>
                                    <div className="text-right ml-4">
                                        <div className="text-3xl lg:text-xl font-bold text-orange-500 mb-1">
                                            {BD_CONTEXT.currencySymbol}{selectedVariant ? selectedVariant.price : price}
                                        </div>
                                        {selectedVariant && (
                                            <div className="text-sm lg:text-xs text-gray-500">
                                                {selectedVariant.name}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Rating and Reviews */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 lg:space-x-2">
                                        <div className="flex items-center space-x-1">
                                            {renderStars(Math.floor(rating))}
                                            <span className="text-sm lg:text-xs text-gray-600 ml-1">
                                                {rating} ({reviewCount} reviews)
                                            </span>
                                        </div>
                                    </div>

                                    {prepTime && (
                                        <div className="flex items-center text-sm lg:text-xs text-gray-600">
                                            <Icon name="clock" className="mr-1" />
                                            {prepTime} min
                                        </div>
                                    )}
                                </div>
                            </div>

                        {/* Variants */}
                        {variants && variants.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 lg:p-4 shadow-sm">
                                <h3 className="text-lg lg:text-base font-semibold text-gray-900 mb-4 lg:mb-3">Choose Your Size</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-2">
                                    {variants.map(variant => (
                                        <button
                                            key={variant.name}
                                            className={`p-4 lg:p-3 border-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                                                selectedVariant && selectedVariant.name === variant.name
                                                    ? 'border-orange-500 bg-orange-50 shadow-md'
                                                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                                            }`}
                                            onClick={() => setSelectedVariant(variant)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-base lg:text-sm">{variant.name}</div>
                                                    {variant.description && (
                                                        <div className="text-sm lg:text-xs text-gray-600 mt-1">{variant.description}</div>
                                                    )}
                                                </div>
                                                <div className="text-lg lg:text-base font-bold text-orange-500">
                                                    {BD_CONTEXT.currencySymbol}{variant.price}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add-ons */}
                        {addons && addons.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 lg:p-4 shadow-sm">
                                <h3 className="text-lg lg:text-base font-semibold text-gray-900 mb-4 lg:mb-3">Customize Your Order</h3>
                                <div className="space-y-3 lg:space-y-2">
                                    {addons.map(addon => {
                                        const isSelected = selectedAddons.find(a => a.name === addon.name);
                                        return (
                                            <button
                                                key={addon.name}
                                                className={`w-full p-4 lg:p-3 border-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                                                    isSelected
                                                        ? 'border-green-500 bg-green-50 shadow-md'
                                                        : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                                                }`}
                                                onClick={() => toggleAddon(addon)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <div className={`w-5 h-5 lg:w-4 lg:h-4 rounded border-2 mr-3 flex items-center justify-center ${
                                                            isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'
                                                        }`}>
                                                            {isSelected && <Icon name="check" className="text-white text-xs" />}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900 text-base lg:text-sm">{addon.name}</div>
                                                            {addon.description && (
                                                                <div className="text-sm lg:text-xs text-gray-600 mt-1">{addon.description}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-lg lg:text-base font-bold text-green-500">
                                                        +{BD_CONTEXT.currencySymbol}{addon.price}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Nutritional Information */}
                        {nutrition && (
                            <div className="bg-white rounded-2xl p-6 lg:p-4 shadow-sm">
                                <h3 className="text-lg lg:text-base font-semibold text-gray-900 mb-4 lg:mb-3">Nutritional Information</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-3">
                                    {Object.entries(nutrition).map(([key, value]) => (
                                        <div key={key} className="text-center">
                                            <div className="text-2xl lg:text-lg font-bold text-orange-500">{value}</div>
                                            <div className="text-sm lg:text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Allergens */}
                        {allergens && allergens.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 lg:p-4 shadow-sm">
                                <h3 className="text-lg lg:text-base font-semibold text-gray-900 mb-4 lg:mb-3 flex items-center">
                                    <Icon name="exclamationTriangle" className="mr-2 text-yellow-500" />
                                    Allergens
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {allergens.map((allergen, index) => (
                                        <span
                                            key={index}
                                            className="px-3 lg:px-2 py-1 bg-yellow-100 text-yellow-800 text-sm lg:text-xs rounded-full"
                                        >
                                            {allergen}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Bottom Action Bar */}
                        <div className="bg-white rounded-2xl p-4 lg:p-3 shadow-sm mt-6 lg:mt-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between mb-4 lg:mb-3">
                                <div className="flex items-center space-x-4 lg:space-x-3">
                                    <span className="font-semibold text-gray-900 text-base lg:text-sm">Quantity</span>
                                    <div className="flex items-center bg-gray-100 rounded-full p-1">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                                            aria-label="Decrease quantity"
                                        >
                                            <Icon name="minus" className="text-gray-700 text-sm lg:text-xs" />
                                        </button>
                                        <span className="mx-4 lg:mx-3 text-lg lg:text-base font-semibold min-w-[2rem] text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
                                            aria-label="Increase quantity"
                                        >
                                            <Icon name="plus" className="text-gray-700 text-sm lg:text-xs" />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-sm lg:text-xs text-gray-600">Total</div>
                                    <div className="text-2xl lg:text-lg font-bold text-orange-500">
                                        {BD_CONTEXT.currencySymbol}{calculatePrice()}
                                    </div>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 lg:py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg lg:text-base rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl button-ripple"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <Icon name="plus" className="text-xl lg:text-lg" />
                                    <span>Add to Cart</span>
                                    <span className="text-sm lg:text-xs opacity-90">• {BD_CONTEXT.currencySymbol}{calculatePrice()}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

// Cart Component
const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }) => {
    const [promoCode, setPromoCode] = React.useState('');
    const [promoApplied, setPromoApplied] = React.useState(null);
    const [orderType, setOrderType] = React.useState('dine-in');
    const [tableNumber, setTableNumber] = React.useState('');
    const [deliveryAddress, setDeliveryAddress] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState('');
    const [isApplyingPromo, setIsApplyingPromo] = React.useState(false);

    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + (item.totalPrice || 0), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * BD_CONTEXT.taxRate;
    };

    const calculateServiceCharge = () => {
        return calculateSubtotal() * BD_CONTEXT.serviceChargeRate;
    };

    const calculateDeliveryFee = () => {
        return orderType === 'delivery' ? BD_CONTEXT.deliveryFee : 0;
    };

    const calculateDiscount = () => {
        if (!promoApplied) return 0;

        const subtotal = calculateSubtotal();
        if (promoApplied.type === 'fixed') {
            return Math.min(promoApplied.value, subtotal);
        } else if (promoApplied.type === 'percentage') {
            return subtotal * promoApplied.value;
        } else if (promoApplied.type === 'shipping' && orderType === 'delivery') {
            return calculateDeliveryFee();
        }
        return 0;
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const tax = calculateTax();
        const serviceCharge = calculateServiceCharge();
        const deliveryFee = calculateDeliveryFee();
        const discount = calculateDiscount();

        return subtotal + tax + serviceCharge + deliveryFee - discount;
    };

    const applyPromoCode = async () => {
        if (!promoCode.trim()) return;

        setIsApplyingPromo(true);
        // Simulate API call delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        const code = promoCode.toUpperCase();
        const promo = BD_CONTEXT.promoCodes[code];
        if (promo && calculateSubtotal() >= promo.minOrder) {
            setPromoApplied(promo);
        } else {
            setPromoApplied(null);
        }
        setIsApplyingPromo(false);
    };

    const handleCheckout = () => {
        const orderData = {
            items,
            subtotal: calculateSubtotal(),
            tax: calculateTax(),
            serviceCharge: calculateServiceCharge(),
            deliveryFee: calculateDeliveryFee(),
            discount: calculateDiscount(),
            total: calculateTotal(),
            orderType,
            tableNumber: orderType === 'dine-in' ? tableNumber : null,
            deliveryAddress: orderType === 'delivery' ? deliveryAddress : null,
            contactNumber,
            promoApplied
        };
        onCheckout(orderData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-50 to-white">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100">
                <div className="flex items-center justify-between p-4 lg:max-w-6xl lg:mx-auto">
                    <button
                        onClick={onClose}
                        className="p-3 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                        aria-label="Close cart"
                    >
                        <Icon name="times" className="text-gray-600 text-lg" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <Icon name="shoppingCart" className="text-orange-500 text-xl" />
                        <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                        {items.length > 0 && (
                            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                {items.length}
                            </span>
                        )}
                    </div>
                    <div className="w-12"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                    <div className="lg:max-w-6xl lg:mx-auto px-4 py-8">
                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                                    <Icon name="shoppingCart" className="text-4xl text-orange-400" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                                    <Icon name="plus" className="text-white text-sm" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                {t('add_delicious_items')}
                            </p>
                            <button
                                onClick={onClose}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <Icon name="utensils" className="mr-2" />
                                {t('browse_menu')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="lg:max-w-6xl lg:mx-auto">
                        {/* Cart Items */}
                        <div className="p-4 space-y-4">
                            {items.map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 transition-all duration-200 hover:shadow-md">
                                    <div className="flex items-start space-x-4">
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-xl shadow-sm"
                                                onError={(e) => {
                                                    e.target.src = 'https://picsum.photos/seed/cart-placeholder/300/200.jpg';
                                                }}
                                            />
                                            {item.quantity > 1 && (
                                                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                                                    {item.quantity}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate">{item.name}</h3>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                {item.variant && (
                                                    <p className="flex items-center">
                                                        <Icon name="tag" className="mr-1 text-gray-400" />
                                                        {item.variant.name}
                                                    </p>
                                                )}
                                                {item.addons && item.addons.length > 0 && (
                                                    <p className="flex items-center">
                                                        <Icon name="plus" className="mr-1 text-gray-400" />
                                                        {item.addons.map(a => a.name).join(', ')}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-lg font-bold text-orange-600">
                                                    {BD_CONTEXT.currencySymbol}{item.totalPrice?.toFixed(2)}
                                                </span>
                                                <div className="flex items-center bg-gray-50 rounded-xl p-1">
                                                    <button
                                                        onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                                                        className="w-8 h-8 rounded-lg bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Icon name="minus" className="text-gray-600 text-sm" />
                                                    </button>
                                                    <span className="mx-3 font-semibold text-gray-800 min-w-[2rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-lg bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Icon name="plus" className="text-gray-600 text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onRemoveItem(index)}
                                            className="p-2 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 transform hover:scale-110"
                                            aria-label="Remove item"
                                        >
                                            <Icon name="trash" className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Details */}
                        <div className="px-4 pb-4 space-y-6">
                            {/* Order Type */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                    <Icon name="clipboardList" className="mr-2 text-orange-500" />
                                    Order Type
                                </h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'dine-in', label: 'Dine-in', icon: 'utensils' },
                                        { value: 'takeaway', label: 'Takeaway', icon: 'shoppingBag' },
                                        { value: 'delivery', label: 'Delivery', icon: 'truck' }
                                    ].map(({ value, label, icon }) => (
                                        <label key={value} className="relative">
                                            <input
                                                type="radio"
                                                name="orderType"
                                                value={value}
                                                checked={orderType === value}
                                                onChange={(e) => setOrderType(e.target.value)}
                                                className="sr-only peer"
                                            />
                                            <div className="flex flex-col items-center p-3 rounded-xl border-2 border-gray-200 peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all duration-200 cursor-pointer hover:border-orange-300">
                                                <Icon name={icon} className="text-gray-600 peer-checked:text-orange-500 mb-1" />
                                                <span className="text-sm font-medium text-gray-700 peer-checked:text-orange-700">{label}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Conditional Fields */}
                            {orderType === 'dine-in' && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                        <Icon name="table" className="mr-2 text-orange-500" />
                                        Table Number
                                    </label>
                                    <input
                                        type="text"
                                        value={tableNumber}
                                        onChange={(e) => setTableNumber(e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your table number"
                                    />
                                </div>
                            )}

                            {orderType === 'delivery' && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                            <Icon name="mapMarkerAlt" className="mr-2 text-orange-500" />
                                            Delivery Address
                                        </label>
                                        <textarea
                                            value={deliveryAddress}
                                            onChange={(e) => setDeliveryAddress(e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                                            rows="3"
                                            placeholder="Enter your full delivery address"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                            <Icon name="phone" className="mr-2 text-orange-500" />
                                            {t('contact_number')}
                                        </label>
                                        <input
                                            type="tel"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            placeholder={t('enter_contact_number')}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Promo Code */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <Icon name="ticket" className="mr-2 text-orange-500" />
                                    Promo Code
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter promo code"
                                        disabled={isApplyingPromo}
                                    />
                                    <button
                                        onClick={applyPromoCode}
                                        disabled={isApplyingPromo || !promoCode.trim()}
                                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:transform-none"
                                    >
                                        {isApplyingPromo ? (
                                            <Icon name="spinner" className="animate-spin" />
                                        ) : (
                                            'Apply'
                                        )}
                                    </button>
                                </div>
                                {promoApplied && (
                                    <div className="mt-2 flex items-center text-green-600 text-sm font-medium">
                                        <Icon name="checkCircle" className="mr-1" />
                                        Promo code applied! {promoApplied.description}
                                    </div>
                                )}
                                {!promoApplied && promoCode && !isApplyingPromo && (
                                    <div className="mt-2 flex items-center text-red-500 text-sm">
                                        <Icon name="exclamationTriangle" className="mr-1" />
                                        Invalid promo code or minimum order not met
                                    </div>
                                )}
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                                    <Icon name="receipt" className="mr-2 text-orange-500" />
                                    Order Summary
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">{BD_CONTEXT.currencySymbol}{calculateSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Tax ({(BD_CONTEXT.taxRate * 100).toFixed(0)}%)</span>
                                        <span>{BD_CONTEXT.currencySymbol}{calculateTax().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Service Charge ({(BD_CONTEXT.serviceChargeRate * 100).toFixed(0)}%)</span>
                                        <span>{BD_CONTEXT.currencySymbol}{calculateServiceCharge().toFixed(2)}</span>
                                    </div>
                                    {orderType === 'delivery' && (
                                        <div className="flex justify-between text-gray-600 text-sm">
                                            <span>Delivery Fee</span>
                                            <span>{BD_CONTEXT.currencySymbol}{calculateDeliveryFee()}</span>
                                        </div>
                                    )}
                                    {calculateDiscount() > 0 && (
                                        <div className="flex justify-between text-green-600 font-medium">
                                            <span>Discount ({promoApplied?.code})</span>
                                            <span>-{BD_CONTEXT.currencySymbol}{calculateDiscount().toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="flex justify-between text-xl font-bold text-gray-800">
                                            <span>Total</span>
                                            <span className="text-orange-600">{BD_CONTEXT.currencySymbol}{calculateTotal().toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={
                                            (orderType === 'dine-in' && !tableNumber.trim()) ||
                                            (orderType === 'delivery' && (!deliveryAddress.trim() || !contactNumber.trim()))
                                        }
                                    >
                                        <div className="flex items-center justify-center">
                                            <Icon name="creditCard" className="mr-2 text-xl" />
                                            Go to Checkout • {BD_CONTEXT.currencySymbol}{calculateTotal().toFixed(2)}
                                        </div>
                                    </button>
                                    {((orderType === 'dine-in' && !tableNumber.trim()) ||
                                      (orderType === 'delivery' && (!deliveryAddress.trim() || !contactNumber.trim()))) && (
                                        <p className="text-center text-red-500 text-sm mt-3">
                                            Please fill in all required fields to proceed
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Home Component
const Home = ({ onBranchSelect }) => {
    const { t } = window.useTranslation();
    const [branches, setBranches] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterOpen, setFilterOpen] = React.useState(false);

    React.useEffect(() => {
        // Load branches from localStorage
        const loadedBranches = storage.get('branches', []);
        setBranches(loadedBranches);
        setLoading(false);
    }, []);

    // Filter branches based on search term and open status
    const filteredBranches = branches.filter(branch => {
        const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            branch.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !filterOpen || branch.isOpen;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header title={t('smart_qr_menu')} showLanguageToggle />

            {/* Enhanced Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 min-h-[60vh] flex items-center">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-12 left-6 w-56 h-56 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-12 right-6 w-72 h-72 bg-orange-300/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-orange-200/10 to-pink-200/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
                </div>

                {/* Floating food icons */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-12 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Icon name="utensils" className="text-white text-xs" />
                        </div>
                    </div>
                    <div className="absolute top-28 right-20 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
                        <div className="w-4 h-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Icon name="star" className="text-yellow-300 text-xs" />
                        </div>
                    </div>
                    <div className="absolute bottom-24 left-20 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>
                        <div className="w-5 h-5 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Icon name="heart" className="text-pink-300 text-xs" />
                        </div>
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16 w-full">
                    <div className="text-center text-white">
                        {/* Main QR Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-white/15 backdrop-blur-md rounded-xl mb-4 hero-float shadow-2xl border border-white/20">
                            <Icon name="qrcode" className="text-3xl lg:text-4xl text-white drop-shadow-lg" />
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl lg:text-5xl xl:text-6xl font-black mb-3 leading-tight tracking-tight">
                            Welcome to Our
                            <span className="block bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                                Restaurant
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base lg:text-lg xl:text-xl mb-6 text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
                            {t('discover_authentic_cuisine')}
                            <span className="block mt-1 text-yellow-200 font-medium text-sm lg:text-base">
                                Fresh ingredients • Traditional flavors • Modern convenience
                            </span>
                        </p>

                        {/* Feature Highlights */}
                        <div className="flex flex-col lg:flex-row gap-3 justify-center items-center mb-6">
                            <div className="group flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg">
                                <div className="w-8 h-8 bg-green-400/20 rounded-md flex items-center justify-center mr-2 group-hover:bg-green-400/30 transition-colors">
                                    <Icon name="qrcode" className="text-green-300 text-base" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-sm text-white">Scan QR Code</div>
                                    <div className="text-white/80 text-xs">Order instantly</div>
                                </div>
                            </div>

                            <div className="group flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg">
                                <div className="w-8 h-8 bg-blue-400/20 rounded-md flex items-center justify-center mr-2 group-hover:bg-blue-400/30 transition-colors">
                                    <Icon name="mapMarkerAlt" className="text-blue-300 text-base" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-sm text-white">Find Branches</div>
                                    <div className="text-white/80 text-xs">Nearby locations</div>
                                </div>
                            </div>

                            <div className="group flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg">
                                <div className="w-8 h-8 bg-purple-400/20 rounded-md flex items-center justify-center mr-2 group-hover:bg-purple-400/30 transition-colors">
                                    <Icon name="truck" className="text-purple-300 text-base" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-sm text-white">Quick Delivery</div>
                                    <div className="text-white/80 text-xs">Hot & fresh</div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center">
                            <button 
                                onClick={() => document.getElementById('branch-selection').scrollIntoView({ behavior: 'smooth' })}
                                className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 font-bold text-base px-8 py-3 rounded-lg shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 transform cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center">
                                    <Icon name="arrowRight" className="mr-2 text-lg group-hover:translate-x-1 transition-transform" />
                                    {t('explore_our_menu')}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>

            {/* Search and Filter Section */}
            <div id="branch-selection" className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Branch</h2>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Icon name="search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search branches by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-lg"
                        />
                    </div>

                    {/* Filter Toggle */}
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${
                                filterOpen
                                    ? 'bg-orange-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <Icon name="filter" className="mr-2" />
                            {filterOpen ? 'Showing Open Branches' : 'Show Only Open Branches'}
                        </button>
                    </div>

                    {/* Branch Grid */}
                    {filteredBranches.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBranches.map(branch => (
                                <BranchCard
                                    key={branch.id}
                                    branch={branch}
                                    onSelect={onBranchSelect}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Icon name="search" className="text-6xl text-gray-300 mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No branches found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>

                {/* Quick Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 pulse-gentle">
                            <Icon name="checkCircle" className="text-2xl text-green-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Fast Ordering</h3>
                        <p className="text-gray-600">{t('order_in_seconds')}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 pulse-gentle" style={{animationDelay: '1s'}}>
                            <Icon name="star" className="text-2xl text-blue-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Quality Assured</h3>
                        <p className="text-gray-600">Fresh ingredients and authentic flavors guaranteed</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 pulse-gentle" style={{animationDelay: '2s'}}>
                            <Icon name="truck" className="text-2xl text-purple-600" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Quick Delivery</h3>
                        <p className="text-gray-600">Hot and fresh food delivered to your table</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Footer Component
const Footer = () => {
    const { t } = window.useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10">
                {/* Desktop Footer */}
                <div className="hidden lg:block">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Brand Section */}
                            <div className="lg:col-span-1">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <Icon name="qrcode" className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                            {t('smart_qr_menu')}
                                        </h3>
                                        <p className="text-sm text-gray-400">{t('bangladesh_restaurant')}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                    {t('experience_authentic_cuisine')}
                                    Fresh ingredients, traditional flavors, and modern convenience.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <Icon name="facebook" className="text-gray-400 hover:text-white text-lg" />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <Icon name="instagram" className="text-gray-400 hover:text-white text-lg" />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <Icon name="twitter" className="text-gray-400 hover:text-white text-lg" />
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                        <Icon name="youtube" className="text-gray-400 hover:text-white text-lg" />
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            {t('our_menu')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            Locations
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            Catering
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            Gift Cards
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Customer Service */}
                            <div>
                                <h4 className="text-lg font-semibold mb-6 text-white">Customer Service</h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            {t('contact_us')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            {t('faq')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            Terms of Service
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">
                                            Refund Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h4 className="text-lg font-semibold mb-6 text-white">{t('contact_info')}</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Icon name="mapMarker" className="text-orange-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-gray-300 text-sm">
                                                123 Gulshan Avenue<br />
                                                Dhaka, Bangladesh 1212
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Icon name="phone" className="text-orange-400 flex-shrink-0" />
                                        <p className="text-gray-300 text-sm">+880 1234-567890</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Icon name="envelope" className="text-orange-400 flex-shrink-0" />
                                        <p className="text-gray-300 text-sm">info@bangladeshrestaurant.com</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Icon name="clock" className="text-orange-400 flex-shrink-0" />
                                        <p className="text-gray-300 text-sm">Mon-Sun: 11AM - 11PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className="lg:hidden">
                    <div className="px-6 py-8">
                        {/* Brand Section */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <Icon name="qrcode" className="text-white text-lg" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                        Smart QR Menu
                                    </h3>
                                    <p className="text-xs text-gray-400">{t('bangladesh_restaurant')}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                                Experience authentic Bangladeshi cuisine with our innovative QR menu system.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="text-center">
                                <Icon name="mapMarker" className="text-orange-400 text-2xl mb-2 mx-auto" />
                                <p className="text-gray-300 text-sm">
                                    123 Gulshan Avenue<br />
                                    Dhaka, Bangladesh 1212
                                </p>
                            </div>
                            <div className="text-center">
                                <Icon name="phone" className="text-orange-400 text-2xl mb-2 mx-auto" />
                                <p className="text-gray-300 text-sm">
                                    +880 1234-567890<br />
                                    Mon-Sun: 11AM - 11PM
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center space-x-4 mb-8">
                            <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Icon name="facebook" className="text-gray-400 hover:text-white text-lg" />
                            </a>
                            <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Icon name="instagram" className="text-gray-400 hover:text-white text-lg" />
                            </a>
                            <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Icon name="twitter" className="text-gray-400 hover:text-white text-lg" />
                            </a>
                            <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Icon name="youtube" className="text-gray-400 hover:text-white text-lg" />
                            </a>
                        </div>

                        {/* Quick Links */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div>
                                <h5 className="text-sm font-semibold mb-3 text-white">Quick Links</h5>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-xs">About Us</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-xs">{t('our_menu')}</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-xs">Locations</a></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold mb-3 text-white">Support</h5>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-xs">{t('contact')}</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-xs">FAQ</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-xs">Privacy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm text-center md:text-left">
                                © {currentYear} {t('bangladesh_restaurant')} {t('all_rights_reserved')}
                            </p>
                            <div className="flex items-center space-x-6 mt-2 md:mt-0">
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    {t('privacy_policy')}
                                </a>
                                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                                    {t('terms_of_service')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};