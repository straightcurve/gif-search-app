# Tenor GIF search app (dead)

This is a minimal Ultralight app that uses Tenor's api to search for gifs. You need your own api key.
I decided not to continue further development because the built-in browser doesn't support all ES6 features, it's pretty outdated
and the performance is.. a bit bad compared to any modern browser. This and the fact that I had to fix the build pipeline myself
kind of makes me not want to use Ultralight anymore.

## 1. Install the Prerequisites

Before you build and run, you'll need to [install the prerequisites](https://docs.ultralig.ht/docs/installing-prerequisites) for your platform.

## 2. Clone and build the app

To clone the repo and build, run the following:

```shell
git clone git@github.com:straightcurve/gif-search-app.git
cd gif-search-app
mkdir build
cd build
cmake ..
cmake --build . --config Release
```

> **Note**: _To force CMake to generate 64-bit projects on Windows, use `cmake .. -DCMAKE_GENERATOR_PLATFORM=x64` instead of `cmake ..`_

## 3. Run the app

### On macOS and Linux

Navigate to `gif-search-app/build` and run `MyApp` to launch the program.

### On Windows

Navigate to `gif-search-app/build/Release` and run `MyApp` to launch the program.
