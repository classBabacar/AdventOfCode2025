class UnionFind {
  parent = [];
  size = [];

  constructor(n) {
    for (let i = 0; i < n; ++i) {
      this.parent.push(i);
      this.size.push(1);
    }
  }

  findParent(i) {
    if (i != this.parent[i]) {
      return (this.parent[i] = this.findParent(this.parent[i]));
    }

    return this.parent[i];
  }

  uniteSet(i, j) {
    let rep1 = this.findParent(i);
    let rep2 = this.findParent(j);

    if (rep1 == rep2) return;

    if (this.size[rep1] > this.size[rep2]) {
      this.parent[rep2] = rep1;
      this.size[rep1] += this.size[rep2];
    } else {
      this.parent[rep1] = rep2;
      this.size[rep2] += this.size[rep1];
    }
  }

  getAllSizes() {
    return this.size;
  }

  printArrays() {
    console.log(this.parent);
    console.log(this.size);
  }
}

module.exports = { UnionFind };
