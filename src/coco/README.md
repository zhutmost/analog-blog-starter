# README

This directory contains some utilities for working with [Content Collections](https://www.content-collections.dev/) (CoCo).

CoCo collects and organizes MDX/Markdown files from the user data directory at the initialization stage. 
Its configuration is defined in the `content-collections.ts` file, which is located in the root directory of the project.
The code in this directory is required by the configuration file (i.e., `content-collections.ts`).

In this repository, the CoCo-related code is organized into two main directories:
- `src/coco` (this directory) is for **Pre-Processing**, which provides some tools for working with CoCo collections.
- `src/lib/coco` is for **Post-Processing**, which tidies up the CoCo-generated collections, such as Posts, Pages, and Authors.
