import axios from 'axios';
import {
  git_base_url,
  search_repo_path,
  REPOSITORY_FULL_NAME,
  REPOSITORY_CONTENT_URL,
  FILE_PACKAGE_JSON} from './package.constants.js';
import {
  buildSearchUrl,
  getConfig,
  insertFilePath,
  getRepoDetails,
  consolidatePackages} from './package.utils.js';

export async function getPackageDetails(repoName = '', page = '') {
  try {
    console.log("started", repoName);
    const resp = await getRepository(repoName, page);

    if (resp.items.length === 0) {
      return `No repo found with the name ${repoName}`;
    }

    const content_url = insertFilePath(getRepoDetails(resp, REPOSITORY_CONTENT_URL), FILE_PACKAGE_JSON);
    const fullname = getRepoDetails(resp, REPOSITORY_FULL_NAME);
    console.log('content_url', content_url);

    const {dependencies, devDependencies, peerDependencies} = await getContentFromRepository(content_url);
    const packages = consolidatePackages(dependencies, devDependencies, peerDependencies);
    return {fullname,packages};
  } catch (err) {
    console.log(`Error ${err.message}`);
    return `Error while fetching data for repo ${repoName}. Message: ${err.message}`;
  }
}

async function getRepository(repoName, page) {
  try {
    const url = buildSearchUrl(git_base_url + search_repo_path, repoName, page);
    const config = getConfig("GET", url, {});
    const response = await axios.request(config);
    return response.data;
  } catch (e) {
    console.log(`[[getRepository]], error: ${e}`)
  }
}

async function getContentFromRepository(contentURL) {
  try {
    const config = getConfig("GET", contentURL, {});
    const blob = await axios.request(config).then((res) => res.data.content);
    const { dependencies, devDependencies, peerDependencies } = JSON.parse(
      Buffer.from(blob, "base64").toString()
    );
    return { dependencies, devDependencies, peerDependencies };
  } catch(e) {
    console.log(`[[getContentFromRepository]] path: ${path}, error: ${e}`)
  }
}


