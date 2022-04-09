package cmd

import (
	"archive/zip"
	"io"
	"log"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func unzip(path string) {
	archive, err := zip.OpenReader(path)
	if err != nil {
		log.Fatal(err)
	}
	defer archive.Close()

	for _, f := range archive.File {
		fpath := filepath.Join(filepath.Dir(path), f.Name)
		log.Println("  " + fpath)

		if f.FileInfo().IsDir() {
			// Create new directory
			os.MkdirAll(fpath, os.ModePerm)
			continue
		}
		// Create new file
		if err := os.MkdirAll(filepath.Dir(fpath), os.ModePerm); err != nil {
			log.Fatal(err)
		}

		dstFile, err := os.OpenFile(fpath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
		if err != nil {
			log.Fatal(err)
		}

		fileInArchive, err := f.Open()
		if err != nil {
			log.Fatal(err)
		}

		if _, err = io.Copy(dstFile, fileInArchive); err != nil {
			log.Fatal(err)
		}
		dstFile.Close()
		fileInArchive.Close()
	}
}

var unzipAllCmd = &cobra.Command{
	Use:   "unzip",
	Short: "Uncompress all zip files",
	Run: func(cmd *cobra.Command, args []string) {
		matches, err := filepath.Glob("*.zip")
		if err != nil {
			log.Fatal(err)
		}
		for _, match := range matches {
			log.Printf("Uncompressing %s...\n", match)
			unzip(match)
		}
	},
}

func init() {
	rootCmd.AddCommand(unzipAllCmd)
}
