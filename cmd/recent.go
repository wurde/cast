package cmd

import (
	"io/fs"
	"log"
	"os"
	"sort"

	"github.com/spf13/cobra"
)

func sortByFileName(files []fs.DirEntry) {
	sort.Slice(files, func(i, j int) bool {
		info1, err := files[i].Info()
		if err != nil {
			log.Fatal(err)
		}
		info2, err := files[j].Info()
		if err != nil {
			log.Fatal(err)
		}
		return info1.ModTime().After(info2.ModTime())
	})
}

func printFiles(files []fs.DirEntry) {
	for _, file := range files {
		info, err := file.Info()
		if err != nil {
			log.Fatal(err)
		}
		log.Println(info.ModTime().Format("2006-01-02"), file.Name())
	}
}

var recentCmd = &cobra.Command{
	Use:   "recent",
	Short: "Print recently modified files",
	Run: func(cmd *cobra.Command, args []string) {
		log.SetFlags(0)

		// Get local files
		files, err := os.ReadDir(".")
		if err != nil {
			log.Fatal(err)
		}

		sortByFileName(files)
		printFiles(files)
	},
}

func init() {
	rootCmd.AddCommand(recentCmd)
}
