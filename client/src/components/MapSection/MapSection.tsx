import './MapSection.css';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import iconImg from '../../images/marker-icon.png'
import L from "leaflet";
L.Icon.Default.mergeOptions({
  iconUrl: iconImg
});
 
function MapSection() {
  return (
    <>
      <Header />
      <div id='hidden'></div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 text-center' style={{ marginTop: '30vh' }}>
            <p className='paragraph-noanim lato-light'>COME VISIT US AT</p>
            <h1 className='header garamond' style={{ fontSize: '7em' }}>ACE DETAILING</h1>
          </div>
        </div>
        <div className='row justify-content-center align-items-center mt-5'>
          <div className='col-8'>
            <table>
              <thead>
                <th className='header garamond'>
                  <b>Detail Studio</b>
                </th>
                <th className='header garamond'>
                  <b style={{width:'150%'}}>Vendor Services</b>
                </th>
              </thead>
              <tbody>
                <tr className='paragraph-noanim instrument-sans'>
                  <td><b>Detail Garage Surrey</b></td>
                  <td><b>Richmond Automall (Lexus, Acura & Honda)</b></td>
                  <td><b>Porsche Centre Vancouver</b></td>
                </tr>
                <tr className='paragraph-noanim instrument-sans'>
                  <td><i className="fa-solid fa-location-dot"></i> 7488 King George Blvd Unit 320</td>
                  <td><i className='fa-solid fa-location-dot'></i> 13460 Smallwood Plaza</td>
                  <td><i className="fa-solid fa-location-dot"></i> 688 Terminal Ave</td>
                </tr>
                <tr className='paragraph-noanim instrument-sans'>
                  <td><i className="fa-solid fa-phone"></i> (604) 593-7330</td>
                  <td><i className='fa-solid fa-phone'></i> (604) 270-2886</td>
                  <td><i className="fa-solid fa-phone"></i> (604) 736-7911</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='col-4 mb-5'>
            <MapContainer center={[49.163186, -122.899654]} zoom={10} style={{height:'60vh'}}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[49.13903569586126, -122.84474168281632]}>
                <Popup>
                  Detail Garage Surrey
                </Popup>
              </Marker>
              <Marker position={[49.27105, -123.09019]}>
                <Popup>
                  Porsche Centre Vancouver
                </Popup>
              </Marker>
              <Marker position={[49.17179, -123.07628]}>
                <Popup>
                  Richmond Automall
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MapSection;
