import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/auth"
    : "http://localhost:8800/auth";

export default axios.create({
  baseURL,
});
