/* Returns a composite class with an inheritance hierarchy derived from Base and Mixin functions. */
const mixin = (BaseClass, ...Mixins) => {
  let CompositeClass;
  for (let index = 0; index < Mixins.length; index++) {
    if (index === 0) {
      CompositeClass = Mixins[0](BaseClass);
    }
    else {
      CompositeClass = Mixins[index](CompositeClass);
    }
  }
  return CompositeClass;
}

export { mixin };
