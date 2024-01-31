"use strict";

const LinkedList = require("./linked-list");

/**
 * HashMap class represents a hash map data structure that stores key-value pairs.
 * It provides methods for adding, removing, and retrieving key-value pairs,
 * as well as other utility methods such as clearing the map, getting keys, values, and entries.
 */
class HashMap {
  /**
   * Creates a new instance of HashMap.
   * @constructor
   */
  constructor() {
    this.numBuckets = 16;

    this.buckets = new Array(this.numBuckets)
      .fill(null)
      .map(() => new LinkedList());
    this.bucketsLength = 0;
    this.DEFAULT_LOAD_FACTOR = 0.75;
  }

  /**
   * Generates a hash code for the given key.
   * @param {string} key - The key to generate the hash code for.
   * @returns {number} The hash code for the key.
   */
  hash(key) {
    let hashCode = 0;
    const PRIME_NUMBER = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = PRIME_NUMBER * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  /**
   * Rehashes the hash map when the load factor exceeds the default load factor.
   */
  rehash() {
    let temp = this.buckets;
    this.numBuckets *= 2; // double the size of the current array;
    this.buckets = new Array(this.numBuckets)
      .fill(null)
      .map(() => new LinkedList());
    this.bucketsLength = 0;

    for (let i = 0; i < this.temp.length; i++) {
      let head = temp[i].head;

      while (head) {
        this.set(head.value.key, head.value.value);
        head = head.next;
      }
    }
  }

  /**
   * Calculates the bucket index for the given key.
   * @param {string} key - The key to calculate the bucket index for.
   * @returns {number} The bucket index.
   */
  getBucketInd(key) {
    return this.hash(key.toString()) % this.numBuckets;
  }

  /**
   * Adds or updates a key-value pair in the hash map.
   * @param {string} key - The key of the pair to add or update.
   * @param {*} value - The value of the pair to add or update.
   */
  set(key, value) {
    const index = this.getBucketInd(key);
    let linkedList = this.buckets[index];

    if (this.getLoadFactor() > this.DEFAULT_LOAD_FACTOR) {
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

    linkedList.append({ key, value });
    this.bucketsLength++;
  }

  /**
   * Calculates the load factor of the hash map.
   * @returns {number} The load factor.
   */
  getLoadFactor() {
    return this.bucketsLength / this.numBuckets;
  }

  /**
   * Retrieves the value associated with the given key.
   * @param {string} key - The key to retrieve the value for.
   * @returns {*} The value associated with the key, or null if not found.
   */
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

  /**
   * Checks if the hash map contains the given key.
   * @param {string} key - The key to check for existence.
   * @returns {boolean} True if the key exists, otherwise false.
   */
  has(key) {
    const index = this.getBucketInd(key);
    const linkedList = this.buckets[index];

    if (linkedList.size === 0) return false;
    return linkedList.contains(key);
  }

  /**
   * Removes the key-value pair associated with the given key from the hash map.
   * @param {string} key - The key of the pair to remove.
   * @returns {boolean} True if the pair was removed successfully, otherwise false.
   */
  remove(key) {
    if (!this.has(key)) return false;

    const index = this.getBucketInd(key);
    const linkedList = this.buckets[index];
    let nodeToRemoveInd = linkedList.find(this.get(key));

    linkedList.removeAt(nodeToRemoveInd);
    this.bucketsLength--;
  }

  /**
   * Retrieves the number of key-value pairs in the hash map.
   * @returns {number} The number of key-value pairs.
   */
  length() {
    return this.bucketsLength;
  }

  /**
   * Clears all key-value pairs from the hash map.
   */
  clear() {
    this.numBuckets = 16;
    this.buckets = new Array(this.numBuckets)
      .fill(null)
      .map(() => new LinkedList());
    this.bucketsLength = 0;
  }

  /**
   * Retrieves an array containing all keys in the hash map.
   * @returns {Array} An array containing all keys.
   */
  keys() {
    const keys = [];
    const buckets = this.buckets;

    for (let i = 0; i < buckets.length; i++) {
      let linkedList = buckets[i];

      if (linkedList.size() === 0) continue;

      let currentNode = linkedList.head;
      while (currentNode) {
        keys.push(currentNode.value.key);
        currentNode = currentNode.next;
      }
    }

    return keys;
  }

  /**
   * Retrieves an array containing all values in the hash map.
   * @returns {Array} An array containing all values.
   */
  values() {
    const values = [];
    const buckets = this.buckets;

    for (let i = 0; i < buckets.length; i++) {
      let linkedList = buckets[i];

      if (linkedList.size() === 0) continue;

      let currentNode = linkedList.head;
      while (currentNode) {
        values.push(currentNode.value.value);
        currentNode = currentNode.next;
      }
    }

    return values;
  }

  /**
   * Retrieves an array containing all key-value pairs in the hash map.
   * @returns {Array} An array containing all key-value pairs.
   */
  entries() {
    const entries = [];
    const buckets = this.buckets;

    for (let i = 0; i < buckets.length; i++) {
      let linkedList = buckets[i];

      if (linkedList.size() === 0) continue;

      let currentNode = linkedList.head;
      while (currentNode) {
        entries.push([currentNode.value.key, currentNode.value.value]);
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
