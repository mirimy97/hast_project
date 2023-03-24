import { scaleLinear, scalePoint, select, max, line } from "d3";
import { useEffect, useRef } from "react";
import RadarChartExample from "./WorldSidebarRadarChart";

function WorldSidebarChartBox() {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];
  // const data = [5, 10, 15, 20, 25];

  // ---------------------------------------------------
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    // const xScale = scalePoint()
    //   .domain(data.map((d) => d.name))
    //   .range([0, 5000]);

    // const yScale = scaleLinear()
    //   .domain([0, max(data, (d) => d.uv)])
    //   .range([5000, 0]);

    // const line = line()
    //   .x((d) => xScale(d.name))
    //   .y((d) => yScale(d.uv));

    // svg
    //   .append("path")
    //   .datum(data)
    //   .attr("fill", "none")
    //   .attr("stroke", "blue")
    //   .attr("stroke-width", 2)
    //   .attr("d", line);
  }, []);

  return (
    <>
      <RadarChartExample />
    </>
  );
}

export default WorldSidebarChartBox;
