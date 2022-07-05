const mixin = (Base, ...Mixins) => {
  let CompositeClass;
  for (let index = 0; index < Mixins.length; index++) {
    if (index === 0) {
      CompositeClass = Mixins[0](Base)
    }
    else {
      CompositeClass = Mixins[index](CompositeClass)
    }
  }
  return CompositeClass
}

export { mixin };
