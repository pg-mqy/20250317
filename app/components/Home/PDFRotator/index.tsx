'use client';
import {useState, useCallback} from 'react';
import {Document, Page as PDFPage} from 'react-pdf';
import {PDFDocument, degrees} from 'pdf-lib';
import {useDropzone} from 'react-dropzone';
import PDFViewerConfig from "@/app/components/Home/PDFRotator/config/viewerConfig";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

interface PageRotation {
    pageNumber: number;
    rotation: 0 | 90 | 180 | 270;
}

export default function PDFRotator() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pageRotations, setPageRotations] = useState<PageRotation[]>([]);
    const [numPages, setNumPages] = useState(0);
    const [scale, setScale] = useState(1.0); // 控制缩放

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file?.type === 'application/pdf') {
            setPdfFile(file);
            setPageRotations([]);
        }
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {'application/pdf': ['.pdf']},
        multiple: false,
    });

    // 单独旋转某一页
    const rotatePage = (pageNumber: number, angle: 90 | 180 | 270) => {
        console.log('Rotate page:', pageNumber, 'by', angle)
        setPageRotations(prev => {
            const newRotations = [...prev];
            const existing = newRotations.find(r => r.pageNumber === pageNumber);
            if (existing) {
                existing.rotation = ((existing.rotation + angle) % 360) as 0 | 90 | 180 | 270;
            } else {
                newRotations.push({pageNumber, rotation: angle});
            }
            return newRotations;
        });
    };

    // 旋转所有页面
    const rotateAllPages = (angle: 90 | 180 | 270) => {
        setPageRotations(prev => {
            const updatedRotations = [...prev];

            for (let i = 1; i <= numPages; i++) {
                const existing = updatedRotations.find(r => r.pageNumber === i);
                if (existing) {
                    existing.rotation = ((existing.rotation + angle) % 360) as 0 | 90 | 180 | 270;
                } else {
                    updatedRotations.push({pageNumber: i, rotation: angle});
                }
            }

            return updatedRotations;
        });
    };

    // 处理 PDF 旋转并下载
    const rotatePDF = async () => {
        if (!pdfFile) return;

        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();

        pages.forEach((page, index) => {
            const rotation = pageRotations.find(r => r.pageNumber === index + 1)?.rotation || 0;
            page.setRotation(degrees((page.getRotation().angle + rotation) % 360));
        });

        const modifiedPdf = await pdfDoc.save();
        const blob = new Blob([modifiedPdf], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `rotated-${pdfFile.name}`;
        link.click();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <PDFViewerConfig/>

            {!pdfFile && (
                <div className='justify-center items-center flex'>
                    <div {...getRootProps()}
                         className="border-2 border-dashed rounded-lg w-96 h-64 justify-center items-center flex">
                        <div>
                            <input {...getInputProps()} />
                            <p className="text-gray-600">拖放PDF文件到这里，或点击选择文件</p>
                        </div>
                    </div>
                </div>
            )}

            {pdfFile && (
                <div className="flex flex-col items-center">
                    <div className="flex gap-4 mb-4">
                        <button
                            onClick={() => rotateAllPages(90)}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        >
                            旋转全部
                        </button>
                        <button
                            onClick={() => setPdfFile(null)}
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                        >
                            移除 PDF
                        </button>
                        <button
                            onClick={() => setScale(prev => Math.min(prev + 0.2, 2))}
                            className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800"
                        >
                            🔍+
                        </button>
                        <button
                            onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
                            className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-800"
                        >
                            🔍−
                        </button>
                    </div>

                    {/* PDF 预览区域 */}
                    <Document
                        file={pdfFile}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        className="flex justify-center gap-4 flex-wrap"
                    >
                        {Array.from({ length: numPages }, (_, i) => (
                            <div
                                key={i + 1}
                                className="relative border rounded-md bg-white shadow-sm flex items-center justify-center overflow-hidden"
                            >
                                <PDFPage
                                    pageNumber={i + 1}
                                    rotate={pageRotations.find(r => r.pageNumber === i + 1)?.rotation || 0}
                                    width={300 * scale} // 确保缩放后大小受限
                                />
                                <button
                                    className="absolute top-2 right-2 z-10 bg-orange-500 text-white p-2 rounded-full shadow-md"
                                    onClick={() => rotatePage(i + 1, 90)}
                                >
                                    🔄
                                </button>
                                <p className="absolute bottom-2 text-center text-sm">{i + 1}</p>
                            </div>
                        ))}
                    </Document>

                    {/* 下载按钮 */}
                    <button
                        onClick={rotatePDF}
                        className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                    >
                        下载
                    </button>
                </div>
            )}
        </div>
    );
}
