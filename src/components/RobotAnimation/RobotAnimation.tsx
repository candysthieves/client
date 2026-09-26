'use client' // Обязательно: этот файл работает на клиенте

import dynamic from 'next/dynamic'

const LottiePlayer = dynamic(
  () => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact),
  { ssr: false } // Отключаем SSR только для самого тяжелого плеера
)

interface RobotAnimationProps {
  className?: string
}

export const RobotAnimation = ({ className }: RobotAnimationProps) => {
  return (
    <div className={className}>
      <LottiePlayer src={'/animations/robot-404-fixed.lottie'} autoplay loop />
    </div>
  )
}
