'use client'

import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import data from '../../../../jsonStats/ratingDistribution.json'


interface DistributionData {
    bucketSize: number;
    distribution: number[];
}

interface ChartDataItem {
    bucket: string;
    count: number;
}


const RatingDistributionChart = () => {
    const bucketSize = data["bucketSize"];
    const distribution = data["distribution"];

    const chartData: ChartDataItem[] = distribution.map((value, index) => ({
        rating: `${(index) * bucketSize}`,
        bucket: `${index * bucketSize} - ${(index + 1) * bucketSize}`,
        count: value
    }));


    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Distribution Rating</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} >
                    <BarChart data={chartData}>
                        <XAxis
                            dataKey="rating"
                            tickLine={false}
                            axisLine={true}
                            tickMargin={8}
                            minTickGap={16}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent
                                className="w-12"
                                nameKey="bucket"
                                labelFormatter={(val: any) => {
                                    return `${val} -  ${Number(val) + bucketSize}`
                                }}
                            />}
                        />
                        <Bar dataKey="count" fill="hsl(var(--codeforceBlue))" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
};

const LogarithmicRatingDistributionChart = () => {
    const bucketSize = data["bucketSize"];
    const distribution = data["distribution"];
    const logDist = distribution.map((d) => {
        return (d == 0 ? 0 : Math.log10(d))
    });

    const chartData: ChartDataItem[] = logDist.map((value, index) => ({
        rating: `${(index) * bucketSize}`,
        bucket: `${index * bucketSize} - ${(index + 1) * bucketSize}`,
        count: value
    }));

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Logarithmic Distribution Rating</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} >
                    <BarChart data={chartData}>
                        <XAxis
                            dataKey="rating"
                            tickLine={false}
                            axisLine={true}
                            tickMargin={8}
                            minTickGap={16}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent
                                className="w-12"
                                nameKey="bucket"
                                labelFormatter={(val: any) => {
                                    return `${val} -  ${Number(val) + bucketSize}`
                                }}
                            />}
                        />
                        <Bar dataKey="count" fill="hsl(var(--codeforceBlue))" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
};

export default { RatingDistributionChart, LogarithmicRatingDistributionChart }