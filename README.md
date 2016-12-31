# generator-angular-2-crud 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> This npm generate a CRUD for Angular 2 using a json model definition

## Installation

First, install [Yeoman](http://yeoman.io) and generator-angular-2-crud using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)). Ensure you're running the latest versions Node v4.x.x+ (or v5.x.x) and NPM 3.x.x+

```bash
npm install -g yo
npm install -g generator-angular-2-crud
```
To run your new project you need install the next packages:

 * typescript (npm install --global typescript)
 * webpack (npm install --global webpack)
 * webpack-dev-server (npm install --global webpack-dev-server)
 
## Defined your models.json

Access to the project folder and create a file named **models.json**

Example of models.json

```json
 {
    "doctor": {
        "id": { "type": "string", "require": "true" },
        "name": { "type": "string", "require": "true" },
        "address": "string"
    },
    "user": {
        "id": { "type": "string", "require": "true" },
        "name": { "type": "string", "require": "true" },
        "address": "string",
        "doctorId": { "referent": "doctor" }
    },
    "relativeUrl": "/api"
}
 ```

## Generation CRUD

Then generate your new project into your project folder with the model.json defined:

```bash
yo angular-2-crud
```

## Run

Now you can run your new CRUD

```bash
npm start
```

http://127.0.0.0:3000


## License

MIT © [gorums]()


[npm-image]: https://badge.fury.io/js/generator-angular-2-crud.svg
[npm-url]: https://npmjs.org/package/generator-angular-2-crud
[travis-image]: https://travis-ci.org/gorums/generator-angular-2-crud.svg?branch=master
[travis-url]: https://travis-ci.org/gorums/generator-angular-2-crud
[daviddm-image]: https://david-dm.org/gorums/generator-angular-2-crud.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gorums/generator-angular-2-crud
=======
# angular2-crud
This app generate a CRUD for Angular2
>>>>>>> 39b2d3446cb18169efd1ebc725a609d69c03162a
