'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process');
const chalk = require('chalk');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');
const which = require('../helpers/which');
const git = require('../helpers/git');

/**
 * Constants
 */

const hasPacker = which('packer');
const hasConsul = which('consul');
const hasVault = which('vault');
const hasNomad = which('nomad');
const hasTerraform = which('terraform');
const config = {
  cwd: process.cwd(),
  encoding: 'utf8',
  stdio: [null, 'pipe', 'inherit']
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast hashicorp-updates
`, {
  description: "Pull the latest stable release for each HashiCorp binary."
});

/**
 * Define helpers
 */

function update_packer() {
  console.log(chalk.green.bold("\nUpdating Packer"))

  if (hasPacker) console.log(`  Found binary: ${hasPacker}`)
  child_process.spawn('rm', ['-rf', '/tmp/packer'])
  console.log("  Cloning GitHub repository...")
  console.log(`  Version: ${child_process.spawnSync('packer', ['version']).output[1].toString().split('\n')[0]}`)
  // git(['clone', '--quiet', 'https://github.com/hashicorp/packer.git', '/tmp/packer'])
  // @sed -i s/'const VersionPrerelease = "dev"'/'const VersionPrerelease = ""'/g /tmp/packer/version/version.go
  // @sed -i s/'ALL_XC_ARCH="386 amd64 arm arm64 ppc64le mips mips64 mipsle mipsle64 s390x"'/'ALL_XC_ARCH="amd64"'/g /tmp/packer/scripts/build.sh
  // @sed -i s/'ALL_XC_OS="linux darwin windows freebsd openbsd solaris"'/'ALL_XC_OS="linux"'/g /tmp/packer/scripts/build.sh
  // @cd /tmp/packer && make releasebin
  // @sudo mv -f /tmp/packer/bin/packer /usr/local/bin/packer
}

function update_consul() {
  console.log(chalk.green.bold("\nUpdating Consul"))

  if (hasConsul) console.log(`  Found binary: ${hasConsul}`)
  child_process.spawn('rm', ['-rf', '/tmp/consul'])
  console.log("  Cloning GitHub repository...")
  // git(['clone', '--quiet', 'https://github.com/hashicorp/consul.git', '/tmp/consul'])
  //   cd /tmp/consul
  //   git checkout $CONSUL_VERSION
  //   make tools
  //   make linux
  //   cd -
  //   mkdir -p ./tmp
  //   cp /tmp/consul/bin/consul ./tmp/consul
  console.log(`  Version: ${child_process.spawnSync('consul', ['version']).output[1].toString().split('\n')[0]}`)
}

function update_vault() {
  console.log(chalk.green.bold("\nUpdating Vault"))

  if (hasVault) console.log(`  Found binary: ${hasVault}`)
  child_process.spawn('rm', ['-rf', '/tmp/vault'])
  console.log("  Cloning GitHub repository...")
  // git(['clone', '--quiet', 'https://github.com/hashicorp/vault.git', '/tmp/vault'])
  // cd vault
  // git tag
  // git checkout v1.7.0
  // make bootstrap
  // make dev
  // sudo mv ./bin/vault /usr/local/bin/vault
  console.log(`  Version: ${child_process.spawnSync('vault', ['version']).output[1].toString().split('\n')[0]}`)
}

function update_nomad() {
  console.log(chalk.green.bold("\nUpdating Nomad"))

  if (hasNomad) console.log(`  Found binary: ${hasNomad}`)
  child_process.spawn('rm', ['-rf', '/tmp/nomad'])
  console.log("  Cloning GitHub repository...")
  // git(['clone', '--quiet', 'https://github.com/hashicorp/nomad.git', '/tmp/nomad'])
  // cd nomad
  // git tag
  // git checkout v1.0.4
  // make bootstrap
  // sudo npm install --global yarn
  // sudo apt install libc6-dev
  // make release
  // sudo mv -f ./pkg/linux_amd64/nomad /usr/local/bin/nomad
  console.log(`  Version: ${child_process.spawnSync('nomad', ['version']).output[1].toString().split('\n')[0]}`)
}

function update_terraform() {
  console.log(chalk.green.bold("\nUpdating Terraform"))

  if (hasTerraform) console.log(`  Found binary: ${hasTerraform}`)
  child_process.spawn('rm', ['-rf', '/tmp/terraform'])
  console.log("  Cloning GitHub repository...")
  // git(['clone', '--quiet', 'https://github.com/hashicorp/terraform.git', '/tmp/terraform'])
  // cd terraform
  // git tag
  // git checkout v1.0.0
  // go install
  // sudo mv ~/go/bin/terraform /usr/local/bin/terraform
  // terraform -install-autocomplete
  console.log(`  Version: ${child_process.spawnSync('terraform', ['version']).output[1].toString().split('\n')[0]}`)
}

/**
 * Define script
 */

async function hashicorp_updates() {
  showHelp(cli);

  update_packer();
  // update_consul();
  // update_vault();
  // update_nomad();
  // update_terraform();
}

/**
 * Export script
 */

module.exports = hashicorp_updates;
