// @flow

function capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capitalizeString };
