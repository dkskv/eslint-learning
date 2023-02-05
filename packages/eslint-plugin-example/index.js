const test1Rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Restrict timeout duration out of passed `min` and `max",
    },
    /** Schema of accepted parameters */
    schema: [
      {
        type: "object",
        properties: {
          min: {
            type: "number",
          },
          max: {
            type: "number",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const { min, max } = context.options[0];

    return {
      [`CallExpression[callee.name='setTimeout'][arguments.length=2]`](node) {
        const { value } = node.arguments[1];

        if (value < min || value > max) {
          context.report({
            node,
            message: "Timeout duration out of bounds!!!",
          });
        }
      },
    };
  },
};

module.exports = {
  rules: {
    test1: test1Rule,
  },
};
