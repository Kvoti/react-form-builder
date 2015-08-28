// TODO import from built library
import * as schema from 'data-schema/src/schema';

export const configurationSchema = schema.shape({
  question: schema.string({isRequired: true}),
  isRequired: schema.bool(),
  scoregroup: schema.shape({
    labels: schema.array(
      schema.shape({
        label: schema.string({isRequired: true, unique: true}),
        defaultScore: schema.integer({isRequired: true, unique: true})
      }),
      {
        canAdd: true,
        maxLength: 5,
        minLength: 2,
        canRemove: true,
        canReorder: true,
        empty: {
          label: '',
          defaultScore: null
        },
        postAdd: function() {
          // Append a null score for each item
          this.parent.items.members.forEach(([i, item]) => {
            item.scores.add(null);
          });
        },
        postRemove: function(index) {
          // Remove corresponding score from each item
          this.parent.items.members.forEach(([i, item]) => {
            item.scores[index].remove();
          });
        },
        postReorder: function(indices) {
          // Reorder corresponding scores for each item
          this.parent.items.members.forEach(([i, item]) => {
            item.scores.reorder(indices);
          });
        }
      }
    ),
    items: schema.array(
      schema.shape({
        text: schema.string({
          isRequired: true,
          unique: true
        }),
        scores: schema.array(
          schema.integer({unique: true}),
          {
            canReorder: true
          }
        )
      }),
      {
        canAdd: true,
        maxLength: 10,
        minLength: 1,
        canRemove: true,
        canReorder: true,
        empty: {text: '', scores: []},  // TODO init scores properly
        postAdd: function(item) {
          // Add a null score to this item for each label
          let scores = [for (l of this.parent.labels.members) null];
          item.scores.set(scores);
        }
      }
    )
  })
});
