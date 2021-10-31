<template>
  <div class="page-wrapper">
    <div class="tree-wrapper">
      <NodeComp :currentNode="treeData" ref="nodeTreeRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, provide, ref } from "vue";
import { Node as NodeComp } from "@/components/Node";
import { BinaryTreeNode } from "@/components/Node/types";
import { NodePositionFilledByDeepth } from "./elements";
import { treeData as data } from "./data";
import {
  getPositionToAdd,
  getAvaiblePosition,
  setElementPosition,
  walkThroughTree,
} from "./aux";

export default defineComponent({
  name: "Home",
  setup() {
    const treeData = ref<BinaryTreeNode<any>>(data);
    const nodesPositions = ref<NodePositionFilledByDeepth>(
      new NodePositionFilledByDeepth()
    );

    const setNodesPosition = (node: typeof NodeComp): void => {
      const nodeDom = node.nodeElement as HTMLElement;
      const { deepth: deepthString, parent: parentId } = nodeDom.dataset;

      const deepth = Number(deepthString);
      const parent = parentId ? document.getElementById(parentId) : null;

      if (parent) {
        const aimPosition = getPositionToAdd(nodeDom, parent);
        const filledPositions =
          nodesPositions.value.getPositionsByDeepth(deepth);

        if (filledPositions) {
          const avaiblePosition = getAvaiblePosition(
            nodeDom,
            filledPositions,
            aimPosition
          );
          node.setElementPosition(avaiblePosition, "left");
        } else node.setElementPosition(aimPosition, "left");
      }
    };

    const centerParentElement = (node: typeof NodeComp) => {
      const currentPosition = node.nodePosition;
      const leftChildPosition = node.leftNode?.nodePosition;
      const rightChildPosition = node.rightNode?.nodePosition;
      const centeredPosition = leftChildPosition
        ? leftChildPosition + 50
        : rightChildPosition
        ? rightChildPosition - 50
        : currentPosition;
      const filledPosition = nodesPositions.value.getPositionsByDeepth(
        node.nodeInfo.deepth
      );

      // node.setElementPosition(centeredPosition, "left");

      console.log("******************", node.nodeElement, {
        currentPosition,
        leftChildPosition,
        rightChildPosition,
        centeredPosition,
        filledPosition,
      });
    };

    const nodeTreeRef = ref<InstanceType<typeof NodeComp> | null>(null);

    onMounted(async () => {
      walkThroughTree(nodeTreeRef.value, setNodesPosition);
      // walkThroughTree(nodeTreeRef.value, centerParentElement);
    });

    provide("nodesPositions", nodesPositions);

    return { treeData, nodeTreeRef };
  },
  components: {
    NodeComp,
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
