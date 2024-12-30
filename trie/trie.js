//  trie
//  digital tree
//  prefix tree

// string searching
// value is boolean for strings because strings will be indexed by character value
// i.e.
// "ad"
// root node children [a][d]

class StringTrieNode {
    constructor(value) {
        this.children = new Map();
        this.isTerminal = false;
        if (value) this.value = "";
    }
}

// insert
// should iterate through input string length
// Map.size = 0 if empty

function insert(node, string) {
    for (let i = 0; i < string.length; i++) {
        if (node.children.has(string[i])) {
            node = node.children.get(string[i]);
        } else {
            const newNode = new StringTrieNode(string[i]);

            if (i == string.length - 1) newNode.isTerminal = true;

            node.children.set(string[i], newNode);

            node = node.children.get(string[i]);
        }
    }
}

// search
// it's kinda like inserting but it doesn't actually do anything Lol :)

function search(node, string) {
    for (let i = 0; i < string.length; i++) {
        if (node.children.has(string[i])) {
            node = node.children.get(string[i]);
            if ((i == string.length - 1)) {
                return node.isTerminal;
            }
        } else {
            return false;
        }
    }
}

// umm return an ordered list of similar strings
// basically search but ignore terminal and cache them

function similarSearch(node, string) {
    const depthCache = [];
    const wordCache = [];

    for (let i = 0; i < string.length; i++) {
        if (node.children.has(string[i])) {
            node = node.children.get(string[i]);

            depthCache.push(string[i]);
            wordCache.push(depthCache.join(''));
        }
    }

    return wordCache;
}

// similar search but worse

function similarSearchWorse(node, string) {
    let index = 0;
    const cache = [];

    for (let i = 0; i < string.length; i++) {
        if (node.children.has(string[i])) {
            node = node.children.get(string[i]);

            index += 1;
        }
    }

    string = string.slice(0, index);

    for (let i = 0; i < string.length; i++) {
        cache.push(string.slice(0, i+1));
    }

    return cache;
}

function main() {
    const x = new StringTrieNode();
    insert(x, "hii");
    insert(x, "hiya");
    console.log(search(x, "hii"));
    console.log("hiiii: ", similarSearch(x, "hiiii"));
    console.log("hiiii: ", similarSearchWorse(x, "hiiii"));

    console.log("regular search heya", search(x, "heya"));
}

main();