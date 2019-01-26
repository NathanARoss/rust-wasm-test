#![no_std]

#![feature(alloc, core_intrinsics, lang_items, alloc_error_handler)]

extern crate alloc;
extern crate wee_alloc;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

//errors and panics abort
#[panic_handler]
#[no_mangle]
pub fn panic(_info: &::core::panic::PanicInfo) -> ! {
    unsafe {
        ::core::intrinsics::abort();
    }
}

#[alloc_error_handler]
#[no_mangle]
pub extern "C" fn oom(_: ::core::alloc::Layout) -> ! {
    unsafe {
        ::core::intrinsics::abort();
    }
}

extern {
    fn print(address: *const u8, size: usize);
}

#[no_mangle]
pub extern "C" fn start() {
    let message = "电脑程序\n";

    for _ in 0..10 {
        unsafe {
            print(message.as_ptr(), message.len());
        }
    }
}