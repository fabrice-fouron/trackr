import React, {useState} from 'react';
import {Button, Input} from '@mui/material';


function ResumeUploader({URL, userId}) {

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async() => {
        if (!file)
            return alert("No file uploaded");
        
        const formData = new FormData;
        formData.append("userId", userId); // sample Id
        formData.append("file", file); // File being uploaded
        
        console.log(URL, userId);

        try {
            const res = await fetch(`${URL}/save-resume`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            alert("Upload successful!");
        }
        catch (err) {
            console.error(err);
            alert("Upload failed");
        }
    };

    return (
        <div>
            <p>THIS SECTION IS FOR RESUME UPLOAD</p>
            <Input type='file' name='uploadFile' color='secondary' onChange={handleChange} required></Input>
            <br/>
            <Button color='secondary' sx={{borderStyle:'solid', borderWidth:'1px'}} onClick={handleUpload}>
                Upload resume
            </Button>
        </div>
    )
}

export default ResumeUploader;
