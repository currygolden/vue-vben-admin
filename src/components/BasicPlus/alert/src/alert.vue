<template>
  <transition :name="ns.b('fade')">
    <!-- 容器区 -->
    <div
      v-show="visible"
      role="alert"
      :class="[ns.b(), ns.m(type), ns.is('center', center), ns.is(effect)]"
    >
      <!-- content -->
      <div :class="ns.e('content')">
        <span v-if="title || $slots.title" :class="[ns.e('title'), isBoldTitle]">
          <slot name="title">{{ title }}</slot>
        </span>

        <p v-if="$slots.default || description" :class="ns.e('description')">
          <slot>
            {{ description }}
          </slot>
        </p>
        <!-- btn -->
        <template v-if="closable">
          <div v-if="closeText" :class="[ns.e('close-btn'), ns.is('customed')]" @click="close">{{
            closeText
          }}</div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { computed, ref, useSlots } from 'vue';
  import { alertEmits, alertProps } from './alert';
  import { useNamespace } from '/@/hooks/web/useNameSpace';

  const props = defineProps(alertProps);
  const emit = defineEmits(alertEmits);
  const slots = useSlots();

  const ns = useNamespace('alert');

  const visible = ref(true);

  const isBoldTitle = computed(() => props.description || { [ns.is('bold', true)]: slots.default });

  const close = (evt: MouseEvent) => {
    visible.value = false;
    emit('close', evt);
  };
</script>

<style lang="less"></style>
