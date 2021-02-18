
export class Name {
  constructor(parameters) {

  }

  set = new Set()
  send() {
    const a = []
    const flag = a.includes(1)
    console.log(flag);

    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(1)
      }, 1000);
    })
  }
}

async function name(params) {
  console.log(111);

}
console.log(name);



