import React from 'react'
import { Heart, Star, MessageCircle, Plus, Folder, File } from 'lucide-react'

const FloatingShapes = () => {
    const shapes = [
        { Icon: Heart, delay: '0s', top: '10%', left: '10%', size: 32 },
        { Icon: Star, delay: '1s', top: '30%', left: '90%', size: 28 },
        { Icon: MessageCircle, delay: '2s', top: '70%', left: '12%', size: 36 },
        { Icon: Plus, delay: '3s', top: '90%', left: '80%', size: 32 },
        { Icon: Folder, delay: '4s', top: '70%', left: '85%', size: 28 },
        { Icon: File, delay: '5s', top: '40%', left: '30%', size: 36 },
    ]
  return (
    <>
        {
            shapes.map((shape, index) => {
                const {Icon, delay, size, ...position} = shape;
                return (
                    <div style={{...position, animationDelay: delay}} key={index} className='absolute  pointer-events-none opacity-20 text-primary z-0'>
                        <Icon size={size} className='float-animation' style={{animationDelay: delay}}/>
                    </div>
                )
            })
        }
    </>
  )
}

export default FloatingShapes