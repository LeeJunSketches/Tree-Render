<template>
  <div
    class="node-wrapper"
    :id="nodeId"
    ref="nodeElement"
    :data-parent="parentId"
    :data-side="side"
    :data-deepth="nodeInfo.deepth"
    :data-order="nodeInfo.order"
  >
    <div class="key-wrapper">{{ currentNode.key }}</div>
    <Arrow v-if="parentId" />
  </div>
  <Node
    v-if="currentNode.left"
    :parentId="nodeId"
    :side="Side.LEFT"
    :currentNode="currentNode.left"
    ref="leftNode"
  />
  <Node
    v-if="currentNode.right"
    :parentId="nodeId"
    :side="Side.RIGHT"
    :currentNode="currentNode.right"
    ref="rightNode"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  PropType,
  Ref,
  ref,
  toRefs,
} from "vue";
import { Side, BinaryTreeNode } from "./types";
import Arrow from "./Arrow.vue";
import { NodePositionFilledByDeepth } from "@/views/BinarySearchTree/elements";

export default defineComponent({
  name: "Node",
  props: {
    parentId: String,
    currentNode: Object as PropType<BinaryTreeNode<unknown | number | string>>,
    side: Number as PropType<Side>,
  },
  setup(props) {
    const nodeElement = ref<InstanceType<typeof HTMLElement> | null>(null);
    const leftNode = ref<any>(null);
    const rightNode = ref<any>(null);
    const nodesPositions =
      inject<Ref<NodePositionFilledByDeepth>>("nodesPositions");

    const { parentId, side } = toRefs(props);
    const nodeInfo = computed(() => {
      if (!parentId.value) return { deepth: 0, order: 1 };
      const [parentIdNum] = parentId.value.split("node_").filter((i) => i);
      const [deepth, parentOrder] = parentIdNum.split("-");
      const toAdd = side.value === Side.LEFT ? -1 : 0;

      const order = Number(parentOrder) * 2 + toAdd;

      return { deepth: Number(deepth) + 1, order };
    });
    const nodeId = computed<string>(() => {
      if (!parentId.value) return "node_0-1";
      return `node_${nodeInfo.value.deepth}-${nodeInfo.value.order}`;
    });
    const nodePosition = ref(0);

    // const moveNextNode = (position: number, order: number) => {

    // }

    const setElementPosition = (position: number, sideName: "left" | "top") => {
      (nodeElement.value as InstanceType<typeof HTMLElement>).style[
        sideName
      ] = `${position}px`;
      if (sideName === "left") {
        nodePosition.value = position;
        nodesPositions?.value.addPosition(
          nodeInfo.value.deepth,
          nodeInfo.value.order,
          position
        );
      }
    };

    const setNodePosition = () => {
      const centralizeNode = (node: HTMLElement) => {
        const nodePosition = node.getBoundingClientRect();
        const posX = document.body.clientWidth / 2 - nodePosition.width / 2;
        setElementPosition(posX, "left");
      };

      const setDeepthHeight = () => {
        const posY = Number(nodeInfo.value.deepth) * 50;
        setElementPosition(posY, "top");
      };

      if (nodeElement.value) {
        if (!parentId.value && nodeId.value) centralizeNode(nodeElement.value);
        else setDeepthHeight();
      }
    };

    onMounted(() => {
      setNodePosition();
      console.log(
        "*****************************@@@@@@@@@@@@@@@@@@@",
        nodeInfo.value,
        leftNode.value?.leftNode?.$parent?.nodeInfo
      );
    });

    return {
      nodeId,
      Side,
      nodeElement,
      nodeInfo,
      leftNode,
      rightNode,
      nodePosition,
      setElementPosition,
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
