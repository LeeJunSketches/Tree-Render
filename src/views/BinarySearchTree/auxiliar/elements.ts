type NodePositioned = {
  order: number;
  position: number;
};

export class NodesPositions {
  constructor(public positions: NodePositioned[] = []) {}

  add(order: number, position: number): void {
    const node = this.positions.find((node) => node.order === order);
    const isAvaible = !this.positions.find(
      (node) => node.position === position
    );
    const finalPosition = isAvaible
      ? position
      : node?.position === position
      ? position
      : position + 100;

    if (node) node.position = finalPosition;
    else this.positions.push({ order, position: finalPosition });
  }

  hasInPosition(position: number): boolean {
    const node = this.positions.find(
      (node) => position > node.position - 25 && position < node.position + 25
    );

    return Boolean(node);
  }
}
type Positions = { [deepth: number]: NodesPositions };

export class NodePositionFilledByDeepth {
  constructor(public positions: Positions = {}) {}

  addPosition(deepth: number, order: number, position: number): void {
    if (!this.positions[deepth]) {
      this.positions[deepth] = new NodesPositions();
    }
    this.positions[deepth].add(order, position);
  }

  getPositionsByDeepth(deepth: number): NodesPositions {
    return this.positions[deepth];
  }

  hasInPosition(deepth: number, position: number): boolean {
    return this.positions[deepth]?.hasInPosition(position) || false;
  }
}

type OrderByDeepth = {
  [level: number]: number[];
};

export class OrderHandler {
  constructor(public order: OrderByDeepth = {}) {}

  add(level: number): number {
    if (!this.order[level]) this.order[level] = [];
    const [lastId] = this.order[level].slice(-1);
    const currentId = !lastId && lastId !== 0 ? 0 : lastId + 1;

    this.order[level].push(currentId);

    return currentId;
  }

  getByDeepth(level: number): number[] {
    return this.order[level];
  }
}
