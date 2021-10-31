type NodePositioned = {
  order: number;
  position: number;
};

export class NodesPositions {
  constructor(public positions: NodePositioned[] = []) {}

  add(order: number, position: number): void {
    const node = this.positions.find((node) => node.order === order);

    if (node) node.position = position;
    else this.positions.push({ order, position });
  }

  hasInPosition(position: number): boolean {
    const node = this.positions.find((node) => node.position === position);

    return Boolean(node);
  }
}
type Positions = { [deepth: number]: NodesPositions };

export class NodePositionFilledByDeepth {
  constructor(public positions: Positions = {}) {}

  addPosition(deepth: number, order: number, position: number): void {
    if (!this.positions[deepth]) {
      this.positions[deepth] = new NodesPositions();
    } else {
      this.positions[deepth].add(order, position);
    }
  }

  getPositionsByDeepth(deepth: number): NodesPositions {
    return this.positions[deepth];
  }

  hasInPosition(deepth: number, position: number): boolean {
    return this.positions[deepth].hasInPosition(position);
  }
}
