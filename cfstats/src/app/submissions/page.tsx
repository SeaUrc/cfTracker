'use client'

import NavBar from "~/components/navbar/navbar"

import SubmissionsPerTitleChart from "~/components/charts/submissionsPerTitleChart"
import LinearRegressionProblemsChart from "~/components/charts/linearRegressionProblemsChart"
import linReg from '../../../../jsonStats/problemSolvedLinReg.json'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"


export default function SubmissionPage() {

  return (
    <div>
      <NavBar page="submissions" />
      <div className="px-20 w-full">
        <h1 className="text-5xl font-medium mt-10">
          Trends in Submissions
        </h1>
        <div className="flex flex-row w-full justify-between">
          <div className="flex w-1/3 items-center text-lg">
            Average number of problems solved to obtain a certain title. Theres an positive, expotential realtionship between problems
            solved and title. The error bars show a 95% confidence interval for the true average. In other words, we can be 95% confident that the
            true average number of problems solved for a given title lies within the bars.
          </div>
          <div className="flex w-1/2 mt-8">

            <Carousel>
              <CarouselContent>
                <CarouselItem> {<SubmissionsPerTitleChart.SubmissionsPerTitleChart />} </CarouselItem>
                <CarouselItem> {<SubmissionsPerTitleChart.LogarithmicSubmissionsPerTitleChart />}</CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex w-1/2 mt-16">
            <LinearRegressionProblemsChart />
          </div>
          <div className="flex w-1/3 items-center text-lg">
            Theres an positive, linear realtionship between problems solved
            and rating. Most data points are colleceted with under 500 problems, meaning the relationship fits more accurately within this range.
            While there are data points above 500 problems, I would be wary to extrapolate this relationship outside of ~500 problem mark.
            Using a 95% confidence linear regression t-interval, the lower and upper bound of the true population slope and intercept are
            {` ${linReg.slope[0]?.toPrecision(4)} - ${linReg.slope[1]?.toPrecision(4)} and ${linReg.intercept[0]?.toPrecision(4)} - ${linReg.intercept[1]?.toPrecision(4)}`} respectively
          </div>
        </div>
      </div>
    </div>
  )
}

