# Configure terraform

terraform {
  required_version = "~> 0.12"

  # https://www.terraform.io/docs/backends/types/s3.html
  backend "s3" {
    bucket = "andys-terraform-backend"
    region = "us-east-1"
    key    = "key/terraform.tfstate"
  }

  # # https://www.terraform.io/docs/backends/types/gcs.html
  # backend "gcs" {
  #   bucket = "andys-terraform-backend"
  #   key    = "key/terraform.tfstate"
  # }
}
