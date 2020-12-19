<template>
  <div class="graph-test">
    <div class="controls">
      <div class="select">
        <select id="myselect">
          <option value="playlist-1" selected="selected">Top US</option>
          <option value="playlist-2">Top FR</option>
          <option value="playlist-3">Top UK</option>
        </select>
      </div>
      <div class="switchs">
        <label class="switch" for="tri">
          <input type="checkbox" id="tri" />
          <div class="slider round"></div>
          Trier par popularité
        </label>
      </div>
    </div>
    <div class="barchart"></div>
  </div>
</template>

<script>
/** IMPORT D3 FROM MODULES */
import * as d3 from "d3";

export default {
  name: "GraphTest",
  props: {
    /** WIDTH */
    width: {
      default: 800,
      type: Number,
    },
    /** HEIGHT */
    height: {
      default: 1300,
      type: Number,
    },
    /** DURATION */
    duration: {
      default: 1000,
      type: Number,
    },
    /** MARGIN */
    margin: {
      default: () => ({
        top: 15,
        right: 30,
        bottom: 40,
        left: 350,
      }),
      type: Object,
    },
  },

  mounted() {
    // this.init();
    // const data = await d3.json("./../assets/dataset.json");
    this.run();
    // d3.json("@/assets/dataset.json", this.run());
  },

  methods: {
    // /** DEFINE NECESSARY BASIS */
    // init() {
    //   /** SVG */
    //   const svg = d3
    //     .select(".barchart")
    //     .append("svg")
    //     .attr("viewBox", "0 0 " + this.width + " " + this.height)
    //     .append("g")
    //     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    //   /** X SCALE */
    //   const xScale = d3.scale
    //     .linear()
    //     .domain([0, 100])
    //     .range([0, this.width - this.margin.left - this.margin.right]);

    //   /** Y AXIS */
    //   const xAxis = d3.svg
    //     .axis()
    //     .scale(xScale)
    //     .orient("top");

    //   // svg
    //   //   .append("g")
    //   //   .attr("class", "x axis")
    //   //   .call(xAxis);

    //   /** Y SCALE */
    //   const yScale = d3.scale.ordinal().rangeRoundBands([0, this.height - this.margin.top - this.margin.bottom], 0.3);

    //   /** DRAW Y AXIS */
    //   svg
    //     .append("g")
    //     .attr("class", "y axis")
    //     .attr("transform", "translate(-50)");
    // },

    /** CHART ACTIONS */
    redrawChart(data) {
      /** SVG */
      const svg = d3
        .select(".barchart")
        .append("svg")
        .attr("viewBox", "0 0 " + this.width + " " + this.height)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      /** X SCALE */
      const xScale = d3.scale
        .linear()
        .domain([0, 100])
        .range([0, this.width - this.margin.left - this.margin.right]);

      /** Y AXIS */
      const xAxis = d3.svg
        .axis()
        .scale(xScale)
        .orient("top");

      svg
        .append("g")
        .attr("class", "x axis")
        .call(xAxis);

      /** Y SCALE */
      const yScale = d3.scale.ordinal().rangeRoundBands([0, this.height - this.margin.top - this.margin.bottom], 0.3);

      /** DRAW Y AXIS */
      svg
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-50)");

      /** POPULARITY SORT */
      if (d3.select("input").property("checked")) {
        yScale.domain(
          data
            .sort(function(a, b) {
              return b.popularity - a.popularity;
            })
            .map(function(d) {
              return d.number;
            })
        );
      } else {
        yScale.domain(
          data.map(function(d) {
            return d.number;
          })
        );
      }

      /** MIDDLE BAR */
      const middleBarHeight = yScale.rangeBand() / 2,
        // espace = 3,
        newRow = svg.selectAll("g.number").data(data),
        newTick = svg
          .select(".y.axis")
          .selectAll("g.tick")
          .data(data);

      /** TICK */
      const tick = newTick
        .enter()
        .append("g")
        .attr("class", "tick")
        .attr("opacity", 0)
        .attr("transform", function(d) {
          return "translate(0," + yScale(d.number) + ")";
        });
      tick
        .append("text")
        .attr("class", "number_id")
        .attr("y", middleBarHeight)
        .attr("dy", ".35rem")
        .attr("dx", "4rem")
        .text(function(d) {
          return d.number;
        });
      tick
        .append("text")
        .attr("class", "number_name")
        .attr("y", middleBarHeight)
        .attr("dy", ".35rem")
        .text(function(d) {
          return d.name;
        });

      /** ROW */
      const row = newRow
        .enter()
        .append("g")
        .attr("class", "number")
        .attr("transform", function(d) {
          return "translate(0," + yScale(d.number) + ")";
        });
      row
        .insert("rect")
        .attr("class", "module_bar")
        .attr("x", 0)
        .attr("height", yScale.rangeBand())
        .attr("width", 0);
      row
        .append("text")
        .attr("class", "number_hours")
        .attr("y", middleBarHeight)
        .attr("x", 0)
        .attr("opacity", 0)
        .attr("dy", ".35rem")
        .attr("dx", "0.5rem")
        .text(0);

      /** NEW TICK */
      newTick
        .transition()
        .duration(this.duration)
        .attr("opacity", 1)
        .attr("transform", function(d) {
          return "translate(0," + yScale(d.number) + ")";
        });
      newTick
        .select(".number_id")
        .transition()
        .duration(this.duration)
        .attr("y", middleBarHeight)
        .attr("opacity", 0)
        .transition()
        .attr("opacity", 1)
        .text(function(d) {
          return d.number;
        })
        .delay(this.duration / 2);
      newTick
        .select(".number_name")
        .transition()
        .duration(this.duration)
        .attr("y", middleBarHeight)
        .attr("opacity", 0)
        .transition()
        .attr("opacity", 1)
        .text(function(d) {
          return d.name;
        })
        .delay(this.duration / 2);

      /** NEW ROW */
      newRow
        .transition()
        .duration(this.duration)
        .attr("transform", function(d) {
          return "translate(0," + yScale(d.number) + ")";
        });
      newRow
        .select(".module_bar")
        .transition()
        .duration(this.duration)
        .attr("height", this.yScale.rangeBand())
        .transition()
        .duration(this.duration)
        .attr("x", 0)
        .attr("width", function(d) {
          return xScale(d.popularity);
        });
      newRow
        .select(".number_hours")
        .transition()
        .duration(this.duration)
        .attr("y", middleBarHeight)
        .attr("opacity", 1)
        .transition()
        .attr("x", function(d) {
          return xScale(d.popularity);
        })
        .tween("text", function(d) {
          var i = d3.interpolate(+this.textContent.replace(/,/g, ""), +d.popularity);
          return function(t) {
            this.textContent = Math.round(i(t));
          };
        });
      newRow
        .exit()
        .transition()
        .duration(this.duration)
        .style("opacity", 0)
        .attr("width", function(d) {
          return xScale(d.popularity);
        })
        .remove();

      /** NEW TICK */
      newTick
        .exit()
        .transition()
        .duration(this.duration)
        .style("opacity", 0)
        .attr("width", function(d) {
          return xScale(d.popularity);
        })
        .remove();

      /** SORT */
      d3.select("#tri").on("change", sort);

      /** SORT */
      function sort() {
        const y0 = yScale
          .domain(
            data
              .sort(
                this.checked
                  ? function(a, b) {
                    return b.popularity - a.popularity;
                  }
                  : function(a, b) {
                    return d3.ascending(a.number, b.number);
                  }
              )
              .map(function(d) {
                return d.number;
              })
          )
          .copy();

        /** SVG */
        svg.selectAll(".number").sort(function(a, b) {
          return y0(a.number) - y0(b.number);
        });
        svg
          .select(".y.axis")
          .selectAll("g.tick")
          .sort(function(a, b) {
            return y0(a.number) - y0(b.number);
          });

        /** TRANSITION */
        const transition = svg.transition().duration(this.duration),
          delay = function(d, i) {
            return i * 50;
          };
        transition
          .selectAll(".number")
          .delay(delay)
          .attr("transform", function(d) {
            return "translate(0," + y0(d.number) + ")";
          });
        transition
          .select(".y.axis")
          .selectAll(".tick")
          .delay(delay)
          .attr("transform", function(d) {
            return "translate(0," + y0(d.number) + ")";
          });
      }
    },

    run() {
      d3.json("/dataset.json", function(data) {
        let playlist1 = [];
        let playlist2 = [];
        let playlist3 = [];

        for (let i = 1; i < data.length; i++) {
          let songTitle = data[i].title;
          // let songMeta = data[i].metadata;
          let songPop = data[i].metadata.popularity;
          let songPlaylist = data[i].metadata.playlistId;

          if (songPlaylist === "37i9dQZEVXbLRQDuF5jeBp") {
            playlist1.push({ name: songTitle, popularity: songPop, number: i });
          } else if (songPlaylist === "37i9dQZEVXbIPWwFssbupI") {
            playlist2.push({ name: songTitle, popularity: songPop, number: i });
          } else if (songPlaylist === "3kCLdlDu6Dnus3qF9EfYOY") {
            playlist3.push({ name: songTitle, popularity: songPop, number: i });
          }
        }

        function changeplaylist() {
          var playlist = this.options[this.selectedIndex].value,
            dataFile = "";

          switch (playlist) {
          case "playlist-1":
            dataFile = playlist1;
            break;
          case "playlist-2":
            dataFile = playlist2;
            break;
          case "playlist-3":
            dataFile = playlist3;
            break;
          }

          this.redrawChart(dataFile);
        }

        // this.redrawChart(playlist1);

        d3.select("select").on("change", changeplaylist);

        // function type(d) {
        //   d.popularity = +d.popularity;
        //   return d;
        // }

        console.log(playlist3);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Commissioner:100,200,300,400,600,700,800");
html {
  font-size: 62.5%;
}

body {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 1.6rem;
  color: white;
  /* background: #FC8E0A; */
  background: #c31432; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #240b36, #c31432); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #240b36, #c31432); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  max-width: 1300px;
  margin: 0 auto;
  padding: 0 30px;
}

div.head {
  padding-bottom: 6rem;
  text-align: center;
}

h1.ppname {
  font-size: 5rem;
  font-weight: 800;
}

h2.apiname {
  font-size: 3.5rem;
  font-weight: 600;
  margin-top: -1rem;
}

a.apilink {
  font-size: 2rem;
  font-weight: 200;
  color: white;
}

h1 {
  margin-top: 5vh;
}
h1 + p {
  font-size: 2.1rem;
}

.barchart {
  width: 80%;
  margin: 0 auto;
}

.content {
  flex: 1;
}

.dataviz {
  flex: 2;
  margin-top: 50px;
}

.number {
  font-size: 1.4rem;
}
.module_bar {
  fill: white;
  opacity: 0.75;
}
.number_cm {
  fill: #00806a;
}
.number_td {
  fill: #00b395;
}
.number_tp {
  fill: #00ffd5;
}
.number_id {
  fill: white;
  font-size: 0.8rem;
  font-weight: 100;
}
.number_name {
  fill: white;
  font-size: 1.4rem;
  font-weight: 500;
}
.number_hours {
  fill: white;
  font-size: 1.2rem;
  font-weight: 500;
}

.x.axis text {
  font-size: 1.2rem;
  fill: #999999;
}

.axis path,
.axis line {
  fill: none;
  stroke: #999999;
}

.x.axis path {
  display: none;
}

.y.axis {
  text-anchor: end;
  font-size: 1.4rem;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
  color: white;
}

label {
  margin-right: 20px;
  font-size: 1.4rem;
}

/* ---- LEGEND ----- */
.legend {
  font-size: 1.4rem;
  padding-left: 30px;
}
.legend > * {
  position: relative;
  margin-bottom: 5px;
}
.legend > *::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 10px;
  margin-right: 6px;
}
.legend .cm::before {
  background: #00806a;
}
.legend .td::before {
  background: #00b395;
}
.legend .tp::before {
  background: #00ffd5;
}

/* ---- SELECT ----- */
.select {
  position: relative;
  display: block;
  width: 20rem;
  height: 4rem;
  overflow: hidden;
  margin-right: 40px;
}
.select::after {
  content: "";
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  transform: rotate(45deg);
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  pointer-events: none;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  color: white;
  box-shadow: none;
  border: none;
  border-bottom: 2px solid white;
  border-radius: 0;
  background: transparent;
  font-size: 1.8rem;
  font-weight: 600;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 0 0.5rem;
  cursor: pointer;
}
select::-ms-expand {
  display: none;
}

/* ---- SWITCH ----- */
.switch {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}
.switch input {
  display: none;
}
.switch input:checked + .slider {
  background-color: #3e0d36;
}
.switch input:checked + .slider:before {
  transform: translateX(22px);
}
.switch .slider {
  background-color: #cccccc;
  position: relative;
  display: inline-block;
  height: 22px;
  width: 44px;
  margin-right: 10px;
  transition: 0.4s;
}
.switch .slider::before {
  content: "";
  position: absolute;
  left: 2px;
  bottom: 2px;
  height: 18px;
  width: 18px;
  background-color: white;
  transition: 0.4s;
}
.switch .slider.round {
  border-radius: 22px;
}
.switch .slider.round::before {
  border-radius: 50%;
}

@media screen and (min-width: 900px) {
  body {
    display: flex;
  }
}
</style>
