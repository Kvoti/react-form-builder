// TODO import from built library
import * as schema from 'data-schema/src/schema';

export const configurationSchema = schema.shape({
  question: schema.string({isRequired: true}),
  isRequired: schema.bool(),
  text: schema.shape({
    isMultiline: schema.bool(),
    maxChars: schema.integer({max: 100}),
    maxWords: schema.integer({
      validate: function validateMaxWords() {
        let errors = [];
        if (!this.parent.isMultiline.get() && this.get()) {
          errors.push("Can't specify max words if question is not multiline");
        }
        return errors;
      }
    })
  })
});
