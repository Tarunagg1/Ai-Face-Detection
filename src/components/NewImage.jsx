import { useEffect, useRef } from 'react';
import '../App.css';
import * as faceapi from "face-api.js";


function NewImage({ image }) {
    const imgRef = useRef();
    const canvasRef = useRef();

    const { url, width, height } = image;


    const handelImage = async () => {
        const detection = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current);
        faceapi.matchDimensions(canvasRef.current, {
            width: width,
            height: height
        })

        faceapi.draw.drawDetections(canvasRef.current, detection);
        faceapi.draw.drawFaceExpressions(canvasRef.current, detection);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, detection);

    }

    useEffect(() => {
        const loadModels = () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            ])
                .then(handelImage)
                .catch((e) => console.log(e));
        };

        imgRef.current && loadModels();
    }, []);

    return (
        <div className="app">
            <img crossOrigin="anonymous" ref={imgRef} src={url} alt="" srcSet="" />
            <canvas ref={canvasRef} width={width} height={height} />
        </div>
    );
}

export default NewImage;
