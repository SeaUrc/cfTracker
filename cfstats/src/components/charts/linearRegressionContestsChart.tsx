'use client'

import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Line, ReferenceLine, LineChart, CartesianGrid, Legend, ReferenceDot } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import linReg from '../../../../jsonStats/contestsSolvedLinReg.json'

// Generate data points
//@ts-ignore
const generateDataPoints = (count = 100) => {
  const data = [];
  //@ts-ignore
  const midSlope = (linReg.slope[0] + linReg.slope[1]) / 2;//@ts-ignore
  const midIntercept = (linReg.intercept[0] + linReg.intercept[1]) / 2;

  for (let i = 0; i < count; i++) {
    const x = i * 4; // Generate x values from 0 to 95
    const y = midSlope * x + midIntercept;//@ts-ignore
    const lowerBound = linReg.slope[0] * x + linReg.intercept[0];//@ts-ignore
    const upperBound = linReg.slope[1] * x + linReg.intercept[1];
    data.push({ x, y, lowerBound, upperBound });
  }
  return data;
};


const LinearRegressionContestsChart = () => {
  const data = generateDataPoints();

  const references = linReg.points.map((point) => {
    return (
      <ReferenceDot
        x={point[0]} y={point[1]} r={2} fill="red" stroke="none"
      />
    );
  })
  // console.log(references)

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Linear Regression of Contests Solved vs Rating</CardTitle>
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

export default LinearRegressionContestsChart;