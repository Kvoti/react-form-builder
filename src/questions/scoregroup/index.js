// TODO import from built library
import * as schema from 'data-schema/src/schema';

const emptyConfig = {
  choice: {}
};

export function getAnswerSchema(config) {
  // TODO move schema.scoregroup to this module
  return schema.scoregroup(
    config.scoregroup.labels.map(label => label.label),
    config.scoregroup.items.length,
    {
      isRequired: config.isRequired
    }
  );
}

export function getEmptyAnswer() {
  return [];
}

export { emptyConfig };

export { Renderer } from './components/Renderer';

export { Response } from './components/Response';

export { Editor } from './components/editor/ScoreGroup.jsx';

export { configurationSchema } from './configurationSchema';
