# factset-express-app
Start command:
npm start

Sample API calls:

http://localhost:8080/packages/{repository name}

http://localhost:8080/packages/popular/{page id}

We will fetch javascript repository details with matching name and read package json to consolidate packages used. In second call, we fetch most popular repository and return packages. By changing page number we can fetch respective repo in popularity list at a given time and return packages.

