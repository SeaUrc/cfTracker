'use client'

import SampleChart from "~/components/charts/sampleChart"
import NavBar from "~/components/navbar/navbar"

export default function UsersPage() {
    return (
        <div>
            <NavBar page="users"/>
            <div className="px-20 w-full">
                <h1 className="text-5xl font-medium">
                    Trends in Users
                </h1>
                <div className="flex flex-row w-full justify-between">
                    <div className="flex w-1/3 items-center text-lg">
                        Average number of problems solved to be have a certain title. Theres an positive, expotential realtionship between problems
                        solved and title. The error bars show a 95% confidence interval for the true average. In other words, we can be 95% that the
                        true average number of problems solved for a given title lies within the bars.
                    </div>
                    <div className="flex w-1/2 mt-16">
                        <SampleChart />
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between">
                    <div className="flex w-1/2 mt-16">
                        <SampleChart />
                    </div>
                    <div className="flex w-1/3 items-center text-lg">
                        Average number of problems solved to be have a certain title. Theres an positive, expotential realtionship between problems
                        solved and title. The error bars show a 95% confidence interval for the true average. In other words, we can be 95% that the
                        true average number of problems solved for a given title lies within the bars.
                    </div>
                </div>
            </div>
        </div>
    )
}