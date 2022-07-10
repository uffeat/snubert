
let MixinStuff = (superclass) => {
  const MixedClass = class extends superclass {
  foo() {
    console.log('foo from MyMixin');
  }
}
return MixedClass;
}

export { MixinStuff };
