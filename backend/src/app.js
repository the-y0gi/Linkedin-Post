// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");

// const routes = require("./routes/index");
// const { errorHandler } = require("./middlewares/error.middleware");

// const app = express();

// app.use(helmet());
// app.use(cors());

// app.use(express.json());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// app.use("/api", routes);
// app.use(errorHandler);

// module.exports = app;


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes/index");
const { errorHandler } = require("./middlewares/error.middleware");
const { env } = require("./config/env.config");

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [env.FRONTEND_URL] 
    : ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
