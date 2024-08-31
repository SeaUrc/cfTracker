'use client'

import ContestsPerTitleChart from "~/components/charts/contestsPerTItleChart"
import LinearRegressionContestsChart from "~/components/charts/linearRegressionContestsChart"
import NavBar from "~/components/navbar/navbar"
import linReg from '../../../jsonStats/contestsSolvedLinReg.json'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"


export default function ContestPage() {
    return (
        <div>
            <NavBar page="contests" />
            <div className="px-20 w-full">
                <h1 className="text-5xl font-medium mt-10">
                    Trends in Contests
                </h1>
                <div className="flex flex-row w-full justify-between">
                    <div className="flex w-1/3 items-center text-lg">
                        Average number of contests participated in to obtain a certain title. Theres an positive realtionship between problems
                        solved and title. The error bars show a 95% confidence interval for the true average. In other words, we can be 95% confident that the
                        true average number of problems solved for a given title lies within the bars.
                    </div>
                    <div className="flex w-1/2 mt-8">
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem> {<ContestsPerTitleChart.ContestsPerTitleChart />} </CarouselItem>
                                <CarouselItem> {<ContestsPerTitleChart.LogarithmicContestsPerTitleChart />}</CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between">
                    <div className="flex w-1/2 my-16">
                        <LinearRegressionContestsChart />
                    </div>
                    <div className="flex w-1/3 items-center text-lg">
                        Theres an positive, linear realtionship between # of contests participated
                        and rating. Most data points are colleceted with under 100 contests, meaning the relationship fits more accurately within this range.
                        While there are data points outside above 100 contests, I would be wary to extrapolate this relationship outside of ~100 contest mark.
                        Using a 95% confidence linear regression t-interval, the lower and upper bound of the true population slope and intercept are
                        {` ${linReg.slope[0]?.toPrecision(4)} - ${linReg.slope[1]?.toPrecision(4)} and ${linReg.intercept[0]?.toPrecision(4)} - ${linReg.intercept[1]?.toPrecision(4)}`} respectively
                    </div>
                </div>
            </div>
        </div>
    )
}