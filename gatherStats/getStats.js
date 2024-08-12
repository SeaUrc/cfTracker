const fs = require('fs');

async function getAllUsers(activeOnly, includeRetired){
    let url = `https://codeforces.com/api/user.ratedList?activeOnly=${activeOnly}&includeRetired=${includeRetired}`;
    const res = await fetch(url);
    if (!res.ok){
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

async function getUserRatingHistory(userName){
    let url = `https://codeforces.com/api/user.rating?handle=${userName}`;
    const res = await fetch(url);
    return res.json().result;
}

async function getUserSubmissions(userName){
    let url = `https://codeforces.com/api/user.status?handle=${userName}`
    const res = await fetch(url);
    return res.json().result;
}

async function saveAllUsers(){
    const userNames = await getAllUsers(true, false);
    
    fs.writeFile('userNames.json', JSON.stringify(userNames), (err) => {
        if (err){
            console.error("err writing to file");
        }
    })
}

function loadAllUsers(){
    fs.readFile('userNames.json', 'utf8', (err, data)=>{
        if (err){
            console.error('err reading file');
        }else{
            console.log(data);
            // const arr = JSON.parse(data);
            // return arr.slice(0, 10);
        }
    })
}

// saveAllUsers();
// console.log(loadAllUsers())

async function getAllRatingHistory(){
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
    "Specialist": [1400-1599],
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






// const ratingHistPromise = userNames.map(userName => {
//     getUserRatingHistory(userName);
// })