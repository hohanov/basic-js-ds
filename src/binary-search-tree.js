const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let current = this.rootNode;

    while (current.data !== data) {
      const side = data < current.data ? 'left' : 'right';

      if (!current[side]) {
        current[side] = newNode;
        return;
      }

      current = current[side];
    }
  }

  find(data) {
    let current = this.rootNode;

    while (current && current.data !== data) {
      current = data < current.data ? current.left : current.right;
    }

    return current;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    }

    if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    }

    if (!node.left) {
      return node.right;
    }

    if (!node.right) {
      return node.left;
    }

    let minRight = node.right;

    while (minRight.left) {
      minRight = minRight.left;
    }

    node.data = minRight.data;
    node.right = this.removeNode(node.right, minRight.data);
    return node;
  }

  min() {
    let current = this.rootNode;

    while (current && current.left) {
      current = current.left;
    }

    return current ? current.data : null;
  }

  max() {
    let current = this.rootNode;

    while (current && current.right) {
      current = current.right;
    }

    return current ? current.data : null;
  }
}

module.exports = {
  BinarySearchTree
};