# Scripts

<a href="https://github.com/wurde/scripts/actions"><img alt="GitHub Action CI status" src="https://github.com/wurde/scripts/workflows/Continuous%20Integration/badge.svg"></a>

Command-line interface applications written using **Node.js**. This project is setup in a way for easy extension. After setup add a new custom script by adding a new file to the `commands/` directory. Then reference that command from the terminal by the unique filename you gave it. (`cast customscript`)

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

## Vision

There is a vision that guides development. Learn more in [VISION.md](VISION.md).

## Roadmap

For details on planned features and progress refer to the [Trello Board](https://trello.com/b/M8OvJPMb).

## License

Scripts is released under the [MIT License](http://www.opensource.org/licenses/MIT).


