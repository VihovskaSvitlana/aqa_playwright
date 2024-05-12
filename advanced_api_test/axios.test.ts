import axios, { RawAxiosRequestConfig } from "axios";

describe("test", () => {
  test("Get Post by incorrect id", async () => {
    try {
      await sendRequets(543431);
    } catch (e) {
      expect(e.response.status).toBe(404);
      expect(e.response.statusText).toBe("Not Found");
    }
  });

  test("Set custom config", async () => {
    const header = { Authorization: "Bearer test" };
    const param = { foo: "bar" };
    const res = await sendRequets(1, { params: param, headers: header });
    expect(res.config.headers).toMatchObject(header);
    expect(res.config.params).toMatchObject(param);
  });
});

const sendRequets = async (postId: Number, config?: RawAxiosRequestConfig) =>
  await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    config
  );
