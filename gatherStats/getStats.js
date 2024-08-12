

async function getAllUsers(activeOnly, includeRetired){
    let url = `https://codeforces.com/api/user.ratedList?activeOnly=${activeOnly}&includeRetired=${includeRetired}`;
    const res = await fetch(url);
    if (!res.ok){
        throw new Error("failed to fetch all users")
    }
    return res;
}

async function getUserRatingHistory(userName){
    let url = `https://codeforces.com/api/user.rating?handle=${userName}`;
    const res = await fetch(url);
    return res;
}

async function getUserSubmissions(userName){
    let url = `https://codeforces.com/api/user.status?handle=${userName}`
    const res = await fetch(url);
    return res;
}

getAllUsers(true, false).then((res) => {
    return res.json();
}).then((json) => {
    console.log(json)
})