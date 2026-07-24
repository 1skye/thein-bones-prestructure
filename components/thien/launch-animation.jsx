'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LAUNCH_VIDEO_SRC, LAUNCH_FADE_MS, LAUNCH_SESSION_KEY } from './launch-config'

/**
 * LaunchAnimation
 * - Plays the startup video full-screen on a pure black background.
 * - No controls, muted (browsers require this for autoplay), preloaded.
 * - Fades out over LAUNCH_FADE_MS on ended and unmounts.
 * - Blocks all interaction until it finishes (fixed inset overlay, z-max).
 * - Shows only once per application launch (session).
 * - To replace the video, change LAUNCH_VIDEO_SRC in ./launch-config.
 */
export default function LaunchAnimation({ onFinish }) {
  const [visible, setVisible] = useState(null) // null = undecided (SSR), true/false after mount
  const [ready, setReady] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    // Decide client-side to avoid SSR hydration mismatch.
    let played = false
    try { played = sessionStorage.getItem(LAUNCH_SESSION_KEY) === '1' } catch (_) {}
    if (played) {
      setVisible(false)
      onFinish?.()
      return
    }
    setVisible(true)
  }, [onFinish])

  useEffect(() => {
    if (!visible) return
    // Prevent scroll while animation is playing.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [visible])

  const finish = () => {
    try { sessionStorage.setItem(LAUNCH_SESSION_KEY, '1') } catch (_) {}
    setVisible(false)
    // Notify after the exit animation duration.
    setTimeout(() => onFinish?.(), LAUNCH_FADE_MS)
  }

  if (visible === null || visible === false) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="launch"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: LAUNCH_FADE_MS / 1000, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center select-none"
          // Block all pointer events — users cannot interact until the video ends.
          onContextMenu={(e) => e.preventDefault()}
          style={{ pointerEvents: 'all' }}
          aria-hidden={!visible}
        >
          <video
            ref={videoRef}
            src={LAUNCH_VIDEO_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
            onCanPlay={() => setReady(true)}
            onEnded={finish}
            onError={finish}
            className={`max-h-screen max-w-screen h-full w-full object-contain transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
