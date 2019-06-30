# Scripts

Your command-line interface (CLI) applications.

## Getting started

Once setup you can write CLI apps that makes use of the **Node.js** JavaScript runtime and the **npm** package ecosystem. Setup involves creating a terminal alias that runs the [bin/cast.js](bin/cast.js) node script. Then to add new commands you create new files in the `commands/` directory. This setup assumes you are using the Bash terminal, but other terminals work if you know how to setup an alias (*Google "How do I setup an alias in terminal XYZ" if you aren't using Bash*).

1. Fork the project to your GitHub account. [(click me)](https://github.com/wurde/scripts/fork)

2. Clone the project locally. Then `cd` (short for *change directory*) into it.

```
git clone https://github.com/<your-username>/scripts
cd scripts
```

3. Install project dependencies via `npm install`.

```
npm install
```

4. Open the project in your favorite code editor. Popular options:

```
code .
~or~
atom .
```

5. Read the `bin/cast.js` file. It uses two built-in Node.js modules `fs` and `path`. It assigns the **command** constant to `process.argv[2]`, which is the third argument in the argument vector. Then it builds a path that should reference the relevant script file in the `commands/` directory. Notice that it appends the `.js` file extension to the **command** constant. It then does two checks; the first looks to see if you passed it a command argument and the second checks that the script file exists. It then requires the script and runs the script.

6. Open the **.bash_profile** file.

7. Write your **cast** alias. This will allow you to run **cast** inside your terminal and have Node.js execute the `bin/cast.js` file.

```
alias cast='node /full/path/to/scripts/bin/cast.js'
```

8. Open a new terminal. Because **.bash_profile** is only read once when you start a terminal any changes to this file will not affect any open terminals. Forgetting this fact can cause some confusion when adding aliases to **.bash_profile**.

9. Run `cast`. This is our new bash alias. If setup correctly in **.bash_profile** then you should see the command synopsis. This is the first of the two checks in the `bin/cast.js` file.

```
cast
//=> usage: cast <command> [<args>]
```

10. Run `cast hello`.

```
cast hello
//=> Missing script: /home/wurde/Code/Playpen/scripts/commands/hello.js
```

11. Write `commands/hello.js` file.

```
module.exports = (args) => {
  console.log('Hello world!', args)
}
```

12. Add a `gc` alias to the **.bash_profile** file.

```
alias gc='cast gitcommit'
```

13. Run `gc` inside your scripts project.

```
gc
//=> Running script: /home/wurde/Code/Playpen/scripts/commands/gitcommit.js
//=> Message: Added hello command
```

## License

Scripts is released under the [MIT License](http://www.opensource.org/licenses/MIT).
