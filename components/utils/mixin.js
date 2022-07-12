/* Returns a composite class with an inheritance hierarchy derived from Base and Mixin functions. */
const mixin = (BaseClass, ...Mixins) => {
  const addedMixins = [];
  const requiredMixins = [];
  let CompositeClass;

  const updateAddedMixins = () => {
    if (!addedMixins.includes(CompositeClass.name)) {
      addedMixins.push(CompositeClass.name);
    }
  }

  const updateRequiredMixins = () => {
    CompositeClass.requiredMixins?.forEach(requiredMixin => {
      // TODO: Required by.
      if (!requiredMixins.includes(requiredMixin)) {
        requiredMixins.push(requiredMixin);
      }
    });
  }

  const checkRequiredMixins = () => {
    requiredMixins.forEach(requiredMixin => {
      // TODO: Required by.
      if (!addedMixins.includes(requiredMixin)) {
        throw new Error(`Missing required mixin: '${requiredMixin}'.`);
      }
    });
  }

  // Create first composite class (extended from BaseClass):
  CompositeClass = Mixins[0](BaseClass);
  updateAddedMixins();
  updateRequiredMixins();
  // Successively update composite class (extended from previous version of composite class):
  for (let index = 1; index < Mixins.length; index++) {
    CompositeClass = Mixins[index](CompositeClass);
    updateAddedMixins();
    updateRequiredMixins();
  }
  checkRequiredMixins();
  return CompositeClass;
}

export { mixin };
