package cmd

import (
	"bufio"
	"log"
	"os"
	"os/exec"

	"github.com/spf13/cobra"
)

func promptForMessage(args []string) string {
	var msg string

	if len(args) > 0 {
		msg = args[0]
	} else {
		log.Println("Enter commit message: ")
		scanner := bufio.NewScanner(os.Stdin)
		scanner.Scan()
		msg = scanner.Text()
	}

	return msg
}

func GitAdd() {
	gitAddCmd := exec.Command("git", "add", "-A")
	gitAddCmd.Stdout = os.Stdout
	gitAddCmd.Stderr = os.Stderr
	if err := gitAddCmd.Run(); err != nil {
		os.Exit(1)
	}
}

func GitCommit(msg string) {
	gitCommitCmd := exec.Command("git", "commit", "-m", msg)
	gitCommitCmd.Stdout = os.Stdout
	gitCommitCmd.Stderr = os.Stderr
	if err := gitCommitCmd.Run(); err != nil {
		os.Exit(1)
	}
}

var gitcommitCmd = &cobra.Command{
	Use:   "gitcommit",
	Short: "Create a git commit",
	Run: func(cmd *cobra.Command, args []string) {
		log.SetFlags(0)

		msg := promptForMessage(args)
		GitAdd()
		GitCommit(msg)
	},
}

func init() {
	rootCmd.AddCommand(gitcommitCmd)
}
