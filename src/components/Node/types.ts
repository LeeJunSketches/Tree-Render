export enum Side {
  LEFT = 1,
  RIGHT = 2,
}

export type BinaryTreeNode<T> = {
  key: T | null;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;
};


