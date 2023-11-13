import { useState, useRef, useEffect } from "react";
import { CardMedia } from '@mui/material';
import { Typography } from "@material-ui/core";
import face from '../../assets/FaceRange.png'


const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef<any>(null);
    const liveVideoFeed = useRef<any>(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState<any>(null);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);

    useEffect(() => {
        getCameraPermission()
    }, [])

    const getCameraPermission = async () => {
        console.log("Permission");
        setRecordedVideo(null);
        //get video and audio permissions and then stream the result media stream to the videoSrc variable
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };

                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );

                setPermission(true);


                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                ]);

                setStream(combinedStream);

                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                console.log(`Can not access to your camera`);
                return;
            }
        } else {
            console.log(`The MediaRecorder API is not supported in your browser.`);
            return;
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");

        const media = new MediaRecorder(stream, { mimeType });

        mediaRecorder.current = media;

        mediaRecorder.current.start();

        let localVideoChunks: any = [];

        mediaRecorder.current.ondataavailable = (event: any) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };

        setVideoChunks(localVideoChunks);
    };

    const blobToBase64 = (blob: Blob) => {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = async () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl: any = URL.createObjectURL(videoBlob);
            const base65 = await blobToBase64(videoBlob);
            console.log(base65);

            setRecordedVideo(videoUrl);

            setVideoChunks([]);
        };
    };




    return (
        <>
            <main>
                <div className="video-controls">
                    {!permission ? (
                        <button onClick={getCameraPermission} type="button">
                            Get Camera
                        </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                </div>
            </main>

            <CardMedia>
                <div className="video-player">
                    {!recordedVideo ? (
                        <CardMedia
                            component='video'
                            className="live-player"
                            ref={liveVideoFeed}
                            autoPlay
                        />
                        // <video ref={liveVideoFeed} autoPlay className="live-player"></video>
                    ) : null}
                    {recordedVideo ? (
                        <div className="recorded-player">
                            <CardMedia
                                component='video'
                                image={recordedVideo}
                                src={recordedVideo}
                                width='300px'
                                autoPlay
                            />
                            {/* <video className="recorded" src={recordedVideo} controls></video> */}
                            <a download href={recordedVideo}>
                                Download Recording
                            </a>
                        </div>
                    ) : null}
                </div>
            </CardMedia>
        </>
    );
};

export default VideoRecorder;