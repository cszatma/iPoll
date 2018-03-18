'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { spawnSync, spawn } = require('child_process');

process.on('unhandledRejection', err => {
    throw err
});

const args = process.argv;

const startApi = !args.includes('--client');
const startClient = !args.includes('--api');

let packageManager;

// Check which package manager to use
// If no options specified yarn is used if it exists, otherwise npm is used
if (startClient) {
    if (args.includes('--use-npm')) {
        packageManager = 'npm';
    } else if (args.includes('--use-yarn')) {
        packageManager = 'yarn';
    } else {
        const checkYarn = spawnSync('which yarn', [], { shell: true });
        packageManager = checkYarn.status === 0 ? 'yarn' : 'npm';
    }
}

const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';
const errorHandler = error => console.log(chalk.red('An error occurred. ' + error));

const options = dir => ({
    cwd: dir ? path.join(__dirname, dir) : __dirname,
    stdio,
    shell: true,
});

// Build the api unless the --no-build option is passed
if (startApi && !args.includes('--no-build')) {
    const buildApi = spawnSync('node build.js --api', [], options());

    if (buildApi.status !== 0) {
        errorHandler(buildApi.error);
        console.log(chalk.red(`vapor build exited with code ${code}`));
        process.exit(1);
    }
}

console.log(chalk.cyan(`Starting ${startApi ? 'api' : ''}${startApi && startClient ? ' and ' : ''}${startClient ? 'client' : ''}.`));

if (startApi && startClient) {
    const concurrentlyPath = 'node_modules/.bin/concurrently';

    if (!fs.existsSync(concurrentlyPath)) {
        console.log(chalk.red(`concurrently is not installed.\nPlease run ${packageManager} install to install all required packages.`));
        process.exit(1);
    }

    const concurrentlyProcess = spawn(`${concurrentlyPath} "cd api && vapor run" "cd client && ${packageManager} run start"`, [], options('..'));

    concurrentlyProcess.on('error', errorHandler);

    concurrentlyProcess.on('close', code => {
        if (code !== 0) {
            console.log(chalk.red(`concurrently exited with code ${code}`));
        }
    });

} else if (startApi) {
    const apiProcess = spawn('vapor run', [], options('api'));

    apiProcess.on('error', errorHandler);

    apiProcess.on('close', code => {
        if (code !== 0) {
            console.log(chalk.red(`vapor run exited with code ${code}`));
        }
    });
} else if (startClient) {
    const clientProcess = spawn(packageManager + ' run start', [], options('client'));

    clientProcess.on('error', errorHandler);

    clientProcess.on('close', code => {
        if (code !== 0) {
            console.log(chalk.red(`${packageManager} run build exited with code ${code}`));
        }
    });
}
