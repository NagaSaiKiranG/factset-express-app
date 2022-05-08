import express from 'express';
import {getPackageDetails} from './package.service.js';

const packageController = express.Router();

packageController.get("/packages/:repositoryName", async (req, res) => {
    const params = req.params;
    const packages = await getPackageDetails(params.repositoryName);
    res.send(packages);
});

packageController.get("/packages/popular/:pageId", async (req, res) => {
    const params = req.params;
    const packages = await getPackageDetails('', params.pageId);
    res.send(packages);
});

export default packageController;