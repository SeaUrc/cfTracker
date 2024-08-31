'use client'

import { XAxis, YAxis, Tooltip, ResponsiveContainer, Line, LineChart, CartesianGrid, Legend, ReferenceDot } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import linReg from '../../../../jsonStats/problemSolvedLinReg.json'

// Generate data points
const generateDataPoints = (count: number = 100) => {
  const data = [];

  let midSlope, midIntercept;
  if (linReg.slope[0] && linReg.slope[1] && linReg.intercept[0] && linReg.intercept[1]) {
    midSlope = (linReg.slope[0] + linReg.slope[1]) / 2;
    midIntercept = (linReg.intercept[0] + linReg.intercept[1]) / 2;
  }

  for (let i = 0; i < count; i++) {
    const x = i * 40;
    let y;
    if (midSlope && midIntercept) {
      y = midSlope * x + midIntercept;
    }
    let lowerBound, upperBound;
    if (linReg.slope[0] && linReg.slope[1] && linReg.intercept[0] && linReg.intercept[1]) {
      lowerBound = linReg.slope[0] * x + linReg.intercept[0];
      upperBound = linReg.slope[1] * x + linReg.intercept[1];
    }
    data.push({ x, y, lowerBound, upperBound });
  }
  return data;
};


const LinearRegressionProblemsChart = () => {
  const data = generateDataPoints();

  const references = linReg.points.map((point) => {
    return (
      <ReferenceDot
        x={point[0]} y={point[1]} r={2} fill="red" stroke="none"
      />
    );
  })

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Linear Regression of Problems Solved vs Rating</CardTitle>
      </CardHeader>
      <CardContent className="h-[500px]">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" name="X" unit="" />
            <YAxis type="number" name="Y" unit="" />
            <Tooltip />
            <Legend />
            {references}
            <Line
              type="monotone"
              dataKey="y"
              stroke="#8884d8"
              name="Mid Line"
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="lowerBound"
              stroke="#82ca9d"
              name="Lower Bound"
              dot={false}
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="upperBound"
              stroke="#ffc658"
              name="Upper Bound"
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LinearRegressionProblemsChart;