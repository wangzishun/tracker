
export class Name {
  constructor(parameters) {

  }

  send() {
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(1)
      }, 1000);
    })
  }
}

const set = new Set()

console.log(set);
