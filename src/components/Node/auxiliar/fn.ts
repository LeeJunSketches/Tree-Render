import { OrderHandler } from "@/views/BinarySearchTree/auxiliar/elements";
import Node from "../Node.vue";

const findNode = (
  node: any,
  deepth: number,
  order: number
): InstanceType<typeof Node> | null => {
  if (!node) return null;

  const { deepth: nodeDeepth, order: nodeOrder } = node;

  if (nodeDeepth === deepth && nodeOrder === order) return node;

  const leftNode = findNode(node.leftChild, deepth, order);
  const rightNode = findNode(node.rightChild, deepth, order);

  return leftNode || rightNode;
};

export const getNextNode = (
  currentNode: InstanceType<typeof Node>,
  root: InstanceType<typeof Node>,
  orderHandler: OrderHandler
): InstanceType<typeof Node> | null => {
  const { deepth, order } = currentNode;
  const nextOrder = order + 1;
  const nodes = orderHandler.getByDeepth(deepth);

  if (nodes.includes(nextOrder)) {
    return findNode(root, deepth, nextOrder);
  }

  return null;
};

export const getCenteredPosition = (
  leftPosition: number | null,
  rightPosition: number | null
): number => {
  const left = leftPosition as number;
  const right = rightPosition as number;

  return leftPosition && !rightPosition
    ? left + 50
    : !leftPosition && rightPosition
    ? right - 50
    : (right - left) / 2 + left;
};
