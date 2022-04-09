package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(versionCmd)
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print script suite version",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("github.com/wurde/cast v2.3")
	},
}
