#!/bin/bash
#
# Copyright SecureKey Technologies Inc. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

echo "pull trustbloc core deployment configs - start"

root=$(pwd)
core_dir=$root/.core

rm -rf $core_dir
mkdir -p $core_dir
cd $core_dir

git clone -b test https://github.com/rolsonquadras/k8s $core_dir
git checkout 62228414b6ed4f9248b67519e7192cd5d69cf73a

# uncomment below line to link deployments to https://github.com/trustbloc/k8s directly (assuming k8s repo is in same folder as sandbox)
# rm -rf $core_dir && mkdir -p $core_dir && ln -s ../../../k8s/* $core_dir

cd $root

echo "pull trustbloc core deployment configs - end"
