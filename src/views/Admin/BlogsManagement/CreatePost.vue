<script>
import { quillEditor } from "vue-quill-editor";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
	components: {
		quillEditor,
		BaseButton,
		vue2Dropzone,
	},
	data() {
		return {
			submitted: false,
			postId: null,
			blog: {
				author: "Antonio Martinez",
			},
			blogThumbnail: [],
			dropzoneOptions: {
				url: "https://httpbin.org/post",
				thumbnailWidth: 150,
				thumbnailHeight: 150,
				maxFiles: 1,
				acceptedFiles: ".jpg, .jpeg, .png",
				headers: { "My-Awesome-Header": "header value" },
				dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD IMAGE",
				addRemoveLinks: true,
			},
		};
	},
	validations: {
		blog: {
			title: { required },
			author: { required },
			read_time: { required },
			content: { required },
		},
		blogThumbnail: {
			required,
		},
	},
	created() {
		this.postId = this.$route.query.postId;
		if (this.postId) {
			this.fetchPostById(this.postId).then((data) => {
				this.blog = data;
				this.uploadImgManually(this.blog.thumbnail_data);
			});
		}
	
	},
	methods: {
		...mapActions("blogPosts", ["fetchPostById", "createPost", "updatePost"]),
	
		afterComplete(file) {
			this.blogThumbnail.push(file);
		},
		removeImg(file) {
			this.blogThumbnail = this.blogThumbnail.filter(
				(img) => img.dataURL != file.dataURL
			);
		},
		async uploadImgManually(img) {
			//add images to vuedropzone
			this.$refs.myVueDropzone.manuallyAddFile(img, img.dataURL);
		},
		async tryCreatePost() {
			this.$v.$touch;
			this.submitted = true;
			if (this.$v.$invalid) {
				return;
			} else {
				if (this.postId) {
					try {
						await this.updatePost({
							post: this.blog,
							thumbnail: this.blogThumbnail[0],
						});
						this.blog = {};
						this.blogThumbnail = [];
						this.submitted = false;
						this.$router.push({ name: "Admin" });
					} catch (error) {
						throw error;
					}
				} else {
					try {
						const response = await this.createPost({
							post: this.blog,
							thumbnail: this.blogThumbnail[0],
						});
						this.blog = {};
						this.blogThumbnail = [];
						this.submitted = false;
						this.$router.push({ name: "Admin" });
					} catch (error) {
						throw error;
					}
				}
			}
		},
	},
};
</script>
<template>
	<div
		class="create-post-container"
		data-aos="fade-up"
		data-aos-duration="800"
		data-aos-delay="400"
	>
		<h2 class="blog-list-title">Create New Post</h2>
		<form action="" @submit.prevent="tryCreatePost">
			<div class="field">
				<label class="label-field" for="title">Author</label>
				<input
					v-model.trim="blog.author"
					type="text"
					id="author"
					:class="[
						'input-field',
						{ invalid: submitted && $v.blog.author.$invalid },
					]"
				/>
				<p v-if="submitted && !$v.blog.author.required" class="text-small">
					Please enter a Author
				</p>
			</div>
			<div class="field">
				<label class="label-field" for="title">Title</label>
				<input
					v-model="blog.title"
					type="text"
					id="title"
					:class="[
						'input-field',
						{ invalid: submitted && $v.blog.title.$invalid },
					]"
				/>
				<p v-if="submitted && !$v.blog.title.required" class="text-small">
					Please enter a title
				</p>
			</div>
			<div class="field">
				<label class="label-field" for="read_time">Read time</label>
				<input
					v-model.number.trim="blog.read_time"
					type="number"
					id="read_time"
					:class="[
						'input-field',
						{ invalid: submitted && $v.blog.read_time.$invalid },
					]"
				/>
				<p v-if="submitted && !$v.blog.read_time.required" class="text-small">
					Please enter a Author
				</p>
			</div>
			<div>
				<label class="label-field" for="title">Thumbnail</label>
				<vue2Dropzone
					@vdropzone-removed-file="removeImg"
					@vdropzone-complete="afterComplete"
					:destroyDropzone="false"
					ref="myVueDropzone"
					id="dropzone"
					:options="dropzoneOptions"
					:class="{
						invalid: submitted && $v.blogThumbnail.$invalid,
					}"
				></vue2Dropzone>
				<div v-if="submitted && !$v.blogThumbnail.required" class="text-small">
					Photos are required.
				</div>
			</div>

			<div>
				<label class="label-field" for="content">Content</label>
				<quill-editor
					:class="{ invalid: submitted && $v.blog.content.$invalid }"
					v-model.trim="blog.content"
					ref="quillEditor"
				></quill-editor>
				<p v-if="submitted && !$v.blog.content.required" class="text-small">
					Content can not be empty
				</p>
			</div>
			<div class="btn-container">
				<BaseButton
					icon="write"
					:text="this.postId ? 'Update Post' : 'Create Post'"
					size="30"
					class="custom-btn"
				/>
			</div>
		</form>
	</div>
</template>
<style lang="scss" scoped>
/* Custom CSS to display images inline */
#dropzone {
	background: none;
	border: 1px solid rgba($white, 0.3);
	margin-bottom: 1em;
}

.field {
	margin-bottom: 2em;
}
.invalid {
	border: 2px solid $accent !important;
}
.label-field {
	display: block;
	font: $font-text-mb;
}
.input-field {
	border: 1px solid rgba($white, 0.3);
	width: 100%;
	color: $white;
	height: 2.2em;
	padding-inline: 0.5em;
	background: none;
}
.btn {
	background: none;
	color: $white;
	font: $font-text-mb;
	padding: 1em 2em;
	border: 1px solid $white;
	border-radius: 5px;
	box-shadow: 0 3px 20px rgba(255, 255, 255, 0.151);
}
::v-deep .ql-editor {
	min-height: 400px; /* Adjust the min-height value as needed */
}
::v-deep .ql-editor.invalid {
	border: 2px solid $accent !important;
}
.blog-list-title {
	font: $font-title-mb;
	margin-bottom: 1em;
	font-size: 1.2em;
}
.richEdit {
	min-height: 25em;
}
.btn-container {
	margin-block: 1em;
}
.custom-btn {
	width: 100%;
}

.create-post-container {
	min-height: 25em;

	@include breakpoint(tablet) {
		/* Add tablet-specific styles here if needed */
	}
	@include breakpoint(desktop) {
		/* Add desktop-specific styles here if needed */
		.custom-btn {
			width: 20em;
		}
		.btn-container {
			display: flex;
			justify-content: flex-end;
			margin-block: 1em;
		}
	}
}
</style>
