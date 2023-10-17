'use client'
import { useCallback, useRef, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Modal = ({ children }: {children: ReactNode}) => {
    const overlay = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.push('/')
    }, [router])

    const hanldeClick = useCallback((e: React.MouseEvent) => {
        if((e.target === overlay.current) && onDismiss)
        onDismiss()
    }, [onDismiss, overlay])
  return (
    <div ref={overlay} className='modal' onClick={hanldeClick}>
        <button type='button' onClick={onDismiss} className='absolute top-4 right-8'>
            <Image
                width={17}
                height={17} 
                src='/close.svg'
                alt='close'
            />
        </button>
        <div className="flex justify-center items-center">
            <div ref={wrapper} className='modal_wrapper'>{children}</div>
        </div>
    </div>
  )
}

export default Modal