#!/usr/bin/env bash

RUSTFLAGS="-C link-arg=--strip-debug -C link-arg=-zstack-size=32768" cargo build --release --target=wasm32-unknown-unknown \
&& ./small-wasm-trimmer < target/wasm32-unknown-unknown/release/rust_wasm_test.wasm > out.wasm \
&& wc -c out.wasm