import axios, { AxiosResponse } from "axios";

let getAllPosts: AxiosResponse;
let getPost: AxiosResponse;
let postId: AxiosResponse;
describe("test", () => {
  test("Get All Posts", async () => {
    getAllPosts = await axios.get("https://jsonplaceholder.typicode.com/posts");
    expect(getAllPosts.status).toEqual(200);
  });

  test("Get Specific Post", async () => {
    postId = getAllPosts.data.find((e) => e.body.includes("et iusto sed")).id;
    getPost = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    expect(getPost.status).toEqual(200);
    expect(getPost.data.id).toEqual(postId);
  });

  test("Update Post Body", async () => {
    const updatePostBody = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        body: `updated ${getPost.data.body}`,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    expect(updatePostBody.status).toEqual(200);
    expect(updatePostBody.data.body).toEqual(`updated ${getPost.data.body}`);
    expect(updatePostBody.data.title).toEqual(getPost.data.title);
    expect(updatePostBody.data.userId).toEqual(getPost.data.userId);
    expect(updatePostBody.data.id).toEqual(getPost.data.id);
  });
  test("Update Post full", async () => {
    const updatePost = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        title: "Change foo",
        body: `Change ${getPost.data.body}`,
        userId: 1 + 1,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    expect(updatePost.status).toEqual(200);
    expect(updatePost.data.body).toEqual(`Change ${getPost.data.body}`);
    expect(updatePost.data.title).toEqual("Change foo");
    expect(updatePost.data.userId).toEqual(1 + 1);
  });
  test("Create Post", async () => {
    const createPost = await axios.post(
      "https://jsonplaceholder.typicode.com/posts/",
      {
        title: "New Post",
        body: "Post body",
        userId: 1,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    expect(createPost.status).toEqual(201);
    expect(createPost.data.title).toEqual("New Post");
    expect(createPost.data.body).toEqual("Post body");
  });
  test("Delete Post", async () => {
    const deletePost = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    expect(deletePost.status).toEqual(200);
    expect(deletePost.data).toEqual({});
  });
});
