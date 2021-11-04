<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    clip-rule="evenodd"
    class="arrow"
    ref="arrow"
  >
    <path
      d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"
    />
  </svg>
</template>

<script lang="ts">
import { onMounted, Ref, ref, toRef, watch } from "vue";
export default {
  name: "Arrow",
  props: {
    inclination: Number,
  },
  setup(props: any) {
    const arrow = ref<InstanceType<typeof HTMLElement> | null>(null);
    const inclination = toRef(props, "inclination") as Ref<number>;

    const setInclination = (degree: number) => {
      if (arrow.value) arrow.value.style.transform = `rotate(${degree}deg)`;
    };

    onMounted(() => {
      watch(inclination, setInclination, { immediate: true });
    });

    return { arrow };
  },
};
</script>

<style lang="scss">
.arrow {
  position: absolute;
  top: -35px;
  left: 7px;
  height: 35px;
  transform-origin: bottom center;
}
</style>
