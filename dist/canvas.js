"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => {
    const uploadChunk = (chunk_1, ...args_1) => __awaiter(void 0, [chunk_1, ...args_1], void 0, function* (chunk, retries = 3) {
        const formData = new FormData();
        const fileChunk = new Blob([chunk], { type: "application/octet-stream" });
        formData.append("file", fileChunk);
        try {
            yield fetch("/upload-endpoint", {
                method: "POST",
                body: formData,
            });
        }
        catch (error) {
            if (retries > 0) {
                yield uploadChunk(chunk, retries - 1);
            }
            else {
                console.error("Failed to upload chunk: ", error);
            }
        }
    });
    // const getTime = (text: string | ArrayBuffer | null, reverse: boolean) => {
    //   let timeReg = /\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}/;
    //   for (
    //     let i = reverse ? text.length - 1 : 0;
    //     reverse ? i > -1 : i < text.length;
    //     reverse ? i-- : i++
    //   ) {
    //     if (text[i].charCodeAt(0) === 10) {
    //       let snippet = text.substr(i + 1, 19);
    //       if (timeReg.exec(snippet)) {
    //         return snippet;
    //       }
    //     }
    //   }
    // };
    const $canvas = document.querySelector("#canvas");
    if (!$canvas)
        throw new Error("No canvas element found");
    const canvasWidth = $canvas.width;
    const canvasHeight = $canvas.height;
    const ctx = $canvas.getContext("2d");
    // draw a star shape on canvas
    // // Set the stroke color
    // ctx.strokeStyle = "black";
    // // Define the star's properties
    // const centerX = canvasWidth / 2;
    // const centerY = canvasHeight / 2;
    // const outerRadius = 50;
    // const innerRadius = 25;
    // const numPoints = 5;
    // // Calculate the angle increment for each point
    // const angleIncrement = (Math.PI * 2) / (numPoints * 2);
    // console.log("🚀 ~ Math.PI:", Math.PI);
    // console.log("🚀 ~ Math.PI * 2:", Math.PI * 2);
    // console.log("🚀 ~ angleIncrement:", angleIncrement);
    // // Begin drawing the star
    // ctx.beginPath();
    // // Move to the initial point
    // ctx.moveTo(centerX + outerRadius, centerY);
    // // Draw each point of the star
    // for (let i = 1; i <= numPoints * 2; i++) {
    //   const radius = i % 2 === 0 ? outerRadius : innerRadius;
    //   const angle = angleIncrement * i;
    //   const x = centerX + radius * Math.cos(angle);
    //   const y = centerY + radius * Math.sin(angle);
    //   ctx.lineTo(x, y);
    // }
    // // Close the path
    // ctx.closePath();
    // // Draw the stroke (outline) of the star
    // ctx.stroke();
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const data = imageData.data;
    // console.log("🚀 ~ imageData:", imageData);
    // console.log("🚀 ~ data:", data);
    // draw a random color effect
    // for (let y = 0; y < canvasHeight; y++) {
    //   for (let x = 0; x < canvasWidth; x++) {
    //     const index = (y * canvasWidth + x) * 4;
    //     const red = Math.floor(Math.random() * 256);
    //     const green = Math.floor(Math.random() * 256);
    //     const blue = Math.floor(Math.random() * 256);
    //     const alpha = 255;
    //     data[index] = red;
    //     data[index + 1] = green;
    //     data[index + 2] = blue;
    //     data[index + 3] = alpha;
    //   }
    // }
    // draw a moire effect
    // for (let y = 0; y < canvasHeight; y++) {
    //   for (let x = 0; x < canvasWidth; x++) {
    //     const index = (y * canvasWidth + x) * 4;
    //     const value = (x * y) & 0xff;
    //     console.log("🚀 ~ value:", value);
    //     data[index] = value;
    //     data[index + 1] = value;
    //     data[index + 2] = value;
    //     data[index + 3] = value;
    //   }
    // }
    // ctx.putImageData(imageData, 0, 0);
})();
