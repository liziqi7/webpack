import './index.less';

class Animal {
    constructor(name) {
        this.name = name;
        console.log(name);
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');
