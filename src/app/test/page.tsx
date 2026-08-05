'use client'

import { Button, clsx, Typography } from '@candy.thieves/ui-kit-lumos'

const Test = () => {
  return (
    <div>
      <Typography variant={'h2'} color={'green'} className={clsx('text-center')}>
        How to use UI-kit components
      </Typography>

      <Button variant={'primary'} onClick={() => alert('clicked')}>
        Click me!
      </Button>
    </div>
  )
}

export default Test
