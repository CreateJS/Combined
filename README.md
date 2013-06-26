## We use grunt (http://gruntjs.com/) to manage our build process.

## To use

### Install dependencies

Node (0.10.x or greater is required):

   # check the version
   node -v

If your node is out of date, install the latest from:
http://nodejs.org/

After node is setup, install the other dependances:

   # Install the grunt command line utility
   sudo npm install grunt-cli -g

   # Install all the dependencies for this project.
   npm install

   #Make sure you have the latest of all the createjs libraries.
   #Install the dependencies in the build directories, ie EaselJS/build
   npm install
   #after the first install, it is much faster to copy the node_modules folder into each other project


### Setup

You'll need to change the default settings to suit your work environment.
We have 2 config files:

* config.json - Is meant to be in git and pushed to all developers.
* config.local.json - Is added to .gitignore and and only for your local setup (any settings in here will override those in config.json)

Please adjust these settings to match your environment. All paths can either be relative from this folder, or absolute paths.

* easel_path
* preload_path
* sound_path
* tween_path

### Building
To export a release build for this library run:

   grunt build

This command will:

* Update Easels and MovieClips version files.
* Create the easeljs-{VERSION}.min.js file
* Create a easeljs-{VERSION}.combined.js file
* Compile the docs and create a zip of them
* Create the movieclip-{VERSION}.min.js
* Copy the docs zip to ../docs
* Copy the built js file to ../lib

To build the NEXT version run:

grunt next

Does the exact same process as above but uses NEXT as the version.

### Combined build
To build everything using the latest version in each libraries package.json file run:

   grunt build

Or to build a NEXT version

	grunt next

### Main commands
grunt build - Builds all the projects and creates combined / minified files
grunt next - Same as build, but uses the NEXT version.
grunt core - Only run the global tasks (only, concat and minify js files, copy the examples and source to other folders.
grunt js - Only i and concat javascript.
