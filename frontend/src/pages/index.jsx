import FloatingShapes from '@/components/FloatingShapes'
import React, { useState } from 'react'
import { ArrowBigDownDash, File } from 'lucide-react'
import DragAndDropZone from '@/components/DragAndDropZone'
import { toast } from 'sonner'
import FileConversionView from '@/components/FileConversionView'

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState([]);
  const [showConversion, setShowConversion] = useState(false);
  const handleFileDrop = (files) => {
    setShowConversion(true)
    setUploadedFiles(files);
    console.log(files)
  }

  const handleBackToUpload = () => {
    setShowConversion(false);
    setUploadedFiles(null);
  }

  const handleConvert = (conversions) => {
    toast("Converting Files ... ", {
      description:  `Processing ${conversions.length} files. Please wait.`,
    })
  }
  return (
    <div className='gradient-bg min-h-screen relative overflow-hidden'>
      <FloatingShapes />
      <div className='flex flex-col items-center z-10 '>
        {/* Logo */}
        <div className='flex flex-row gap-2 justify-center items-center p-6 py-12 mb-8 '>
          <div className=' p-2 gradient-glass rounded-2xl hover-wiggle'>
            <ArrowBigDownDash size={32} className='text-primary' />
          </div>
          <h1 className='text-foreground font-bold text-2xl'>FileGuru</h1>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-center ">
          Convert Any File,{' '}
          <span className="text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
            Anytime
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed text-center">
          Transform your documents, images, and media files instantly.
        </p>
        <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto text-center mb-4">
          Simple, fast, and secure file conversion in your browser.
          No signups, no hassle – just drop and convert.
        </p>
        {/* Dropzone */}
        {showConversion && uploadedFiles ? (
          <FileConversionView
            files={uploadedFiles}
            onBack={handleBackToUpload}
            onConvert={handleConvert}
          />
        ) : (
          <DragAndDropZone onFileDrop={handleFileDrop} />
        )}
      </div>
    </div>
  )
}

export default Index