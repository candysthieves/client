'use client'

import { Tabs } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import s from './SettingsTabs.module.scss'
import { SETTINGS_PARTS, SETTINGS_TAB_LABELS, type SettingsPart } from './tabs'

type SettingsTabsProps = {
  part: SettingsPart
}

export const SettingsTabs = ({ part }: SettingsTabsProps) => {
  const router = useRouter()

  const tabs = SETTINGS_PARTS.map(value => ({
    value,
    label: SETTINGS_TAB_LABELS[value],
    content: null,
  }))

  const handleValueChange = (value: string) => {
    router.replace(`/settings?part=${value}`)
  }

  return <Tabs className={s.tabs} onValueChange={handleValueChange} tabs={tabs} value={part} />
}
