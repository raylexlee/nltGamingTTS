const system = {
  get gametag() {  
      const title = ["Epidemic", "Nadia", "Order"]
      const tag = title.find(t => document.title.include(t));
      return tag.toLowerCase()
  },
  get regex() {
     return this.nametag()
        ? /^[A-Z][a-z],[a-z][a-z],[a-z]/
        : /^[A-Z][a-z][A-Z][a-z]/ 
  },
}
