const fs = require('fs');

async function getAllUsers(activeOnly, includeRetired) {
    let url = `https://codeforces.com/api/user.ratedList?activeOnly=${activeOnly}&includeRetired=${includeRetired}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("failed to fetch all users")
    }
    const data = await res.json();
    const users = data.result;
    const userNames = [];
    users.forEach(user => {
        userNames.push(user.handle);
    })
    return userNames;
}

async function getUserRatingHistory(userName) {
    let url = `https://codeforces.com/api/user.rating?handle=${userName}`;
    const res = await fetch(url);
    const js = await res.json();
    return js.result;
}

async function getUserSubmissions(userName) {
    let url = `https://codeforces.com/api/user.status?handle=${userName}`
    const res = await fetch(url);
    const js = await res.json();
    return js.result;
}

async function saveAllUsers() {
    return new Promise(async (resolve, reject) => {
        const userNames = await getAllUsers(true, false);

        fs.writeFile('userNames.json', JSON.stringify(userNames), (err) => {
            if (err) {
                console.error("err writing to file");
                reject(err);
            }
            resolve();
        })
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

async function loadAllUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile('userNames.json', 'utf8', (err, jsonString) => {
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
                reject(err);
            }
        });
    })
    
}

// saveAllUsers();
// console.log(loadAllUsers())

async function getAllRatingHistory() {
    const userNames = await getAllUsers(true, false);
    const promiseRatingHist = userNames.map(username => {
        getUserRatingHistory(username);
    })

    const allRatingHistories = await Promise.all(promiseRatingHist);
    console.log(allRatingHistories.slice(0, 10));
    return allRatingHistories;
}

// getAllRatingHistory()

const ratingBands =
{
    "Newbie": [0, 999],
    "Pupil": [1000, 1199],
    "Apprentice": [1200, 1399],
    "Specialist": [1400 - 1599],
    "Expert": [1600, 1799],
    "Candidate Master": [1800, 1999],
    "Master": [2000, 2199],
    "International Master": [2200, 2399],
    "Grandmaster": [2400, 2699],
    "International Grandmaster": [2700, 2999],
    "Legendary Grandmaster": [3000, 10000]
}

async function compute(){
    const ratingvprobs = [];
    const users = loadAllUsers();
    users.forEach((user) => {

    })

    getAllUsers().then(async (userNames)=>{
       userNames.forEach(async (user) => {

            console.log("fetching", user)
            const ratingHist = JSON.parse(getUserRatingHistory(user));
            const currrating = ratingHist[ratingHist.length-1].newRating;
            const submissionHist = JSON.parse(getUserSubmissions(user));
            let uniqueProbs = new Set();
            submissionHist.forEach((sub) => {
                if (!uniqueProbs.has(sub)){
                    uniqueProbs.add(sub);
                }
            })
            const currProblems = uniqueProbs.size;
            ratingvprobs.push([currrating, currProblems]);
        })

        const allSubmissions = awaitPromise.all(promises);


    })

}

// getUserRatingHistory('tourist').then((res) => {
//     console.log(res);
//     saveJSON('testingRatingHist', res)
// });

// getUserSubmissions('jiangly').then((res) => {
//     // console.log(res);
//     saveJSON('testingSubmissionHist', res);
// })


// loadJSON('testingSubmissionHist').then((probs) => {
//     // console.log(probs);
//     // Object.keys(probs).forEach((key) => {
//     //     if (key == "rating"){
//     //         console.log(probs[key]);
//     //     }
//     // })
//     let uniqueProbs = new Set();
//     probs.forEach((sub) => {
//         console.log(sub)
//         let problem = sub["problem"]
//         // console.log(problem);
//         if (sub['verdict']=="OK" && !uniqueProbs.has(problem)){
//             uniqueProbs.add(problem);
//             // console.log(sub[""])
//         }
//     })
//     console.log(uniqueProbs.size);
// });

async function getUserSolvedProb(user){
    let subs = await getUserSubmissions(user);
    let uniqueProbs = new Set();
    subs.forEach((sub) => {
        // console.log(sub);
        let problem = `${sub["problem"]["contestId"]}${sub["problem"]["index"]}`;
        // console.log(sub['testset']);
        if (sub['verdict']=="OK" && !uniqueProbs.has(problem)){
            uniqueProbs.add(problem);
            // console.log(sub[""])
        }
    })
    return uniqueProbs.size;
}

getUserSolvedProb("SeaUrc").then((sz) => {
    console.log(sz);
})