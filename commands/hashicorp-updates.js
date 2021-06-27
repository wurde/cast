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
  child_process.spawnSync('rm', ['-rf', '/tmp/packer'])
  console.log("  Cloning GitHub repository...")
  git(['clone', '--quiet', 'https://github.com/hashicorp/packer.git', '/tmp/packer'])
  child_process.execSync('sed --in-place s/\'VersionPrerelease = "dev"\'/\'VersionPrerelease = ""\'/g /tmp/packer/version/version.go')
  child_process.execSync('sed --in-place s/\'ALL_XC_ARCH="386 amd64 arm arm64 ppc64le mips mips64 mipsle mipsle64 s390x"\'/\'ALL_XC_ARCH="amd64"\'/g /tmp/packer/scripts/build.sh')
  child_process.execSync('sed --in-place s/\'ALL_XC_OS="linux darwin windows freebsd openbsd solaris"\'/\'ALL_XC_OS="linux"\'/g /tmp/packer/scripts/build.sh')
  console.log("  Building binary...")
  child_process.spawnSync('make', ['releasebin'], { cwd: '/tmp/packer' })
  child_process.spawnSync('mv', ['-f', '/tmp/packer/bin/packer', '/usr/local/bin/packer'])
  console.log(`  Version: ${child_process.spawnSync('packer', ['version']).output[1].toString().split('\n')[0]}`)
}

function update_consul() {
  console.log(chalk.green.bold("\nUpdating Consul"))

  if (hasConsul) console.log(`  Found binary: ${hasConsul}`)
  child_process.spawnSync('rm', ['-rf', '/tmp/consul'])
  console.log("  Cloning GitHub repository...")
  git(['clone', '--quiet', 'https://github.com/hashicorp/consul.git', '/tmp/consul'])
  child_process.execSync('sed --in-place s/\'VersionPrerelease = "dev"\'/\'VersionPrerelease = ""\'/g /tmp/consul/version/version.go')
  child_process.spawnSync('make', ['tools'], { cwd: '/tmp/consul' })
  console.log("  Building binary...")
  child_process.spawnSync('make', ['linux'], { cwd: '/tmp/consul' })
  child_process.spawnSync('mv', ['-f', '/tmp/consul/pkg/bin/linux_amd64/consul', '/usr/local/bin/consul'])
  console.log(`  Version: ${child_process.spawnSync('consul', ['version']).output[1].toString().split('\n')[0]}`)
}

function update_vault() {
  console.log(chalk.green.bold("\nUpdating Vault"))

  if (hasVault) console.log(`  Found binary: ${hasVault}`)
  child_process.spawnSync('rm', ['-rf', '/tmp/vault'])
  console.log("  Cloning GitHub repository...")
  // git(['clone', '--quiet', 'https://github.com/hashicorp/vault.git', '/tmp/vault'])
  // git checkout v1.7.0
  // make bootstrap
  console.log("  Building binary...")
  // make dev
  child_process.spawnSync('mv', ['-f', '/tmp/vault/bin/vault', '/usr/local/bin/vault'])
  console.log(`  Version: ${child_process.spawnSync('vault', ['version']).output[1].toString().split('\n')[0]}`)
}

function update_nomad() {
  console.log(chalk.green.bold("\nUpdating Nomad"))

  if (hasNomad) console.log(`  Found binary: ${hasNomad}`)
  child_process.spawnSync('rm', ['-rf', '/tmp/nomad'])
  console.log("  Cloning GitHub repository...")
  // git(['clone', '--quiet', 'https://github.com/hashicorp/nomad.git', '/tmp/nomad'])
  // git checkout v1.0.4
  // make bootstrap
  // sudo npm install --global yarn
  // sudo apt install libc6-dev
  console.log("  Building binary...")
  // make release
  child_process.spawnSync('mv', ['-f', '/tmp/vault/pkg/linux_amd64/nomad', '/usr/local/bin/nomad'])
  console.log(`  Version: ${child_process.spawnSync('nomad', ['version']).output[1].toString().split('\n')[0]}`)
}

function update_terraform() {
  console.log(chalk.green.bold("\nUpdating Terraform"))

  if (hasTerraform) console.log(`  Found binary: ${hasTerraform}`)
  child_process.spawnSync('rm', ['-rf', '/tmp/terraform'])
  console.log("  Cloning GitHub repository...")
  // git(['clone', '--quiet', 'https://github.com/hashicorp/terraform.git', '/tmp/terraform'])
  // git checkout v1.0.0
  console.log("  Building binary...")
  // go install
  child_process.spawnSync('mv', ['-f', '~/go/bin/terraform', '/usr/local/bin/terraform'])
  // terraform -install-autocomplete
  console.log(`  Version: ${child_process.spawnSync('terraform', ['version']).output[1].toString().split('\n')[0]}`)
}

/**
 * Define script
 */

async function hashicorp_updates() {
  showHelp(cli);

  // update_packer();
  update_consul();
  // update_vault();
  // update_nomad();
  // update_terraform();
}

/**
 * Export script
 */

module.exports = hashicorp_updates;
