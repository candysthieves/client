'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'

const Test = () => {
  return (
    <div>
      <Typography variant={'h2'} color={'green'}>
        How to use UI-kit components
      </Typography>

      <Button variant={'primary'} onClick={() => alert('clicked')}>
        Click me!
      </Button>
    </div>
  )
}

export default Test
