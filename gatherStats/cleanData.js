const fs = require('fs');

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


async function clean(){
    const userRatingProbCont = await loadJSON('userRatingProblemsContests');
    userRatingProbCont.filter((user) => (user.hasOwnProperty("rating")));
    saveJSON('userRatingProblemsContests', userRatingProbCont);
}

clean().then(() => {
    console.log("CLEANED!");
})