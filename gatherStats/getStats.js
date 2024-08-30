const fs = require('fs');

async function getAllUsers(activeOnly, includeRetired) { // (participated in rated contest in last month, active online in last month)
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
        console.log("GOT USERNAMES, WRITING", userNames[0]);
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

async function getUserSolvedProb(user) {
    let subs = await getUserSubmissions(user);
    let uniqueProbs = new Set();
    if (subs) {
        subs.forEach((sub) => {
            // console.log(sub);
            let problem = `${sub["problem"]["contestId"]}${sub["problem"]["index"]}`;
            // console.log(sub['testset']);
            if (sub['verdict'] == "OK" && !uniqueProbs.has(problem)) {
                uniqueProbs.add(problem);
                // console.log(sub[""])
            }
        })
        return uniqueProbs.size;
    }

    console.error('FAIlED RETREIVAL OF SUBSMISSIONS FOR USER ', user);
    return -1;
}

async function getUserCurrRatingAndContests(user) {
    let ratingHist = await getUserRatingHistory(user);
    let lastRating;
    try {
        lastRating = await ratingHist[ratingHist.length - 1]["newRating"];
    } catch (e) {
        console.log(ratingHist);
        console.error(e);
    }
    let numContests = await ratingHist.length;
    return [lastRating, numContests];
}





async function storeAllUserSubmissionAndContest(signal) {
    const seenUsers = await loadJSON('fetchedUsersSubmission'); // [{username, rating, problems}]
    const allUsers = await loadAllUsers();
    const userRatingProb = await loadJSON('userRatingProblemsContests');
    console.log("Loaded seen users, all users, and user ratings & problems");

    const saveStuff = async () => {
        await saveJSON('userRatingProblemsContests', userRatingProb);
        await saveJSON('fetchedUsersSubmission', seenUsers);
    }

    let lastSaved = Date.now();
    try {
        let seen = new Set();
        seenUsers.forEach((user) => {
            // console.log(user);
            seen.add(user);
        })

        for (const user of allUsers) {
            if (signal.aborted) {
                throw new Error("Abort!");
            }

            // setTimeout(() => {}, 1000);

            if (!seen.has(user)) {
                let numSolved = await getUserSolvedProb(user);
                if (numSolved == -1) {
                    console.log(`SKIPPED ${user}`);
                    continue;
                }
                // console.log("get num solved")
                let [rating, contestNum] = await getUserCurrRatingAndContests(user);
                // console.log("get rating and contests");
                userRatingProb.push({
                    username: user,
                    rating: rating,
                    problems: numSolved,
                    numContests: contestNum
                });
                seen.add(user);
                // console.log("collected ", user);
                console.log(user);
                seenUsers.push(user);
            }
            if (Date.now() - lastSaved > 120000) {
                await saveStuff();
                console.log("SAVED!");
                lastSaved = Date.now();
            }
        }


        console.log("SAVED!");
        await saveStuff()
    } catch (err) {
        
        if (err.message === "Abort!") {
            console.log("Cleaning");    
            await saveStuff();
            console.log("SAVED!");
        } else {
            // console.error("FAILED", err);
            throw new Error("IDK");
        }
    }
}

const controller = new AbortController();

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    var chunk = process.stdin.read();
    if (chunk !== null) {
        if (chunk.trim() === "q") {
            controller.abort();
            console.log("Abort signal received");
        }
        process.stdout.write(`data: ${chunk}`);
    }
});

async function runWithRetry() {
    let cnt = 0;
    while (true) {
        console.log(`RERUN ${cnt}`);
        try {
            await storeAllUserSubmissionAndContest(controller.signal);
            break;
        } catch (err) {
            console.error("Failed to run storeAllUserSubmissionAndContest, retrying in 5 minutes...", err);
            await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
        }
        cnt++;
    }
}

// let json = []

// saveAllUsers().then(() => {
//     console.log("done");
//     saveJSON('userRatingProblemsContests', json).then(() => {
//         console.log("saved userratingproblemscontests");
//         saveJSON('fetchedUsersSubmission', json).then(() => {
//             console.log("saved fetchedUserSubmissions");
//         })
//     })
// })


runWithRetry();
