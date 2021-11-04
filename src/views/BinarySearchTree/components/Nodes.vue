<template>
  <NodeComponent
    :parentId="parentId"
    :currentNode="currentNode"
    ref="nodeComponent"
    :deepth="deepth || 0"
    :side="side"
    :elementInstance="nodeComponent"
    :leftChild="leftNode && leftNode.nodeComponent"
    :rightChild="rightNode && rightNode.nodeComponent"
    :parentNode="parentNode"
  />
  <Nodes
    v-if="currentNode.left"
    :parentId="nodeId"
    :currentNode="currentNode.left"
    :side="Side.LEFT"
    ref="leftNode"
    :deepth="(deepth || 0) + 1"
    :parentNode="nodeComponent"
  />
  <Nodes
    v-if="currentNode.right"
    :parentId="nodeId"
    :currentNode="currentNode.right"
    :side="Side.RIGHT"
    ref="rightNode"
    :deepth="(deepth || 0) + 1"
    :parentNode="nodeComponent"
  />
</template>

<script lang="ts">
import NodeComponent from "@/components/Node/Node.vue";
import { TreeNode, Side } from "@/components/Node/auxiliar/types";
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  onMounted,
  PropType,
  Ref,
  ref,
} from "vue";

interface INodesComponent extends ComponentInternalInstance {
  currentNode: PropType<number | string>;
  parentId: PropType<string>;
  side: PropType<number>;
  deepth: number;
  nodeId: Ref<string>;
  nodeComponent: InstanceType<typeof NodeComponent>;
  leftNode: this;
  rightNode: this;
  parentNode: this;
}

export default defineComponent({
  name: "Nodes",
  props: {
    currentNode: Object as PropType<TreeNode<number | string>>,
    parentId: String,
    side: Number as PropType<Side>,
    deepth: Number,
    parentNode: Object as PropType<InstanceType<typeof NodeComponent>>,
  },
  setup() {
    const nodeComponent = ref<InstanceType<typeof NodeComponent> | null>(null);
    const leftNode = ref<INodesComponent | null>(null);
    const rightNode = ref<INodesComponent | null>(null);

    const nodeId = computed(() => nodeComponent.value?.nodeId);

    return { Side, nodeId, leftNode, rightNode, nodeComponent };
  },
  components: {
    NodeComponent,
  },
});
</script>

<style></style>
