[![devDependency Status](https://david-dm.org/PK1A/hsp-hello-gulp/status.png?branch=master)](https://david-dm.org/PK1A/hsp-hello-gulp#info=dependencies)
[![devDependency Status](https://david-dm.org/PK1A/hsp-hello-gulp/dev-status.png?branch=master)](https://david-dm.org/PK1A/hsp-hello-gulp#info=devDependencies)

hsp-hello-gulp
==============

Sample <a href="https://github.com/ariatemplates/hashspace" target="_blank">#space</a> project build with <a href="http://gulpjs.com/" target="_blank">Gulp.js</a>

## Install

Make sure that you've got node.js installed: http://nodejs.org/download/.
npm (Node Package Manager) should be installed with node.js. After the installation is complete, run those commands in your favourite terminal:

* `npm install -g gulp`
* `npm install`

## Play

* `gulp play` - this will start a built-in web server and will monitor files for changes to re-compile them if needed.

## Test

This sample application comes with a full set of tasks to perform unit testing. Here is the list:
* `gulp test` - runs all the test once
* `gulp tdd` - run tests, watch for file changes and re-execute tests on each test

## Package

Finally, you can see how to package your application and prepare it for the production deployment:
* `gulp package` - this is a default task