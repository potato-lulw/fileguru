// import { ArrowRight, Download, FileText, X } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { Button } from './ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { useTheme } from 'next-themes';
// import { useConvertAudioMutation, useGetAudioFormatsQuery } from '@/redux/slices/audio/audioApiSlice';
// import { useConvertImageMutation, useGetImageFormatsQuery } from '@/redux/slices/image/imageApiSlice';
// import { toast } from 'sonner';


// const getFileExtension = (file) => {
//     return file.split('.').pop()?.toUpperCase() || 'Unknown';
// }

// const isAudio = (name) => {
//     return ['MP3', 'WAV', 'AAC', 'OGG'].includes(name.split('.').pop()?.toUpperCase());
// }

// const FileConversionView = ({ files, onBack }) => {

//     const { data: supportedAudioFormats, isLoading: audioFormatsLoading, error: audioFormatFetchingError } = useGetAudioFormatsQuery();
//     const { data: supportedImageFormats, isLoading: imageFormatsLoading, error: imageFormatFetchingerror } = useGetImageFormatsQuery();
//     console.log(supportedAudioFormats, supportedImageFormats)
//     const [convertAudio, { isLoading: audioConversionLoading, error: audioConversionError }] = useConvertAudioMutation();
//     const [convertImage, { isLoading: imageConversionLoading, error: imageConversionError }] = useConvertImageMutation();
//     const [hasAudio, setHasAudio] = useState(false);
//     const [hasImage, setHasImage] = useState(false);

//     const [conversions, setConversions] = useState(Array.from(files).map((file) => (
//         {
//             file,
//             fileFormat: getFileExtension(file.name),
//             isAudio: isAudio(file.name),
//             targetFormat: '',
//             downloadUrl: '',
//         }
//     )));

//     useEffect(() => {
//         setHasAudio(conversions.some(item => item.isAudio));
//         setHasImage(conversions.some(item => !item.isAudio));
//     }, [conversions])

//     const updateTargetFormat = (index, targetFormat) => {
//         setConversions((prevConversions) => prevConversions.map((item, i) => i === index ? { ...item, targetFormat } : item));
//     }

//     const handleImageConvert = async (file, format, index) => {
//         try {
//             const blob = await convertImage({ file, format }).unwrap();
//             const url = window.URL.createObjectURL(blob);

//             setConversions(prev =>
//                 prev.map((item, i) =>
//                     i === index ? { ...item, downloadUrl: url } : item
//                 )
//             );
//         } catch (error) {
//             console.error("Image conversion failed:", error);
//             toast.error("Image conversion failed. Please try again.");
//         }
//     };

//     // ✅ Add a try...catch block here as well
//     const handleAudioConvert = async (file, format, index) => {
//         try {
//             const blob = await convertAudio({ file, format }).unwrap();
//             const url = window.URL.createObjectURL(blob);

//             setConversions(prev =>
//                 prev.map((item, i) =>
//                     i === index ? { ...item, downloadUrl: url } : item
//                 )
//             );
//         } catch (error) {
//             console.error("Audio conversion failed:", error);
//             toast.error("Audio conversion failed. Please try again.");
//         }
//     };

//     const canConvert = conversions.every(item => item.targetFormat !== '');

//     const onConvert = (conversions) => {
//         toast("Converting Files ... ", {
//             description: `Processing ${conversions.length} files. Please wait.`,
//         });

//         conversions.forEach((item, index) => {
//             if (item.isAudio) {
//                 handleAudioConvert(item.file, item.targetFormat, index);
//             } else {
//                 handleImageConvert(item.file, item.targetFormat, index);
//             }
//         });
//     };

//     return (
//         <div className='w-full max-w-4xl mx-auto'>
//             <div className='gradient-glass p-8 border border-white/30 rounded-3xl'>
//                 <div className="flex items-center justify-between mb-8">
//                     <h2 className="text-2xl font-bold text-foreground">
//                         Ready to Convert
//                     </h2>
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={onBack}
//                         className="hover-pop"
//                     >
//                         <X className="h-5 w-5" />
//                     </Button>
//                 </div>

//                 <div className='space-y-4 mb-8'>
//                     {
//                         conversions.map((item, index) => (
//                             <div key={index} className='gradient-glass rounded-2xl p-6 border-white/20 border hover:border-primary/30 transition-all duration-300'>
//                                 <div className='flex flex-row items-center justify-between gap-6'>
//                                     <div className='flex items-center flex-1 space-x-4 min-w-0'>
//                                         <div className='p-2 rounded-xl text-foreground bg-primary/10'>
//                                             <FileText className="h-6 w-6 text-primary" />
//                                         </div>
//                                         <div className="flex-1 min-w-0 ">
//                                             <h3 className="font-medium text-foreground truncate">
//                                                 {item.file.name}
//                                             </h3>
//                                             <p className="text-sm text-muted-foreground">
//                                                 {getFileExtension(item.file.name)} • {(item.file.size / 1024 / 1024).toFixed(2)} MB
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
//                                     <div className='shrink-0 w-32 '>
//                                         <Select

//                                             value={item.targetFormat}
//                                             onValueChange={(value) => updateTargetFormat(index, value)}
//                                             className="focus:outline-primary"
//                                         >
//                                             <SelectTrigger className='gradient-glass border-white/30 w-full'>
//                                                 <SelectValue placeholder="Format" className='w-full' />
//                                             </SelectTrigger>
//                                             <SelectContent className="gradient-glass border-white/30 bg-background/95 text-foreground backdrop-blur-xl">
//                                                 {!item.downloadUrl ? (
//                                                     item.isAudio
//                                                         ? supportedAudioFormats?.map((format, idx) => (
//                                                             <SelectItem key={idx} value={format} className="hover:!text-foreground">
//                                                                 {format.toUpperCase()}
//                                                             </SelectItem>
//                                                         ))
//                                                         : supportedImageFormats?.map((format, idx) => (
//                                                             <SelectItem key={idx} value={format} className="hover:!text-foreground">
//                                                                 {format.toUpperCase()}
//                                                             </SelectItem>
//                                                         ))
//                                                 ) : (
//                                                     <Button
//                                                         onClick={() => {
//                                                             const a = document.createElement("a");
//                                                             a.href = item.downloadUrl;
//                                                             a.download = `converted-${item.file.name.split('.')[0]}.${item.targetFormat}`;
//                                                             a.click();
//                                                             window.URL.revokeObjectURL(item.downloadUrl);
//                                                         }}
//                                                     >
//                                                         <Download className="mr-2 h-5 w-5" />
//                                                         Download File
//                                                     </Button>
//                                                 )}
//                                             </SelectContent>

//                                         </Select>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>
//                 <div className='flex items-center justify-between'>
//                     <Button
//                         variant={'ghost'}
//                         onClick={onBack}
//                         className="hover-pop"
//                     >
//                         Back To Upload
//                     </Button>

//                     <Button
//                         size="lg"
//                         disabled={!canConvert}
//                         onClick={() => onConvert(conversions)}
//                         className="hover-pop glass-card border border-white/30 hover:border-primary/50"
//                     >
//                         <Download className="mr-2 h-5 w-5" />
//                         Convert {files.length} File{files.length > 1 ? 's' : ''}
//                     </Button>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default FileConversionView



import { ArrowRight, Download, FileText, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

const getFileExtension = (file) => {
    return file.split('.').pop()?.toUpperCase() || 'Unknown';
};

const isAudio = (name) => {
    return ['MP3', 'WAV', 'AAC', 'OGG'].includes(name.split('.').pop()?.toUpperCase());
};

const FileConversionView = ({ files, onBack }) => {
    const [supportedAudioFormats, setSupportedAudioFormats] = useState([]);
    const [supportedImageFormats, setSupportedImageFormats] = useState([]);
    const [conversions, setConversions] = useState(
        Array.from(files).map((file) => ({
            file,
            fileFormat: getFileExtension(file.name),
            isAudio: isAudio(file.name),
            targetFormat: '',
            downloadUrl: '',
        }))
    );

    useEffect(() => {
        // Fetch supported audio formats
        fetch('http://localhost:8800/api/audio/formats')
            .then((res) => res.json())
            .then(setSupportedAudioFormats)
            .catch(() => toast.error('Failed to fetch audio formats'));

        // Fetch supported image formats
        fetch('http://localhost:8800/api/image/formats')
            .then((res) => res.json())
            .then(setSupportedImageFormats)
            .catch(() => toast.error('Failed to fetch image formats'));
    }, []);

    const updateTargetFormat = (index, targetFormat) => {
        setConversions((prev) =>
            prev.map((item, i) => (i === index ? { ...item, targetFormat } : item))
        );
    };

    const handleConvert = async (item, index) => {
        try {
            const formData = new FormData();
            formData.append(item.isAudio ? 'audio' : 'image', item.file);
            formData.append('format', item.targetFormat);

            const url = item.isAudio ? '/api/audio/convert' : '/api/image/convert';

            const response = await fetch(`http://localhost:8800${url}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Conversion failed');
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            setConversions((prev) =>
                prev.map((c, i) => (i === index ? { ...c, downloadUrl } : c))
            );
        } catch (error) {
            console.error(error);
            toast.error(`${item.isAudio ? 'Audio' : 'Image'} conversion failed`);
        }
    };

    const canConvert = conversions.every((item) => item.targetFormat !== '');

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="gradient-glass p-8 border border-white/30 rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-foreground">Ready to Convert</h2>
                    <Button variant="ghost" size="icon" onClick={onBack} className="hover-pop">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="space-y-4 mb-8">
                    {conversions.map((item, index) => (
                        <div
                            key={index}
                            className="gradient-glass rounded-2xl p-6 border-white/20 border hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="flex flex-row items-center justify-between gap-6">
                                <div className="flex items-center flex-1 space-x-4 min-w-0">
                                    <div className="p-2 rounded-xl text-foreground bg-primary/10">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-foreground truncate">{item.file.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {getFileExtension(item.file.name)} •{' '}
                                            {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                                <div className="shrink-0 w-32">

                                    {
                                        item.downloadUrl ?
                                            (
                                                <Button
                                                    onClick={() => {
                                                        const a = document.createElement('a');
                                                        a.href = item.downloadUrl;
                                                        a.download = `converted-${item.file.name.split('.')[0]}.${item.targetFormat}`;
                                                        a.click();
                                                        window.URL.revokeObjectURL(item.downloadUrl);
                                                    }}
                                                    variant={'outline'}
                                                    className={`w-full`}
                                                >
                                                    <Download className=" h-5 w-5" /> 
                                                </Button>
                                            ) : (
                                                <Select
                                                    value={item.targetFormat}
                                                    onValueChange={(value) => updateTargetFormat(index, value)}
                                                >
                                                    <SelectTrigger className="gradient-glass border-white/30 w-full">
                                                        <SelectValue placeholder="Format" className="w-full" />
                                                    </SelectTrigger>
                                                    <SelectContent className="gradient-glass border-white/30 bg-background/95 text-foreground backdrop-blur-xl">
                                                        {item.isAudio
                                                            ? supportedAudioFormats.map((format, idx) => (
                                                                <SelectItem key={idx} value={format}>
                                                                    {format.toUpperCase()}
                                                                </SelectItem>
                                                            ))
                                                            : supportedImageFormats.map((format, idx) => (
                                                                <SelectItem key={idx} value={format}>
                                                                    {format.toUpperCase()}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            )
                                    }

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={onBack} className="hover-pop">
                        Back To Upload
                    </Button>

                    <Button
                        size="lg"
                        disabled={!canConvert}
                        onClick={() => conversions.forEach((item, index) => handleConvert(item, index))}
                        className="hover-pop glass-card border border-white/30 hover:border-primary/50"
                    >
                        <Download className="mr-2 h-5 w-5" />
                        Convert {files.length} File{files.length > 1 ? 's' : ''}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FileConversionView;
