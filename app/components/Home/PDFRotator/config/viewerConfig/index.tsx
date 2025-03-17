'use client';

import { useEffect } from 'react';
import { pdfjs } from 'react-pdf';

export default function PDFViewerConfig() {
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }, []);

    return null;
}