'use client'

import { Upload } from 'lucide-react'

export default function FileUpload() {

    function handleUploadButtonClick () {
        const el = document.createElement('input');
        el.setAttribute('type', 'file');
        el.setAttribute('accept', 'application/pdf');
        el.addEventListener('change', (e) => {
            if (el.files && el.files.length > 0) {
                const file = el.files[0];
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