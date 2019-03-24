const Node = require("./node");

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.sizeOfHeap = 0;
  }

  push(data, priority) {
    let node = new Node(data, priority);
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  pop() {
    if (this.root) {
      let rootData = this.root.data;

      this.restoreRootFromLastInsertedNode(this.detachRoot());
      this.shiftNodeDown(this.root);
      this.sizeOfHeap--;

      return rootData;
    }
  }

  detachRoot() {
    let detachedRoot = this.root;
    this.root = null;

    if (this.parentNodes[0] === detachedRoot) {
      this.parentNodes.shift();
    }
    return detachedRoot;
  }

  restoreRootFromLastInsertedNode(detached) {
    if (this.parentNodes.length != 0) {
      let previosLastNode = this.parentNodes[this.parentNodes.length - 1];

      if (this.parentNodes.length === 2) {
        this.parentNodes.unshift(this.parentNodes.pop());
      } else {
        if (this.parentNodes.length > 2) {
          if (previosLastNode.parent.right === previosLastNode) {
            this.parentNodes.unshift(previosLastNode.parent);
          }
          this.parentNodes.pop();
        }
      }
      previosLastNode.remove();
      this.root = previosLastNode;

      if (detached.left) {
        this.root.left = detached.left;
        detached.left.parent = this.root;
      }
      if (detached.right) {
        this.root.right = detached.right;
        detached.right.parent = this.root;
      }
    }
  }

  size() {
    return this.sizeOfHeap;
  }

  isEmpty() {
    return !this.size();
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
    this.sizeOfHeap = 0;
  }

  insertNode(node) {
    if (!this.root) {
      this.root = node;
    } else {
      if (!this.parentNodes[0].left) {
        this.parentNodes[0].appendChild(node);
      } else {
        this.parentNodes[0].appendChild(node);
        this.parentNodes.shift();
      }
    }
    this.parentNodes.push(node);
    this.sizeOfHeap++;
  }

  shiftNodeUp(node) {
    if (node.parent) {
      if (node.priority > node.parent.priority) {
        let previosIndex = this.parentNodes.indexOf(node);

        //* This is only one way, when this.parentNodes includes node.parent
        if (this.parentNodes[0] === node.parent) {
          this.parentNodes[0] = node;
        }
        //*
        this.parentNodes[previosIndex] = node.parent;

        node.swapWithParent();
        this.shiftNodeUp(node);
      }
    } else {
      this.root = node;
    }
  }

  shiftNodeDown(node) {
    if (node && node.left) {
      if (
        node.right &&
        node.right.priority > node.priority &&
        node.right.priority > node.left.priority
      ) {
        if (this.parentNodes.indexOf(node.right) > -1) {
          this.parentNodes[this.parentNodes.indexOf(node.right)] = node;
        }
  
        if (this.root === node) {
          this.root = node.right;
        }
        node.right.swapWithParent();
        this.shiftNodeDown(node);
      } else {
        if (
          (node.right &&
            node.left.priority > node.priority &&
            node.left.priority > node.right.priority) ||
          (!node.right && node.left.priority > node.priority)
        ) {
          if (this.parentNodes.indexOf(node) > -1) {
            this.parentNodes[this.parentNodes.length - 1] = node;
            this.parentNodes[0] = node.left;
          } else {
            if (this.parentNodes.indexOf(node.left) > -1) {
              this.parentNodes[this.parentNodes.indexOf(node.left)] = node;
            }
          }
  
          if (this.root === node) {
            this.root = node.left;
          }
  
          node.left.swapWithParent();
          this.shiftNodeDown(node);
        }
      }
    }
  }
  
}

module.exports = MaxHeap;
