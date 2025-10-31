// ==================== ORDER TRACKING COMPONENT ====================

// OrderTracking Component
const OrderTracking = ({ order, onBack }) => {
    const { t } = window.useTranslation();
    // Return early if no order is provided
    if (!order) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="exclamationTriangle" className="text-3xl text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
                    <button
                        onClick={onBack}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const getInitialEstimatedTime = (orderType) => {
        const initialTimes = {
            'dine-in': '15-20 mins',
            'takeaway': '15-20 mins',
            'delivery': '20-25 mins'
        };
        return initialTimes[orderType] || '15-20 mins';
    };

    const [currentStatus, setCurrentStatus] = React.useState(order.status || 'received');
    const [estimatedTime, setEstimatedTime] = React.useState(getInitialEstimatedTime(order.orderType));
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        // Simulate status updates based on order type
        const statusUpdates = getStatusSteps();
        const currentIndex = statusUpdates.indexOf(currentStatus);

        if (currentIndex < statusUpdates.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStatus(statusUpdates[currentIndex + 1]);
                // Update estimated time based on status and order type
                updateEstimatedTime(statusUpdates[currentIndex + 1]);
            }, 5000); // Update every 5 seconds for demo

            return () => clearTimeout(timer);
        }
    }, [currentStatus, order.orderType]);

    const updateEstimatedTime = (status) => {
        const timeEstimates = {
            'dine-in': {
                'confirmed': '15-20 mins',
                'preparing': '10-15 mins',
                'ready': '5-10 mins',
                'served': 'Served',
                'completed': 'Completed'
            },
            'takeaway': {
                'confirmed': '15-20 mins',
                'preparing': '10-15 mins',
                'ready-for-pickup': 'Ready for pickup',
                'completed': 'Completed'
            },
            'delivery': {
                'confirmed': '20-25 mins',
                'preparing': '15-20 mins',
                'ready': '10-15 mins',
                'out-for-delivery': '15-20 mins',
                'delivered': 'Delivered',
                'completed': 'Completed'
            }
        };

        const orderTypeEstimates = timeEstimates[order.orderType] || timeEstimates['delivery'];
        setEstimatedTime(orderTypeEstimates[status] || '15-20 mins');
    };

    React.useEffect(() => {
        const statusSteps = getStatusSteps();
        const currentStepIndex = statusSteps.indexOf(currentStatus);
        const newProgress = ((currentStepIndex + 1) / statusSteps.length) * 100;
        setProgress(newProgress);
    }, [currentStatus, order.orderType]);

    const getStatusLabel = (status) => {
        const labels = {
            // Common statuses
            'received': 'Order Received',
            'confirmed': 'Order Confirmed',
            'preparing': 'Preparing Your Food',
            'ready': getReadyLabel(),
            'completed': 'Completed',
            // Dine-in specific
            'served': 'Served at Table',
            // Takeaway specific
            'ready-for-pickup': 'Ready for Pickup',
            // Delivery specific
            'out-for-delivery': 'Out for Delivery',
            'delivered': 'Delivered'
        };
        return labels[status] || status;
    };

    const getReadyLabel = () => {
        if (order.orderType === 'dine-in') return 'Ready to Serve';
        if (order.orderType === 'takeaway') return 'Ready for Pickup';
        return 'Ready for Delivery';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'received': 'receipt',
            'confirmed': 'check',
            'preparing': 'utensils',
            'ready': 'check',
            'ready-for-pickup': 'shoppingBag',
            'served': 'table',
            'out-for-delivery': 'motorcycle',
            'delivered': 'box',
            'completed': 'check'
        };
        return icons[status] || 'clock';
    };

    const getStatusDescription = (status) => {
        const descriptions = {
            'received': 'Your order has been received and is being processed',
            'confirmed': 'Your order has been confirmed and payment processed',
            'preparing': 'Our chefs are preparing your delicious meal with care',
            'ready': 'Your order is ready',
            'ready-for-pickup': 'Your order is ready for pickup at the counter',
            'served': 'Your food has been served at your table. Enjoy your meal!',
            'out-for-delivery': 'Your order is on its way to your location',
            'delivered': 'Your order has been delivered successfully. Enjoy your meal!',
            'completed': 'Thank you for choosing us! We hope to serve you again soon.'
        };
        return descriptions[status] || '';
    };

    const getStatusSteps = () => {
        const statusFlows = {
            'dine-in': ['received', 'confirmed', 'preparing', 'ready', 'served', 'completed'],
            'takeaway': ['received', 'confirmed', 'preparing', 'ready-for-pickup', 'completed'],
            'delivery': ['received', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'completed']
        };
        return statusFlows[order.orderType] || statusFlows['delivery'];
    };

    const statusSteps = getStatusSteps();
    const currentStepIndex = statusSteps.indexOf(currentStatus);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            <Header title="Order Tracking" showBack onBackClick={onBack} />

            {/* Progress Bar */}
            <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Order Progress</span>
                        <span className="text-sm text-orange-600 font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-4 space-y-6">
                {/* Order Status Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden card-hover-lift">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Order #{order.id}</h3>
                            <div className="flex items-center space-x-2 text-orange-100">
                                <Icon name="clock" className="text-lg" />
                                <span className="text-sm">{new Date(order.timestamp).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                                <Icon name={getStatusIcon(currentStatus)} className="text-3xl text-white" />
                            </div>
                            <h4 className="text-2xl font-bold mb-2">{getStatusLabel(currentStatus)}</h4>
                            <p className="text-orange-100 mb-4">{getStatusDescription(currentStatus)}</p>
                            
                            {estimatedTime !== 'Delivered' && (
                                <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                    <Icon name="clock" className="text-lg" />
                                    <span className="font-semibold">{estimatedTime}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="p-6">
                        <div className="relative">
                            {statusSteps.map((step, index) => (
                                <div key={step} className={`flex items-start mb-6 last:mb-0 transition-all duration-500 ${index <= currentStepIndex ? 'opacity-100' : 'opacity-60'}`}>
                                    <div className="relative flex items-center justify-center w-12 h-12 mr-4 flex-shrink-0">
                                        <div className={`timeline-dot ${index <= currentStepIndex ? 'active' : ''}`}></div>
                                        {index < statusSteps.length - 1 && (
                                            <div className={`timeline-line ${index < currentStepIndex ? 'active' : ''}`}></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-semibold text-lg mb-1 ${index <= currentStepIndex ? 'text-gray-800' : 'text-gray-400'}`}>
                                            {getStatusLabel(step)}
                                        </div>
                                        <div className={`text-sm mb-2 ${index <= currentStepIndex ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {getStatusDescription(step)}
                                        </div>
                                        {index === currentStepIndex && currentStatus !== 'completed' && (
                                            <div className="inline-flex items-center space-x-1 text-orange-600 font-medium text-sm">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                                <span>In progress</span>
                                            </div>
                                        )}
                                        {index < currentStepIndex && (
                                            <div className="inline-flex items-center space-x-1 text-green-600 font-medium text-sm">
                                                <Icon name="check" className="text-xs" />
                                                <span>Completed</span>
                                            </div>
                                        )}
                                        {index === currentStepIndex && currentStatus === 'completed' && (
                                            <div className="inline-flex items-center space-x-1 text-green-600 font-medium text-sm">
                                                <Icon name="check" className="text-xs" />
                                                <span>Completed</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Details Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden card-hover-lift">
                    <div className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <Icon name="receipt" className="text-orange-500 text-xl" />
                            <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
                        </div>
                        
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                            <Icon name="utensils" className="text-orange-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800">{item.name}</div>
                                            <div className="text-sm text-gray-500">Quantity: {item.quantity || 1}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-orange-600">{BD_CONTEXT.currencySymbol}{(item.totalPrice || 0).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                                    <span className="text-2xl font-bold text-orange-600">{BD_CONTEXT.currencySymbol}{order.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delivery Information Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden card-hover-lift">
                    <div className="p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <Icon name="mapMarkerAlt" className="text-orange-500 text-xl" />
                            <h3 className="text-xl font-bold text-gray-800">
                                {order.orderType === 'dine-in' ? 'Dining Information' : 
                                 order.orderType === 'takeaway' ? 'Pickup Information' : 'Delivery Information'}
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                                    <Icon name="user" className="text-blue-600" />
                                    <div>
                                        <div className="text-sm text-gray-500">Customer Name</div>
                                        <div className="font-medium text-gray-800">{order.customer.name}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                                    <Icon name="phone" className="text-green-600" />
                                    <div>
                                        <div className="text-sm text-gray-500">Phone Number</div>
                                        <div className="font-medium text-gray-800">{order.customer.phone}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                {order.orderType === 'dine-in' && (
                                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                                        <Icon name="table" className="text-purple-600" />
                                        <div>
                                            <div className="text-sm text-gray-500">Table Number</div>
                                            <div className="font-medium text-gray-800">{order.tableNumber}</div>
                                        </div>
                                    </div>
                                )}
                                
                                {order.orderType === 'takeaway' && (
                                    <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-xl">
                                        <Icon name="store" className="text-indigo-600" />
                                        <div>
                                            <div className="text-sm text-gray-500">Pickup Location</div>
                                            <div className="font-medium text-gray-800">Restaurant Counter</div>
                                        </div>
                                    </div>
                                )}
                                
                                {order.orderType === 'delivery' && (
                                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
                                        <Icon name="mapMarkerAlt" className="text-red-600" />
                                        <div>
                                            <div className="text-sm text-gray-500">Delivery Address</div>
                                            <div className="font-medium text-gray-800">{order.deliveryAddress}</div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl">
                                    <Icon name="creditCard" className="text-yellow-600" />
                                    <div>
                                        <div className="text-sm text-gray-500">Payment Method</div>
                                        <div className="font-medium text-gray-800">
                                            {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Card */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white overflow-hidden">
                    <div className="p-6 text-center">
                        <Icon name="phone" className="text-4xl mb-4 opacity-90" />
                        <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                        <p className="mb-4 opacity-90">Our support team is here to assist you with any questions about your order.</p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                            {t('contact_support')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};