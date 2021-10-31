import { Ref } from "vue";
import { Side } from "@/components/Node/types";
import { NodesPositions } from "./elements";
import { Node as NodeComp } from "@/components/Node";

export const walkThroughTree = (
  node: any,
  payload: (n: typeof node) => void
): void => {
  payload(node);
  if (node.leftNode) walkThroughTree(node.leftNode, payload);
  if (node.rightNode) walkThroughTree(node.rightNode, payload);
};

export const setElementPosition = (
  element: InstanceType<typeof HTMLElement>,
  position: number
): void => {
  element.style.left = `${position}px`;
};

export const getPositionToAdd = (
  element: InstanceType<typeof HTMLElement>,
  parent: InstanceType<typeof HTMLElement>
): number => {
  const parentPosition = parent.getBoundingClientRect().x;
  const relativePositionX =
    Number(element.dataset.side) === Side.LEFT ? -50 : 50;
  const aimPosition = parentPosition + relativePositionX;
  return aimPosition;
};

export const getAvaiblePosition = (
  element: InstanceType<typeof HTMLElement>,
  filledPositions: NodesPositions,
  aimPosition: number
): number => {
  const position = filledPositions.hasInPosition(aimPosition)
    ? aimPosition + 100
    : aimPosition;
  return position;
};
