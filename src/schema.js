import * as schema from 'data-schema/src/schema';

import getQuestion from './questions';

export const form = schema.shape({
  title: schema.string(),
  slug: schema.string(),
  questions: schema.array(
    undefined, // TODO have an Any type or new top-level thing instead of array?
    {
      // implicit
//      canAdd: true,
//      canRemove: true,
//      canReorder: true,
      // This is an untyped array so we provide a callback to return
      // the correct manager for an item
      getMemberSchema(value) {
        let question = getQuestion(value);
        // TODO this is a quirk of the API. Each question should just have a type
        // and not these null valued fields
        ['text', 'choice', 'scoregroup'].forEach(p => {
          if (value[p] === null) {
            delete value[p];
          }
        });
        return question.configurationSchema;
        //////////////////////////////////////////////////////////////////////
      }
    }
  )
});
