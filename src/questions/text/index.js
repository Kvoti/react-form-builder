// TODO import from built library
import * as schema from 'data-schema/src/schema';

const emptyConfig = {
  text: {}
};

export function getAnswerSchema(config) {
  return schema.string({
    // TODO decide on length vs chars
    maxLength: config.text.maxChars === null ? undefined : config.text.maxChars,
    isRequired: config.isRequired
  });
}

export function getEmptyAnswer() {
  return '';
}

export { emptyConfig };

export { Renderer } from './components/Renderer';

export { Response } from './components/Response';

export { configurationSchema } from './configurationSchema';
