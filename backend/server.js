const app = require("./src/app");
const { env } = require("./src/config/env.config");

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
