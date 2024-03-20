import './MapSection.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../Header/Header';

function MapSection() {
  return (
    <>
      <Header />
      <div id='hidden'></div>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center' style={{ marginTop: '30vh' }}>
            <p className='paragraph-noanim lato-light'>COME VISIT US AT</p>
            <h1 className='header garamond' style={{ fontSize: '7em' }}>ACE DETAILING</h1>
          </div>
        </div>
        <div className='row justify-content-center align-items-center mt-5'>
          <div className='col-4'>
            <h1 className='header lato-light'>ACE DETAILING</h1>
            <ul>
              <li>
                
              </li>
            </ul>
          </div>
          <div className='col-8 mb-5'>
            <MapContainer center={[49.1855, -122.845]} zoom={15} style={{height:'60vh'}}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapSection;
