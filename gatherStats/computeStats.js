const statlib = require('statlib');
const fs = require('fs');



const ratingBands =
{
    "Newbie": [0, 999],
    "Pupil": [1000, 1199],
    "Apprentice": [1200, 1399],
    "Specialist": [1400, 1599],
    "Expert": [1600, 1799],
    "Candidate Master": [1800, 1999],
    "Master": [2000, 2199],
    "International Master": [2200, 2399],
    "Grandmaster": [2400, 2699],
    "International Grandmaster": [2700, 2999],
    "Legendary Grandmaster": [3000, 10000]
}


async function loadJSON(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${name}.json`, 'utf8', (err, jsonString) => {
            if (err) {
                console.log('Error reading file', err);
                return;
            }
            try {
                // Parse JSON string to JavaScript object
                const data = JSON.parse(jsonString);
                //   console.log(data);
                resolve(data);
            } catch (err) {
                console.log('Error parsing JSON string', err);
                reject(err)
            }
        });
    })
}

function saveJSON(name, jsonFile) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${name}.json`, JSON.stringify(jsonFile), (err) => {
            if (err) {
                console.error('err writing to file');
                reject(err);
            }
            resolve();
        })
    })

}

async function computeDistribution(bucketSize) {
    const MAXRATING = 4000;
    let numberPerBucket = Array.from(Array(Math.ceil(MAXRATING / bucketSize)), () => 0); // [ 0->bucketSize, bucketSize->2*bucketSize, . . . ];
    // for (let i = 0; i<=MAXRATING; i+=bucketSize){

    // }
    const userRatingProbCont = await loadJSON('userRatingProblemsContests');
    let ratings = []
    userRatingProbCont.forEach((user) => {
        if (user.rating) {
            ratings.push(user.rating);
            let bucketNumber = Math.floor(user.rating / bucketSize);
            numberPerBucket[bucketNumber]++;
        }
        // console.log(user);
    })

    let dist = {
        bucketSize: bucketSize,
        mean: statlib.mean(ratings),
        stdDev: statlib.populationStd(ratings),
        median: statlib.median(ratings),
        skew: statlib.skewness(ratings),
        distribution: numberPerBucket
    };
    saveJSON("jsonStats/ratingDistribution", dist);
}

function getTitle(rating, ratingBands) {
    for (const [type, range] of Object.entries(ratingBands)) {
        const [min, max] = range;
        if (rating >= min && rating <= max) {
            return type;
        }
    }
    return null;
}


async function computeProbSolveTInterval() {
    // use statlib
    // let tInterval = (x, y) => { return [0, 0] } // tmp func
    const userRatingProbCont = await loadJSON('userRatingProblemsContests');

    let data = {
        "Newbie": [],
        "Pupil": [],
        "Apprentice": [],
        "Specialist": [],
        "Expert": [],
        "Candidate Master": [],
        "Master": [],
        "International Master": [],
        "Grandmaster": [],
        "International Grandmaster": [],
        "Legendary Grandmaster": []
    }


    userRatingProbCont.forEach((user) => {
        if (user.rating && user.problems) {
            let title = getTitle(user.rating, ratingBands);
            data[title].push(user.problems);
        }

    })

    const confidence = 0.95
    for (const [title, d] of Object.entries(data)) {
        data[title] = statlib.tInterval(d, confidence);
    }
    // return data;
    saveJSON('jsonStats/problemSolvedTInterval', data);
}

async function computeProbSolveLinRegTInterval() {
    // let linRegTInt = (x, y, conf) => { return [0, 0] } // tmp func
    const userRatingProbCont = await loadJSON('userRatingProblemsContests');
    let x = [];
    let y = [];
    userRatingProbCont.forEach((user) => {
        if (user.rating && user.problems) {
            y.push(user.rating);
            x.push(user.problems);
        }
    })

    const confidence = 0.95;
    let res = statlib.linRegTInterval(x, y, confidence);
    let save = {
        "slope": res[0],
        "intercept": res[1]
    }
    saveJSON('jsonStats/problemSolvedLinReg', save);
    // const [[slopeUp, slopeLow], [interceptUp, interceptDown]] = 
}

computeDistribution(50).then(() => { console.log("DONE DISTRIBUTION!") });
computeProbSolveTInterval().then(() => { console.log("DONE T INTERVAL!") })
computeProbSolveLinRegTInterval().then(() => { console.log("DONE LIN REG!") })