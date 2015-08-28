// TODO import from built library
import * as schema from 'data-schema/src/schema';

const emptyConfig = {
  choice: {}
};

export function getAnswerSchema(config) {
  let choiceSchema = config.choice.isMultiple ? schema.multichoice : schema.choice;
  return schema.shape({
    choice: choiceSchema(
      config.choice.options,
      {
        isRequired: config.isRequired
      }
    ),
    otherText: schema.string()
  });
}

export function getEmptyAnswer(config) {
  let empty = {otherText: ''}
  if (config.isMultiple) {
    empty.choice = [];
  }
  empty.choice = '';
  return empty;
}

export { emptyConfig };

export { Renderer } from './components/Renderer';

export { Response } from './components/Response';

export { configurationSchema } from './configurationSchema';
