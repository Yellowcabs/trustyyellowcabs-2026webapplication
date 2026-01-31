
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { BookingDetails, VehicleType } from '../types';
import { MapPin, User, Phone, Car, Calendar, Clock, ArrowRight, ArrowLeft, CheckCircle2, MessageCircle, Info, PhoneCall, Map as MapIcon } from 'lucide-react';
import { sendBookingEmail } from '../services/emailService';

// Global declaration for Google Maps to satisfy TypeScript
declare const google: any;

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const PRICING: Record<VehicleType, number> = {
  [VehicleType.MINI]: 25,
  [VehicleType.SEDAN]: 27,
  [VehicleType.SUV]: 40,
  [VehicleType.SUV_PLUS]: 45,
  [VehicleType.INNOVA]: 50,
  [VehicleType.LUXURY]: 0,
  [VehicleType.TEMPO_TRAVELLER]: 0,
  [VehicleType.TOURIST_BUS]: 0,
  [VehicleType.CUSTOM]: 0,
};

const STANDARD_BASE_FARE = 80;
const PREMIUM_BASE_FARE = 150;

const NO_FARE_VEHICLES = [
  VehicleType.LUXURY,
  VehicleType.TEMPO_TRAVELLER,
  VehicleType.TOURIST_BUS,
  VehicleType.CUSTOM
];

interface InputWrapperProps {
  children: React.ReactNode;
  icon: any;
  label?: string;
}

const InputWrapper: React.FC<InputWrapperProps> = memo(({ children, icon: Icon, label }) => (
  <div className="relative group w-full">
    {label && <label className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{label}</label>}
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-yellow transition-colors duration-300 pointer-events-none z-10">
        <Icon size={16} />
      </div>
      {children}
    </div>
  </div>
));

export const BookingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const pickupRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pickupAutocomplete = useRef<any>(null);
  const dropAutocomplete = useRef<any>(null);
  const directionsRenderer = useRef<any>(null);
  
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [loadingFare, setLoadingFare] = useState(false);
  const [indiaToday, setIndiaToday] = useState('');

  const [formData, setFormData] = useState<BookingDetails>({
    name: '',
    phone: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    vehicleType: VehicleType.SEDAN,
    distance: '',
    estimatedFare: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dateStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(now);
    setIndiaToday(dateStr);

    const loadGoogleMaps = () => {
      if ((window as any).google?.maps) {
        setGoogleLoaded(true);
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (!googleLoaded || step !== 1) return;

    const initAutocomplete = () => {
      const options = {
        componentRestrictions: { country: 'in' },
        fields: ['formatted_address', 'geometry'],
      };

      if (pickupRef.current && !pickupAutocomplete.current) {
        pickupAutocomplete.current = new google.maps.places.Autocomplete(pickupRef.current, options);
        pickupAutocomplete.current.addListener('place_changed', () => {
          const place = pickupAutocomplete.current.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({ ...prev, pickup: place.formatted_address }));
          }
        });
      }

      if (dropRef.current && !dropAutocomplete.current) {
        dropAutocomplete.current = new google.maps.places.Autocomplete(dropRef.current, options);
        dropAutocomplete.current.addListener('place_changed', () => {
          const place = dropAutocomplete.current.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({ ...prev, drop: place.formatted_address }));
          }
        });
      }
    };

    setTimeout(initAutocomplete, 200);
  }, [googleLoaded, step]);

  const updateMapRoute = useCallback((origin: string, destination: string) => {
    if (!googleLoaded || !mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 11.0168, lng: 76.9558 }, // Coimbatore
      zoom: 12,
      disableDefaultUI: true,
 styles: [
  { elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#334155" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },

  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e5e7eb" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#cbd5e1" }] },

  { featureType: "water", elementType: "geometry", stylers: [{ color: "#bae6fd" }] },

  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#ecfeff" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#0f172a" }] },

  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#e0f2fe" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#94a3b8" }] }
]



    });

    const directionsService = new google.maps.DirectionsService();
    directionsRenderer.current = new google.maps.DirectionsRenderer({
      map,
      polylineOptions: { strokeColor: "#FDB813", strokeWeight: 6, strokeOpacity: 0.95 }
,
      markerOptions: { opacity: 0.9 }
    });

    directionsService.route(
      { origin, destination, travelMode: google.maps.TravelMode.DRIVING },
      (result: any, status: string) => {
        if (status === 'OK') {
          directionsRenderer.current.setDirections(result);
        }
      }
    );
  }, [googleLoaded]);

  const calculateFare = useCallback((origin: string, destination: string, vehicle: VehicleType) => {
    if (NO_FARE_VEHICLES.includes(vehicle)) {
      setFormData(prev => ({ ...prev, distance: '', estimatedFare: 'Manual Quote' }));
      return;
    }

    if (!origin || !destination || !(window as any).google?.maps) return;
    
    setLoadingFare(true);
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response: any, status: string) => {
        setLoadingFare(false);
        if (status === 'OK' && response?.rows[0]?.elements[0]?.status === 'OK') {
          const distanceText = response.rows[0].elements[0].distance.text;
          const distanceValue = response.rows[0].elements[0].distance.value / 1000;
          
          let calculatedFare = 0;
          let currentBaseFare = STANDARD_BASE_FARE;

          if (vehicle === VehicleType.SUV || vehicle === VehicleType.SUV_PLUS || vehicle === VehicleType.INNOVA) {
            currentBaseFare = PREMIUM_BASE_FARE;
            const perKmRate = PRICING[vehicle];
            calculatedFare = Math.round(distanceValue * perKmRate) + currentBaseFare;
          } else if (vehicle === VehicleType.MINI || vehicle === VehicleType.SEDAN) {
            if (distanceValue <= 5) calculatedFare = 200;
            else if (distanceValue <= 7) calculatedFare = 250;
            else {
              const perKmRate = PRICING[vehicle];
              calculatedFare = Math.round(distanceValue * perKmRate) + STANDARD_BASE_FARE;
            }
          } else {
            const perKmRate = PRICING[vehicle];
            calculatedFare = Math.round(distanceValue * perKmRate) + STANDARD_BASE_FARE;
          }
          
          setFormData(prev => ({
            ...prev,
            distance: distanceText,
            estimatedFare: `₹${calculatedFare}`
          }));
        }
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    const p = pickupRef.current?.value || formData.pickup;
    const d = dropRef.current?.value || formData.drop;

    if (p && d) {
      setFormData(prev => ({ ...prev, pickup: p, drop: d }));
      calculateFare(p, d, formData.vehicleType);
      setStep(2);
      setTimeout(() => updateMapRoute(p, d), 100);
    } else {
      alert("Please enter pickup and destination.");
    }
  };

  const prevStep = () => setStep(1);

  const handleWhatsAppConfirm = () => {
    const message = `*NEW RIDE BOOKING CONFIRMATION*%0A
*Name:* ${formData.name}%0A
*Phone:* ${formData.phone}%0A
*Vehicle:* ${formData.vehicleType}%0A
*Pickup:* ${formData.pickup}%0A
*Drop:* ${formData.drop}%0A
*Fare:* ${formData.estimatedFare === 'Manual Quote' ? 'Price on Request' : formData.estimatedFare}%0A
Confirmed via website. Please dispatch a driver.`;
    window.open(`https://wa.me/918870088020?text=${message}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendBookingEmail({ 
        ...formData, 
        time: formData.time ? `${formData.time} (IST)` : 'ASAP',
        date: formData.date || 'Today'
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const isManualPricing = NO_FARE_VEHICLES.includes(formData.vehicleType);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-sm mx-auto transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-brand-yellow rounded-full"></div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {submitted ? 'Booking Received' : 'Fast Booking'}
          </h3>
        </div>
        {!submitted && (
          <div className="flex gap-2">
            <div className={`h-1 w-6 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-brand-yellow' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
            <div className={`h-1 w-6 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-brand-yellow' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
          </div>
        )}
      </div>
      
      {submitted ? (
        <div className="py-6 text-center animate-fade-in flex flex-col items-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-25"></div>
            <CheckCircle2 size={40} className="relative z-10" />
          </div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Booking Sent!</h4>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 font-bold mb-4">Stay Ready! Driver Arriving Shortly</p>
          <button onClick={handleWhatsAppConfirm} className="w-full bg-[#25D366] text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg text-[10px] uppercase tracking-widest">
            <MessageCircle size={18} /> WhatsApp Supports
          </button>
          <button onClick={() => { setSubmitted(false); setStep(1); }} className="mt-6 text-[9px] font-bold text-slate-40 uppercase underline underline-offset-4">Book Another Ride</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <div className="space-y-4 animate-fade-in">
              <InputWrapper icon={MapPin}>
                <input ref={pickupRef} type="text" placeholder="Pickup Location" required autoComplete="off" defaultValue={formData.pickup} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none text-xs font-semibold" />
              </InputWrapper>
              <InputWrapper icon={MapPin}>
                <input ref={dropRef} type="text" placeholder="Drop Destination" required autoComplete="off" defaultValue={formData.drop} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none text-xs font-semibold" />
              </InputWrapper>
              <div className="grid grid-cols-2 gap-4">
                <InputWrapper icon={Calendar} label="Date (Optional)">
                  <input type="date" name="date" min={indiaToday} value={formData.date} onChange={handleChange} className="w-full pl-11 pr-2 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none text-[11px] font-semibold" />
                </InputWrapper>
                <InputWrapper icon={Clock} label="Time (Optional)">
                  <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full pl-11 pr-2 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none text-[11px] font-semibold" />
                </InputWrapper>
              </div>
              <button type="button" onClick={nextStep} className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl uppercase tracking-widest text-[10px]">Continue <ArrowRight size={14} /></button>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="relative h-32 w-full rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 mb-4 shadow-inner">
                <div ref={mapRef} className="w-full h-full bg-slate-100 dark:bg-slate-950" />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black text-white uppercase flex items-center gap-1">
                  <MapIcon size={10} /> Live Route
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-inner">
  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Route Summary</span>
    {formData.distance && !isManualPricing && (
      <span className="text-[10px] font-black text-blue-600">{formData.distance}</span>
    )}
  </div>
  <div className="flex items-center justify-between">
    <span className="text-[11px] font-bold text-slate-600">
      {isManualPricing ? 'Pricing Type' : 'Total Estimate'}
    </span>
    <span className={`${isManualPricing ? 'text-sm' : 'text-2xl'} font-black text-slate-900`}>
      {loadingFare ? '...' : (isManualPricing ? 'On-Call Quote' : formData.estimatedFare || '₹---')}
    </span>
  </div>
</div>


              <InputWrapper icon={Car} label="Vehicle Category">
                <select name="vehicleType" value={formData.vehicleType} onChange={(e) => {
                  const newVehicle = e.target.value as VehicleType;
                  setFormData(prev => ({ ...prev, vehicleType: newVehicle }));
                  calculateFare(formData.pickup, formData.drop, newVehicle);
                }} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none font-bold text-xs cursor-pointer appearance-none">
                  {Object.values(VehicleType).map((type) => (<option key={type} value={type}>{type}</option>))}
                </select>
              </InputWrapper>

              <InputWrapper icon={User}>
                <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white outline-none text-xs font-semibold" />
              </InputWrapper>
              <InputWrapper icon={Phone}>
                <input type="tel" name="phone" placeholder="Mobile Number" required value={formData.phone} onChange={handleChange} className="w-full pl-11 pr-4 py-4 rounded-xl border-2 border-slate-900 dark:border-brand-yellow bg-white dark:bg-slate-950 dark:text-white outline-none font-black text-base" />
              </InputWrapper>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={prevStep} className="w-14 bg-slate-50 dark:bg-slate-800 text-slate-40 p-3 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 active:scale-95"><ArrowLeft size={18} /></button>
                <button type="submit" disabled={loading || loadingFare} className="flex-1 bg-brand-yellow text-slate-950 font-black py-4 rounded-xl transition-all shadow-lg text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                  {loading ? 'Sending...' : (isManualPricing ? <>Get Quote <PhoneCall size={14}/></> : 'Confirm Ride')}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
