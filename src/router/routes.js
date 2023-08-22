import LandingPage from "@/views/LandingPage.vue";
import store from "@/store/index";

export default [
	{
		path: "/",
		name: "LandingPage",
		component: LandingPage,
	},
	{
		path: "/portfolio",
		name: "Portfolio",
		component: () => import("../views/Portfolio/Index.vue"),
	},
	{
		path: "/workProjectDetail/:projectId",
		name: "WorkProjectDetail",
		component: () => import("../views/WorkProjectDetail.vue"),
	},
	{
		path: "/resume",
		name: "Resume",
		component: () => import("../views/ResumePage.vue"),
	},

	{
		path: "/blogs",
		component: () => import("../views/Blog/Index.vue"),
		children: [
			{
				path: "",
				name: "PostList",
				component: () => import("../views/Blog/PostList.vue"),
			},
			{
				path: "postDetail/:postId",
				name: "PostDetail",
				component: () => import("../views/Blog/PostDetail.vue"),
			},
		],
	},
	{
		path: "/@dminLogin",
		name: "Login",
		component: () => import("../views/Admin/Login.vue"),
		beforeEnter: (to, from, next) => {
			// Check the authentication status or any other condition
			const isLoggedIn = store.getters["auth/isLoggedIn"];

			// If the user is already logged in,cancel navigation
			if (isLoggedIn) {
				next({ name: "Portfolio" });
			} else {
				// If the user is not logged in, allow access to the login page
				next();
			}
		},
	},
	{
		path: "/admin",
		component: () => import("../views/Admin/Index.vue"),
		meta: { requiresAuth: true },
		children: [
			{
				path: "",
				name: "Admin",
				component: () =>
					import("../views/Admin/BlogsManagement/ManagePost.vue"),
			},
			{
				path: "createPost",
				name: "CreatePost",
				component: () =>
					import("../views/Admin/BlogsManagement/CreatePost.vue"),
			},
			{
				path: "postDetail/:postId",
				name: "ViewPostDetail",
				component: () =>
					import("../views/Admin/BlogsManagement/ViewPostDetail.vue"),
			},
			{
				path: "createProject",
				name: "CreateProject",
				component: () =>
					import("../views/Admin/ProjectsManagement/CreateProject.vue"),
			},
			{
				path: "manageProject",
				name: "ManageProject",
				component: () =>
					import("../views/Admin/ProjectsManagement/ManageProject.vue"),
			},
			{
				path: "projectDetail/:projectId",
				name: "ViewProjectDetail",
				component: () =>
					import("../views/Admin/ProjectsManagement/ViewProjectDetail.vue"),
			},
		],
	},

	{
		path: "/:notFound(.*)",
		name: "NotFound",
		component: () => import("../views/NotFoundPage.vue"),
	},
];
