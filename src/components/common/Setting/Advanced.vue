<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NButton, NInput, NSelect, useMessage } from 'naive-ui'
import { useSettingStore } from '@/store'
import type { SettingsState } from '@/store/modules/settings/helper'
import { t } from '@/locales'
import type { KeyInfo, Modal } from '@/store/modules/key/helper'
import { useKeyStore } from '@/store/modules/key'

const settingStore = useSettingStore()

const keyStore = useKeyStore()

const ms = useMessage()

const systemMessage = ref(settingStore.systemMessage ?? '')

const apiKey = ref(keyStore.keyInfo.apiKey ?? '')

const accessToken = ref(keyStore.keyInfo.accessToken ?? '')

const modal = computed({
  get() {
    return keyStore.keyInfo.modal
  },
  set(value: Modal) {
    keyStore.setModal(value)
  },
})

const modalOptions: { label: string; key: Modal; value: Modal }[] = [
  { label: 'gpt-4', key: 'gpt-4', value: 'gpt-4' },
  { label: 'gpt-4-32k', key: 'gpt-4-32k', value: 'gpt-4-32k' },
  { label: 'gpt-3.5-turbo', key: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' },
  { label: 'text-davinci-003', key: 'text-davinci-003', value: 'text-davinci-003' },
  { label: 'code-davinci-002', key: 'code-davinci-002', value: 'code-davinci-002' },
]

function updateSettings(options: Partial<SettingsState>) {
  settingStore.updateSetting(options)
  ms.success(t('common.success'))
}

function updateKeyInfo(options: Partial<KeyInfo>) {
  keyStore.updateKeyInfo(options)
  ms.success(t('common.success'))
}

function handleReset() {
  settingStore.resetSetting()
  keyStore.resetKeyInfo()
  ms.success(t('common.success'))
  window.location.reload()
}
</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.role') }}</span>
        <div class="flex-1">
          <NInput v-model:value="systemMessage" type="textarea" :autosize="{ minRows: 1, maxRows: 4 }" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateSettings({ systemMessage })">
          {{ $t('common.save') }}
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.apiKey') }}</span>
        <div class="w-[230px]">
          <NInput v-model:value="apiKey" placeholder="默认，首选，以'sk-'开头" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateKeyInfo({ apiKey })">
          {{ $t('common.save') }}
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.accessToken') }}</span>
        <div class="w-[230px]">
          <NInput v-model:value="accessToken" placeholder="次选，反向代理，API-KEY需留空" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateKeyInfo({ accessToken })">
          {{ $t('common.save') }}
        </NButton>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">{{ $t('setting.modal') }}</span>
        <div class="flex flex-wrap items-center gap-4">
          <NSelect
            style="width: 200px"
            :value="modal"
            :options="modalOptions"
            @update-value="value => keyStore.setModal(value)"
          />
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">&nbsp;</span>
        <NButton size="small" @click="handleReset">
          {{ $t('common.reset') }}
        </NButton>
      </div>
    </div>
  </div>
</template>
