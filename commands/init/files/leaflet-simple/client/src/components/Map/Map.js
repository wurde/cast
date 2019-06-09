'use strict'

/**
 * Dependencies
 */

const React = require('react')
const leaflet = require('leaflet')
const styles = require('./styles/index')

/**
 * Constants
 */

const useEffect = React.useEffect

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
          <styles.MapStyle id="map"></styles.MapStyle>
        </div>
      </div>
    </div>
  )
}

/**
 * Export component
 */

module.exports = Map
