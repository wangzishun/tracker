
export class Name {
  constructor(parameters) {

  }

  set = new Set()
  send() {
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


