import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

// Fix Leaflet marker icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for Risk Levels
// Custom Icons for Risk Levels with Blinking Effect
const createCustomIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div style="position: relative; width: 24px; height: 24px;">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 12px;
                    height: 12px;
                    background-color: ${color};
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    z-index: 2;
                "></div>
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    background-color: ${color};
                    border-radius: 50%;
                    opacity: 0.6;
                    animation: pulse 2s infinite;
                    z-index: 1;
                "></div>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

const redIcon = createCustomIcon('#ef4444');   // High Risk
const orangeIcon = createCustomIcon('#f97316'); // Medium Risk
const greenIcon = createCustomIcon('#22c55e');  // Low Risk
const blueIcon = createCustomIcon('#3b82f6');   // User Location

// Helper to re-center map with animation
function RecenterAutomatically({ lat, lng, shouldFly }: { lat: number; lng: number; shouldFly: boolean }) {
    const map = useMap();
    useEffect(() => {
        if (shouldFly) {
            map.flyTo([lat, lng], 14, {
                duration: 2.5, // Animation duration in seconds
                easeLinearity: 0.25
            });
        }
    }, [lat, lng, shouldFly, map]);
    return null;
}

interface NeighborData {
    id: number;
    lat: number;
    lng: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    cropType: string;
    lastUpdate: string;
}

export function LocalRiskMap() {
    const { user } = useAuth();
    const { language } = useLanguage();
    const isEn = language === 'en';

    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [neighbors, setNeighbors] = useState<NeighborData[]>([]);
    // Default center (Dhaka)
    const defaultCenter = { lat: 23.8103, lng: 90.4125 };

    // 1. Get User Location (Firestore or Browser)
    useEffect(() => {
        const getUserLocation = async () => {
            if (user) {
                try {
                    // Try fetching from Firestore first
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists() && userDoc.data().location) {
                        const loc = userDoc.data().location;
                        // Add a small delay to allow the map to load before flying
                        setTimeout(() => {
                            setUserLocation({ lat: loc.latitude, lng: loc.longitude });
                        }, 1000);
                    } else {
                        // Fallback to browser geolocation
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                setTimeout(() => {
                                    setUserLocation({
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude
                                    });
                                }, 1000);
                            },
                            (error) => {
                                console.error("Geolocation error:", error);
                                // If error, just set to default (no fly animation needed really, or fly to default)
                                setUserLocation(defaultCenter);
                            }
                        );
                    }
                } catch (error) {
                    console.error("Error fetching user location:", error);
                }
            } else {
                // If no user, try browser geolocation anyway
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setTimeout(() => {
                            setUserLocation({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            });
                        }, 1000);
                    },
                    () => { }
                );
            }
        };

        getUserLocation();
    }, [user]);

    // 2. Generate Mock Neighbors
    useEffect(() => {
        if (userLocation) {
            const mockData: NeighborData[] = [];
            for (let i = 0; i < 15; i++) {
                // Random offset within ~1-2km
                const latOffset = (Math.random() - 0.5) * 0.03; // Increased spread slightly
                const lngOffset = (Math.random() - 0.5) * 0.03;

                const risk = Math.random() > 0.6 ? 'High' : (Math.random() > 0.3 ? 'Medium' : 'Low');
                const crops = ['Rice', 'Wheat', 'Potato', 'Jute', 'Corn'];
                const crop = crops[Math.floor(Math.random() * crops.length)];
                const time = Math.floor(Math.random() * 12) + 1; // 1-12 hours ago

                mockData.push({
                    id: i,
                    lat: userLocation.lat + latOffset,
                    lng: userLocation.lng + lngOffset,
                    riskLevel: risk as 'Low' | 'Medium' | 'High',
                    cropType: crop,
                    lastUpdate: isEn ? `${time} hours ago` : `${time} ঘণ্টা আগে`
                });
            }
            setNeighbors(mockData);
        }
    }, [userLocation, isEn]);

    return (
        <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-serif text-lg font-semibold text-emerald-800 flex justify-between items-center">
                <span>{isEn ? "Local Risk Landscape" : "স্থানীয় ঝুঁকির মানচিত্র"}</span>
                {!userLocation && (
                    <span className="text-xs font-normal text-emerald-600 flex items-center gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        {isEn ? "Locating..." : "অবস্থান নির্ণয় করা হচ্ছে..."}
                    </span>
                )}
            </h3>
            <style>{`
                @keyframes pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(0.5);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2.5);
                        opacity: 0;
                    }
                }
            `}</style>

            <div className="h-96 w-full overflow-hidden rounded-lg border border-emerald-100 relative z-0">
                <MapContainer
                    center={[defaultCenter.lat, defaultCenter.lng]}
                    zoom={7}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {userLocation && (
                        <RecenterAutomatically
                            lat={userLocation.lat}
                            lng={userLocation.lng}
                            shouldFly={true}
                        />
                    )}

                    {/* User Marker */}
                    {userLocation && (
                        <Marker position={[userLocation.lat, userLocation.lng]} icon={blueIcon}>
                            <Popup>
                                <div className="text-center">
                                    <strong>{isEn ? "Your Location" : "আপনার অবস্থান"}</strong>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {/* Neighbor Markers */}
                    {neighbors.map((neighbor) => (
                        <Marker
                            key={neighbor.id}
                            position={[neighbor.lat, neighbor.lng]}
                            icon={
                                neighbor.riskLevel === 'High' ? redIcon :
                                    neighbor.riskLevel === 'Medium' ? orangeIcon : greenIcon
                            }
                        >
                            <Popup>
                                <div className="p-1">
                                    <p><strong>{isEn ? "Crop:" : "ফসল:"}</strong> {neighbor.cropType}</p>
                                    <p>
                                        <strong>{isEn ? "Risk:" : "ঝুঁকি:"}</strong>
                                        <span className={`ml-1 font-semibold ${neighbor.riskLevel === 'High' ? 'text-red-600' :
                                            neighbor.riskLevel === 'Medium' ? 'text-orange-600' : 'text-green-600'
                                            }`}>
                                            {neighbor.riskLevel === 'High' ? (isEn ? "High" : "উচ্চ") :
                                                neighbor.riskLevel === 'Medium' ? (isEn ? "Medium" : "মাঝারি") :
                                                    (isEn ? "Low" : "কম")}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {isEn ? "Updated:" : "আপডেট:"} {neighbor.lastUpdate}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-blue-500 border border-white shadow-sm"></div>
                    <span>{isEn ? "You" : "আপনি"}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500 border border-white shadow-sm"></div>
                    <span>{isEn ? "High Risk" : "উচ্চ ঝুঁকি"}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-orange-500 border border-white shadow-sm"></div>
                    <span>{isEn ? "Medium Risk" : "মাঝারি ঝুঁকি"}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500 border border-white shadow-sm"></div>
                    <span>{isEn ? "Low Risk" : "কম ঝুঁকি"}</span>
                </div>
            </div>
        </div>
    );
}
