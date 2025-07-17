import React, { useState } from "react";
import { Button, CardMedia } from '@mui/material';

function ResumeViewer({URL, userId}) {

    const [data, setData] = useState(null);
    
    const viewPDF = async () => {

        fetch(`${URL}/get-resume`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userId": userId
            })
            }
        )
            .then(res => res.blob())
            .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
                sessionStorage.setItem('pdfFile', reader.result); // base64 data
            };
            reader.readAsDataURL(blob); // converts blob to base64
        });
        setData(sessionStorage.getItem('pdfFile'));

    }

    return (
        <div>
            <Button onClick={viewPDF} color="primary">
                View PDF
            </Button>

            { 
                data != null && 
                ( <CardMedia component="iframe" src={data} sx={{height:"450%", width:"75%"}}/> )
            }
        </div>
    )
}

export default ResumeViewer;