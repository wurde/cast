# Scripts

Your command-line interface (CLI) applications.

## Getting started

Once setup you can write CLI apps by writing **Node.js** code. Setup requires you create a terminal alias that runs the node script `bin/cast.js`. Then you can add new commands by creating new files in the `commands/` directory. This setup assumes you are using the Bash terminal, but other terminals work if you know how to setup an alias in them (*Google "How do I setup an alias in terminal XYZ" if you don't use Bash*).

1. Fork the project to your GitHub account. [(click me)](https://github.com/wurde/scripts/fork)

2. Clone the project locally.

```
git clone https://github.com/<your-username>/scripts
```

3. Open the project in your favorite code editor.

4. Read the `bin/cast.js` file. It uses two built-in Node.js modules `fs` and `path`. It assigns the **command** constant to the third argument passed to it. Then it builds a path that should reference the relevant script file in the `commands/` directory. Notice that it appends the `.js` file extension to the **command** constant. It then does two checks; the first looks to see if you passed it a command and the second checks that the script file exists. It then requires the script file getting whatever you are

5. Open the **.bash_profile** file.

6. Write your **cast** alias. This will allow you to run **cast** inside your terminal and have Node.js execute the `bin/cast.js` file.

```
alias cast='node /full/path/to/scripts/bin/cast.js'
```

7. Open a new terminal. Because **.bash_profile** is only read once when you start a terminal any changes to this file will not affect any open terminals. Forgetting this fact can cause some confusion when adding aliases to **.bash_profile**.

8. Run `cast`. This is our new bash alias. If setup correctly in **.bash_profile** then you should see the command synopsis. This is the first of the two checks in the `bin/cast.js` file.

```
cast
//=> usage: cast <command> [<args>]
```

9. Run `cast hello`.

```
cast hello
//=> Missing script: /home/wurde/Code/Playpen/scripts/commands/hello.js
```

10. Write `commands/hello.js` file.

11. Add `args` to hello script.

12. Add `gc` alias.

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
