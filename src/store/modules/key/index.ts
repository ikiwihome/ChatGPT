import { defineStore } from 'pinia'
import type { KeyInfo, KeyState, Modal } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'

export const useKeyStore = defineStore('key-store', {
  state: (): KeyState => getLocalState(),
  actions: {
    updateKeyInfo(keyInfo: Partial<KeyInfo>) {
      this.keyInfo = { ...this.keyInfo, ...keyInfo }
      this.recordState()
    },

    resetKeyInfo() {
      this.keyInfo = { ...defaultSetting().keyInfo }
      this.recordState()
    },

    recordState() {
      setLocalState(this.$state)
    },

		setModal(modal: Modal) {
			if (this.keyInfo.modal !== modal) {
				this.keyInfo.modal = modal
				this.recordState()
			}
		},

  },
})
