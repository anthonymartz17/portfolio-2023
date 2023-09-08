<script>
import MartzIcon from "@/components/CustomIcons/MartzIcons.vue";
import AppHeader from "@/components/Layout/AppHeader.vue";
import AppFooter from "@/components/Layout/AppFooter.vue";
export default {
	components: {
		AppHeader,
		AppFooter,
		MartzIcon,
	},
	data() {
		return {
			isMenueOpen: false,
		};
	},
	mounted() {
		this.$aos.init({
			duration: 800,
			offset: 200,
			// disable: "mobile",
		});
		//in case coming from a route where viewing the footer for example
		this.scrollTo();
	},
	beforeDestroy() {
		document.body.classList.remove("mobile-menu-open");
	},
	methods: {
		scrollTo() {
			this.$refs.TheHeader.$refs.header.scrollIntoView({
				block: "start",
				behavior: "smooth",
			});
		},
	},
};
</script>
<template>
	<div class="home-blogs-wrapper">
		<div class="home-blogs-container">
			<div class="home-blogs-container">
				<AppHeader navigationOption="blog" ref="TheHeader" />

				<main>
					<div class="main-wrapper">
						<router-view class="routerView" />
					</div>
				</main>
			</div>
			<footer>
				<AppFooter @scrollToEvent="scrollTo($event)" />
			</footer>
		</div>
	
	</div>
</template>

<style lang="scss" scoped>
body.mobile-menu-open {
	overflow: hidden;
}
.home-blogs-wrapper {
	background: $bg-2;
	min-height: 100vh;
	color: $white;
}
.home-blogs-main-wrapper {
	margin: 1em;
}

.home-blog-header-wrapper {
	box-shadow: 0 3px 10px rgba(255, 255, 255, 0.075);
}
.blog-footer-wrapper {
	min-height: 25em;
	// padding-block: 1em;
}
// .the-footer{
// 	width: ;
// }
.home-blogs-header {
	position: relative;
	padding: 0.8em 1.5em;
	color: $white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 10vh;
	z-index: 5;

	.clickable {
		pointer-events: none;
	}
}
.blog-nav-container {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 10;
	backdrop-filter: blur(5px);
}
.main-wrapper {
	display: flex;
	justify-content: center;
	padding-top: 3em;
}
.routerView {
	margin: 0 1em 5em 1em;
}

.home-blogs-wrapper {
	@include breakpoint(tablet) {
		.routerView {
			width: 95%;
		}
	}

	@include breakpoint(desktop) {
		.desktop-menu {
			flex: 2;
			display: flex;
			justify-content: flex-end;
		}
		.header-nav-menue {
			display: none;
		}
		.main-wrapper {
			display: flex;
			justify-content: center;
		}
		.routerView {
			width: 75%;
		}
		.home-blog-header-wrapper {
			display: flex;
			justify-content: center;
		}
		.home-blogs-header {
			width: 80%;
			display: flex;
		}
		.logo {
			flex: 1;
			display: flex;
		}
	}
}
</style>
