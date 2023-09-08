<script>
import SocialMedia from "@/components/SocialMedia.vue";
import MartzIcons from "@/components/CustomIcons/MartzIcons.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";
export default {
	components: {
		SocialMedia,
		BaseButton,
		MartzIcons,
	},
	mounted() {
		this.$aos.init({
			duration: 800,
			offset: 200,
		});
	},

	data() {
		return {
			developerName: "Antonio Martinez",
			developerTitle: "Front-End Dev",
			links: [
				{ text: "Portfolio", icon: "portfolio", route: "Portfolio" },
				{ text: "Youtube", icon: "youtubetv", secondText: "talk projects" },
				{
					text: "Blogs",
					icon: "ereading",
					secondText: "blog about projects",
					route: "PostList",
				},
			],
		};
	},
};
</script>

<template>
	<div class="landing-wrapper">
		<div class="container">
			<header class="header" data-aos="fade-up" data-aos-duration="800">
				<h1 class="lg-title">{{ developerName }}</h1>
				<h2 class="l-title">{{ developerTitle }}</h2>
			</header>
			<div
				class="landing-body"
				data-aos="fade-up"
				data-aos-duration="800"
				:data-aos-delay="250"
			>
				<div class="headshot-img">
					<img class="headshot" src="/img/headshotMobile.png" alt="" />
					<img class="fullbody" src="/img/lookingDown.png" alt="" />
				</div>
				<div class="links">
					<template v-for="link in links">
						<router-link
							v-if="link.route"
							:to="{ name: link.route }"
							:key="link.icon"
							class="landing-btn"
						>
							<BaseButton
								class="landing-btn"
								:text="link.text"
								:icon="link.icon"
								:size="30"
							/>
						</router-link>

						<a
							v-if="!link.route"
							:key="link.icon"
							class="resetLink"
							href="https://www.youtube.com/channel/UCVECqgVfRZ4b_XFbp6-MvTQ"
							target="blank"
						>
							<BaseButton
								:text="link.text"
								:icon="link.icon"
								:size="30"
								class="landing-btn"
							/>
						</a>
					</template>
					<div class="resumeDownload-container">
						<router-link class="resumeDownload" :to="{ name: 'Resume' }">
							<span>View Résumé</span>
							<MartzIcons icon="download" :size="25"
						/></router-link>
					</div>
				</div>
				<SocialMedia class="social-media" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
// .icon {
// 	fill: black;
// }
.landing-wrapper {
	height: 100vh;
	background: $bg-1;
	display: flex;
	justify-content: center;
}
.resumeDownload-container {
	display: flex;
	justify-content: center;
	margin-bottom: 2em;
}
.resumeDownload {
	border-bottom: 1px solid $accent;
	font: $font-text-mb;
	display: inline-block;
	color: $white;
	text-decoration: none;
	display: flex;
	gap: 1em;
	justify-content: center;
	padding: 0.5em;
}
.container {
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	font-family: $font-poppins;
	color: $white;
	// padding: 1em 0em;
}
.header {
	flex: 1;
}
.landing-body {
	flex: 4;
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 1em;
}
.links {
	width: 100%;
}

.headshot-img {
	width: 13em;

	.fullbody {
		display: none;
	}
}
.lg-title {
	flex: 1;
}
.l-title {
	font: $font-title-mb;
	text-align: center;
}

.landing-btn {
	flex: 1;
	margin-bottom: 0.5em;
	text-decoration: none;
	width: 100%;

	.social-media {
		position: absolute;
		top: 0;
	}
}
.landing-wrapper {
	@include breakpoint(tablet) {
		.container {
			width: 70%;
		}
		.headshot-img {
			width: 15em;
		}
		.lg-title {
			font: $font-xl-tb;
		}
		.l-title {
			font: $font-title-tb;
		}
		.landing-btn {
			font: $font-btn-tb;
		}
		.landing-body {
			width: 80%;
		}
	}
	@include breakpoint(desktop) {
		position: relative;

		.container {
			justify-content: center;
		}

		.landing-body {
			width: 100%;
			flex-direction: row;
			justify-content: center;
		}

		.links {
			width: 35%;
			z-index: 10;
		}

		.social-media {
			flex-direction: column;
			width: auto;
			position: absolute;
			left: 0;
			gap: 1.5em;
		}

		.icon-container {
			padding: 0.5em;

			&:hover .icon {
				color: $accent;
			}
		}

		.headshot-img {
			position: absolute;
			right: -10em;
		}

		.headshot {
			display: none;
		}
		.fullbody {
			display: flex;
		}

		.lg-title {
			font: $font-xxl-dsk;
		}

		.l-title {
			font: $font-xl-dsk;
		}

		.landing-btn {
			width: 100%;
		}
	}
}
</style>
