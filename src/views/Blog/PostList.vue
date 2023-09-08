<script>
import MartzIcon from "@/components/CustomIcons/MartzIcons.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import PostPreview from "@/components/Blog/PostPreview.vue";

import { mapActions, mapGetters } from "vuex";

export default {
	components: {
		MartzIcon,
		BaseButton,
		PostPreview,
	},
	data() {
		return {};
	},

	mounted() {
		this.$aos.init();
		this.getBlogPosts();
	},
	methods: {
		...mapActions("blogPosts", ["getBlogPosts"]),
	},
	computed: {
		...mapGetters("blogPosts", ["blogPosts"]),

		blogPostsSorted() {
			return this.blogPosts
				.filter((x) => x.isPublic)
				.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
		},
	},
};
</script>

<template>
	<div
		class="home-blogs-main-container"
		data-aos="fade-up"
		data-aos-duration="800"
		data-aos-delay="400"
	>
		<div class="blog-list-title">
			<h2>Blogs</h2>
		</div>
		<div class="blog-list-body">
			<div v-if="blogPostsSorted.length == 0" class="noBlogs">
				<p class="text-thin">No blogs have been added</p>
			</div>
			<template v-else>
				<PostPreview
					data-aos="fade-up"
					data-aos-duration="800"
					:data-aos-delay="250 * idx"
					v-for="(post, idx) in blogPostsSorted"
					:key="post.id"
					:post="post"
				/>
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.noBlogs {
	min-height: 30vh;
}

.blog-list-body {
	display: grid;
	gap: 1em;
	// background: red;
	min-height: 30em;
}
.blog-list-title {
	font: $font-title-mb;
	margin-bottom: 1em;
	font-size: 1.2em;
}

.btn-container {
	margin-block: 1em;
}
.btn-blogActions {
	margin-bottom: 0.5em;
	width: 100%;
}

.home-blogs-main-container {
	@include breakpoint(tablet) {
		.blog-list-body {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1em;
		}
	}
	@include breakpoint(desktop) {
		.blog-list-body {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1em;
		}
	}
}
</style>
