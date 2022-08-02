import React from "react";
import {scaleBand, scaleLinear} from "@visx/scale";
import {AxisBottom, AxisLeft} from "@visx/axis";
import {Group} from "@visx/group";
import {Box} from "@mui/material";
import {LinePath} from "@visx/shape";
import {curveBasis, curveLinear, curveMonotoneX, curveMonotoneY} from "@visx/curve";
import cityTemperature, {CityTemperature} from "@visx/mock-data/lib/mocks/cityTemperature";
import {Threshold} from "@visx/threshold";

const data = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 10,
    y: 20,
  },
  {
    x: 20,
    y: 0,
  },
  // {
  //   x: 30,
  //   y: 70,
  // },
  // {
  //   x:100,
  //   y:100
  // }
];
const getXValue = (data: { x: number; y: number }) => data.x;
const getYValue = (data: { x: number; y: number }) => data.y;
const margin = 32;

interface CustomChartProps {
  width: number;
  height: number;
}

const CustomFirstChart = ({ width, height }: CustomChartProps) => {
  const innerHeight = height - margin;
  const innerWidth = width - margin;
  const xScale = scaleLinear({
    range: [margin, innerWidth],
    domain: [Math.min(...data.map(getXValue)),Math.max(...data.map(getXValue))],
  });
  const yScale = scaleLinear({
    range: [innerHeight, margin],
    domain: [Math.min(...data.map(getYValue)),Math.max(...data.map(getYValue))],
  });

  return (
    <>
      <Box sx={{
        width:width,
        height:height
      }}>
        <svg width={`100%`} height={`100%`} viewBox={`0 0 ${width} ${height}`}>
          <Group>
            <AxisBottom
                top={innerHeight}
                scale={xScale}
            />
          </Group>
          <Group>
            <AxisLeft  axisClassName={"leftAxis"} left={margin} scale={yScale} />
          </Group>
          <Group>
            <Threshold
                id={`${Math.random()}`}
                data={data}
                x={(d) => xScale(getXValue(d)) ?? 0}
                y0={(d) => yScale(getYValue(d)) ?? 0}
                y1={(d) => yScale(getYValue(d)) ?? 0}
                clipAboveTo={0}
                clipBelowTo={Math.max(...data.map(getYValue))}
                curve={curveBasis}
                belowAreaProps={{
                  fill: 'violet',
                  fillOpacity: 0.4,
                }}
                aboveAreaProps={{
                  fill: 'green',
                  fillOpacity: 0.4,
                }}
            />
            <LinePath
                data={data}
                x={(d) => xScale(getXValue(d)) ?? 0}
                y={(d) => yScale(getYValue(d)) ?? 0}
                stroke="#23DBBD"
                strokeWidth={2}
                curve={curveLinear}
            />
          </Group>
        </svg>
      </Box>
    </>
  );
};
export default CustomFirstChart;
