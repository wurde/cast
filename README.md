# Scripts

Command-line interface (CLI) applications written using **Node.js**.

## Getting started

This setup will clone the project, install dependencies, and create a link to the custom scripts.

1. [Save the project to your GitHub account (click here).](https://github.com/wurde/scripts/fork)
2. Clone the project locally using `git clone`.
3. Install project dependencies via `npm install`.
4. Setup the primary binary via `npm link` or `sudo npm link`.
5. Run any command via `cast mycommand`.

## How to keep in sync

This project is in active development, so new scripts are routinely added. To receive these updates you'll need to setup a remote reference and pull changes down occasionally.

```
git remote add upstream https://github.com/wurde/scripts.git
git pull upstream master
```

## License

Scripts is released under the [MIT License](http://www.opensource.org/licenses/MIT).


