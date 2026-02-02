<template>
  <li>
    <div class="label">
      <div>启停应用</div>
      <div class="desc">全局紧急开关 ( <span class="text-blue font-bold">{{ programConfig.startKey }} </span> )
      </div>
    </div>

    <div flex gap-2 items-center @click="clickStatus.isRunning = !clickStatus.isRunning">
      <span text-red-6 text-xs v-if="clickStatus.isRunning">
        运行中
      </span>
      <span text-blue-6 text-xs v-else> 已停止 </span>
      <a-tooltip :title="clickStatus.isRunning ? '点击暂停' : '点击运行'">
        <a-button shape="circle" size="small" type="primary" :danger="clickStatus.isRunning">
          <template #icon>
            <PlayOne v-if="!clickStatus.isRunning" />
            <Pause v-else />
          </template>
        </a-button>
      </a-tooltip>
    </div>
  </li>
</template>

<script setup lang="ts">
import { programConfig } from '@/views/data';
import { ClickStatus } from '@/views/types';
import { Pause, PlayOne } from "@icon-park/vue-next";

defineProps<{
  clickStatus: ClickStatus;
}>();
</script>

<style lang="scss" scoped>

</style>
