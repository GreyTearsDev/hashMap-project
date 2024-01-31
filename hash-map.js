'use strict'


/*====================LINKED LIST IMPLEMENTATION===============*/
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.listSize = 0;   
    this.currentNode = null;  
  }

  append(value) {
    let newNode = new Node(value);
    
    if (this.listSize === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.currentNode = newNode;
    } else {
      this.currentNode.next = newNode;
      this.currentNode = newNode;
    }
    
    this.listSize++;
  }

  prepend(value) {
    let newNode = new Node(value);

    this.head = newNode; 
    
    if (this.listSize !== 0) {
      newNode.next = this.currentNode;
    } else {
      this.tail = newNode;
    }
    
    this.currentNode = newNode;
    this.listSize++;
  };

  size() {
    return this.listSize;
  }

  head() {
    return this.head;  
  }

  tail() {
    return this.tail; 
  }

  at(index) {
    if (index < 0 || index >= this.listSize) return null;

    let currentNode = this.head;
    
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;  
    }

    return currentNode;
  }
  
  

  pop() {
    if (this.listSize === 0) return false;

    let currentNode = this.head;

    if (this.listSize === 1) {
      this.head = null;
      this.tail = null;
      this.listSize--;
      return true;
    }
    
    while (currentNode.next.next !== null) {
      currentNode = currentNode.next;
    }
      
    currentNode.next = null;
    this.tail = currentNode;
    this.listSize--;
    return true;
  }

  contains(value) {
    return this.find(value) === null ? false : true;
  }

  find(value) {
    let index = 0;
    let currentNode = this.head;
    
    while (currentNode) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.next;
      index++;
    }

    return null;
  }

  toString() {
    if (this.listSize === 0) return '';
    
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
      this.listSize++;
      return true;
    }
    
    let newNode = new Node(value);
    let theNodeBefore = this.at(index);
    let theNodeAfter = this.at(index + 1);

    theNodeBefore.next = newNode;
    newNode.next = theNodeAfter;

    this.listSize++;
    return true;
  }
  

  removeAt(index) {
    if (index < 0 || index >= this.listSize) return false;
    if (index === 0) {
      this.head = this.head.next;
      this.listSize--;
      return true;
    }

    let targetNode = this.at(index);
    let theNodeBefore = this.at(index - 1);
    
    if (targetNode === this.tail) {
      theNodeBefore.next = null;
      this.tail = targetNode;
      this.listSize--;
      return true;
    }

    theNodeBefore.next = targetNode.next;
    this.listSize--;
    return true;
  }
  
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.numBuckets = 16;    
    this.buckets = new Array(this.numBuckets).fill(null).map(() => new LinkedList());
    this.bucketsLength = 0;
    this.DEFAULT_LOAD_FACTOR = 0.75;
    
  }

  hash(key) {
    let hashCode = 0;
    const PRIME_NUMBER = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = PRIME_NUMBER * hashCode + key.charCodeAt(i);
    }
    
    return hashCode;
  }

  rehash() {
    let temp = this.buckets;
    this.numBuckets *= 2; // double the size of the current array;
    this.buckets = new Array(this.numBuckets).fill(null).map(() => new LinkedList());
    this.bucketsLength = 0;
    
    for (let i = 0; i < this.temp.length; i++) {
      let head = temp[i].head;

      while (head) {
        this.set(head.value.key, head.value.value);
        head = head.next;
      }
    } 
  }

  getBucketInd(key) {
    return this.hash(key.toString()) % this.numBuckets;  
  }
  
  set(key, value) {
    const index = this.getBucketInd(key)
    let linkedList = this.buckets[index];

    if (this.loadFactor() > this.DEFAULT_LOAD_FACTOR) {
      this.rehash();      
    }
    
    // if the key already exists, override the old value
    let currentNode = linkedList.head;
    while (currentNode) {
      if (currentNode.value.key === key) {
        currentNode.value.value = value;
        return;
      }
      currentNode = currentNode.next;
    }
    
    linkedList.append({key, value})
    this.bucketsLength++;
  }

  loadFactor() {
    return this.bucketsLength / this.numBuckets;
  }

  get(key) {
    const index = this.getBucketInd(key);
    const linkedList = this.buckets[index];

    let currentNode = linkedList.head;
    while (currentNode) {
      if (currentNode.value.key === key) return currentNode.value.value;
      currentNode = currentNode.next;
    }  

    return null;
  }

  has(key) {
    const index = this.getBucketInd(key);
    const linkedList = this.buckets[index];
   
    if (linkedList.size === 0) return false;
    return linkedList.contains(key);    
  }

  remove(key) {
    if (!this.has(key)) return false;

    const index = this.getBucketInd(key);
    const linkedList = this.buckets[index];
    let nodeToRemoveInd = linkedList.find(this.get(key));

    linkedList.removeAt(nodeToRemoveInd);
    this.bucketsLength--;
  }

  length() {
    return this.bucketsLength;
  }

  clear() {
    this.numBuckets = 16;
    this.buckets = new Array(this.numBuckets).fill(null).map(() => new LinkedList());
    this.bucketsLength = 0;
  }

  keys() {
    const keys = [];
    const buckets = this.buckets;

    for (let i = 0; i < buckets.length; i++) {
      let linkedList = buckets[i];
      
      if (linkedList.size() === 0) continue;
      
      let currentNode = linkedList.head;
      while (currentNode) {
        keys.push(currentNode.value.key)
        currentNode = currentNode.next;
      }
    }  

    return keys;  
  }

  values() {
    const values = [];
    const buckets = this.buckets;

    for (let i = 0; i < buckets.length; i++) {
      let linkedList = buckets[i];
      
      if (linkedList.size() === 0) continue;
      
      let currentNode = linkedList.head;
      while (currentNode) {
        values.push(currentNode.value.value)
        currentNode = currentNode.next;
      }
    }  

    return values;  
  }

  entries() {
    const entries = [];
    const buckets = this.buckets;

    for (let i = 0; i < buckets.length; i++) {
      let linkedList = buckets[i];
      
      if (linkedList.size() === 0) continue;
      
      let currentNode = linkedList.head;
      while (currentNode) {
        entries.push([currentNode.value.key, currentNode.value.value])
        currentNode = currentNode.next;
      }
    }  

    return entries;  
  }
}

//=========TESTS=======//
const map = new HashMap();

// Add some key-value pairs to the map
map.set("apple", 10);
map.set("banana", 20);
map.set("orange", 30);
map.set("grape", 40);
map.set("melon", 50);

console.log("Value of 'apple':", map.get("apple")); // Should print: Value of 'apple': 10
console.log("Value of 'banana':", map.get("banana")); // Should print: Value of 'banana': 20
console.log("Value of 'watermelon':", map.get("watermelon")); // Should print: Value of 'watermelon': null
console.log("Does 'apple' exist?", map.has("apple")); // Should print: Does 'apple' exist? true
console.log("Does 'watermelon' exist?", map.has("watermelon")); // Should print: Does 'watermelon' exist? false
console.log("Removing 'banana'");

map.remove("banana");

console.log("Value of 'banana' after removal:", map.get("banana")); // Should print: Value of 'banana' after removal: null
console.log("Length of the map:", map.length()); // Should print: Length of the map: 4
console.log("Keys in the map:", map.keys()); // Should print: Keys in the map: [ 'apple', 'orange', 'grape', 'melon' ]
console.log("Values in the map:", map.values()); // Should print: Values in the map: [ 10, 30, 40, 50 ]
console.log("Entries in the map:", map.entries()); // Should print: Entries in the map: [ [ 'apple', 10 ], [ 'orange', 30 ], [ 'grape', 40 ], [ 'melon', 50 ] ]

