package cmd

import (
	"io"
	"log"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func listTemplates(execPath string) {
	files, err := os.ReadDir(filepath.Join(execPath, "../templates"))
	if err != nil {
		log.Fatal(err)
	}

	templates := "Choose a template:\n\n"
	for _, file := range files {
		templates += "    " + file.Name() + "\n"
	}
	log.Println(templates)
}

var templateCmd = &cobra.Command{
	Use:   "template",
	Short: "Copy template file",
	Run: func(cmd *cobra.Command, args []string) {
		// Get script path.
		execPath, err := os.Executable()
		if err != nil {
			log.Fatal(err)
		}

		// If no template provided, list all.
		if len(args) == 0 {
			listTemplates(execPath)
			os.Exit(1)
		}

		// If template is missing, throw error.
		template := args[0]
		src := filepath.Join(execPath, "../templates", template)
		in, err := os.Open(src)
		if err != nil {
			log.Fatal(err)
		}
		defer in.Close()

		// If exists copy template to current directory.
		log.Println("Copying " + template + "...")
		dst := filepath.Join("./", template)
		out, err := os.Create(dst)
		if err != nil {
			log.Fatal(err)
		}
		defer out.Close()
		if _, err := io.Copy(out, in); err != nil {
			log.Fatal(err)
		}
	},
}

func init() {
	rootCmd.AddCommand(templateCmd)
}
