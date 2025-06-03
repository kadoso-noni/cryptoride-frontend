import React, { useState, useContext, createContext, useEffect, ReactNode } from 'react';
import { MapPin, Car, CreditCard, ArrowRight, ArrowLeft, Search, CheckCircle, AlertCircle } from 'lucide-react';

// Types for the ride request data
interface FormData {
  pickup: string;
  dropoff: string;
  vehicleType: string;
  paymentMethod: string;
  estimatedFare: number;
}

interface RideRequestContextType {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string | number) => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  errors: Record<string, string>;
  validateStep: (step: number) => boolean;
}

// Context for managing ride request data
const RideRequestContext = createContext<RideRequestContextType | undefined>(undefined);

interface RideRequestProviderProps {
  children: ReactNode;
}

const RideRequestProvider = ({ children }: RideRequestProviderProps) => {
  const [formData, setFormData] = useState<FormData>({
    pickup: '',
    dropoff: '',
    vehicleType: '',
    paymentMethod: '',
    estimatedFare: 0
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.pickup.trim()) {
          newErrors.pickup = 'Pickup location is required';
        }
        if (!formData.dropoff.trim()) {
          newErrors.dropoff = 'Drop-off location is required';
        }
        if (formData.pickup === formData.dropoff && formData.pickup.trim()) {
          newErrors.dropoff = 'Drop-off location must be different from pickup';
        }
        break;
      case 2:
        if (!formData.vehicleType) {
          newErrors.vehicleType = 'Please select a vehicle type';
        }
        if (!formData.paymentMethod) {
          newErrors.paymentMethod = 'Please select a payment method';
        }
        break;
      case 3:
        // Final validation - check all required fields
        if (!formData.pickup.trim()) newErrors.pickup = 'Pickup location is required';
        if (!formData.dropoff.trim()) newErrors.dropoff = 'Drop-off location is required';
        if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <RideRequestContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      errors,
      validateStep
    }}>
      {children}
    </RideRequestContext.Provider>
  );
};

// Custom hook to use the context
const useRideRequest = () => {
  const context = useContext(RideRequestContext);
  if (!context) {
    throw new Error('useRideRequest must be used within RideRequestProvider');
  }
  return context;
};

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon: React.ElementType;
}

// Searchable Location Input Component
const LocationInput = ({ label, placeholder, value, onChange, error, icon: Icon }: LocationInputProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock location suggestions
  const mockLocations = [
    'Times Square, New York, NY',
    'Central Park, New York, NY',
    'Brooklyn Bridge, Brooklyn, NY',
    'Empire State Building, New York, NY',
    'JFK Airport, New York, NY',
    'LaGuardia Airport, New York, NY',
    'Grand Central Terminal, New York, NY',
    'Wall Street, New York, NY',
    'Statue of Liberty, New York, NY',
    'Madison Square Garden, New York, NY'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
    
    if (inputValue.length > 0) {
      const filtered = mockLocations.filter(location =>
        location.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 4)); // Show top 5 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => value.length > 0 && setShowSuggestions(true)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-900">{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="flex items-center mt-2 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

// Step 1: Pickup and Drop-off Locations
const Step1 = () => {
  const { formData, updateFormData, errors } = useRideRequest();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Where to?</h2>
        <p className="text-gray-600">Enter your pickup and drop-off locations</p>
      </div>

      <LocationInput
        label="Pickup Location"
        placeholder="Enter pickup location"
        value={formData.pickup}
        onChange={(value) => updateFormData('pickup', value)}
        error={errors.pickup}
        icon={MapPin}
      />

      <LocationInput
        label="Drop-off Location"
        placeholder="Enter destination"
        value={formData.dropoff}
        onChange={(value) => updateFormData('dropoff', value)}
        error={errors.dropoff}
        icon={MapPin}
      />
    </div>
  );
};

// Step 2: Vehicle Type and Payment Method
const Step2 = () => {
  const { formData, updateFormData, errors } = useRideRequest();

  interface VehicleType {
    id: string;
    name: string;
    price: string;
    time: string;
    icon: string;
  }

  const vehicleTypes: VehicleType[] = [
    { id: 'economy', name: 'Economy', price: '$12-16', time: '5 min', icon: '🚗' },
    { id: 'comfort', name: 'Comfort', price: '$18-24', time: '3 min', icon: '🚙' },
    { id: 'premium', name: 'Premium', price: '$28-35', time: '8 min', icon: '🚘' },
    { id: 'xl', name: 'XL', price: '$22-30', time: '6 min', icon: '🚐' }
  ];

  interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
    desc: string;
  }

  const paymentMethods: PaymentMethod[] = [
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿', desc: 'Pay with Bitcoin, Ethereum, etc.' },
    { id: 'fiat', name: 'Credit/Debit Card', icon: '💳', desc: 'Traditional payment methods' },
    { id: 'wallet', name: 'Digital Wallet', icon: '📱', desc: 'Apple Pay, Google Pay, etc.' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Ride</h2>
        <p className="text-gray-600">Select vehicle type and payment method</p>
      </div>

      {/* Vehicle Type Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicleTypes.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.vehicleType === vehicle.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => updateFormData('vehicleType', vehicle.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{vehicle.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                    <p className="text-sm text-gray-600">{vehicle.time} away</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{vehicle.price}</p>
                  {formData.vehicleType === vehicle.id && (
                    <CheckCircle className="h-5 w-5 text-blue-500 ml-auto mt-1" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {errors.vehicleType && (
          <div className="flex items-center mt-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.vehicleType}
          </div>
        )}
      </div>

      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.paymentMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => updateFormData('paymentMethod', method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{method.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.desc}</p>
                  </div>
                </div>
                {formData.paymentMethod === method.id && (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>
        {errors.paymentMethod && (
          <div className="flex items-center mt-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.paymentMethod}
          </div>
        )}
      </div>
    </div>
  );
};

// Step 3: Fare Preview and Confirmation
const Step3 = () => {
  const { formData } = useRideRequest();
  const [estimatedFare, setEstimatedFare] = useState(0);

  useEffect(() => {
    // Calculate estimated fare based on selections
    const baseFares: Record<string, number> = {
      economy: 14,
      comfort: 21,
      premium: 31.5,
      xl: 26
    };
    
    const fare = baseFares[formData.vehicleType] || 0;
    setEstimatedFare(fare);
  }, [formData.vehicleType]);

  const handleConfirmRide = () => {
    alert('Ride confirmed! Your driver will arrive shortly.');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Ride</h2>
        <p className="text-gray-600">Review your trip details</p>
      </div>

      {/* Trip Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center space-y-2 mt-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-0.5 h-8 bg-gray-300"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm text-gray-600">Pickup</p>
              <p className="font-semibold text-gray-900">{formData.pickup}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Drop-off</p>
              <p className="font-semibold text-gray-900">{formData.dropoff}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Options */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-white border rounded-lg">
          <div className="flex items-center space-x-3">
            <Car className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Vehicle Type</p>
              <p className="text-sm text-gray-600 capitalize">{formData.vehicleType}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-white border rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Payment Method</p>
              <p className="text-sm text-gray-600 capitalize">
                {formData.paymentMethod === 'crypto' ? 'Cryptocurrency' : 
                 formData.paymentMethod === 'fiat' ? 'Credit/Debit Card' : 'Digital Wallet'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fare Breakdown */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fare Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Fare</span>
            <span className="text-gray-900">${(estimatedFare * 0.7).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distance</span>
            <span className="text-gray-900">${(estimatedFare * 0.2).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service Fee</span>
            <span className="text-gray-900">${(estimatedFare * 0.1).toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Estimated Fare</span>
            <span>${estimatedFare.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirmRide}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
      >
        Confirm Ride
      </button>
    </div>
  );
};

// Progress Indicator
const ProgressIndicator = () => {
  const { currentStep } = useRideRequest();
  
  interface Step {
    number: number;
    title: string;
  }
  
  const steps: Step[] = [
    { number: 1, title: 'Locations' },
    { number: 2, title: 'Vehicle & Payment' },
    { number: 3, title: 'Confirm' }
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                step.number
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-4 ${
              currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Navigation Controls
const NavigationControls = () => {
  const { currentStep, setCurrentStep, validateStep } = useRideRequest();

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentStep === 1}
        className={`flex items-center px-6 py-3 rounded-lg font-semibold ${
          currentStep === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-600 text-white hover:bg-gray-700'
        }`}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous
      </button>

      {currentStep < 3 ? (
        <button
          onClick={handleNext}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      ) : null}
    </div>
  );
};

// Main Component
const RideRequestUI = () => {
  const { currentStep } = useRideRequest();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <ProgressIndicator />
          {renderStep()}
          <NavigationControls />
        </div>
      </div>
    </div>
  );
};

// App wrapper with context provider
export default function App() {
  return (
    <RideRequestProvider>
      <RideRequestUI />
    </RideRequestProvider>
  );
}