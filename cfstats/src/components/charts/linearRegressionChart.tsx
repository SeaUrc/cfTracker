import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import linReg from '../../../../jsonStats/problemSolvedLinReg.json'

const LinearRegressionChart = () => {
  // Sample data points
//   const data = [
//     { x: 1, y: 1300 },
//     { x: 2, y: 1320 },
//     { x: 3, y: 1340 },
//     { x: 4, y: 1360 },
//     { x: 5, y: 1380 },
//   ];


  const generateLineData = (slope: number, intercept: number) => {
    const minX = 1;
    const maxX = 400;
    return [
      { x: minX, y: slope * minX + intercept },
      { x: maxX, y: slope * maxX + intercept }
    ];
  };

  const midLine = generateLineData(
    // @ts-ignore
    (linReg["slope"][0] + linReg["slope"][1]) / 2,
    // @ts-ignore
    (linReg["intercept"][0] + linReg["intercept"][1]) / 2
  );

  // @ts-ignore
  const lowerBound = generateLineData(linReg["slope"][0], linReg["intercept"][0]);
  // @ts-ignore
  const upperBound = generateLineData(linReg["slope"][1], linReg["intercept"][1]);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Linear Regression with T-Interval</CardTitle>
      </CardHeader>
      <CardContent className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis type="number" dataKey="x" name="X" />
            <YAxis type="number" dataKey="y" name="Y" />
            <ZAxis range={[64]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            {/* <Scatter name="Data Points" data={data} fill="#8884d8" /> */}
            <Line type="linear" dataKey="y" data={midLine} stroke="#ff7300" strokeWidth={2} dot={false} />
            <Line type="linear" dataKey="y" data={lowerBound} stroke="#82ca9d" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            <Line type="linear" dataKey="y" data={upperBound} stroke="#82ca9d" strokeWidth={1} strokeDasharray="5 5" dot={false} />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LinearRegressionChart;