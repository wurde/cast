package cmd

import (
	"log"

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

		w.Pull(&git.PullOptions{
			RemoteName: "origin",
		})
		repo.Push(&git.PushOptions{
			RemoteName: "origin",
		})
	},
}

func init() {
	rootCmd.AddCommand(gitpushCmd)
}
