const axios = require("axios");

const git_base_url = 'https://api.github.com/';
const search_repo_path = "search/repositories";
async function getPackageDetails(repoName = '', page = '') {
  try {
    console.log("started", repoName);
    const resp = await getRepoDetails(repoName, page);
    let content_url = resp.items[0].contents_url;
    content_url = content_url.replace("{+path}", "package.json");
    console.log('content_url', content_url);
    const configs = getConfig("GET", content_url, {});
    const blob = await axios.default(configs).then((res) => res.data.content);
    const { dependencies, devDependencies } = JSON.parse(
      Buffer.from(blob, "base64").toString()
    );
    let packages = [];
    if (dependencies) {
      packages = [...packages, ...Object.keys(dependencies)];
    }
    if (devDependencies) {
      packages = [...packages, ...Object.keys(devDependencies)];
    }
    return packages;
  } catch (err) {
    console.log(`Error ${err.message}`);
  }
}
async function getRepoDetails(repoName, page) {
  try {
    const url = buildSearchUrl(git_base_url + search_repo_path, repoName, page);
    const config = getConfig("GET", url, {});
    const response = await axios.default(config);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
function buildSearchUrl(url, repoName = '', page = '') {
  let urlParams = '';
  if (repoName) {
    urlParams = `q=${repoName}+language:javascript&order=desc&sort=stars1&per_page=1`;
  } else {
    urlParams = `q=language:javascript&order=desc&sort=stars1&per_page=1`;
  }
  if (page) {
    urlParams = `${urlParams}&page=${page}`;
  }
  return `${url}?${urlParams}`;
}
function getConfig(method, url, headers) {
  return {
    method,
    url,
    headers
  };
}

module.exports = { getPackageDetails };
