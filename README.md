## We use grunt (http://gruntjs.com/) to manage our build process.

### To use

#### Install dependencies

Node (0.10.x or greater is required):

```
node -v
```

If your node is out of date, install the latest from:
http://nodejs.org/

After node is setup, install the other dependances:

```
# Install the grunt command line utility
sudo npm install grunt-cli -g

# Install all the dependencies for this project.
npm install

# Make sure you have the latest of all the createjs libraries.
# Install the dependencies in the build directories for each project, ie EaselJS/build
npm install
```

#### Setup

You'll need to change the default settings to suit your work environment.
We have 2 config files:

* config.json - Is meant to be in git and pushed to all developers.
* config.local.json - Is added to .gitignore and and only for your local setup (any settings in here will override those in config.json)

Please adjust these settings to match your environment. All paths can either be relative from this folder, or absolute paths.

* easel_path
* preload_path
* sound_path
* tween_path

#### Building
To export a release build for this library run:

```
grunt build
```

This command will:

* Execute each libraries corresponding build or next tasks.
* Combine all the CreateJS classes into a single file.
* Remove any duplicate classes (Things like Event, EventDispatcher)
* Minify the combined file

To build the NEXT version run:

```
grunt next
```

Does the exact same process as above but uses NEXT as the version.

#### Main commands
* grunt build - Builds all the projects and creates combined / minified files
* grunt next - Same as build, but uses the NEXT version.
* grunt core - Only run the global tasks (only, concat and minify js files, copy the examples and source to other folders.
* grunt js - Only uglify and concat the javascript.
* grunt cdn - Builds a new CDN index page and copies all required script files to build. (To build all libs and the cdn run grunt cdn:build or grunt build cdn)
