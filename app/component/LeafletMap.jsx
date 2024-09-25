// components/LeafletMap.js
"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for marker icon issue in Next.js + Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Component for updating map center and handling map click
function LocationMarker({ location, setLocation,setLocationN,getCountryStateCity }) {
  // Hook to detect map click and update location
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
      setLocationN({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
      if (e.latlng.lat && e.latlng.lng) {
        getCountryStateCity(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return location ? <Marker position={[location.lat, location.lng]} /> : null;
}


export default function LeafletMap({ setLocationN,getCountryStateCity }) {
    const [location, setMapLocation] = useState(null);
  
    const handleGetCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setMapLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setLocationN({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            getCountryStateCity(position.coords.latitude,position.coords.longitude)
          },
          (error) => {
            console.error("Error getting location: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
  
    return (
      <div className="md:w-1/2 mb-2 md:mb-0 ">
        <div className="border border-black w-full h-[500px]">
          {location ? (
            <MapContainer center={[location.lat, location.lng]} zoom={13} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker location={location} setLocation={setMapLocation} setLocationN={setLocationN} getCountryStateCity={getCountryStateCity} />
            </MapContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <p>Click &quot;Get Current Location&quot; to show the map</p>
            </div>
          )}
        </div>
        <div className=" flex justify-center h-[60px] items-center">
          <button
            onClick={handleGetCurrentLocation}
            className="border border-black h-[40px] bg-blue-500 text-center font-semibold text-white hover:border-2 px-6 py-2 rounded-2xl"
          >
            Get Current Location
          </button>
        </div>
      </div>
    );
  }
  