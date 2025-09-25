import { FileText, Upload } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { Button } from './ui/button';

const DragAndDropZone = ({ onFileDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    if(e.dataTransfer.files) {
      onFileDrop(e.dataTransfer.files);
    }
  }, [onFileDrop])

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, [])

  const handleFileInput = (e) => {
    if (e.target.files) {
      onFileDrop(e.target.files);
    }
  }
  return (
    <div className='w-full max-w-2xl mx-auto'>
      <div className={`relative p-12 rounded-3xl border-2 border-border border-dashed 
                      transition-all duration-300 gradient-glass hover:shadow-lg cursor-pointer group 
                      ${isDragOver ? 'drop-zone-glow border-primary scale-105' : 'border-white/30 hover:border-primary/50 '}`}
        onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
      >
        <div className='text-center'>
          <div className='mb-6 flex justify-center'>
            <div className='relative'>
              <Upload
                size={64}
                className={`text-primary transition-all duration-300 hover-wiggle
                 ${isDragOver ? 'scale-110 text-primary-glow' : 'group-hover:scale-105'}`}
              />
              {
                isDragOver && (<div className='absolute inset-0 animate-pulse rounded-full bg-primary/20'></div>)
              }
            </div>
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-3">
            Drop your files here
          </h3>
          <p className="text-muted-foreground text-lg mb-6">
            or click to browse from your computer
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="hover-pop gradient-glass border border-white/30 hover:border-primary/50 transition-all duration-300"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <FileText className="mr-2 h-5 w-5" />
            Choose Files
          </Button>

          {/* Hidden File Input */}
          <input
            id="file-input"
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Supports: JPG, PNG, MP3, GIF, AVIF, WEBP and more
        </p>
      </div>
    </div>
  )
}

export default DragAndDropZone