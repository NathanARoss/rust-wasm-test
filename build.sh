#!/usr/bin/env bash

RUSTFLAGS="-C link-args=-zstack-size=32768"  cargo build --release --target=wasm32-unknown-unknown && mv -f ./target/wasm32-unknown-unknown/release/rust_wasm_test.wasm ./wasm.wasm && ls -l wasm.wasm