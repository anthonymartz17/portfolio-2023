import workProjectsApi from "@/ApiHelper/workProjectsApi";

export default {
	namespaced: true,
	state: {
		projects: [],
	},
	mutations: {
		SET__PROJECTS(state, payload) {
			state.projects = payload;
		},
		// CREATE(state, payload) {
		// 	state.blogPosts.push(payload);
		// },
		UPDATE(state, payload) {
			state.projects.find((x) => {
				Object.assign(x, payload);
			});
		},
		DELETE(state, projectId) {
			state.projects = state.projects.filter((x) => x.id !== projectId);
		},
	},

	actions: {
		async fetchProjectById(_, postId) {
			try {
				let project = await workProjectsApi.getPostById(postId);
				const thumbnail_data = await workProjectsApi.getThumbnail(
					project.thumbnail_path_ref
				);
				project.thumbnail_data = thumbnail_data;
				return project;
			} catch (error) {
				throw error;
			}
		},
		async setProjects({ commit }) {
			try {
				const projectsData = await workProjectsApi.getProjects();
				const dataWithThumbnailPromises = projectsData.map(async (project) => {
					const thumbnail_img = await workProjectsApi.getThumbnail(
						project.thumbnail_path_ref
					);
					project.thumbnail_data = thumbnail_img;
					return project;
				});
				const dataReady = await Promise.all(dataWithThumbnailPromises);

				commit("SET__PROJECTS", dataReady);
			} catch (error) {
				throw error;
			}
		},
		async createProject(context, { project, thumbnail }) {
			const imgPathRef = await workProjectsApi.uploadThumbnail(thumbnail);
			project.thumbnail_path_ref = imgPathRef;
			await workProjectsApi.createPost(project);
		},
		async updateProject({ commit }, { project, thumbnail }) {
			delete project.thumbnail_data;
			// if is new img delete oldone from storage, upload new one and replace img path in post object with new img path
			if (!thumbnail.manuallyAdded) {
				await workProjectsApi.deleteThumbnail(project.thumbnail_path_ref);
				const imgPathRef = await workProjectsApi.uploadThumbnail(thumbnail);
				project.thumbnail_path_ref = imgPathRef;
			}
			const updatedProject = await workProjectsApi.updateProject(project);
			commit("UPDATE", updatedProject);
		},
		async deleteProject({ commit }, { thumbnail_path_ref, id }) {
			await workProjectsApi.deleteThumbnail(thumbnail_path_ref);
			await workProjectsApi.deleteProject(id);
			commit("DELETE", id);
		},
	},
	getters: {
		projects: (state) => state.projects,
	},
};