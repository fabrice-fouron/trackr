import React, {useState} from 'react';
import {Box, Button, Input} from '@mui/material';


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
            <Box sx={{display: "flex", flexDirection: "column", gap: 2, width: '100%', maxWidth: 400}}>
                <Input type='file' name='uploadFile' color='secondary' onChange={handleChange} required></Input>
                <Button color='primary' sx={{borderStyle:'solid', borderWidth:'1px'}} onClick={handleUpload}>
                    Upload resume
                </Button>
            </Box>
        </div>
    )
}

export default ResumeUploader;
