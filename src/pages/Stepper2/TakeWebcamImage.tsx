import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react"; // import useRef
import { Button } from "@material-ui/core";
const CustomWebcam = ({ OnCloseWebcamModal }: any) => {
    const webcamRef = useRef<any>(null); // create a webcam reference
    const [imgSrc, setImgSrc] = useState(null); // initialize it


    const retake = () => {
        setImgSrc(null);
    };

    const closeWebcamModal = () => {
        OnCloseWebcamModal(imgSrc);
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        console.log({ imageSrc });
    }, [webcamRef]);

    return (
        <div className="container">
            {imgSrc ? (
                <img src={imgSrc} alt="webcam" />
            ) : (
                <Webcam
                    height="100%"
                    width="100%"
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    screenshotQuality={1} />
            )}
            <div className="btn-container">
                {imgSrc ? (
                    <>
                        <Button variant="contained" onClick={retake}>Retake photo</Button>
                        <Button variant="contained" onClick={closeWebcamModal}>Confirm photo</Button>
                    </>
                ) : (
                    <Button variant="contained" onClick={capture}>Capture photo</Button>
                )}
            </div>
        </div>
    );

};

export default CustomWebcam;