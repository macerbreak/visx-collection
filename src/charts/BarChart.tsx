import React, {useMemo, TouchEvent, MouseEvent} from 'react'
import appleStock, {AppleStock} from "@visx/mock-data/lib/mocks/appleStock";
import {Box, styled} from "@mui/material";
import useMeasure from "react-use-measure";
import {defaultStyles, TooltipWithBounds, useTooltip} from "@visx/tooltip";
import {scaleBand, scaleLinear} from "@visx/scale";
import { timeFormat } from "d3-time-format";
import {Group} from "@visx/group";
import {Bar} from "@visx/shape";
import {localPoint} from "@visx/event";
import { AxisBottom, AxisLeft } from "@visx/axis";

const getYValue = (d: AppleStock) => d.close;
const getXValue = (d: AppleStock) => d.date;
const margin = 32
const BarChart = () => {

    const data = appleStock.slice(0, 10);
    const [ref, bounds] = useMeasure();

    const width = bounds.width || 100;
    const height = bounds.height || 100;

    const innerWidth = width - margin
    const innerHeight = height - margin

    const {
        showTooltip,
        hideTooltip,
        tooltipData,
        tooltipLeft = 0,
        tooltipTop = 0,
    } = useTooltip<AppleStock>();
    const xScale = useMemo(() => scaleBand({
        range: [margin, innerWidth],
        domain: data.map(getXValue),
        padding: 0.2,
    }), [innerWidth])
    const yScale = useMemo(
        () =>
            scaleLinear<number>({
                range: [innerHeight, margin],
                domain: [
                    Math.min(...data.map(getYValue)) - 1,
                    Math.max(...data.map(getYValue)) + 1,
                ],
            }),
        [innerHeight]

    );
    return <>
        <Container ref={ref}>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                <Group>
                    {data.map((d) => {
                        const xValue = getXValue(d);
                        const barWidth = xScale.bandwidth();
                        const barHeight = innerHeight - (yScale(getYValue(d)) ?? 0);
                        const barX = xScale(xValue);
                        const barY = innerHeight - barHeight;

                        return (
                            <Bar
                                key={`bar-${xValue}`}
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={barHeight}
                                fill="orange"
                                onMouseMove={(
                                    event:
                                        | TouchEvent<SVGRectElement>
                                        | MouseEvent<SVGRectElement>
                                ) => {
                                    const point = localPoint(event);

                                    if (!point) return;

                                    showTooltip({
                                        tooltipData: d,
                                        tooltipTop: point.y,
                                        tooltipLeft: point.x,
                                    });
                                }}
                                onMouseLeave={() => hideTooltip()}
                            />
                        );
                    })}
                </Group>

                <Group>
                    <AxisBottom
                        top={innerHeight}
                        scale={xScale}
                        tickFormat={(date) => timeFormat("%m/%d")(new Date(date))}
                    />
                </Group>

                <Group>
                    <AxisLeft left={margin} scale={yScale} />
                </Group>
            </svg>

            {tooltipData ? (
                <TooltipWithBounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                >
                    <b>{`${timeFormat("%b %d, %Y")(
                        new Date(getXValue(tooltipData))
                    )}`}</b>
                    : ${getYValue(tooltipData)}
                </TooltipWithBounds>
            ) : null}
        </Container>
    </>
}
const Container = styled(Box)({
    position: "relative",
    width: "600px",
    height: "400px",
    minWidth: "300px",
    marginLeft:"40px"
})
const tooltipStyles = {
    ...defaultStyles,
    borderRadius: 4,
    background: "black",
    color: "white",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
};

export default BarChart