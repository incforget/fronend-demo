// ==================== ADDITIONAL COMPONENTS ====================

// Checkout Progress Indicator
const CheckoutProgress = ({ currentStep }) => {
    const steps = [
        { id: 'cart', label: 'Cart', icon: 'shoppingCart' },
        { id: 'checkout', label: 'Checkout', icon: 'creditCard' },
        { id: 'confirmation', label: 'Confirmation', icon: 'check' }
    ];

    return (
        <div className="mb-8">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className={`flex flex-col items-center ${currentStep === step.id ? 'text-orange-500' : currentStep === 'confirmation' && index < 2 ? 'text-green-500' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                                currentStep === step.id 
                                    ? 'bg-orange-500 text-white shadow-lg scale-110' 
                                    : currentStep === 'confirmation' && index < 2 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-gray-200 text-gray-500'
                            }`}>
                                <Icon name={step.icon} className="text-sm" />
                            </div>
                            <span className={`text-xs font-medium ${currentStep === step.id ? 'text-orange-600' : ''}`}>
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                                currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-200'
                            }`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// Enhanced Input Component
const FormInput = ({ 
    label, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    required = false, 
    icon, 
    error,
    mask,
    ...props 
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [localValue, setLocalValue] = React.useState(value);

    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e) => {
        let newValue = e.target.value;
        
        // Apply mask if provided
        if (mask) {
            newValue = mask(newValue);
        }
        
        setLocalValue(newValue);
        onChange(newValue);
    };

    return (
        <div className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Icon name={icon} className="text-sm" />
                    </div>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={localValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full p-4 ${icon ? 'pl-10' : 'pl-4'} pr-4 border rounded-xl transition-all duration-200 ${
                        error 
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 bg-white focus:border-orange-500 focus:ring-orange-200'
                    } focus:outline-none focus:ring-2 text-gray-900 placeholder-gray-500`}
                    {...props}
                />
                {error && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                        <Icon name="exclamationTriangle" className="text-sm" />
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                    <Icon name="exclamationTriangle" className="mr-1 text-xs" />
                    {error}
                </p>
            )}
        </div>
    );
};

// Payment Method Card
const PaymentMethodCard = ({ 
    id, 
    title, 
    description, 
    icon, 
    selected, 
    onSelect, 
    children 
}) => {
    return (
        <div 
            onClick={() => onSelect(id)}
            role="button"
            tabIndex={0}
            aria-label={`Payment method: ${title}`}
            aria-pressed={selected}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(id);
                }
            }}
            className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selected 
                    ? 'border-orange-500 bg-orange-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
        >
            <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${selected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <Icon name={icon} className="text-lg" />
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                    {children}
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                }`}>
                    {selected && <Icon name="check" className="text-white text-xs" />}
                </div>
            </div>
        </div>
    );
};

// Checkout Component
const Checkout = ({ orderData, onBack, onPlaceOrder }) => {
    const { t } = window.useTranslation();
    const [customerInfo, setCustomerInfo] = React.useState({
        name: '',
        phone: '',
        email: ''
    });
    const [paymentMethod, setPaymentMethod] = React.useState('cod');
    const [cardInfo, setCardInfo] = React.useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [touched, setTouched] = React.useState({});

    React.useEffect(() => {
        // Load customer info from localStorage if available
        const profile = storage.get('userProfile');
        if (profile) {
            setCustomerInfo({
                name: profile.name || '',
                phone: profile.phone || '',
                email: profile.email || ''
            });
        }
    }, []);

    // Input masks
    const phoneMask = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 11) {
            return cleaned.replace(/(\d{4})(\d{3})?(\d{4})?/, (match, p1, p2, p3) => {
                let result = p1;
                if (p2) result += '-' + p2;
                if (p3) result += '-' + p3;
                return result;
            });
        }
        return value;
    };

    const cardNumberMask = (value) => {
        const cleaned = value.replace(/\D/g, '');
        return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
    };

    const expiryMask = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    // Validation
    const validateField = (name, value) => {
        const newErrors = { ...errors };
        
        switch (name) {
            case 'name':
                if (!value.trim()) {
                    newErrors.name = 'Full name is required';
                } else if (value.trim().length < 2) {
                    newErrors.name = 'Name must be at least 2 characters';
                } else {
                    delete newErrors.name;
                }
                break;
            case 'phone':
                const phoneRegex = /^01[3-9]\d{8}$/;
                if (!value) {
                    newErrors.phone = 'Phone number is required';
                } else if (!phoneRegex.test(value.replace(/-/g, ''))) {
                    newErrors.phone = 'Please enter a valid Bangladeshi phone number';
                } else {
                    delete newErrors.phone;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    newErrors.email = 'Please enter a valid email address';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'cardNumber':
                if (!value) {
                    newErrors.cardNumber = 'Card number is required';
                } else if (value.replace(/\s/g, '').length !== 16) {
                    newErrors.cardNumber = 'Card number must be 16 digits';
                } else {
                    delete newErrors.cardNumber;
                }
                break;
            case 'cardExpiry':
                if (!value) {
                    newErrors.cardExpiry = 'Expiry date is required';
                } else if (!/^\d{2}\/\d{2}$/.test(value)) {
                    newErrors.cardExpiry = 'Please enter MM/YY format';
                } else {
                    delete newErrors.cardExpiry;
                }
                break;
            case 'cardCvv':
                if (!value) {
                    newErrors.cardCvv = 'CVV is required';
                } else if (value.length < 3 || value.length > 4) {
                    newErrors.cardCvv = 'CVV must be 3 or 4 digits';
                } else {
                    delete newErrors.cardCvv;
                }
                break;
            case 'cardName':
                if (!value.trim()) {
                    newErrors.cardName = 'Cardholder name is required';
                } else {
                    delete newErrors.cardName;
                }
                break;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFieldChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            if (parent === 'customerInfo') {
                setCustomerInfo(prev => ({ ...prev, [child]: value }));
                if (touched[field]) validateField(child, value);
            } else if (parent === 'cardInfo') {
                setCardInfo(prev => ({ ...prev, [child]: value }));
                if (touched[field]) validateField(field.replace('.', ''), value);
            }
        } else {
            setCustomerInfo(prev => ({ ...prev, [field]: value }));
            if (touched[field]) validateField(field, value);
        }
    };

    const handleFieldBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        let value;
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            value = parent === 'customerInfo' ? customerInfo[child] : cardInfo[child];
            validateField(field.replace('.', ''), value);
        } else {
            value = customerInfo[field];
            validateField(field, value);
        }
    };

    const handlePlaceOrder = async () => {
        // Validate all fields
        const fieldsToValidate = ['name', 'phone'];
        if (customerInfo.email) fieldsToValidate.push('email');
        if (paymentMethod === 'card') {
            fieldsToValidate.push('cardNumber', 'cardExpiry', 'cardCvv', 'cardName');
        }
        
        let hasErrors = false;
        fieldsToValidate.forEach(field => {
            const value = field.startsWith('card') ? cardInfo[field.replace('card', '').toLowerCase()] : customerInfo[field];
            if (!validateField(field, value)) hasErrors = true;
        });
        
        if (hasErrors) {
            setTouched({
                name: true, phone: true, email: true,
                'cardInfo.number': true, 'cardInfo.expiry': true, 'cardInfo.cvv': true, 'cardInfo.name': true
            });
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create order object
        const order = {
            id: 'ORD' + Date.now(),
            timestamp: new Date().toISOString(),
            customer: customerInfo,
            items: orderData.items,
            subtotal: orderData.subtotal,
            tax: orderData.tax,
            serviceCharge: orderData.serviceCharge,
            deliveryFee: orderData.deliveryFee,
            discount: orderData.discount,
            total: orderData.total,
            orderType: orderData.orderType,
            tableNumber: orderData.tableNumber,
            deliveryAddress: orderData.deliveryAddress,
            paymentMethod,
            status: 'received'
        };

        // Save order to localStorage
        const orders = storage.get('orders', []);
        orders.push(order);
        storage.set('orders', orders);

        // Save customer profile
        storage.set('userProfile', customerInfo);

        // Clear cart
        storage.set('cart', []);

        setIsProcessing(false);
        onPlaceOrder(order);
    };

    const isFormValid = () => {
        if (!customerInfo.name || !customerInfo.phone) return false;
        if (orderData.orderType === 'dine-in' && !orderData.tableNumber) return false;
        if (orderData.orderType === 'delivery' && !orderData.deliveryAddress) return false;
        if (paymentMethod === 'card' && (!cardInfo.number || !cardInfo.expiry || !cardInfo.cvv || !cardInfo.name)) return false;
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
            <Header title="Secure Checkout" showBack onBackClick={onBack} />
            
            <div className="max-w-6xl mx-auto p-4 pb-24">
                <CheckoutProgress currentStep="checkout" />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary - Enhanced */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Icon name="receipt" className="text-orange-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg">Order Summary</h3>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-4 mb-6">
                                    {orderData.items.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                            <div className="w-12 h-12 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = 'https://picsum.photos/seed/placeholder/300/200.jpg';
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">{BD_CONTEXT.currencySymbol}{item.totalPrice.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">{BD_CONTEXT.currencySymbol}{orderData.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax ({(BD_CONTEXT.taxRate * 100).toFixed(0)}%)</span>
                                        <span className="font-medium">{BD_CONTEXT.currencySymbol}{orderData.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Service Charge ({(BD_CONTEXT.serviceChargeRate * 100).toFixed(0)}%)</span>
                                        <span className="font-medium">{BD_CONTEXT.currencySymbol}{orderData.serviceCharge.toFixed(2)}</span>
                                    </div>
                                    {orderData.orderType === 'delivery' && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Delivery Fee</span>
                                            <span className="font-medium">{BD_CONTEXT.currencySymbol}{orderData.deliveryFee}</span>
                                        </div>
                                    )}
                                    {orderData.discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount</span>
                                            <span className="font-medium">-{BD_CONTEXT.currencySymbol}{orderData.discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-orange-600">{BD_CONTEXT.currencySymbol}{orderData.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Icon name="user" className="text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg">Customer Information</h3>
                                </div>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <FormInput
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    value={customerInfo.name}
                                    onChange={(value) => handleFieldChange('name', value)}
                                    onBlur={() => handleFieldBlur('name')}
                                    required
                                    icon="user"
                                    error={touched.name && errors.name}
                                />
                                
                                <FormInput
                                    label="Phone Number"
                                    placeholder="01XX-XXX-XXXX"
                                    value={customerInfo.phone}
                                    onChange={(value) => handleFieldChange('phone', value)}
                                    onBlur={() => handleFieldBlur('phone')}
                                    required
                                    icon="phone"
                                    error={touched.phone && errors.phone}
                                    mask={phoneMask}
                                />
                                
                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={customerInfo.email}
                                    onChange={(value) => handleFieldChange('email', value)}
                                    onBlur={() => handleFieldBlur('email')}
                                    icon="envelope"
                                    error={touched.email && errors.email}
                                />
                            </div>
                        </div>

                        {/* Order Type Specific Fields */}
                        {orderData.orderType === 'dine-in' && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Icon name="table" className="text-green-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg">Table Information</h3>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <FormInput
                                        label="Table Number"
                                        placeholder="Enter table number"
                                        value={orderData.tableNumber}
                                        onChange={() => {}}
                                        icon="table"
                                        readOnly
                                    />
                                </div>
                            </div>
                        )}

                        {orderData.orderType === 'delivery' && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Icon name="mapMarkerAlt" className="text-purple-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg">Delivery Information</h3>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Delivery Address <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-3 text-gray-400">
                                                <Icon name="mapMarkerAlt" className="text-sm" />
                                            </div>
                                            <textarea
                                                placeholder="Enter your complete delivery address"
                                                value={orderData.deliveryAddress}
                                                onChange={() => {}}
                                                className="w-full p-4 pl-10 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 resize-none"
                                                rows="3"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <Icon name="creditCard" className="text-yellow-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg">Payment Method</h3>
                                    <div className="ml-auto flex items-center text-sm text-gray-600">
                                        <Icon name="lock" className="mr-1 text-green-600" />
                                        Secure
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <PaymentMethodCard
                                    id="cod"
                                    title="Cash on Delivery"
                                    description="Pay when your order arrives at your doorstep"
                                    icon="moneyBillWave"
                                    selected={paymentMethod === 'cod'}
                                    onSelect={setPaymentMethod}
                                />
                                
                                <PaymentMethodCard
                                    id="card"
                                    title="Credit/Debit Card"
                                    description="Pay securely with your card"
                                    icon="creditCard"
                                    selected={paymentMethod === 'card'}
                                    onSelect={setPaymentMethod}
                                >
                                    {paymentMethod === 'card' && (
                                        <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                                            <FormInput
                                                label="Card Number"
                                                placeholder="1234 5678 9012 3456"
                                                value={cardInfo.number}
                                                onChange={(value) => handleFieldChange('cardInfo.number', value)}
                                                onBlur={() => handleFieldBlur('cardInfo.number')}
                                                icon="creditCard"
                                                error={touched['cardInfo.number'] && errors.cardNumber}
                                                mask={cardNumberMask}
                                            />
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormInput
                                                    label="Expiry Date"
                                                    placeholder="MM/YY"
                                                    value={cardInfo.expiry}
                                                    onChange={(value) => handleFieldChange('cardInfo.expiry', value)}
                                                    onBlur={() => handleFieldBlur('cardInfo.expiry')}
                                                    error={touched['cardInfo.expiry'] && errors.cardExpiry}
                                                    mask={expiryMask}
                                                />
                                                
                                                <FormInput
                                                    label="CVV"
                                                    placeholder="123"
                                                    value={cardInfo.cvv}
                                                    onChange={(value) => handleFieldChange('cardInfo.cvv', value)}
                                                    onBlur={() => handleFieldBlur('cardInfo.cvv')}
                                                    error={touched['cardInfo.cvv'] && errors.cardCvv}
                                                    maxLength="4"
                                                />
                                            </div>
                                            
                                            <FormInput
                                                label="Cardholder Name"
                                                placeholder="John Doe"
                                                value={cardInfo.name}
                                                onChange={(value) => handleFieldChange('cardInfo.name', value)}
                                                onBlur={() => handleFieldBlur('cardInfo.name')}
                                                icon="user"
                                                error={touched['cardInfo.name'] && errors.cardName}
                                            />
                                        </div>
                                    )}
                                </PaymentMethodCard>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={!isFormValid() || isProcessing}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                                    isFormValid() && !isProcessing
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="spinner w-5 h-5"></div>
                                        <span>Processing Payment...</span>
                                    </>
                                ) : (
                                    <>
                                        <Icon name="lock" className="text-sm" />
                                        <span>Place Order - {BD_CONTEXT.currencySymbol}{orderData.total.toFixed(2)}</span>
                                    </>
                                )}
                            </button>
                            
                            <div className="mt-4 text-center text-sm text-gray-600">
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="flex items-center">
                                        <Icon name="lock" className="mr-1 text-green-600" />
                                        <span>SSL Secured</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Icon name="shield" className="mr-1 text-blue-600" />
                                        <span>Protected</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};