'use client' // Обязательно: этот файл работает на клиенте

import dynamic from 'next/dynamic'

const LottiePlayer = dynamic(
  () => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact),
  { ssr: false } // Отключаем SSR только для самого тяжелого плеера
)

export type LottieAnimationName = 'robot-404-fixed' | 'went-wrong'

interface UniversalLottieProps {
  animationName: LottieAnimationName
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export function UniversalLottie({
  animationName,
  className,
  loop = true,
  autoplay = true,
}: UniversalLottieProps) {
  return (
    <div className={className}>
      <LottiePlayer src={`/animations/${animationName}.lottie`} autoplay={autoplay} loop={loop} />
    </div>
  )
}
