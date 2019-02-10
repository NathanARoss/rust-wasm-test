#!/usr/bin/env bash

RUSTFLAGS="-C link-arg=--strip-debug -C link-arg=-zstack-size=32768" cargo +nightly build --target wasm32-unknown-unknown --release \
&& ./small-wasm-trimmer --remove-sections 0 4 --remove-exports "__heap_base" "__data_end" < target/wasm32-unknown-unknown/release/rust_wasm_test.wasm > out.wasm 2>/dev/null \
&& wc -c out.wasm
