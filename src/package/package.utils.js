import {PROGRAMMING_LANGUAGE} from './package.constants.js';

export function buildSearchUrl(url, repoName = '', page = '') {
    let urlParams = '';
    if (repoName) {
        urlParams = `q=${repoName}+language:${PROGRAMMING_LANGUAGE}&order=desc&sort=stars&per_page=1`;
    } else {
        urlParams = `q=language:${PROGRAMMING_LANGUAGE}&order=desc&sort=stars&per_page=1`;
    }
    if (page) {
        urlParams = `${urlParams}&page=${page}`;
    }
    return `${url}?${urlParams}`;
}

export function getConfig(method, url, headers) {
    return {
        method,
        url,
        headers
    };
}

export function insertFilePath(content_url, filepath) {
    if (content_url === 'NA') {
        throw new Error(`No valid content_url`);
    }
    return content_url.replace("{+path}", filepath);
}

export function getRepoDetails(data, key) {
    return data.items[0][key] || 'NA';
}

export function consolidatePackages(dependencies, devDependencies, peerDependencies) {
    try {
        let packages = [];
        if (dependencies) {
            packages = pushKeysToArray(packages, dependencies);
        }
        if (devDependencies) {
            packages = pushKeysToArray(packages, devDependencies);
        }
        if (peerDependencies) {
            packages= pushKeysToArray(packages, peerDependencies);
        }
        return packages;
    } catch (e) {
        console.error(`[[consolidatePackages]], error ${e}`);
    }
}

function pushKeysToArray(array, object) {
    return [...array, ...Object.keys(object)];
    // console.log(array.length, JSON.stringify(object));
}
