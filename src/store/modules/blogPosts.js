import blogPostApi from "@/ApiHelper/blogPostApi";

export default {
	namespaced: true,
	state: {
		blogPosts: [],
	},
	
	
	mutations: {
		SET__BLOG_POSTS(state, payload) {
			state.blogPosts = payload;
		},
		// CREATE(state, payload) {
		// 	state.blogPosts.push(payload);
		// },
		UPDATE(state, payload) {
			state.blogPosts.find((x) => {
				if (x.id == payload.id) Object.assign(x, payload);
			});
		},
		DELETE(state, postId) {
			state.blogPosts = state.blogPosts.filter((x) => x.id !== postId);
		},
	},

	actions: {
		async fetchPostById(_, postId) {
			try {
				let post = await blogPostApi.getPostById(postId);
				const thumbnail_data = await blogPostApi.getThumbnail(
					post.thumbnail_path_ref
				);
				post.thumbnail_data = thumbnail_data;
				return post;
			} catch (error) {
				throw error;
			}
		},
		async getBlogPosts({ commit }) {
			try {
				const dataPosts = await blogPostApi.getPosts();
				const dataWithThumbnailPromises = dataPosts.map(async (post) => {
					const thumbnail_img = await blogPostApi.getThumbnail(
						post.thumbnail_path_ref
					);
					post.thumbnail_data = thumbnail_img;
					return post;
				});
				const dataReady = await Promise.all(dataWithThumbnailPromises);

				commit("SET__BLOG_POSTS", dataReady);
			} catch (error) {
				throw error;
			}
		},
		async createPost(context, { post, thumbnail }) {
			const imgPathRef = await blogPostApi.uploadImage(thumbnail);
			const createdAt = new Date();
			const options = { year: "numeric", month: "short", day: "numeric" };
			const formattedDate = createdAt.toLocaleDateString("en-US", options);
			post.date_posted = formattedDate;
			post.thumbnail_path_ref = imgPathRef;
			post.isPublic = false;
			await blogPostApi.createPost(post);
		},
		async updatePost({ commit }, { post, thumbnail }) {
			delete post.thumbnail_data;
			// if is new img delete oldone from storage, upload new one and replace img path in post object with new img path
			if (!thumbnail.manuallyAdded) {
				await blogPostApi.deleteThumbnail(post.thumbnail_path_ref);
				const imgPathRef = await blogPostApi.uploadImage(thumbnail);
				post.thumbnail_path_ref = imgPathRef;
			}
			const updatePost = await blogPostApi.updatePost(post);
			commit("UPDATE", updatePost);
		},
		async deletePost({ commit }, { thumbnail_path_ref, id }) {
			await blogPostApi.deleteThumbnail(thumbnail_path_ref);
			await blogPostApi.deletePost(id);
			commit("DELETE", id);
		},
		async updatePostVisibility({ commit }, postData) {
			const updatedPost = await blogPostApi.updatePostVisibility(postData);

			commit("UPDATE", updatedPost);
		},
	},
	getters: {
		blogPosts: (state) => state.blogPosts,
	},
};
