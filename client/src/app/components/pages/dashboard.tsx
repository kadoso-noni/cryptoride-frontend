// pages/dashboard.tsx
import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { CalendarIcon, FilterIcon, MapPinIcon, CreditCardIcon, TrendingUpIcon } from 'lucide-react';

// Types
interface RideData {
  month: string;
  rides: number;
  spent: number;
}

interface LocationData {
  location: string;
  visits: number;
  percentage: number;
}

interface DashboardData {
  ridesPerMonth: RideData[];
  totalSpent: number;
  mostVisitedLocations: LocationData[];
  summary: {
    totalRides: number;
    averageSpent: number;
    topLocation: string;
  };
}

interface FilterOptions {
  dateRange: string;
  vehicleType: string;
  location: string;
}

// Mock API function - replace with actual API call
const fetchDashboardData = async (filters: FilterOptions): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data - replace with actual API call
  return {
    ridesPerMonth: [
      { month: 'Jan', rides: 45, spent: 2340 },
      { month: 'Feb', rides: 52, spent: 2890 },
      { month: 'Mar', rides: 38, spent: 2100 },
      { month: 'Apr', rides: 61, spent: 3250 },
      { month: 'May', rides: 73, spent: 3890 },
      { month: 'Jun', rides: 89, spent: 4560 },
    ],
    totalSpent: 18030,
    mostVisitedLocations: [
      { location: 'Downtown', visits: 145, percentage: 35 },
      { location: 'Airport', visits: 98, percentage: 24 },
      { location: 'Mall District', visits: 76, percentage: 18 },
      { location: 'University', visits: 54, percentage: 13 },
      { location: 'Beach Area', visits: 42, percentage: 10 },
    ],
    summary: {
      totalRides: 358,
      averageSpent: 50.36,
      topLocation: 'Downtown'
    }
  };
};

// Components
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div className="text-red-600 mb-4">{message}</div>
    <button 
      onClick={onRetry}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const MetricCard: React.FC<{ 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  change?: string;
  changeType?: 'positive' | 'negative';
}> = ({ title, value, icon, change, changeType }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </p>
        )}
      </div>
      <div className="text-blue-600">
        {icon}
      </div>
    </div>
  </div>
);

const FilterPanel: React.FC<{ 
  filters: FilterOptions; 
  onFiltersChange: (filters: FilterOptions) => void; 
}> = ({ filters, onFiltersChange }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <div className="flex items-center gap-2 mb-4">
      <FilterIcon size={20} className="text-gray-600" />
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
        <select 
          value={filters.dateRange}
          onChange={(e) => onFiltersChange({ ...filters, dateRange: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
          <option value="2years">Last 2 Years</option>
          <option value="all">All Time</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
        <select 
          value={filters.vehicleType}
          onChange={(e) => onFiltersChange({ ...filters, vehicleType: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Vehicles</option>
          <option value="bike">Bikes</option>
          <option value="scooter">Scooters</option>
          <option value="car">Cars</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <select 
          value={filters.location}
          onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Locations</option>
          <option value="downtown">Downtown</option>
          <option value="airport">Airport</option>
          <option value="mall">Mall District</option>
          <option value="university">University</option>
        </select>
      </div>
    </div>
  </div>
);

// Color palette for charts
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: '6months',
    vehicleType: 'all',
    location: 'all'
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const dashboardData = await fetchDashboardData(filters);
      setData(dashboardData);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Your ride insights and analytics</p>
          </div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Your ride insights and analytics</p>
          </div>
          <ErrorMessage message={error} onRetry={loadData} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Your ride insights and analytics</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Rides"
            value={data?.summary.totalRides.toLocaleString() || '0'}
            icon={<TrendingUpIcon size={24} />}
            change="+12% from last month"
            changeType="positive"
          />
          <MetricCard
            title="Total Spent"
            value={`$${data?.totalSpent.toLocaleString() || '0'}`}
            icon={<CreditCardIcon size={24} />}
            change="+8% from last month"
            changeType="positive"
          />
          <MetricCard
            title="Top Location"
            value={data?.summary.topLocation || 'N/A'}
            icon={<MapPinIcon size={24} />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Rides Per Month */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Rides Per Month</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.ridesPerMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rides" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Spending Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.ridesPerMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Spent']} />
                <Legend />
                <Bar dataKey="spent" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Visited Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Most Visited Locations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.mostVisitedLocations}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ location, percentage }) => `${location} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="visits"
                >
                  {data?.mostVisitedLocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Location Stats Table */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Location Statistics</h3>
            <div className="space-y-4">
              {data?.mostVisitedLocations.map((location, index) => (
                <div key={location.location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="font-medium text-gray-900">{location.location}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{location.visits} visits</div>
                    <div className="text-sm text-gray-600">{location.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;