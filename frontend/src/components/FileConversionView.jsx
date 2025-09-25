import { ArrowRight, Download, FileText, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from 'next-themes';


const formatOptions = [
    { value: "mp3", label: "MP3" },
    { value: "wav", label: "WAV" },
    { value: "jpeg", label: "JPEG" },
    { value: "png", label: "PNG" },
    { value: "gif", label: "GIF" },
    { value: "tiff", label: "TIFF" },
    { value: "webp", label: "WEBP" },
]

const FileConversionView = ({ files, onBack, onConvert }) => {
    const { theme, setTheme } = useTheme();
    useEffect(() => { setTheme('light') }, [])
    const [conversions, setConversions] = useState(Array.from(files).map((file) => (
        {
            file,
            targetFormat: '',
        }
    )));

    const getFileExtension = (file) => {

        return file.split('.').pop()?.toUpperCase() || 'Unknown';

    }


    const updateTargetFormat = (index, targetFormat) => {
        setConversions((prevConversions) => prevConversions.map((item, i) => i === index ? { ...item, targetFormat } : item));
    }

    const canConvert = conversions.every(item => item.targetFormat !== '');

    return (
        <div className='w-full max-w-4xl mx-auto'>
            <div className='gradient-glass p-8 border border-white/30 rounded-3xl'>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-foreground">
                        Ready to Convert
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="hover-pop"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className='space-y-4 mb-8'>
                    {
                        conversions.map((item, index) => (
                            <div key={index} className='gradient-glass rounded-2xl p-6 border-white/20 border hover:border-primary/30 transition-all duration-300'>
                                <div className='flex flex-row items-center justify-between gap-6'>
                                    <div className='flex items-center flex-1 space-x-4 min-w-0'>
                                        <div className='p-2 rounded-xl text-foreground bg-primary/10'>
                                            <FileText className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0 ">
                                            <h3 className="font-medium text-foreground truncate">
                                                {item.file.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {getFileExtension(item.file.name)} • {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                                    <div className='shrink-0 w-32 '>
                                        <Select

                                            value={item.targetFormat}
                                            onValueChange={(value) => updateTargetFormat(index, value)}
                                            className="focus:outline-primary"
                                        >
                                            <SelectTrigger className='gradient-glass border-white/30 w-full'>
                                                <SelectValue placeholder="Format" className='w-full' />
                                            </SelectTrigger>
                                            <SelectContent className="gradient-glass border-white/30 bg-background/95 text-foreground  backdrop-blur-xl">
                                                {formatOptions.map(format => (
                                                    <SelectItem
                                                        key={format.value}
                                                        value={format.value}
                                                        className=" hover:!text-foreground"

                                                    >
                                                        {format.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex items-center justify-between'>
                    <Button
                        variant={'ghost'}
                        onClick={onBack}
                        className="hover-pop"
                    >
                        Back To Upload
                    </Button>

                    <Button
                        size="lg"
                        disabled={!canConvert}
                        onClick={() => onConvert(conversions)}
                        className="hover-pop glass-card border border-white/30 hover:border-primary/50"
                    >
                        <Download className="mr-2 h-5 w-5" />
                        Convert {files.length} File{files.length > 1 ? 's' : ''}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FileConversionView