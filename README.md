# Hortonworks Angular Test application

<img width="300" alt="Hortonworks logo" src="./src/assets/pictures/ui_logo.svg">

**Created by**
Rómeó Nagy

Introduction
============

This front-end test application is a web based project which created in Angular 5+ framework using Bootstrap 4 style and components.
For build process <a href="https://nodejs.org" target="_blank">Node.js</a> and Angular-CLI used.
All necessary artifacts and plugins managed by <a href="https://www.npmjs.com" target="_blank">NPM package manager</a>.

Technical requirements
======================

1. Install Chrome browser
   ------------------
   
> Go to <a href="https://www.google.com/chrome/" target="_blank">Chrome installer</a>. Follow installation instructions.

2.	Install Node.js + NPM
    -------------

> Go to <a href="https://nodejs.org" target="_blank">Node.js</a> and download your preferred version.
> I used Node.js version 10.4.1 with NPM version of 6.1.0.
> Run and follow installation instructions.
>
> **At the installation step do not forget to check to install NPM package manager also!**

3. Configure NPM  
   -------------

> Go to your %USER% folder and create a .npmrc file with the following content to allow install some artifact without root (administrator) role:
* unsafe-perm=true

4. Install <a href="https://cli.angular.io/" target="_blank">Angular-CLI</a>
   -------------------

> npm install -g @angular/cli@1.7.4
> **Note:** If installation hangs then try to install in root (administrator) mode.

5. Install <a href="https://www.npmjs.com/package/http-server" target="_blank">http-server</a>
   -------------------

http-server is a simple, zero-configuration command-line http server. It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development, and learning.

> npm install http-server -g

Build and run project
=============


Go to the project main folder and run:
> 1. npm install
It will install all necessary artifacts.

> 2. npm run build
Note: **dist/** folder is already commited so you can skip **npm run build** command if you like.

After the build process dist/ folder created with the production built items.
Go to the dist/ folder and run:
> 3. http-server ./ -p3000 -c-1

Which will run a local webserver on port 3000.
> 4. Start your favourite browser (e.g. Chrome) and type in the address bar:
> http://localhost:3000/index.html

Test project
============

Currently e2e tests are available which can be run by going to the project main folder and executing:
> npm run e2e