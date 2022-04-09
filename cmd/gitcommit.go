package cmd

import (
	"fmt"
	"log"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing/object"
	"github.com/spf13/cobra"
)

func Gitcommit(repo *git.Repository, msg string) *object.Commit {
	w, err := repo.Worktree()
	if err != nil {
		log.Fatal(err)
	}

	w.AddWithOptions(&git.AddOptions{
		All:  true,
		Path: ".",
	})

	hash, err := w.Commit(msg, &git.CommitOptions{
		All: true,
	})
	if err != nil {
		log.Fatal(err)
	}

	commit, err := repo.CommitObject(hash)
	if err != nil {
		log.Fatal(err)
	}
	return commit
}

var gitcommitCmd = &cobra.Command{
	Use:   "gitcommit",
	Short: "Create a git commit",
	Run: func(cmd *cobra.Command, args []string) {
		log.SetFlags(0)

		var msg string
		if len(args) > 0 {
			msg = args[0]
		} else {
			log.Println("Enter commit message: ")
			fmt.Scanln(&msg)
		}

		repo, err := git.PlainOpen(".")
		if err != nil {
			log.Fatal(err)
		}

		commit := Gitcommit(repo, msg)
		log.Println(commit)
	},
}

func init() {
	rootCmd.AddCommand(gitcommitCmd)
}
