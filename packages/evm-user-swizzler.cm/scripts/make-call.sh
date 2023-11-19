#!/bin/bash
#
set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT=$DIR/..

cd $ROOT

node > deploy/.calls-package.yaml <<EOF
const fs = require('fs');
const package = require('./dist/out/package.json');

const { name } = package;

const yamlFilePath = './deploy/calls.yaml.template';
const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
const modifiedYamlContent = yamlContent.replace(/__CWEB_CONTRACT_SELF_REFERENCE__/g, name.substring(5));

console.log(modifiedYamlContent); // Output the modified YAML content
EOF
