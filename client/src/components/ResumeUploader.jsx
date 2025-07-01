import React, {useState} from 'react';
import {Button, Input} from '@mui/material';


function ResumeUploader() {

    const [file, setFile] = useState();

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async() => {
        if (!file)
            return alert("No file uploaded");

        const formData = new FormData;
        formData.append("file", file);

        try {
            const res = await fetch("https://localhost:5000/upload", {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            alert(`Upload successful: ${data.message}`);
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
