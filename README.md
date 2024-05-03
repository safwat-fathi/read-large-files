# Process and read large files with JavaScript TypedArray & WebWorkers ✨

Large file reading or processing in javascript can cause a lot of issues, For example, but not limited to:

- page crash
- interactivity go wrong (UI freeze)
- [Violation warning message](https://stackoverflow.com/questions/42218699/chrome-violation-violation-handler-took-83ms-of-runtime) in chrome based browsers ([Violation] change/load handler took xxxxms)

## TypedArray 

[TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) can help us to deal with big files as chunks so we can read/process every chunk of the file instead of the whole file at once.

## Web Workers

[The worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) thread can perform tasks without interfering with the user interface. Thanks for that 🙏

## Running the project

- First clone the project.
- You can run the project using VSCODE live server.
- In case you want to edit any of the TS files you can run the tsc watch script.

### Installing dependencies

```bash
npm install
```

```bash
npm run start
```

## Testing 

- First you need to have a large file in your machine or you can download a large file from [this link](https://data.london.gov.uk/dataset/mps-stop-and-search-public-dashboard-data).
- To test slower processing just comment out line 89 and uncomment from line 67 to 81.
