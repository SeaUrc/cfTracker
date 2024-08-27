WIP. Not yet hosted

To host locally, clone the repo and ```cd cfstats```. Run ```pnpm install``` and
 ```pnpm dev``` and open localhost::3000.

If you would like to gather the statstics for yourself, make sure you have node installed and run ```npm install``` and ```node gatherStats/getStats.js```.
Note: sometimes codeforces may block your request after too many. Just wait a bit and rerun.

To generate the useful statstics, run  ```node gatherStats/computeStats.js```