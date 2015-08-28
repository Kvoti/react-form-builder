// TODO import from built library
import * as schema from 'data-schema/src/schema';

export const configurationSchema = schema.shape({
  question: schema.string({isRequired: true}),
  isRequired: schema.bool(),
  choice: schema.shape({
    options: schema.array(
      schema.string({
        isRequired: true,
        // TODO not sure if empty belongs here or level above (or can be either)
        // empty: ''
        unique: true
      }),
      {
        canAdd: true,
        maxLength: 5,
        canRemove: true,
        minLength: 2,
        empty: '',
        canReorder: true
      }
    ),
    isMultiple: schema.bool(),
    hasOther: schema.bool(),
    otherText: schema.string()
  })
});
