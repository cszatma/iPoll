# iPoll
Built with [Vapor](http://vapor.codes/) and [React](https://reactjs.org/)!

## Usage

To build and run the app you must have [Swift](https://swift.org/download/) and [Node.js](https://nodejs.org/en/download/) installed. [Yarn](https://yarnpkg.com/en/docs/install) is also recommened, but it is not required.

### Setup
First install the dependencies using `yarn install` or `npm install`. Running this in the root directory will install the dependencies in both the root and client directories.

### Running the App
To run the app in development use `yarn start` or `npm start` in the root directory. This will run both the Vapor backend and the React frontend.

Optionally you can run only one of them using either `yarn start-api` or `yarn start --api` and `yarn start-client` or `yarn start --client` respectively. However, running the client on its own is not recommened as it will not function properly without the backend.

You can also prevent the vapor app from being built by running either `yarn start:no-build` or `yarn start --no-build`. This is useful if the vapor app has already been built and there is no need to build it before running it.

### Building the App
To create a production build run `yarn build` or `npm build` in the root directory. This will build both the api and the client.

Optionally you can build a specific one of them using either `yarn build-api` or `yarn build --api` and `yarn build-client` or `yarn build --client` respectively.

### Note
If you use `npm` instead of `yarn` you will need to prefix the commands with `run`. For example `npm run build`. Also with npm you are required to place `--` before any arguments. So to build the api you would need to run `npm run build -- --api`.