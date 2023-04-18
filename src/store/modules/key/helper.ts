import { ss } from '@/utils/storage'

const LOCAL_NAME = 'keyStorage'

export type Modal = 'gpt-4' | 'gpt-4-32k' | 'gpt-3.5-turbo' | 'text-davinci-003' | 'code-davinci-002'

export interface KeyInfo {
  apiKey: string
	accessToken: string
	modal: Modal
}

export interface KeyState {
  keyInfo: KeyInfo
}

export function defaultSetting(): KeyState {
  return {
    keyInfo: {
			apiKey: '',
			accessToken: '',
			modal: 'gpt-3.5-turbo',
    },
  }
}

export function getLocalState(): KeyState {
  const localSetting: KeyState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: KeyState): void {
  ss.set(LOCAL_NAME, setting)
}

