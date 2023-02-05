const timeoutDurationBounds = {
  meta: {
    type: "problem",
    docs: {
      description: "Restrict timeout duration out of passed `min` and `max",
    },
    fixable: "code",
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
  defaultOptions: [
    {
      min: 0,
      max: 1000,
    },
  ],

  create(context) {
    const { min, max } = context.options[0];

    return {
      [`CallExpression[callee.name='setTimeout'][arguments.length=2]`](node) {
        const durationNode = node.arguments[1];
        const { value } = durationNode;

        if (value < min || value > max) {
          context.report({
            node,
            message: `Timeout duration out of bounds [${min}, ${max}]`,
            fix(fixer) {
              return fixer.replaceText(
                durationNode,
                String(clamp(min, max, value))
              );
            },
          });
        }
      },
    };
  },
};

function clamp(min, max, value) {
  return Math.min(Math.max(value, min), max);
}

module.exports = {
  rules: {
    ["timeout-duration-bounds"]: timeoutDurationBounds,
  },
};
