# sample-react-box

* This sample is a constract written in JS for [icetea](https://github.com/TradaTech/icetea) platform.
* If you prefer React Hooks, use this [version](https://github.com/brittle-box/react-box/tree/version/react-hooks)

## Directory
```
project
└───client               <-- create-react-app
└───src
│   │   simplestore.djs  <-- your source here
└───icetea.js            <-- blockchain connection config
└───deploy.js            <-- deploy logic
```

## Step
1. Modify connection config in `icetea.js`. Deploy contract with brittle (`brittle deploy`)
2. Change deployed contract address in `client/src/App.js` (line 7)
3. Start the react app
```bash
$ cd client
$ npm install
$ npm start
```