const express = require("express");
const gitClient = require("./git-client");
const app = express();

app.get("/packages/:repositoryName", async (req, res) => {
  const params = req.params;
  const packages = await gitClient.getPackageDetails(params.repositoryName);
  res.send(packages);
});
app.get("/packages/popular/:pageId", async (req, res) => {
  const params = req.params;
  const packages = await gitClient.getPackageDetails('', params.pageId);
  res.send(packages);
});
app.listen(8080, () =>{
  console.log("server running in 8080");
});
// getADPUserToken();

