package cmd

import (
	"log"

	"github.com/showwin/speedtest-go/speedtest"
	"github.com/spf13/cobra"
)

var speedtestCmd = &cobra.Command{
	Use:   "speedtest",
	Short: "Check current internet speed",
	Run: func(cmd *cobra.Command, args []string) {
		log.SetFlags(0)

		user, _ := speedtest.FetchUserInfo()
		log.Printf("Testing From IP %s, (%s) [%s, %s]\n\n", user.IP, user.Isp, user.Lat, user.Lon)

		serverList, _ := speedtest.FetchServers(user)
		targets, _ := serverList.FindServer([]int{})

		for _, s := range targets {
			log.Printf("Target Server: [%s]  %.2fkm %s (%s) by %s", s.ID, s.Distance, s.Name, s.Country, s.Sponsor)

			s.PingTest()
			s.DownloadTest(false)
			s.UploadTest(false)

			log.Printf("Latency: %s, Download: %f, Upload: %f\n", s.Latency, s.DLSpeed, s.ULSpeed)
		}
	},
}

func init() {
	rootCmd.AddCommand(speedtestCmd)
}
