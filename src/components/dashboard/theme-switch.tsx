import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from '@/context/Theme'
import { Button } from '../custom/button'
import { useEffect } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  /* Update theme-color meta tag
   * when theme is updated */
  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff'
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    metaThemeColor && metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  return (
    <div>
    <Tooltip>
      <TooltipContent>Theme</TooltipContent>
      <TooltipTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className='rounded-full'
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <IconMoon size={20} /> : <IconSun size={20} />}
        </Button>
      </TooltipTrigger>
    </Tooltip>
    </div>
  )
}
