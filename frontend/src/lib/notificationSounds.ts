const NOTIFICATION_SOUNDS = {
  message: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQcNXL/24NqULQN0v+Hi1bNQJ1SM3tjAj0sjW6rQwaiANzRAmdS9m2REPm+tw6aRZ05EhcLGp4FYO0t6vcOgdlI+RXq8wJRvQkNRir+/jGY5QF6TwryBWzY/bKDGr3FNND12r8qlZjg1UZvNtoxDNjpzosmffz88VIrHqXlGQkhqlr+qd0Y8TH2jvqBrPjpOc6G8oXA8N0Z1pLmhbjc0Rn2quZxlMjE+fpqslGM0NURrkaSgcj04OGCQq59wOjI3WoqtnHY6Mjhif6Sdd0IyNFhxmqGRezkwN2h7n56HbTE2SW+Yn5CFaDY1PGx5n5yHaTQ2OmN2nZmIdDQ3OV10nJmFcTQ6Ol9vlZd/bzY4N1pvlpR8bjg4N1VmkpOBeDg0NFJij5KBdDg2N1Fij5GAcjg4O09djo6Aczg3Nk1bjpCCdDc4OEtYi42BdTg5OUlWi4yAczg4OUhVioqAcjg5OkZTh4h+cTg6OkVSh4h+cDc6O0RQhod+cDc6O0JPhIZ+bTc6O0FNg4V9bTc7PD9MgYR8azc7PD5LgYN8azc8Pj5KgIF6aTY9Pz1Jf4B6aDY9QDxHfn95Zzc+QDtGfX55ZTg+QTtFfH14ZDg/QjpEenx4Yzk/QjlDenx2YjlAQzlCeXp1YjpAQzhBd3l0YTtBRDdAdnh0YDtBRDZAd3hzXzxCRTY/dnhyXjxDRjU+dXdxXTxDRjU9dHZxXT1ERjQ8c3VwXD1ERjQ8cnVwWz5FRTQ7cnRwWz5GRjM6cXNvWj9GRjM5cXJvWT9HRjI4cHJuWD9HRzI4cHFuWEBIRzE3b3FuV0BJRzE2b3BtV0BKSTI2bnBsVkFKSjE1bm9sVUFKSjE0bW9rVUFLSzAzbW5rVEJLSzAybW5qVEJMTDAxbG5qU0JMTC8xbG1pU0JNTS8wbG1pUkNNTS8wa2xoUkNOTi4va2xoUUNOTy4ua2toUUROTy0uamtnUERPUC0tamlnT0VPUCwtamhnT0VQUSssaWhnTkVRUisraWdmTkVRUiooZ2dlTkZSUiknZ2ZlTEVRUikmZmVlTUZTVCgmZmRkTEZUVCclZWRjTEZUVScjZGNjS0dVVickZGNiSkhVViUjY2JhSkdWVyQiY2FhSkhWVyMhYmFgSklXVyIgYWBgSUpYWCEfYF9fSUpYWCAeX19eSktZWB8dXl5eSktZWR4cXl1dSEtaWR0bXV1dSEtaWhwbXFxcR0xbWhsaXFxcR0xbWxoZW1tbRk1cWxgYW1paRk1cXBgXWlpaRU1dXBcWWllZRU5dXRYVWVlYRU5eXRUVWFhXRE5eXRUUWFhXRE9fXhQTWFdXRE9fXhMTV1dWQ1BgXhISV1ZWRE9gXhIRVlZVRE9hXxERVlVVQVBhXxAQVVVVRFBhYA8PVFRUQVFiYA4OVFNUQlFiYQ0NUlNTQ1FiYg0NUVNSQ1JjYgwMUVJSQlJjYgwLUVJRQlJjYwsKUFFRQVJkYwsKUFBQQVNkYwoJT09QQFNkZAoJT09PQFRlZAkIT05PQFRlZQgHT01OP1VlZQcGTk5OPVVmZgYGTU1NPVVmZgUFTU1MPVZnZgQETEtMP1ZnZwQETEtLPlZnZwMDTEtLPlZoaAICTEpKPVdoaAECS0pKPVdpaQABS0lJPFdpaQAAS0lJPFhpaQAAS0lJPFhqaQAAS0hIO1hqaQAASkdIO1lqagAASkhHO1lragAASUdHOllragAASUdGOVlsagAASEdGOVpsbAAASUZGOFpsbAAASEZFOFpsbQAASEVFOFptbQAARkRENlpubgAAR0VDNlptbgAARkRDNVtvbwAARENDNVtwcAAAQ0JCNF1wcgAAQ0JBNVxxc3QAAEBAPjZddnd4eAAAO0A8M11+f4CBAD83PDo1X4eJi4oAPD4=',
  call: 'data:audio/wav;base64,UklGRl4HAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YToHAACAgICAgICAgICAgICAgICAgICAgICAgICA/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AAIGBhYWKio6OkpKXl52dnp6dnZycm5uampiYl5eWlpaVlZSUlJSUlJOTk5OTk5OTk5SUlJSVlZaWl5eYmZqbnJydnp+goaGioqKioqKioqGhoJ+fn56dnZybmpmYl5aVlJOSkZCPjouKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUFBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAP///v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubm4t7a1tbS0s7Oysq+vpKSNjXBwSEdSV1lYW1taWlhXVlRSUU9OTEpJR0VEQkE/PTs5ODY0MzEvLSsqKCclIyEgHhwaGRcVExIQDw0LCggHBQMCAP/+/Pr5+Pb19PLx7+7s6+np5+bl5OLh4N7d3NrZ2NbV1NPR0M/OzMvKycjHxsXExMPCwcHAwL+/vr6+vr29vb29vb29vb29vr6+v7+/wMHBwsPDxMXGx8jJyszN0NLV2Nrr//8AAwsRFhogJisxNz1DR0xQVVpeYmVoa21wc3Z5fX6AgYKDhIWGh4iJioqLjIyNjo6Oj5CQkZGRkpKSk5OTlJSUlJWVlZWWlpaWlpaWlpeXl5eXl5eXl5eXl5eXl5eXl5aWlpaWlpaVlZWVlJSUk5OTkpKRkZCQj4+OjYyLiomIh4aFhIOCgX9+fHt5d3Z0cnBvbWtqaGZkYmBfXVtZV1VTUVBOTEpIRkRCQD49Ozk3NTMxLy0rKignJSMhIB4cGhkXFRMREA4MCwoIBgQDAf/+/Pr5+Pb19PLw7+3s6ujn5eTi4d/e3NvZ2NbV09LQ0M7NzMrJyMfGxcTDwsHBwL+/vr69vb29vLy8vLy8vLy8vL29vb2+vr+/wMHBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/gABAgMFBgcICQoLDA0ODxASExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/4CAgICAgICAgICAgICAgICAgA==',
  system: 'data:audio/wav;base64,UklGRlQFAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTAFAACAgICAgICAgICAgICAgICAgICAgICAgICA/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wBxcW1sZGFcV1FPTEFBPT06ODY1NDQzMzMzNDU2ODk7PUBESExQVVlgZm1zdH9+gH+Ag4aKjpKXm6CkqKyvsrW3ubq7u7u6uLa0sK2ppKCcmJOPioeDfnp2cW1paGdmZGRkZGVnampucnZ5fX+BgoODg4GAf315d3RxbWljX1tZWFhaXF9jZ2xvdnl6fn9/f39+e3l2c29raWdmZWVlaGpucnZ6foCCg4SEhIKAf3t4dG9raWdlZGVnam1xdXl9gIOFh4eHh4WDf3x4dHBramhoaWptcXV6foKGiYuNjIyKh4R/e3dwbGdkYmFjZmtxdnyBho2SkZCOi4eAfHZwa2ZjYWFjaW9zeYGHjpSXl5aUkIqEfXVvZ2JeXF5iaW92f4eMk5ibnJqXko2FfnZwZ2FeXF9la3F6goySlpuan5uYkYqCeXBpY15cX2RrcXmEi5KXnKGhoZ2Xj4h/dnBnYV1dYGZtdX+JkZibnaOko5+ZkoqCeXFqZF9eYmhweoONlZyepKmppqGbl4+HfnVsZmFfYWdvd4OLlJuepqqsqaWinpeOfXRsZF9dX2RscXuEjpacoaWprqyppaCanpSLgnpxaWRiY2hwd4GLk5ygo6itrq2ppqCalo2EfHRsZmNka252f4mSlpuhpqyvrqyrpp+XjoZ9dXBsaWpvcnmCjJSdoqWoq66vrquopZ+WkImAe3ZzcHFzeH6Gio+VnKGlqq2usLCuq6iknJWOh4B5dnRzdHl9goiOlJmeoaatrbCxsK+sqKSfmJGKg3x3dHN2eX6EiZCUmqCkqq2xsbGwsK2qp6OempSMhn99e3t8gISKjpOYnaGmqa2vsbGwsK+sqKaimZSPiYSAf4CChouPlJicn6Ooq66wsrOzsK2qp6OfmZWQjIiGhYaJjI+Ul5qeoqaoq66wsrKxsK2qqKSgnpiTkIyLioqLjpGVmJufoqaoq62vsLCvsK2qqKShn5uXlJGPjY2Nj5KUl5qcn6KlqKqsrq+wsK+urKqnpKKfnJqYlZOSkJCQkpSWmJudoKKkpqips7i3tLKwrqypp6Sjn52bmZeWlZWTkpGRkpSTlJWWmJmanJ6goKCfnJqYl5aVlZSUlJOTkpKSk5OUlJWWlpeYmJiZmZmamZiYmJeXl5aWlZSUlJWVlpeXmJmanJ2en5+fn56dnZycm5uampqampmZmZiYmZiYmJeYl5eXlpaWlpWVlZWUlJSUlJSUlJSUlZWVlZaWl5eYmJiZmZqam5ucnJydnp6en5+goKCgoKGhoKCgoKCgoKCgoJ+fn5+fnp6dnZ2cnJybm5ubm5qampqampqampqampqampmZmZmYmJiYmJiYl5eXl5eXl5eXl5eXl5eXl5eXl5eYmJiYmJiZmZmZmpqampubm5ycnJ2dnZ6enp+fn5+foKCgoKGhoaGhoqKioqKioqKioqKioqKioaGhoaGgoKCgoKCfn5+fn5+enp6enp6enZ2dnZ2dnZ2cnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJycnJydnZ2dnZ2enp6fn5+goKCAgA=='
}

let audioContext: AudioContext | null = null
let soundsEnabled = true
let userHasInteracted = false

document.addEventListener('click', () => { userHasInteracted = true }, { once: true })
document.addEventListener('keydown', () => { userHasInteracted = true }, { once: true })

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext
}

export function warmupAudioContext(): void {
  if (audioContext?.state === 'suspended') {
    audioContext.resume().catch(() => {})
  }
}

async function decodeAudioData(base64: string): Promise<AudioBuffer> {
  const ctx = getAudioContext()
  const binaryString = atob(base64.split(',')[1])
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return await ctx.decodeAudioData(bytes.buffer)
}

const audioBufferCache: Map<string, AudioBuffer> = new Map()

async function getBuffer(type: keyof typeof NOTIFICATION_SOUNDS): Promise<AudioBuffer | null> {
  if (audioBufferCache.has(type)) {
    return audioBufferCache.get(type)!
  }
  try {
    const buffer = await decodeAudioData(NOTIFICATION_SOUNDS[type])
    audioBufferCache.set(type, buffer)
    return buffer
  } catch (e) {
    console.error('Failed to decode audio:', e)
    return null
  }
}

export async function playNotificationSound(type: 'message' | 'call' | 'system' = 'message'): Promise<void> {
  if (!soundsEnabled) return
  if (!userHasInteracted) return
  
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }
    
    const buffer = await getBuffer(type)
    if (!buffer) return
    
    const source = ctx.createBufferSource()
    source.buffer = buffer
    
    const gainNode = ctx.createGain()
    gainNode.gain.value = 0.5
    
    source.connect(gainNode)
    gainNode.connect(ctx.destination)
    source.start(0)
  } catch (e) {
    console.error('Failed to play notification sound:', e)
  }
}

export function setSoundsEnabled(enabled: boolean): void {
  soundsEnabled = enabled
  try {
    localStorage.setItem('notification_sounds_enabled', String(enabled))
  } catch {}
}

export function getSoundsEnabled(): boolean {
  try {
    const stored = localStorage.getItem('notification_sounds_enabled')
    if (stored !== null) {
      soundsEnabled = stored === 'true'
    }
  } catch {}
  return soundsEnabled
}

getSoundsEnabled()
