import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Factory, Recycle, Store, Search, Filter, ShoppingCart, Star, Leaf, Plus, Minus, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const EcoShop = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Define a type for cart items
  type CartItem = typeof products[0] & { quantity: number };
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Mumbai, Maharashtra');

  // Indian cities and states for search
  const indianLocations = [
    'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Chennai, Tamil Nadu',
    'Kolkata, West Bengal', 'Hyderabad, Telangana', 'Pune, Maharashtra', 'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan', 'Surat, Gujarat', 'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra', 'Bhopal, Madhya Pradesh',
    'Visakhapatnam, Andhra Pradesh', 'Pimpri-Chinchwad, Maharashtra', 'Patna, Bihar', 'Vadodara, Gujarat',
    'Ghaziabad, Uttar Pradesh', 'Ludhiana, Punjab', 'Agra, Uttar Pradesh', 'Nashik, Maharashtra',
    'Faridabad, Haryana', 'Meerut, Uttar Pradesh', 'Rajkot, Gujarat', 'Kalyan-Dombivli, Maharashtra',
    'Vasai-Virar, Maharashtra', 'Varanasi, Uttar Pradesh', 'Srinagar, Jammu and Kashmir',
    'Aurangabad, Maharashtra', 'Dhanbad, Jharkhand', 'Amritsar, Punjab', 'Navi Mumbai, Maharashtra',
    'Allahabad, Uttar Pradesh', 'Ranchi, Jharkhand', 'Howrah, West Bengal', 'Coimbatore, Tamil Nadu',
    'Jabalpur, Madhya Pradesh', 'Gwalior, Madhya Pradesh', 'Vijayawada, Andhra Pradesh',
    'Jodhpur, Rajasthan', 'Madurai, Tamil Nadu', 'Raipur, Chhattisgarh', 'Kota, Rajasthan',
    'Chandigarh, Chandigarh', 'Guwahati, Assam', 'Solapur, Maharashtra', 'Hubli-Dharwad, Karnataka'
  ];

  // Mock facilities data with realistic coordinates
  const facilities = [
    { id: 1, type: 'waste-to-energy', name: 'Green Energy Plant', address: 'Powai, Mumbai, Maharashtra', contact: '+91-9876543210', lat: 19.1176, lng: 72.9060, distance: '2.3 km' },
    { id: 2, type: 'biomethanization', name: 'Bio Gas Unit', address: 'Andheri, Mumbai, Maharashtra', contact: '+91-9876543211', lat: 19.1136, lng: 72.8697, distance: '5.1 km' },
    { id: 3, type: 'scrap-shop', name: 'Scrap Collection Center', address: 'Bandra, Mumbai, Maharashtra', contact: '+91-9876543212', lat: 19.0596, lng: 72.8295, distance: '8.7 km' },
    { id: 4, type: 'recycling', name: 'Recycling Hub', address: 'Worli, Mumbai, Maharashtra', contact: '+91-9876543213', lat: 19.0176, lng: 72.8118, distance: '12.2 km' },
    { id: 5, type: 'local-shop', name: 'Eco Store', address: 'Juhu, Mumbai, Maharashtra', contact: '+91-9876543214', lat: 19.1075, lng: 72.8263, distance: '15.5 km' },
    { id: 6, type: 'waste-to-energy', name: 'Solar Waste Plant', address: 'Thane, Maharashtra', contact: '+91-9876543215', lat: 19.2183, lng: 72.9781, distance: '18.3 km' },
    { id: 7, type: 'recycling', name: 'Paper Recycling Unit', address: 'Navi Mumbai, Maharashtra', contact: '+91-9876543216', lat: 19.0330, lng: 73.0297, distance: '22.1 km' }
  ];

  // Mock vehicles data
  const vehicles = [
    { id: 1, type: 'collection', lat: 19.0760, lng: 72.8777, status: 'collecting', route: 'Route A' },
    { id: 2, type: 'transport', lat: 19.1136, lng: 72.8697, status: 'in-transit', route: 'Route B' },
    { id: 3, type: 'collection', lat: 19.0596, lng: 72.8295, status: 'collecting', route: 'Route C' }
  ];

  // Products data
  const products = [
    {
      id: 1,
      name: 'Smart Segregation Dustbin',
      price: 299,
      originalPrice: 499,
      image: 'https://imgs.search.brave.com/bKPp5b0CWy7PELapLr37UTw3pVEen2bDf72OWQiLnLY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by93YXN0ZS1zb3J0/aW5nXzg2MzAxMy0x/MDYyNTMuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw',
      rating: 4.8,
      reviews: 245,
      ecoImpact: 'Improves waste sorting by 80%',
      description: 'Durable container for storing waste, and features like lids, wheels, or pedal mechanisms for hygiene and convenience',
      category: 'composting',
      features: ['Includes starter culture', '30-day composting cycle', 'Odor-free design', 'Easy maintenance']
    },
    {
      id: 2,
      name: 'Merchendise',
      price: 399,
      originalPrice: 1000,
      image: 'https://imgs.search.brave.com/q2ZacnN8wbILXHRW7SrORwyxFdif5N84JaUTQoinC98/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFRNmt6ZC1zNkwu/anBn',
      rating: 4.6,
      reviews: 189,
      ecoImpact: 'Improves works safty gare',
      description: 'Highlight both features and benefits, speak to the target audience, provide essential details, tell a story, and be easy to scan for workers in waste management',
      category: 'bins',
      features: ['Smart sensors', 'Color-coded system', 'Durable plastic', 'Easy to clean']
    },
    {
      id: 3,
      name: 'Compost kits',
      price: 299,
      originalPrice: 399,
      image: 'https://imgs.search.brave.com/bWuTMQ0zgwuPeSOnhhZ11KlAdH471HtcffQpwa_b9N8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmFpbmNoYWluc2lu/YW51dHNoZWxsLmNv/bS9jZG4vc2hvcC9w/cm9kdWN0cy9Db21w/b3N0LVdpemFyZC1K/ci4tU3RhcnRlci1L/aXQtbWFpbl8yMDQ4/eC5qcGc_dj0xNzUz/ODA0Njgz',
      rating: 4.7,
      reviews: 156,
      ecoImpact: 'Improves compost quality',
      description: 'A collection of components, designed to facilitate the aerobic breakdown of organic waste like kitchen scraps into nutrient-rich compost',
      category: 'bags',
      features: ['100% biodegradable', 'Strong and durable', 'Various sizes', 'Compostable']
    },
    {
      id: 4,
      name: 'Biodegradable Bags',
      price: 99,
      originalPrice: 199,
      image: 'https://www.carrierbags.co.uk/images/62_img1_67_compostablebags2.gif',
      rating: 4.9,
      reviews: 78,
      ecoImpact: 'Saves 2kg plastic waste per pack',
      description: 'An eco-friendly, a renewable resource that breaks down naturally into water, carbon dioxide, and biomass',
      category: 'equipment',
      features: ['Solar powered', 'Automatic compression', 'Weather resistant', 'Low maintenance']
    }
  ];

  type FacilityType = 'waste-to-energy' | 'biomethanization' | 'scrap-shop' | 'recycling' | 'local-shop';
  const facilityTypes: Record<FacilityType, { color: string; icon: React.ElementType; label: string }> = {
    'waste-to-energy': { color: '#ef4444', icon: Factory, label: 'Waste-to-Energy' },
    'biomethanization': { color: '#f59e0b', icon: Factory, label: 'Bio Gas Unit' },
    'scrap-shop': { color: '#10b981', icon: Store, label: 'Scrap Shop' },
    'recycling': { color: '#3b82f6', icon: Recycle, label: 'Recycling Center' },
    'local-shop': { color: '#8b5cf6', icon: Store, label: 'Local Shop' }
  };

  const filteredFacilities = facilities.filter(facility => 
    activeFilter === 'all' || facility.type === activeFilter
  ).filter(facility =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  type ProductType = typeof products[0];
  const addToCart = (product: ProductType) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(cart
      .map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter((item): item is CartItem => item !== null)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePayment = (method: string) => {
    alert(`Payment successful via ${method}! Order confirmed.`);
    setCart([]);
    setShowCheckout(false);
  };

  return (
    <section id="eco-shop" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4"> Facility Locator & Eco-Shop </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find nearby waste management facilities and shop for eco-friendly products
          </p>
        </div>

        {/* Interactive Map Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
          {/* <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search facilities or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex-1">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {indianLocations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Facilities
              </button>
              {Object.entries(facilityTypes).map(([type, config]) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeFilter === type ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div> */}

          {/* Enhanced Google-like Map */}
          {/* <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 h-96 relative overflow-hidden border-2 border-gray-200"> */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Scrap Shop's</h2>
                      
                      <div className="h-96 rounded-lg overflow-hidden">
                        <MapContainer
                          center={[20.5937, 78.9629]} // Center of India
                          zoom={5}
                          style={{ height: '100%', width: '100%', zIndex: 0 }}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          {/* {complaints.map((complaint) => (
                            <Marker key={complaint.id} position={[complaint.lat, complaint.lng]}>
                              <Popup>
                                <div className="p-2">
                                  <img
                                    src={complaint.photo}
                                    alt="Waste"
                                    className="w-32 h-24 object-cover rounded mb-2"
                                  />
                                  <p className="text-sm font-medium">{complaint.description || 'No description'}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Status: {complaint.status}
                                  </p>
                                </div>
                              </Popup>
                            </Marker>
                          ))} */}
                        </MapContainer>
                      </div>
                    
            {/* Map Grid Lines */}
            {/* <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full border-t border-gray-300" style={{ top: `${i * 5}%` }} />
              ))}
              {[...Array(20)].map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full border-l border-gray-300" style={{ left: `${i * 5}%` }} />
              ))}
            </div> */}

            {/* Roads/Paths */}
            {/* <svg className="absolute inset-0 w-full h-full">
              <path d="M0,200 Q200,150 400,200 T800,180" stroke="#94a3b8" strokeWidth="3" fill="none" opacity="0.6" />
              <path d="M100,0 Q150,200 200,400" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M300,0 L300,400" stroke="#94a3b8" strokeWidth="2" fill="none" opacity="0.6" />
            </svg> */}
            
            {/* Facilities */}
            {/* {filteredFacilities.map((facility) => {
              const config = facilityTypes[facility.type as FacilityType];
              const IconComponent = config.icon;
              return (
                <div
                  key={facility.id}
                  className="absolute group cursor-pointer transform hover:scale-125 transition-all duration-300"
                  style={{
                    left: `${((facility.lng - 72.7) * 15) + 20}%`,
                    top: `${((19.2 - facility.lat) * 25) + 10}%`
                  }}
                > */}
                  {/* <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    style={{ backgroundColor: config.color }}
                  >
                    <IconComponent className="h-5 w-5 text-white" />
                  </div> */}
                  
                  {/* Enhanced Tooltip */}
                  {/* <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-sm whitespace-nowrap">
                      <div className="font-bold text-gray-900">{facility.name}</div>
                      <div className="text-gray-600 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {facility.address}
                      </div>
                      <div className="text-gray-600 mt-1">{facility.contact}</div>
                      <div className="text-green-600 font-medium mt-1">{facility.distance} away</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                    </div>
                  </div> */}
                </div>
              {/* );
            })} */}

            {/* Moving Vehicles with Routes */}
            {/* {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="absolute animate-pulse"
                style={{
                  left: `${((vehicle.lng - 72.7) * 15) + 20}%`,
                  top: `${((19.2 - vehicle.lat) * 25) + 10}%`
                }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <Truck className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {vehicle.route}
                  </div>
                </div>
              </div>
            ))} */}

            {/* Current Location Marker */}
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
            </div> */}

            {/* Legend */}
            {/* <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Map Legend</h4>
              <div className="space-y-2">
                {Object.entries(facilityTypes).map(([type, config]) => {
                  const IconComponent = config.icon;
                  return (
                    <div key={type} className="flex items-center space-x-3 text-sm">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center border border-white"
                        style={{ backgroundColor: config.color }}
                      >
                        <IconComponent className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700">{config.label}</span>
                    </div>
                  );
                })}
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border border-white">
                    <Truck className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700">Active Vehicles</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white"></div>
                  <span className="text-gray-700">Your Location</span>
                </div>
              </div>
            </div> */}

            {/* Map Controls */}
            {/* <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-md transition-colors">
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
              <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-md transition-colors">
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
            </div> */}
          </div>

          {/* Facility List */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFacilities.slice(0, 6).map((facility) => {
              const config = facilityTypes[facility.type as FacilityType];
              const IconComponent = config.icon;
              return (
                <div key={facility.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: config.color }}
                    >
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{facility.name}</h4>
                      <p className="text-sm text-gray-600">{facility.address}</p>
                      <p className="text-sm text-gray-500">{facility.contact}</p>
                      <p className="text-sm text-green-600 font-medium">{facility.distance}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eco-Shop Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Eco-Shop</h3>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart ({cart.length})</span>
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </div>
              )}
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">{product.ecoImpact}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">Shopping Cart</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-green-600 font-medium">₹{item.price}</p>
                            <div className="flex items-center space-x-1 text-sm text-green-700">
                              <Leaf className="h-3 w-3" />
                              <span>{item.ecoImpact}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-gray-900">Total: ₹{getTotalPrice()}</span>
                      </div>
                      <button 
                        onClick={handleCheckout}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">Payment</h3>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span>Total Amount:</span>
                      <span className="text-xl font-bold text-green-600">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-4">Choose Payment Method</h4>
                  
                  <button
                    onClick={() => handlePayment('UPI')}
                    className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                  >
                    <Smartphone className="h-6 w-6 text-green-600" />
                    <span className="font-medium">UPI Payment</span>
                  </button>

                  <button
                    onClick={() => handlePayment('Credit/Debit Card')}
                    className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </button>

                  <button
                    onClick={() => handlePayment('Digital Wallet')}
                    className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                  >
                    <Wallet className="h-6 w-6 text-purple-600" />
                    <span className="font-medium">Digital Wallet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      {/* </div> */}
      {/* </div> */}
    // </section>
  );
};

export default EcoShop;