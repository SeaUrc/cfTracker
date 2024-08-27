import React from 'react';
import { Bar, BarChart, CartesianGrid, ErrorBar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import data from '../../../../jsonStats/problemSolvedTInterval.json'

const SubmissionsPerTitleChart = () => {
    const chartData = Object.keys(data).map((key) => {
        const [min, max] = data[key as keyof typeof data];
        if (min && max) {
            const mean = (min + max) / 2;
            return {
                "name": key,
                "mean": mean,
                "errorY": [(mean - min), (max - mean)],
                "min": min,
                "max": max
            };
        }
    });

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip bg-black p-2 rounded shadow-md">
                    <p className="label">{`${label}`}</p>
                    <p className="intro">{`Mean: ${data.mean.toFixed(2)}`}</p>
                    <p className="desc">{`Error Interval: [${data.min.toFixed(2)}, ${data.max.toFixed(2)}]`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="w-full max-w-3xl h-full">
            <CardHeader>
                <CardTitle>Distribution Rating For Non-Retired Users</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-full">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={chartData}
                            margin={{bottom: 90 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor={'end'} interval={0} />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="mean" fill="hsl(var(--codeforceBlue))">
                                <ErrorBar dataKey="errorY" width={4} strokeWidth={2} stroke="hsl(var(--codeforceRed))" direction="y" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default SubmissionsPerTitleChart;