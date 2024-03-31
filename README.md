# Process and read large files with JavaScript TypedArray & WebWorkers ✨

Large file reading or processing in javascript can cause a lot of issues.

For example, but not limited to:

- page crash
- interactivity go wrong (UI freeze)
- [Violation warning message](https://stackoverflow.com/questions/42218699/chrome-violation-violation-handler-took-83ms-of-runtime) in chrome based browsers ([Violation] change/load handler took xxxxms)

## TypedArray 

[TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) can help us to deal with big files as chunks so we can read/process every chunk of the file instead of the whole file at once.

## Web Workers

[The worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) thread can perform tasks without interfering with the user interface. Thanks for that 🙏


