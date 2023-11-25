import React, { useState } from 'react'
import { Input } from '@mui/material';
import face from "../../assets/FaceRange.png"

export default function uploadImage() {
    const [avatarPreview, setAvatarPreview] = useState<any>(face);


    const handleAvatar = (event: any) => {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            // formik.setFieldValue('avatar', event.target.files[0]);
            console.log(event.target.files[0]);
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                setAvatarPreview((prevState: any) => reader.result);
            };
        }
    };

    return (
        <>
            <Input name='avatar' type='file' onChange={handleAvatar} />
            {/* <input  /> */}
            <img src={avatarPreview} alt='Avatar' width="100px" height="100px" />
        </>
    )
}
