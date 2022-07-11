/* Returns a composite class with an inheritance hierarchy derived from Base and Mixin functions. */
const mixin = (BaseClass, ...Mixins) => {

  const addedMixins = [];


  let CompositeClass = Mixins[0](BaseClass);
  //console.log("Initial", CompositeClass.name)

  // TODO: Turn into a function:
  if (!addedMixins.includes(CompositeClass.name)) {
    addedMixins.push(CompositeClass.name);
  }
  CompositeClass.requiredMixins?.forEach(requiredMixin => {
    if (!addedMixins.includes(requiredMixin)) {
      throw new Error(`${CompositeClass.name} requires mixin '${requiredMixin}' (mixin order matters!).`)
    }
  });
  
  for (let index = 1; index < Mixins.length; index++) {
    CompositeClass = Mixins[index](CompositeClass);

    // TODO: Turn into a function:
    if (!addedMixins.includes(CompositeClass.name)) {
      addedMixins.push(CompositeClass.name);
    }
    CompositeClass.requiredMixins?.forEach(requiredMixin => {
      if (!addedMixins.includes(requiredMixin)) {
        throw new Error(`${CompositeClass.name} requires mixin '${requiredMixin}' (mixin order matters!).`)
      }
    });

  }
  return CompositeClass;
}

export { mixin };
