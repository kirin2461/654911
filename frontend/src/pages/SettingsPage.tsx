import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { settingsAPI, type Settings as SettingsType } from '@/lib/api'
import { getLanguage, setLanguage } from '@/lib/i18n'
import {
  Bell,
  Shield,
  Globe,
  Mic,
  Bot,
  Save,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const defaultSettings: SettingsType = {
  theme: 'dark',
  language: 'ru',
  notifications_enabled: true,
  sound_enabled: true,
  voice_enabled: true,
  noise_reduction: true,
  telegram_notifications: false,
  openai_key: '',
  deepseek_key: '',
  huggingface_key: '',
  jarvis_personality: 'professional',
  jarvis_wake_word: 'Jarvis',
  profile_visibility: 'public',
  message_privacy: 'everyone',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setIsLoading(true)
      const data = await settingsAPI.getSettings()
      setSettings({ ...defaultSettings, ...data })
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      await settingsAPI.updateSettings(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSetting = (key: keyof SettingsType) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  const updateSetting = (key: keyof SettingsType, value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  const SettingToggle = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string
    description: string
    checked: boolean
    onChange: () => void
  }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-muted'
        )}
      >
        <div
          className={cn(
            'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  )

  if (isLoading) {
    return (
      <Layout>
        <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Настройки</h1>
          <p className="text-muted-foreground">
            Управление настройками аккаунта
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <CardTitle>Язык / Language</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <p className="font-medium mb-3">Язык интерфейса</p>
                <select 
                  className="input-field"
                  value={getLanguage()}
                  onChange={(e) => {
                    setLanguage(e.target.value as 'ru' | 'en')
                    window.location.reload()
                  }}
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Уведомления</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              <SettingToggle
                label="Включить уведомления"
                description="Получать уведомления о новых сообщениях и упоминаниях"
                checked={settings.notifications_enabled}
                onChange={() => toggleSetting('notifications_enabled')}
              />
              <SettingToggle
                label="Звуковые уведомления"
                description="Воспроизводить звук при получении уведомлений"
                checked={settings.sound_enabled}
                onChange={() => toggleSetting('sound_enabled')}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-primary" />
                <CardTitle>Голос и аудио</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              <SettingToggle
                label="Голосовые сообщения"
                description="Включить запись и воспроизведение голосовых сообщений"
                checked={settings.voice_enabled}
                onChange={() => toggleSetting('voice_enabled')}
              />
              <SettingToggle
                label="Шумоподавление"
                description="Уменьшить фоновый шум при записи голоса"
                checked={settings.noise_reduction}
                onChange={() => toggleSetting('noise_reduction')}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <CardTitle>Jarvis AI Ассистент</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Настройки AI ассистента
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Стиль общения</p>
                  <select 
                    className="input-field"
                    value={settings.jarvis_personality}
                    onChange={(e) => updateSetting('jarvis_personality', e.target.value)}
                  >
                    <option value="professional">Профессиональный</option>
                    <option value="friendly">Дружелюбный</option>
                    <option value="casual">Неформальный</option>
                    <option value="technical">Технический</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Слово активации</p>
                  <Input
                    placeholder="Например: Jarvis, Привет ассистент"
                    value={settings.jarvis_wake_word}
                    onChange={(e) => updateSetting('jarvis_wake_word', e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4 pt-6 border-t border-border">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">API Ключи (пользовательские)</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Hugging Face API Key</p>
                    <Input
                      type="password"
                      placeholder="hf_..."
                      value={settings.huggingface_key}
                      onChange={(e) => updateSetting('huggingface_key', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Используется для Jarvis по умолчанию (бесплатно)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">OpenAI API Key</p>
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={settings.openai_key}
                      onChange={(e) => updateSetting('openai_key', e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">DeepSeek API Key</p>
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={settings.deepseek_key}
                      onChange={(e) => updateSetting('deepseek_key', e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-xs text-amber-500/80 italic">
                  * Jarvis будет использовать ваши ключи, если они указаны.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Приватность и безопасность</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Видимость профиля</p>
                  <select 
                    className="input-field"
                    value={settings.profile_visibility}
                    onChange={(e) => updateSetting('profile_visibility', e.target.value)}
                  >
                    <option value="public">Публичный</option>
                    <option value="friends">Только друзья</option>
                    <option value="private">Приватный</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Кто может писать вам</p>
                  <select 
                    className="input-field"
                    value={settings.message_privacy}
                    onChange={(e) => updateSetting('message_privacy', e.target.value)}
                  >
                    <option value="everyone">Все</option>
                    <option value="friends">Только друзья</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3">
            {saved && (
              <div className="flex items-center gap-2 text-green-500">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Настройки сохранены!</span>
              </div>
            )}
            <Button onClick={handleSave} loading={loading}>
              <Save className="w-4 h-4" />
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
