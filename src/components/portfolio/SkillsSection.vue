<script>
import MartzIcon from "@/components/CustomIcons/MartzIcons.vue";

export default {
	components: { MartzIcon },
	data() {
		return {
			title: "Skills",
			skillId: "vue",
			skillsName: [
				{ id: "javaScript", name: "JavaScript", icon: "JS", size: "79" },
				{ id: "html5", name: "HTML5", icon: "html", size: "79" },
				{ id: "css3", name: "CSS3", icon: "css", size: "79" },
				{ id: "sass", name: "SASS", icon: "sass", size: "90" },
				{ id: "vue", name: "Vue.js", icon: "Vue", size: "90" },
				{ id: "nuxt", name: "Nuxt.js", icon: "nuxt", size: "90" },
				{ id: "axios", name: "Axios", icon: "axios", size: "90" },
				{ id: "git", name: "Git", icon: "git", size: "79" },
				{ id: "github", name: "GitHub", icon: "github", size: "79" },
				{ id: "firebase_icon", name: "Firebase", icon: "firebase", size: "79" },
				{
					id: "restfull_api",
					name: "RESTfull API",
					icon: "restfull_api",
					size: "100",
				},
			],
		};
	},
	props: ["scrollPosition"],

	methods: {
		switchSkillId(id) {
			this.skillId = id;
		},
	},
};
</script>

<template>
	<div class="skills-wrapper">
		<div class="skills-container">
			<h2
				class="sections-title-global"
				data-aos="fade-up"
				data-aos-duration="800"
			>
				{{ title }}
			</h2>
			<div
				class="skills-body"
				data-aos="fade-up"
				data-aos-duration="800"
				:data-aos-delay="250"
			>
				<div class="skills-icons-container">
					<div class="skill-icon" v-for="icon in skillsName" :key="icon.id">
						<!-- added additional div to align icons to the bottom and from there control individual size of icons -->
						<div class="icon">
							<MartzIcon :icon="icon.id" :size="icon.size" />
						</div>
						<p class="icon-name">{{ icon.name }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.accent {
	background: $accent;
}
.skills-wrapper {
	padding: 2em 1em;
	background: $bg-2;
	display: flex;
	justify-content: center;
}
.skills-container {
	margin-bottom: 4em;
	color: $white;
	position: relative;
	width: 100%;
}

.skill-icon {
	display: grid;
	place-items: center;
	padding: 1em;

	box-shadow: 0 3px 15px rgba(255, 255, 255, 0.151);
}
.skills-icons-container {
	margin-bottom: 1.5em;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2em;
}
.icon-name {
	text-align: center;
	font: $font-text-mb;
}
.icon {
	height: 6em;
	width: 6em;
	margin-bottom: 0.5em;
	display: flex;
	justify-content: center;
	align-items: end;
}
.skill-description-container {
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		// display: flex;
		margin-bottom: 0.5em;
	}

	h4 {
		font: $font-text-mb;
	}
	p {
		font: $font-thin-text-mb;
	}
}

.skills-wrapper {
	@include breakpoint(tablet) {
		.skills-container {
			width: 85%;
		}
		.skills-icons-container {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.skill-description-container {
			li {
				display: flex;
				margin-bottom: 1em;
			}
			h4 {
				flex: 1;
			}
			p {
				flex: 2;
			}
		}
	}
	@include breakpoint(desktop) {
		.skills-container {
			width: 75%;
			margin-bottom: 10em;
		}
		.skills-body {
			display: flex;
			gap: 1em;
		}
		.skills-icons-container {
			flex: 1;
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}

		.skill-description-container {
			flex: 1;
		}
	}
}
</style>
