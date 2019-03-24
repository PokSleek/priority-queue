class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (!this.left) {
      this.left = node;
      node.parent = this;
    } else {
      if (!this.right) {
        this.right = node;
        node.parent = this;
      }
    }
  }

  removeChild(node) {
    if (this.right === node) {
      node.parent = null;
      this.right = null;
    } else {
      if (this.left === node) {
        node.parent = null;
        this.left = null;
      } else {
        throw new Error("Node has not this child");
      }
    }
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  swapWithParent() {
    if (this.parent) {

      let previosGrandParent = this.parent.parent;
      let previosParent = this.parent;
      
//* Separate nodes
      if (previosGrandParent) {
        previosParent.remove();
      }
  
      let previosParentLeftChild = previosParent.left;
      if (previosParentLeftChild) {
        previosParentLeftChild.remove();
      }
      let previosParentRightChild = previosParent.right;
      if (previosParentRightChild) {
        previosParentRightChild.remove();
      }
  
      let previosMyLeftChild = this.left;
      if (previosMyLeftChild) {
        previosMyLeftChild.remove();
      }
      let previosMyRightChild = this.right;
      if (previosMyRightChild) {
        previosMyRightChild.remove();
      }  
//*

      if (previosParent && previosGrandParent) {
        previosGrandParent.appendChild(this);
      }
  
      if (previosParentLeftChild === this) {
        this.appendChild(previosParent);
  
        if (previosParentRightChild) {
          this.appendChild(previosParentRightChild);
  
          if (previosMyLeftChild) {
            previosParent.appendChild(previosMyLeftChild);
            if (previosMyRightChild) {
              previosParent.appendChild(previosMyRightChild);
            }
          }
        }
      } else {
        this.appendChild(previosParentLeftChild);
        this.appendChild(previosParent);
  
        if (previosMyLeftChild) {
          previosParent.appendChild(previosMyLeftChild);
          if (previosMyRightChild) {
            previosParent.appendChild(previosMyRightChild);
          }
        }
      }
    }
  }
}
module.exports = Node;