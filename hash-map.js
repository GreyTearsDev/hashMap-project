'use strict'

class HashMap {
  constructor() {
    this.buckets = [];    
    this.length = 0;
  }

  hash(key) {
    let hashCode = 0;
    const PRIME_NUMBER = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = PRIME_NUMBER * hashCode + key.charCodeAt(i);
    }
    
    return hashCode % this.buckets.length;
  }

  set(key, value) {
    const index = this.hash(key);
    let node = this.buckets[index];
    let pair = { key: value}

    if (node === undefined) {
      node = new LinkedList();
      node.append(pair);
      this.buckets[index] = node;
      this.length++;
      return;
    }
    
    node.append(pair)
    this.length++;
    return;
  }

  get(key) {
    const index = this.hash(key);
      
  }

  has(key) {
    
  }

  remove(key) {
    
  }

  length() {
    
  }

  clear() {
    
  }

  keys() {
    
  }

  values() {
    
  }

  entries() {
    
  }
}




/*====================LINKED LIST IMPLEMENTATION===============*/
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;   
    this.currentNode = null;  
  }

  append(value) {
    let newNode = new Node(value);
    
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.currentNode = newNode;
    } else {
      this.currentNode.next = newNode;
      this.currentNode = newNode;
    }
    
    this.size++;
  }

  prepend(value) {
    let newNode = new Node(value);

    this.head = newNode; 
    
    if (this.size !== 0) {
      newNode.next = this.currentNode;
    } else {
      this.tail = newNode;
    }
    
    this.currentNode = newNode;
    this.size++;
  };

  size() {
    return this.size;
  }

  head() {
    return this.head;  
  }

  tail() {
    return this.tail; 
  }

  at(index) {
    if (index < 0 || index >= this.size) return undefined;

    let currentNode = this.head;
    
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;  
    }

    return currentNode;
  }
  
  

  pop() {
    if (this.size === 0) return false;

    let currentNode = this.head;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size--;
      return true;
    }
    
    while (currentNode.next.next !== null) {
      currentNode = currentNode.next;
    }
      
    currentNode.next = null;
    this.tail = currentNode;
    this.size--;
    return true;
  }

  contains(value) {
    return this.find(value) === null ? false : true;
  }

  find(value) {
    let index = 0;
    let currentNode = this.currentNode;
    
    while (currentNode !== null) {
      if (currentNode.value === value) return index;

      currentNode = currentNode.next;
      index++;
    }

    return null;
  }

  toString() {
    if (this.size === 0) return '';
    
    let string = '';
    let currentNode = this.head;
    
    while (currentNode !== null) {
      string = string.concat(currentNode.value);
      if (currentNode.next !== null) {
        string = string.concat(' -> ');
      }
      currentNode = currentNode.next;
    }
    
    return string
  }

  insertAt(value, index) {
    if (index <= 0) {
      this.prepend(value);
      this.size++;
      return true;
    }
    
    if (index === this.size || index > this.size) {
      this.append(value);
      this.size++;
      return true;
    } 

    let newNode = new Node(value);
    let theNodeBefore = this.at(index);
    let theNodeAfter = this.at(index + 1);

    theNodeBefore.next = newNode;
    newNode.next = theNodeAfter;

    this.size++;
    return true;
  }
  

  removeAt(index) {
    if (index < 0 || index >= this.size) return false;
    if (index === 0) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let targetNode = this.at(index);
    let theNodeBefore = this.at(index - 1);
    
    if (targetNode === this.tail) {
      theNodeBefore.next = null;
      this.tail = targetNode;
      this.size--;
      return true;
    }

    theNodeBefore.next = targetNode.next;
    this.size--;
    return true;
  }
  
}

class Node {
  constructor(value) {
    this.value = null;
    this.next = null;
  }
}
