import { Side } from "@/components/Node/auxiliar/types";
import Nodes from "../components/Nodes.vue";
import NodeComponent from "@/components/Node/Node.vue";

export const iterateTreeComponentPre = (
  node: any,
  payload: (n: InstanceType<typeof NodeComponent>) => void
): void => {
  if (node.nodeComponent) payload(node.nodeComponent);
  if (node.leftNode)
    iterateTreeComponentPre(
      node.leftNode as InstanceType<typeof Nodes>,
      payload
    );
  if (node.rightNode)
    iterateTreeComponentPre(
      node.rightNode as InstanceType<typeof Nodes>,
      payload
    );
};

export const getCenterPosition = (
  node: InstanceType<typeof NodeComponent>
): number => {
  const width = node.nodeElement?.getBoundingClientRect()?.width as number;
  const posX = document.body.clientWidth / 2 - width / 2;
  return posX;
};

export const getRelativePosition = (
  node: InstanceType<typeof NodeComponent>
): number => {
  const { side } = node;
  const parent = node.parentNode as typeof NodeComponent;
  const parentPosition = parent.nodePosition;
  const relativeModificator = side === Side.LEFT ? -50 : 50;
  return parentPosition + relativeModificator;
};

export const getHeight = (deepth: number): number => {
  return deepth * 50;
};
