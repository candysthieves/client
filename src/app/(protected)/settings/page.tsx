import { redirect } from 'next/navigation'
import { SettingsTabs } from './SettingsTabs'
import { DEFAULT_SETTINGS_PART, SETTINGS_PARTS, type SettingsPart } from './tabs'

type SearchParams = { part?: string }

type SettingsPageProps = {
  searchParams: Promise<SearchParams> | SearchParams
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const { part } = await searchParams

  const isSettingsPart = (value: string | undefined): value is SettingsPart =>
    !!value && SETTINGS_PARTS.includes(value as SettingsPart)

  if (!isSettingsPart(part)) {
    redirect(`/settings?part=${DEFAULT_SETTINGS_PART}`)
  }

  return <SettingsTabs part={part} />
}
