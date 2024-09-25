'use client'
import { useMapEvents, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = ({ initialLatitude, initialLongitude, onPositionChange }) => {
  const [position, setPosition] = useState([initialLatitude, initialLongitude]);

  // Fix the default marker icon issue with Leaflet in React
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newPos = [e.latlng.lat, e.latlng.lng];
        setPosition(newPos);
        onPositionChange(newPos); // Pass the new position to the parent
      },
    });
    return null;
  };

  return (
    <MapContainer center={position} zoom={13} className=' w-[100%] h-[400px] '>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Selected location</Popup>
      </Marker>
      <MapEvents />
    </MapContainer>
  );
};

export default MapComponent;
