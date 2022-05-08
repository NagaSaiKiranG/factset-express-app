
import utils from '../../src/package/package.utils.js';
import { getPackageDetails } from '../../src/package/package.service.js';
import axios from 'axios';
import { jest } from '@jest/globals';

describe('unit test cases for package.service.js', () => {
    let mockAxiosDefault;
    let mockDecodeBlob;
    beforeEach(async () => {
        mockAxiosDefault = jest.spyOn(axios, "request");
        mockDecodeBlob = jest.spyOn(utils, "decodeBlob");
    });

    describe('unit tests for fetch packages by repository name', () => {
        it('test for invalid repository name', async () => {
            //Arrange
            mockAxiosDefault.mockImplementation(() => Promise.resolve({
                data: {
                    total_count: 0,
                    incomplete_results: false,
                    items: []
                }
            }));

            //Act
            const res = await getPackageDetails("dummy", "");

            //Assert
            expect(res).toMatch("No repo found with the name dummy");
        });
        it('test for valid repository name', async () => {
            //Arrange
            mockAxiosDefault
                .mockImplementationOnce(() => Promise.resolve({
                    data: {
                        total_count: 1,
                        incomplete_results: false,
                        items: [{
                            full_name: "facebook/react",
                            contents_url: "https://api.github.com/repos/facebook/react/contents/{+path}"
                        }]
                    }
                }))
                .mockImplementationOnce(() => Promise.resolve({
                    data: {
                        content: "blob"
                    }
                }));
            mockDecodeBlob.mockImplementationOnce(() => { return {} });

            //Act
            const res = await getPackageDetails("dummy", "");

            //Assert
            expect(mockDecodeBlob).toHaveBeenCalledWith("blob");
            expect(res).toEqual({
                fullname: "facebook/react",
                packages: []
            });
        })
    });
    describe('unit tests for fetch packages by repository popularity', () => {
        it('test for invalid file path', async () => {
            //Arrange
            mockAxiosDefault
                .mockImplementationOnce(() => Promise.resolve({
                    data: {
                        total_count: 1,
                        incomplete_results: false,
                        items: [{
                            full_name: "facebook/react",
                            contents_url: "https://api.github.com/repos/facebook/react/contents/{+path}"
                        }]
                    }
                }))
                .mockImplementationOnce(() => Promise.reject({}));

            //Act
            const res = await getPackageDetails("", 1);
            expect(res).toMatch("Error while fetching data for repo . Message: path is not defined");
        });
        it('test for valid repository content', async () => {
            //Arrange
            mockAxiosDefault
                .mockImplementationOnce(() => Promise.resolve({
                    data: {
                        total_count: 1,
                        incomplete_results: false,
                        items: [{
                            full_name: "facebook/react",
                            contents_url: "https://api.github.com/repos/facebook/react/contents/{+path}"
                        }]
                    }
                }))
                .mockImplementationOnce(() => Promise.resolve({
                    data: {
                        content: "blob"
                    }
                }));
            mockDecodeBlob.mockImplementationOnce(() => { return { 
                dependencies: {
                    dependencies: "dependencies"
                }, 
                devDependencies: {
                    devDependencies: "devDependencies"
                }, 
                peerDependencies: {
                    peerDependencies: "peerDependencies"
                }
            } });

            //Act
            const res = await getPackageDetails("dummy", "");

            //Assert
            expect(mockDecodeBlob).toHaveBeenCalledWith("blob");
            expect(res).toEqual({
                fullname: "facebook/react",
                packages: ["dependencies", "devDependencies", "peerDependencies"]
            });
        })
        it('test for valid dependencies only', async () => {
            //Arrange
            mockAxiosDefault
                .mockImplementationOnce(() => Promise.resolve({
                    data: {
                        total_count: 1,
                        incomplete_results: false,
                        items: [{
                            full_name: "facebook/react",
                            contents_url: "https://api.github.com/repos/facebook/react/contents/{+path}"
                        }]
                    }
                }))
                .mockImplementationOnce(() => Promise.resolve({
                    data: {
                        content: "blob"
                    }
                }));
            mockDecodeBlob.mockImplementationOnce(() => { return { 
                dependencies: {
                    dependencies: "dependencies"
                }
            } });

            //Act
            const res = await getPackageDetails("dummy", "");

            //Assert
            expect(mockDecodeBlob).toHaveBeenCalledWith("blob");
            expect(res).toEqual({
                fullname: "facebook/react",
                packages: ["dependencies"]
            });
        });
    });
})


