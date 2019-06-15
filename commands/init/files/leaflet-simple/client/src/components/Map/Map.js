/**
 * Dependencies
 */

import React, { useEffect } from 'react'
import leaflet from 'leaflet'
import { MapStyle } from './styles/index'

/**
 * Define component
 */

function Map(props) {
  useEffect(() => {
    leaflet.map('map', {
      center: [30.274571, -97.740359],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    })
  }, [])

  return (
    <div className="jsx-Map">
      <div className="row">
        <div className="col-12">
          <MapStyle id="map"></MapStyle>
        </div>
      </div>
    </div>
  )
}

/**
 * Export component
 */

export default Map
