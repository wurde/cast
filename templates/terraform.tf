# https://www.terraform.io/docs/language/settings/index.html
# Configure some behaviors of Terraform itself.
terraform {
  # Specify which versions of Terraform can be used with this configuration.
  required_version = "~> v1.1"

  # https://www.terraform.io/docs/backends/types/s3.html
  backend "s3" {
    bucket = "andys-terraform-backend"
    region = "us-east-2"
    key    = "key/terraform.tfstate"
  }

  # # https://www.terraform.io/docs/backends/types/gcs.html
  # backend "gcs" {
  #   bucket = "andys-terraform-backend"
  #   prefix = "key/terraform.tfstate"
  # }

  required_providers {
    # https://registry.terraform.io/providers/hashicorp/aws
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.61"
    }

    # https://registry.terraform.io/providers/hashicorp/google
    google = {
      source  = "hashicorp/google"
      version = "~> 3.86"
    }

    # https://registry.terraform.io/providers/hashicorp/local
    local = {
      source  = "hashicorp/local"
      version = "~> 2.1"
    }

    # https://registry.terraform.io/providers/hashicorp/random
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }
}
