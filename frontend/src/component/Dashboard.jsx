import React, { useState } from 'react';
import {
    LayoutDashboard,
    Shirt,
    Calendar,
    Settings,
    LogOut,
    Upload,
    DollarSign,
    Users,
    Package,
    Search,
    Filter,
    Edit,
    Trash2,
    Plus,
} from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isUploading, setIsUploading] = useState(false);

    const recentOrders = [
        { id: 1, customer: 'Emma Wilson', dress: 'Evening Gown', status: 'Rented', date: '2024-03-15' },
        { id: 2, customer: 'Sophie Brown', dress: 'Cocktail Dress', status: 'Returned', date: '2024-03-14' },
        { id: 3, customer: 'Lucy Davis', dress: 'Wedding Dress', status: 'Pending', date: '2024-03-16' },
    ];

    const inventory = [
        {
            id: 1,
            name: 'Elegant Evening Gown',
            category: 'Evening Wear',
            size: 'M',
            price: 150,
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=200',
        },
        {
            id: 2,
            name: 'Vintage Wedding Dress',
            category: 'Bridal',
            size: 'S',
            price: 300,
            status: 'Rented',
            image: 'https://images.unsplash.com/photo-1594552072238-48c865ff5113?auto=format&fit=crop&w=200',
        },
        {
            id: 3,
            name: 'Cocktail Party Dress',
            category: 'Cocktail',
            size: 'L',
            price: 100,
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=200',
        },
    ];

    const bookings = [
        {
            id: 1,
            customer: 'Emma Wilson',
            dress: 'Evening Gown',
            startDate: '2024-03-20',
            endDate: '2024-03-22',
            status: 'Confirmed',
            payment: 'Paid',
        },
        {
            id: 2,
            customer: 'Sophie Brown',
            dress: 'Cocktail Dress',
            startDate: '2024-03-25',
            endDate: '2024-03-27',
            status: 'Pending',
            payment: 'Awaiting',
        },
    ];

    const stats = [
        { title: 'Total Revenue', value: '$2,450', icon: DollarSign },
        { title: 'Active Rentals', value: '12', icon: Package },
        { title: 'Total Customers', value: '48', icon: Users },
        { title: 'Available Dresses', value: '35', icon: Shirt },
    ];

    const renderDashboard = () => (
        <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <stat.icon className="w-6 h-6 text-purple-500" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                                <th className="pb-3">Order ID</th>
                                <th className="pb-3">Customer</th>
                                <th className="pb-3">Dress</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-b last:border-b-0">
                                    <td className="py-3">#{order.id}</td>
                                    <td className="py-3">{order.customer}</td>
                                    <td className="py-3">{order.dress}</td>
                                    <td className="py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${order.status === 'Rented'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : order.status === 'Returned'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-3">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

    const renderInventory = () => (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search dresses..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                        <Plus className="w-4 h-4" />
                        Add New Dress
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inventory.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${item.status === 'Available'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500 mb-4">
                                    <p>Category: {item.category}</p>
                                    <p>Size: {item.size}</p>
                                    <p className="font-semibold text-gray-800">${item.price}/day</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border rounded hover:bg-gray-50">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button className="flex items-center justify-center gap-2 px-3 py-2 border rounded hover:bg-red-50 text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderBookings = () => (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search bookings..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                        <Plus className="w-4 h-4" />
                        New Booking
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                                <th className="pb-3">Booking ID</th>
                                <th className="pb-3">Customer</th>
                                <th className="pb-3">Dress</th>
                                <th className="pb-3">Start Date</th>
                                <th className="pb-3">End Date</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Payment</th>
                                <th className="pb-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border-b last:border-b-0">
                                    <td className="py-3">#{booking.id}</td>
                                    <td className="py-3">{booking.customer}</td>
                                    <td className="py-3">{booking.dress}</td>
                                    <td className="py-3">{booking.startDate}</td>
                                    <td className="py-3">{booking.endDate}</td>
                                    <td className="py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${booking.payment === 'Paid'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {booking.payment}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex gap-2">
                                            <button className="p-1 hover:bg-gray-100 rounded">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 hover:bg-red-50 text-red-500 rounded">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Shop Settings</h2>

                <div className="space-y-6">
                    {/* Shop Information */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Shop Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="DressRent Boutique"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    defaultValue="contact@dressrent.com"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    defaultValue="+1 (555) 123-4567"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    defaultValue="123 Fashion Street, Style City, ST 12345"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Business Hours</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm text-gray-600">Monday</span>
                                <input
                                    type="time"
                                    defaultValue="09:00"
                                    className="px-3 py-2 border rounded"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="time"
                                    defaultValue="18:00"
                                    className="px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-24 text-sm text-gray-600">Tuesday</span>
                                <input
                                    type="time"
                                    defaultValue="09:00"
                                    className="px-3 py-2 border rounded"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="time"
                                    defaultValue="18:00"
                                    className="px-3 py-2 border rounded"
                                />
                            </div>
                            {/* Add more days... */}
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded text-purple-500" />
                                <span className="text-sm text-gray-700">Email notifications for new bookings</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded text-purple-500" />
                                <span className="text-sm text-gray-700">SMS notifications for returns</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded text-purple-500" />
                                <span className="text-sm text-gray-700">Daily summary reports</span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'inventory':
                return renderInventory();
            case 'bookings':
                return renderBookings();
            case 'settings':
                return renderSettings();
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800">DressRent</h2>
                    <p className="text-gray-500 text-sm">Shopkeeper Dashboard</p>
                </div>
                <nav className="mt-6">
                    {[
                        { name: 'Dashboard', icon: LayoutDashboard },
                        { name: 'Inventory', icon: Shirt },
                        { name: 'Bookings', icon: Calendar },
                        { name: 'Settings', icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.name.toLowerCase()}
                            onClick={() => setActiveTab(item.name.toLowerCase())}
                            className={`w-full flex items-center px-6 py-3 text-left ${activeTab === item.name.toLowerCase()
                                    ? 'bg-purple-50 border-r-4 border-purple-500 text-purple-500'
                                    : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </button>
                    ))}
                    <button className="w-full flex items-center px-6 py-3 text-left text-red-500 hover:bg-red-50 mt-auto">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h1>
                        {activeTab === 'dashboard' && (
                            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload New Dress
                            </button>
                        )}
                    </div>

                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default App;