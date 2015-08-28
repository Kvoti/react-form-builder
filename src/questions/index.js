// TODO need to add a registry here to allow new question types as plugins
import * as text from './text';
import * as choice from './choice';
import * as scoregroup from './scoregroup';

export default function getQuestion(config) {
  if (config.text) {
    return text;
  }
  if (config.choice) {
    return choice;
  }
  if (config.scoregroup) {
    return scoregroup;
  }
}
