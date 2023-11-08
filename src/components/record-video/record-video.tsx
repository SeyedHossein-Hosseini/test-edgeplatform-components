import React, { useState, useRef } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoRecorder = () => {
  const [permission, setPermission] = useState(false);

  const mediaRecorder = useRef<any>(null);

  const liveVideoFeed = useRef<any>(null);

  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const [stream, setStream] = useState<any>(null);

  const [recordedVideo, setRecordedVideo] = useState(null);

  const [videoChunks, setVideoChunks] = useState([]);

  const getCameraPermission = async () => {
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

        //combine both audio and video streams

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
        ]);

        setStream(combinedStream);

        //set videostream to live feed player
        liveVideoFeed.current.srcObject = videoStream;
      } catch (err) {
        alert(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
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

    <Card sx={{ maxWidth: '70%' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="data:image/jpeg;base64,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"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>


    // <div>
    //   <h2>Video Recorder</h2>
    //   <main>
    //     <div className="video-controls">
    //       {!permission ? (
    //         <button onClick={getCameraPermission} type="button">
    //           Get Camera
    //         </button>
    //       ) : null}
    //       {permission && recordingStatus === "inactive" ? (
    //         <button onClick={startRecording} type="button">
    //           Start Recording
    //         </button>
    //       ) : null}
    //       {recordingStatus === "recording" ? (
    //         <button onClick={stopRecording} type="button">
    //           Stop Recording
    //         </button>
    //       ) : null}
    //     </div>
    //   </main>

    //     <div className="video-player">
    //       {!recordedVideo ? (
    //         <video ref={liveVideoFeed} autoPlay className="live-player"></video>
    //       ) : null}
    //       {recordedVideo ? (
    //         <div className="recorded-player">
    //           <video className="recorded" src={recordedVideo} controls></video>
    //           <a download href={recordedVideo}>
    //             Download Recording
    //           </a>
    //         </div>
    //       ) : null}
    //     </div>
    // </div>
  );
};

export default VideoRecorder;