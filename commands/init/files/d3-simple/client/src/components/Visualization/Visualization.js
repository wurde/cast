/**
 * Dependencies
 */

import React, { useEffect } from 'react'
import d3 from 'd3'
import { VisualizationStyle } from './styles/index'

/**
 * Define component
 */

function Visualization(props) {
  useEffect(() => {
    let svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        angles = d3.range(0, 2 * Math.PI, Math.PI / 200)

    let path = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .attr("fill", "none")
        .attr("stroke-width", 10)
        .attr("stroke-linejoin", "round")
      .selectAll('path')
      .data(["cyan", "magenta", "yellow"])
      .enter().append('path')
        .attr("stroke", function(d) { return d; })
        .style("mix-blend-mode", "darken")
        .datum(function(d, i) {
          return d3.radialLine()
              .curve(d3.curveLinearClosed)
              .angle(function(a) { return a; })
              .radius(function(a) {
                let t = d3.now() / 1000;
                return 200 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 32;
              })
        })

    d3.timer(function() {
      path.attr("d", function(d) {
        return d(angles)
      })
    })
  }, [])

  return (
    <VisualizationStyle>
      <div className="row">
        <div className="col-12">
          <svg width="960" height="500"></svg>
        </div>
      </div>
    </VisualizationStyle>
  )
}

/**
 * Export component
 */

export default Visualization
