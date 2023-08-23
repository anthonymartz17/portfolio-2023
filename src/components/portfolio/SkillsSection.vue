<script>
import MartzIcon from "@/components/CustomIcons/MartzIcons.vue";

export default {
	components: { MartzIcon },
	data() {
		return {
			title: "Skills",
			skillId: "vue",
			skillsName: [
				{ id: "vue", name: "vue.js", icon: "V", size: "90" },
				{ id: "javaScript", name: "javaScript", icon: "JS", size: "79" },
				{ id: "css3", name: "css3", icon: "css", size: "79" },
				{ id: "html5", name: "html5", icon: "html", size: "79" },
			],
			skillsDescriptions: [
				{
					id: "vue",
					concepts: [
						{
							concept: "Vue Router",
							description:
								"route matching, parameters, nested routes, router-view component, navigation guards, lazy loading, meta fields",
						},
						{
							concept: "Vuex",
							description:
								"state, getters, mutations, actions, modules, store, namespaced modules, mapper helpers",
						},

						{
							concept: "Components",
							description:
								"Reusable and modular building blocks, encapsulate templates, data, methods, and styles to create self-contained units of functionality.",
						},

						{
							concept: "Options API",
							description:
								"Data, props, methods, computed properties, watchers, lifeCycle hooks, mixins",
						},
						{
							concept: "Composition API",
							description:
								"Setup function, reactive, ref, watch, computed, lifeCycles hooks",
						},

						{
							concept: "Template Syntax",
							description: "Directives, interpolation, two-way data binding.",
						},
						{
							concept: "Libraries",
							description:
								"vuelidate, vuex, vue CLI, Axios, Bootstrap Vue, Vue Router",
						},
					],
				},
				{
					id: "javaScript",
					concepts: [
						{
							concept: "Variables",
							description: "Var, let, and const.",
						},
						{
							concept: "Data Types",
							description:
								"String, Number, Boolean, Undefined, Null, Symbol, Array, Object, Function.",
						},
						{
							concept: "Arrays",
							description:
								"forEach, map, filter, reduce, push, splice, includes, join.",
						},
						{
							concept: "Control Flow",
							description:
								"if, else, switch, and looping constructs (for, while, do-while).",
						},
						{
							concept: "ES6+ Features",
							description:
								"Template literals, array/object destructuring, spread operators, default parameters, and arrow functions.",
						},
						{
							concept: "Classes",
							description: "Classes and constructor functions.",
						},
						{
							concept: "DOM Manipulation",
							description:
								"Selecting Elements, Modifying Content, Attributes, Creating Elements, Appending and Removing Elements, Adding and Removing Classes, Event Handling.",
						},
						{
							concept: "Asynchronous Operations",
							description:
								"Callback Functions, Promises, Async/Await, Fetch API, Error Handling, try/catch.",
						},
					],
				},
				{
					id: "css3",
					concepts: [
						{
							concept: "CSS Selectors",
							description:
								"Element selectors, class selectors, ID selectors, descendant selectors, etc.",
						},
						{
							concept: "Box Model",
							description: "Borders, padding, margin, and content.",
						},
						{
							concept: "Layout Techniques",
							description: "Flexbox and CSS Grid.",
						},
						{
							concept: "Responsive Design",
							description:
								"Mobile-first approach, media queries, breakpoints, etc.",
						},
						{
							concept: "CSS Preprocessors",
							description:
								"Sass. Variables, nesting, mixins, and other features.",
						},
						{
							concept: "CSS Transitions and Animations",
							description:
								"Keyframes, easing functions, transition properties, and other features.",
						},
						{
							concept: "CSS3 Features",
							description:
								"Rounded corners, gradients, shadows, transformations, pseudo-classes, etc.",
						},
						{
							concept: "CSS Frameworks",
							description: "Bootstrap.",
						},
					],
				},
				{
					id: "html5",
					concepts: [
						{
							concept: "HTML Structure",
							description:
								"Basic document structure with doctype, html, head, and body elements.",
						},
						{
							concept: "Semantic Elements",
							description:
								"Semantic elements like header, nav, main, section, article, footer, etc.",
						},
						{
							concept: "Forms and Input Elements",
							description:
								"Input elements like input, textarea, select, label, and form attributes.",
						},
						{
							concept: "Links and Anchors",
							description: "links with anchor tags and attributes.",
						},
						{
							concept: "Images",
							description:
								"Image tags and its attributes like src, alt, width, and height.",
						},

						{
							concept: "HTML5 APIs",
							description:
								"HTML5 APIs like Geolocation, LocalStorage, and WebSockets.",
						},
						{
							concept: "Accessibility",
							description: "ARIA and alt attributes for images.",
						},
						{
							concept: "Tables",
							description:
								"Table-related elements like tr, th, td, thead, tbody, tfoot, etc.",
						},
						{
							concept: "Multimedia",
							description:
								"Embedding multimedia content with audio, video, and iframe elements.",
						},
					],
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
	computed: {
		skillDescription() {
			return this.skillsDescriptions.find((one) => one.id == this.skillId);
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
					<div
						class="skill-icon"
						v-for="icon in skillsName"
						:key="icon.id"
						@click="switchSkillId(icon.id)"
					>
						<!-- added additional div to align icons to the bottom and from there control individual size of icons -->
						<div class="icon">
							<MartzIcon
								:icon="icon.id"
								:color="skillId == icon.id ? 'accent' : 'white'"
								:size="icon.size"
							/>
						</div>
						<p class="icon-name">{{ icon.name }}</p>
						<!-- <div  v-if="icon.id == skillId">{{scrollPosition}}</div> -->
					</div>
				</div>
				<div class="skill-description-container">
					<ul>
						<li v-for="skill in skillDescription.concepts" :key="skill.concept">
							<h4>{{ skill.concept }}:</h4>
							<p>{{ skill.description }}</p>
						</li>
					</ul>
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
	// border: 0.5px solid rgba(255, 255, 255, 0.121);
	cursor: pointer;
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
			display: flex;
			padding: 0;
			justify-content: space-around;
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
			display: grid;
			flex: 1;
			max-height: 15em;
		}

		.skill-description-container {
			flex: 1;
		}
		.skill-icon {
			transition: all 250ms ease-in-out;
			&:hover {
				box-shadow: rgba(255, 255, 255, 0.2) 0px 8px 40px;
			}
		}
	}
}
</style>
