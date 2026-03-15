import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation, ShieldAlert, Zap, Fuel } from 'lucide-react';

// Fix Leaflet icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom vehicle icon
const carIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/2.0.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function TrackerPage() {
  const [telemetry, setTelemetry] = useState({
    lat: 6.9271,
    lng: 79.8612,
    speed: 0,
    fuel: 100,
    status: 'connecting...',
    perimeterIntact: true
  });

  // Colombo center
  const center: [number, number] = [6.9271, 79.8612];
  const safetyRadius = 5000; // 5km radius

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/telemetry/V-1024');
        const data = await res.json();
        setTelemetry(data);
      } catch (err) {
        console.error("Failed to fetch telemetry", err);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-4rem)] flex flex-col space-y-6"
    >
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">Real-Time Tracker</h1>
        <p className="text-slate-400 mt-1">Live GPS telemetry and safety perimeter monitoring.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Telemetry Sidebar */}
        <div className="lg:col-span-1 space-y-4 flex flex-col">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Vehicle V-1024</h2>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400 flex items-center gap-2"><Zap className="w-4 h-4" /> Speed</span>
                  <span className="text-white font-mono">{telemetry.speed} km/h</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500"
                    animate={{ width: `${(telemetry.speed / 160) * 100}%` }}
                    transition={{ type: 'tween', duration: 0.5 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400 flex items-center gap-2"><Fuel className="w-4 h-4" /> Fuel Level</span>
                  <span className="text-white font-mono">{telemetry.fuel}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    animate={{ width: `${telemetry.fuel}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${telemetry.perimeterIntact ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Safety Perimeter</p>
                    <p className={`text-xs ${telemetry.perimeterIntact ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {telemetry.perimeterIntact ? 'Vehicle within bounds' : 'Perimeter breached!'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 font-mono">
                  LAT: {telemetry.lat.toFixed(6)}<br/>
                  LNG: {telemetry.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-3 glass-panel rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl">
          <MapContainer 
            center={center} 
            zoom={13} 
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            {/* Safety Perimeter */}
            <Circle 
              center={center} 
              radius={safetyRadius} 
              pathOptions={{ 
                color: telemetry.perimeterIntact ? '#10b981' : '#f43f5e', 
                fillColor: telemetry.perimeterIntact ? '#10b981' : '#f43f5e', 
                fillOpacity: 0.1,
                dashArray: '5, 10'
              }} 
            />

            {/* Vehicle Marker */}
            <Marker position={[telemetry.lat, telemetry.lng]} icon={carIcon}>
              <Popup className="glass-popup">
                <div className="text-slate-900 font-medium">
                  Vehicle V-1024<br/>
                  Speed: {telemetry.speed} km/h
                </div>
              </Popup>
            </Marker>
          </MapContainer>
          
          {/* Overlay UI on Map */}
          <div className="absolute top-4 left-4 z-[400] glass px-4 py-2 rounded-xl flex items-center gap-2">
            <Navigation className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-white">Live Tracking Active</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
