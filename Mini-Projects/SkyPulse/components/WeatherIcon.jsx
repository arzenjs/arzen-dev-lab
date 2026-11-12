import { Sun, Moon, Cloud, CloudSun, CloudRain, CloudDrizzle, CloudLightning, CloudFog, Snowflake } from 'lucide-react'

const ICON_MAP = { sun: Sun, moon: Moon, cloud: Cloud, 'cloud-sun': CloudSun, 'cloud-rain': CloudRain, 'cloud-drizzle': CloudDrizzle, 'cloud-lightning': CloudLightning, 'cloud-fog': CloudFog, snowflake: Snowflake }

export default function WeatherIcon({ name, size = 'lg', className = '' }) {
  const Icon = ICON_MAP[name] || Cloud
  const sizeClass = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-16 h-16', xl: 'w-24 h-24' }[size]
  return <Icon className={`${sizeClass} ${className}`} />
}
