'use strict'

class HashMap {
  constructor() {
    
  }

  hash(key) {
    let hashCode = 0;
    const PRIME_MUMBER = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = PRIME_MUMBER * hashCode + key.charCodeAt(i);
    }
    
    return hashCode;
  }

  set(key, hash) {
    
  }

  get(key) {
    
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
