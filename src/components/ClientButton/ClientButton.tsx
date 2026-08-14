'use client'

import { Button, type ButtonProps } from '@candy.thieves/ui-kit-lumos'

export type ClientButtonProps = ButtonProps

export const ClientButton = (props: ClientButtonProps) => {
  return <Button {...props} />
}
