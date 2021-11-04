<template>
  <div class="page-wrapper">
    <div class="tree-wrapper">
      <Nodes :currentNode="treeData" ref="nodeTreeRef" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  provide,
  onMounted,
  nextTick,
} from "vue";
import Nodes from "./components/Nodes.vue";
import { NodePositionFilledByDeepth, OrderHandler } from "./auxiliar/elements";
import { treeData as data } from "./auxiliar/data";
import {
  getCenterPosition,
  getHeight,
  getRelativePosition,
  iterateTreeComponentPre,
} from "./auxiliar/fn";

export default defineComponent({
  name: "Home",
  setup() {
    const treeData = computed(() => data);
    const nodesPositions = ref<NodePositionFilledByDeepth>(
      new NodePositionFilledByDeepth()
    );
    provide("nodesPositions", nodesPositions);

    const nodeTreeRef = ref<InstanceType<typeof Nodes> | null>(null);

    const orderHandler = ref(new OrderHandler());
    provide("orderHandler", orderHandler);

    const setOrderNum = (node: InstanceType<typeof Nodes["NodeComponent"]>) => {
      const { deepth } = node;
      const nodeOrderNum = orderHandler.value.add(deepth);
      node.order = nodeOrderNum;
    };

    const setNodePosition = (
      node: InstanceType<typeof Nodes["NodeComponent"]>
    ) => {
      const posX = node.parentId
        ? getRelativePosition(node)
        : getCenterPosition(node);
      node.setElementPosition(posX);

      const posY = getHeight(node.deepth);
      node.setElementPosition(posY, "top");
    };

    onMounted(async () => {
      if (nodeTreeRef.value) {
        iterateTreeComponentPre(
          nodeTreeRef.value as InstanceType<typeof Nodes>,
          setOrderNum
        );
        await nextTick();
        iterateTreeComponentPre(
          nodeTreeRef.value as InstanceType<typeof Nodes>,
          setNodePosition
        );
      }
    });

    return { treeData, nodeTreeRef };
  },
  components: {
    Nodes,
  },
});
</script>

<style scoped lang="scss">
.page-wrapper {
  .tree-wrapper {
    position: relative;
  }
}
</style>
