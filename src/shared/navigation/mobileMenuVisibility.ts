// Роуты, на которых мобильное нижнее меню должно быть скрыто,
// например настройки, открывающиеся внутри профиля.

export const MOBILE_MENU_HIDDEN_PATTERNS: RegExp[] = [/^\/profile\/general-information/]

export const isMobileMenuHiddenByPath = (pathname: string): boolean =>
  MOBILE_MENU_HIDDEN_PATTERNS.some(pattern => pattern.test(pathname))
