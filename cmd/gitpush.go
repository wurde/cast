package cmd

import (
	"log"
	"os"
	"os/exec"

	"github.com/go-git/go-git/v5"
	"github.com/spf13/cobra"
)

var gitpushCmd = &cobra.Command{
	Use:   "gitpush",
	Short: "Push up changes to remote origin",
	Run: func(cmd *cobra.Command, args []string) {
		log.SetFlags(0)

		repo, err := git.PlainOpen(".")
		if err != nil {
			log.Fatal(err)
		}

		w, err := repo.Worktree()
		if err != nil {
			log.Fatal(err)
		}

		status, err := w.Status()
		if err != nil {
			log.Fatal(err)
		}
		if !status.IsClean() {
			log.Fatal("Unstaged changes found, commit first")
		}

		log.Println("Pulling down latest changes")
		gitPullCmd := exec.Command("git", "pull")
		gitPullCmd.Stdout = os.Stdout
		gitPullCmd.Stderr = os.Stderr
		if err := gitPullCmd.Run(); err != nil {
			os.Exit(1)
		}

		log.Println("\nPushing up latest changes")
		gitPushCmd := exec.Command("git", "push")
		gitPushCmd.Stdout = os.Stdout
		gitPushCmd.Stderr = os.Stderr
		if err := gitPushCmd.Run(); err != nil {
			os.Exit(1)
		}
	},
}

func init() {
	rootCmd.AddCommand(gitpushCmd)
}
