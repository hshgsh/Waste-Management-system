import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Camera, MapPin, Upload, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Complaint } from '../types.ts/index';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WasteReporting = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [formData, setFormData] = useState({
    photo: '',
    description: '',
    lat: 0,
    lng: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');

  useEffect(() => {
    // Load complaints from localStorage
    const savedComplaints = localStorage.getItem('wasteComplaints');
    if (savedComplaints) {
      const parsed = JSON.parse(savedComplaints).map((c: any) => ({
        ...c,
        timestamp: new Date(c.timestamp)
      }));
      setComplaints(parsed);
    }
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }));
        setLocationError('');
      },
      (error) => {
        setLocationError('Unable to retrieve location. Please enable location services.');
        console.error('Geolocation error:', error);
      }
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, photo: result }));
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.photo || !formData.lat || !formData.lng) {
      alert('Please upload a photo and allow location access');
      return;
    }

    setIsSubmitting(true);

    const newComplaint: Complaint = {
      id: Date.now(),
      photo: formData.photo,
      lat: formData.lat,
      lng: formData.lng,
      description: formData.description,
      status: 'Pending',
      timestamp: new Date()
    };

    const updatedComplaints = [...complaints, newComplaint];
    setComplaints(updatedComplaints);
    localStorage.setItem('wasteComplaints', JSON.stringify(updatedComplaints));

    // Reset form
    setFormData({ photo: '', description: '', lat: 0, lng: 0 });
    setPhotoPreview('');
    setIsSubmitting(false);

    alert('Waste report submitted successfully!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Report Waste</h1>
          <p className="text-xl text-gray-600">Help us keep our environment clean by reporting waste issues</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Waste Report</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                    required
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="space-y-4">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-gray-600">Click to upload waste photo</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Get Current Location</span>
                </button>
                {formData.lat && formData.lng && (
                  <p className="mt-2 text-sm text-green-600">
                    Location captured: {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
                  </p>
                )}
                {locationError && (
                  <p className="mt-2 text-sm text-red-600">{locationError}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Describe the waste issue..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.photo || !formData.lat}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reported Locations</h2>
            
            <div className="h-96 rounded-lg overflow-hidden">
              <MapContainer
                center={[20.5937, 78.9629]} // Center of India
                zoom={5}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {complaints.map((complaint) => (
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
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Reports</h2>
          
          {complaints.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No waste reports submitted yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src={complaint.photo}
                    alt="Waste"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        Report #{complaint.id}
                      </span>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(complaint.status)}
                        <span className="text-sm font-medium">{complaint.status}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">
                      {complaint.description || 'No description provided'}
                    </p>
                    
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Location: {complaint.lat.toFixed(4)}, {complaint.lng.toFixed(4)}</p>
                      <p>Reported: {complaint.timestamp.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WasteReporting;