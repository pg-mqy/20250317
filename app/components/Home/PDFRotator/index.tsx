'use client';
import {useState, useCallback} from 'react';
import {Document, Page as PDFPage} from 'react-pdf';
import {PDFDocument, degrees} from 'pdf-lib';
import {useDropzone} from 'react-dropzone';
import PDFViewerConfig from "@/app/components/Home/PDFRotator/config/viewerConfig";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import {CloudUploadOutlined, RotateLeftOutlined, ZoomInOutlined, ZoomOutOutlined} from "@ant-design/icons";
import {useTranslations} from "next-intl";

type RotationAngle = 90 | 180 | 270;

interface PageRotation {
    pageNumber: number;
    rotation: 0 | RotationAngle;
}

export default function PDFRotator() {
    const t = useTranslations("Home");
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
    const rotatePage = (pageNumber: number, angle: RotationAngle) => {
        setPageRotations(prev => {
            const newRotations = [...prev];
            const existing = newRotations.find(r => r.pageNumber === pageNumber);
            if (existing) {
                existing.rotation = ((existing.rotation + angle) % 360) as 0 | RotationAngle;
            } else {
                newRotations.push({pageNumber, rotation: angle});
            }
            return newRotations;
        });
    };

    // 旋转所有页面
    const rotateAllPages = (angle: RotationAngle) => {
        setPageRotations(prev => {
            const updatedRotations = [...prev];

            for (let i = 1; i <= numPages; i++) {
                const existing = updatedRotations.find(r => r.pageNumber === i);
                if (existing) {
                    existing.rotation = ((existing.rotation + angle) % 360) as 0 | RotationAngle;
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
                         className="border-2 border-dashed rounded-lg w-64 h-96 justify-center items-center flex bg-light cursor-pointer">
                        <div>
                            <input {...getInputProps()} />
                            <CloudUploadOutlined className='flex justify-center text-2xl mb-2' />
                            <p className="text-center">{t('PDFRotator_title')}</p>
                        </div>
                    </div>
                </div>
            )}

            {pdfFile && (
                <div className="flex flex-col items-center">
                    <div className="flex gap-4 mb-8 flex-wrap">
                        <button
                            onClick={() => rotateAllPages(90)}
                            className="bg-green-4 inline-block rounded-sm px-8 py-3 text-sm font-medium primary-button"
                        >
                            {t('PDFRotator_button_rotate')}
                        </button>
                        <button
                            onClick={() => setPdfFile(null)}
                            className="inline-block rounded-sm border border-current px-8 py-3 text-sm font-medium primary-button"
                        >
                            {t('PDFRotator_button_remove')}
                        </button>
                        <button
                            onClick={() => setScale(prev => Math.min(prev + 0.2, 2))}
                        >
                            <ZoomInOutlined className='text-base bg-green-3 p-3 rounded-full primary-button' />
                        </button>
                        <button
                            onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
                        >
                            <ZoomOutOutlined className='text-base bg-green-3 p-3 rounded-full primary-button' />
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
                                className="relative border-2 border-green-2 rounded-md shadow-sm flex items-center justify-center overflow-hidden bg-light"
                            >
                                <PDFPage
                                    pageNumber={i + 1}
                                    rotate={pageRotations.find(r => r.pageNumber === i + 1)?.rotation || 0}
                                    width={256 * scale}
                                />
                                <button
                                    className="absolute top-1 right-1 z-10 p-2 rounded-full shadow-md bg-green-2"
                                    onClick={() => rotatePage(i + 1, 90)}
                                >
                                    <RotateLeftOutlined className='text-xl' />
                                </button>
                                <p className="absolute bottom-2 text-center text-sm">{i + 1}</p>
                            </div>
                        ))}
                    </Document>

                    {/* 下载按钮 */}
                    <button
                        onClick={rotatePDF}
                        className="bg-green-3 mt-16 inline-block rounded-sm px-8 py-3 text-sm font-medium primary-button"
                    >
                        {t('PDFRotator_button_download')}
                    </button>
                </div>
            )}
        </div>
    );
}
