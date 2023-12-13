import axios from 'axios'
import React, { useState } from 'react'


const DownloadFile = () => {
    const [downloadUrl, setDownloadUrl] = useState<string>("")

    const DownloadFile = () => {
        axios.get("http://localhost:5000/download", {timeout: 1000, headers: {
            Authorization: 'Bearer Token'
        }}).then((res) => {
            // console.log(res.data);
            const downloadUrl = res.data;
            // const blob = downloadUrl.blob();
            // console.log(blob);
            const filename = "file";
            const a = document.createElement("a")
            a.href = downloadUrl;
            a.setAttribute("download", filename);
            document.body.appendChild(a);
            a.click();
            a.remove();

        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <div>
        <p>
        DownloadFile
        </p>
        <button onClick={() => DownloadFile()}>
            Download file 
        </button>
    </div>
  )
}


export default DownloadFile;