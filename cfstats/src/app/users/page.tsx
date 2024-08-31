'use client'

import NavBar from "~/components/navbar/navbar"
import RatingDistributionChart from "~/components/charts/userRatingDistributionChart"
import data from '../../../../jsonStats/ratingDistribution.json'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel"

export default function UsersPage() {
    return (
        <div>
            <NavBar page="users" />
            <div className="px-20 w-full">
                <h1 className="text-5xl font-medium mt-10">
                    Trends in Users
                </h1>
                <div className="flex flex-row w-full justify-between">
                    <div className="flex w-1/3 items-center text-lg">
                        <div>
                            {/* The rating distribution of users is heavily skewed right with a mean of <span className="text-codeforceRed">{data.mean.toPrecision(5)}</span>,
                            median of <span className="text-codeforceRed">{data.median.toPrecision(5)}</span>, standard deviation of <span className="text-codeforceRed">{data.stdDev.toPrecision(5)}</span>,
                            and skewness of <span className="text-codeforceRed">{data.skew.toPrecision(5)}</span>. To check what percentile you lie within, scroll down!
                            You may notice that theres a sudden jump of users at around ~350 rating. Many of these accounts are new ones, with only one contests.
                            Likely these people joining codeforces that already have programming experience and do well in the first contest. */}
                            The rating distribution of users is heavily skewed right with a mean of {data.mean.toPrecision(5)},
                            median of {data.median.toPrecision(5)}, standard deviation of {data.stdDev.toPrecision(5)},
                            and skewness of {data.skew.toPrecision(5)}. To check what percentile you lie within, scroll down!
                            You may notice that theres a sudden jump of users at around ~350 rating. Many of these accounts are new ones, with only one contests.
                            Likely these people joining codeforces that already have programming experience and do well in the first contest.
                        </div>
                    </div>
                    <div className="flex w-1/2 mt-8">
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem> {<RatingDistributionChart.RatingDistributionChart />} </CarouselItem>
                                <CarouselItem> {<RatingDistributionChart.LogarithmicRatingDistributionChart />}</CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}