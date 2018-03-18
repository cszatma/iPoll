'use strict';

const path = require('path');
const chalk = require('chalk');
const { spawn, spawnSync } = require('child_process');

process.on('unhandledRejection', err => {
    throw err
});

const args = process.argv;

const buildApi = !args.includes('--client');
const buildClient = !args.includes('--api');

let packageManager;

// Check which package manager to use
// If no options specified yarn is used if it exists, otherwise npm is used
if (buildClient) {
    if (args.includes('--use-npm')) {
        packageManager = 'npm';
    } else if (args.includes('--use-yarn')) {
        packageManager = 'yarn';
    } else {
        const checkYarn = spawnSync('which yarn', [], {shell: true});
        packageManager = checkYarn.status === 0 ? 'yarn' : 'npm';
    }
}

const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';
const errorHandler = error => console.log(chalk.red('An error occurred. ' + error));

const options = dir => ({
    cwd: path.join(__dirname, '../' + dir),
    stdio,
    shell: true,
});

console.log(chalk.cyan(`Building ${buildApi ? 'api' : ''}${buildApi && buildClient ? ' and ' : ''}${buildClient ? 'client' : ''}.`));

if (buildApi) {
    const apiProcess = spawn('vapor build', [], options('api'));

    apiProcess.on('error', errorHandler);

    apiProcess.on('close', code => {
        if (code !== 0) {
            console.log(chalk.red(`vapor build exited with code ${code}`));
        } else {
            console.log(chalk.green('Successfully built the api!\n'));
        }
    });
}

if (buildClient) {
    const clientProcess = spawn(packageManager + ' run build', [], options('client'));

    clientProcess.on('error', errorHandler);

    clientProcess.on('close', code => {
        if (code !== 0) {
            console.log(chalk.red(`${packageManager} run build exited with code ${code}`));
        } else {
            console.log(chalk.green('Successfully built the client!\n'));
        }
    });
}
