'use client'

import React from 'react';
import { Bar, BarChart, ErrorBar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import data from '../../../../jsonStats/contestsTInterval.json'

const ContestsPerTitleChart = () => {
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
                    <p className="">{`${label}`}</p>
                    <p className="">{`Mean: ${data.mean.toFixed(2)}`}</p>
                    <p className="">{`Error Interval: [${data.min.toFixed(2)}, ${data.max.toFixed(2)}]`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>Average Number of Contests</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 10, bottom: 70 }}
                    >
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={70}
                            interval={0}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "white" }}
                        />
                        <YAxis tick={{ fill: "white" }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="mean" fill="hsl(var(--codeforceBlue))">
                            <ErrorBar dataKey="errorY" width={4} strokeWidth={2} stroke="hsl(var(--codeforceRed))" direction="y" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

const LogarithmicContestsPerTitleChart = () => {
    const chartData = Object.keys(data).map((key) => {
        const [min, max] = data[key as keyof typeof data];
        if (min && max) {
            const logmin = Math.log10(min);
            const logmax = Math.log10(max);
            const mean = (min + max) / 2;
            const logmean = (logmin + logmax)/2;
            return {
                "name": key,
                "mean": mean,
                "logmean": logmean,
                "errorY": [(mean - min), (max - mean)],
                "logerrorY": [(logmean - logmin), (logmax - logmean)],
                "min": min,
                "logmin": logmin,
                "max": max,
                "logmax": logmax
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
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>Logarithmic Average Number of Contests</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 10, bottom: 70 }}
                    >
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={70}
                            interval={0}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "white" }}
                        />
                        <YAxis tick={{ fill: "white" }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="logmean" fill="hsl(var(--codeforceBlue))">
                            <ErrorBar dataKey="logerrorY" width={4} strokeWidth={2} stroke="hsl(var(--codeforceRed))" direction="y" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default { ContestsPerTitleChart, LogarithmicContestsPerTitleChart };