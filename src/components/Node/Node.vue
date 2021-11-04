<template>
  <div
    class="node-wrapper"
    :id="nodeId"
    ref="nodeElement"
    :data-parent="parentId"
    :data-side="side"
    :data-deepth="deepth"
    :data-order="order"
  >
    <div class="key-wrapper">{{ currentNode.key }}</div>
    <Arrow v-if="parentId" :inclination="arrowInclination" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  Ref,
  ref,
  toRef,
  watch,
} from "vue";
import { Side, TreeNode } from "./auxiliar/types";
import Arrow from "./components/Arrow.vue";
import { NodePositionFilledByDeepth } from "@/views/BinarySearchTree/auxiliar/elements";
import { getCenteredPosition } from "./auxiliar/fn";

export default defineComponent({
  name: "Node",
  props: {
    parentId: String,
    currentNode: Object as PropType<TreeNode<number | string>>,
    side: Number as PropType<Side>,
    deepth: { type: Number, required: true },
    elementInstance: Object as PropType<InstanceType<any>>,
    leftChild: Object as PropType<InstanceType<any>>,
    rightChild: Object as PropType<InstanceType<any>>,
    parentNode: Object as PropType<InstanceType<any>>,
  },
  setup(props) {
    const el = toRef(props, "elementInstance");
    const deepth = toRef(props, "deepth") as Ref<number>;

    const nodeElement = ref<InstanceType<typeof HTMLElement> | null>(null);
    const nodesPositions =
      inject<Ref<NodePositionFilledByDeepth>>("nodesPositions");
    const order = ref(0);
    const nodePosition = ref(0);
    const nodeId = computed(() => `${deepth.value}-${order.value}`);

    const childrenPosition = computed(() => ({
      left: (props.leftChild as any)?.nodePosition,
      right: (props.rightChild as any)?.nodePosition,
    }));

    const arrowInclination = computed(() => {
      const parentPosition = (props.parentNode as any)?.nodePosition;
      const relativeParent = nodePosition.value - parentPosition;
      const tan = -500 / relativeParent;
      const degree = Math.atan(tan) * (180 / Math.PI);

      return degree;
    });

    const arrowHeight = computed(() => []);

    watch(
      childrenPosition,
      ({ left, right }) => {
        const posX = getCenteredPosition(left, right);
        setElementPosition(posX);
      },
      { deep: true }
    );

    const setElementPosition = (
      position: number,
      sideName: "left" | "top" = "left"
    ) => {
      if (sideName === "left") {
        nodesPositions?.value.addPosition(deepth.value, order.value, position);

        const pos = nodesPositions?.value
          .getPositionsByDeepth(deepth.value)
          .positions.find(({ order: o }) => o === order.value)
          ?.position as number;

        nodePosition.value = pos;

        (
          nodeElement.value as InstanceType<typeof HTMLElement>
        ).style.left = `${pos}px`;
      } else {
        (
          nodeElement.value as InstanceType<typeof HTMLElement>
        ).style.top = `${position}px`;
      }
    };

    const nodeHeight = computed(() => getHeight(el.value));

    const getHeight = (node: any): number => {
      if (!node) return -1;
      return (
        Math.max(
          getHeight(node.leftChild?.nodeComponent),
          getHeight(node.rightChild?.nodeComponent)
        ) + 1
      );
    };

    return {
      nodeId,
      Side,
      nodeElement,
      nodePosition,
      setElementPosition,
      order,
      nodeHeight,
      arrowInclination,
    };
  },
  components: {
    Arrow,
  },
});
</script>

<style scoped lang="scss">
.node-wrapper {
  position: absolute;
  .key-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    background-color: yellowgreen;
    border-radius: 50%;
    top: 0px;
  }
}
</style>
