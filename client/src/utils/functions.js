// @flow

function capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeDashesAndUnderscores(str: string): string {
    return str.replace(/[-_]/g, ' ');
}

function removeAndCapitalizeAll(str: string): string {
    return removeDashesAndUnderscores(str).split(' ').map(s => capitalizeString(s)).join(' ');
}

export {
    capitalizeString,
    removeDashesAndUnderscores,
    removeAndCapitalizeAll,
};
