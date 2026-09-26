export const SETTINGS_PARTS = ['info', 'devices', 'subscriptions', 'payments'] as const

export type SettingsPart = (typeof SETTINGS_PARTS)[number]

export const DEFAULT_SETTINGS_PART: SettingsPart = 'info'

export const SETTINGS_TAB_LABELS: Record<SettingsPart, string> = {
  info: 'General information',
  devices: 'Devices',
  subscriptions: 'Account Management',
  payments: 'My payments',
}
