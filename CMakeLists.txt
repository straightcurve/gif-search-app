project(MyApp C CXX)
cmake_minimum_required(VERSION 3.3.2)

add_subdirectory(cmake-build-debug/SDK)

include(cmake/App.cmake)

set(SOURCES "src/MyApp.h"
            "src/MyApp.cpp"
            "src/main.cpp")

add_app("${SOURCES}")