
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


async function name(params) {
  console.log(111);

}
console.log(name);
console.log(set);
