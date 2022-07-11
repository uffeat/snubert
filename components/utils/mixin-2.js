/* Returns a composite class with an inheritance hierarchy derived from Base and Mixin functions. */
const mixin2 = (BaseClass, ...Mixins) => {
  let CompositeClass;
  for (let index = 0; index < Mixins.length; index++) {
    if (index === 0) {
      CompositeClass = Mixins[0](BaseClass);
    }
    else {
      CompositeClass = Mixins[index](CompositeClass);
    }
  }
  if (true) {
    //
  }
  return CompositeClass;
}

export { mixin2 };
