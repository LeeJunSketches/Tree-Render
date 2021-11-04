export enum Side {
  LEFT = 1,
  RIGHT = 2,
}

export type TreeNode<T> = {
  key: T | null;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
};
