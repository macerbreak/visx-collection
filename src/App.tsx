import React from 'react';
import './App.css';
import BarChart from "./charts/BarChart";
import Theshold from "./charts/Threshold";
import {Box, styled} from "@mui/material";
import LineRadialComponent from "./charts/LineRadial";
import Pies from "./charts/Pies";
import Streamgraph from "./charts/StreamGraph";
import BarStackHorizontalComponent from "./charts/BarStackHorizontal";
import BarGroupComponent from "./charts/BarGroup";
import RadarComponent from "./charts/Radar";
import StackedAreas from "./charts/StackedAreas";
import LinkTypes from "./charts/LinkTypes";
import CustomFirstChart from "./charts/CustomFirstChart";

function App() {
    return (
        <>
            <Box sx={{
                padding:"40px"
            }}>
                <ChartsBox>
                    <BarChart/>
                    <Theshold height={400} width={600}/>
                </ChartsBox>
                <ChartsBox>
                    <Box><LineRadialComponent height={400} width={600}/></Box>
                    <Pies height={400} width={600}/>
                </ChartsBox>
                <ChartsBox>
                    <Streamgraph height={400} width={600}/>
                    <BarStackHorizontalComponent height={400} width={600}/>
                </ChartsBox>
                <ChartsBox>
                    <BarGroupComponent height={400} width={600}/>
                    <RadarComponent height={400} width={600}/>
                </ChartsBox>
                <ChartsBox>
                    <StackedAreas height={400} width={600}/>
                    <LinkTypes height={400} width={600}/>
                </ChartsBox>
                <ChartsBox>
                    <CustomFirstChart height={400} width={600}/>
                </ChartsBox>
            </Box>

        </>
    );
}

const ChartsBox = styled(Box)({
    marginTop:"50px",
    display: "flex",
    justifyContent: "space-around"
})
export default App;
