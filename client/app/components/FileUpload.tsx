'use client'

import axios from 'axios';
import { Upload } from 'lucide-react'

export default function FileUpload() {

    function handleUploadButtonClick () {
        const el = document.createElement('input');
        el.setAttribute('type', 'file');
        el.setAttribute('accept', 'application/pdf');
        el.addEventListener('change', async (e) => {
            if (el.files && el.files.length > 0) {
                const file = el.files[0];

                // upload file
                const formData = new FormData();
                formData.append('pdf', file);

                await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload/pdf`, formData)
                console.log("file uploaded!");
            }
        })
        el.click();
    }

    return (
        <div className='bg-slate-800 p-4 rounded-sm shadow-2xl text-white text-lg'>
            <div onClick={handleUploadButtonClick} className='flex justify-center items-center gap-3 cursor-pointer'>
                <h3>Upload PDF here</h3>
                <Upload />
            </div>
        </div>
    )
}