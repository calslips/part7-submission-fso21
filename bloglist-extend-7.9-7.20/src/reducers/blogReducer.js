import blogService from '../services/blogs';

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch({
      type: 'CREATE_BLOG',
      data: createdBlog
    });
  };
};

export const createComment = (id, comment, userInfo) => {
  return async (dispatch) => {
    const addedComment = await blogService.createComment(id, comment);
    dispatch({
      type: 'ADD_COMMENT',
      data: { ...addedComment, user: userInfo }
    });
  };
};

export const updateBlogLikes = (blogId, userInfo, updateObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogId, updateObject);
    dispatch({
      type: 'TOGGLE_LIKES',
      data: { ...updatedBlog, user: userInfo }
    });
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId);
    dispatch({
      type: 'DELETE_BLOG',
      data: blogId
    });
  };
};

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data;
  case 'CREATE_BLOG':
    return [...state, action.data];
  case 'ADD_COMMENT': {
    const commentedBlog = action.data;
    return state.map(
      (b) => b.id === commentedBlog.id ? commentedBlog : b
    );
  }
  case 'TOGGLE_LIKES': {
    const toggleLike = action.data;
    return state.map(
      (b) => b.id === toggleLike.id ? toggleLike : b
    );
  }
  case 'DELETE_BLOG': {
    const deletedId = action.data;
    return state.filter(
      (b) => b.id !== deletedId
    );
  }
  default:
    return state;
  }
};

export default blogReducer;