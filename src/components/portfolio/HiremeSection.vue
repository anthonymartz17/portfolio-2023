<script>
import BaseButton from "@/components/Buttons/BaseButton.vue";
import MartzIcon from "@/components/CustomIcons/MartzIcons.vue";
import { required, email } from "vuelidate/lib/validators";
import emailjs from "emailjs-com";

export default {
	components: { BaseButton, MartzIcon },
	data() {
		return {
			title: "Hire me",
			name: "",
			email: "",
			message: "",
			submitted: false,
			mediaContacts: [
				{
					icon: "email",
					name: "E-mail",
					url: "mailto:antonio.fr.martinezc@hotmail.com",
					link_name: "antonio.fr.martinezc@hotmail.com",
				},
				{
					icon: "linkedin",
					name: "LinkedIn",
					url: "https://www.linkedin.com/in/antoniomartinez17/",
					link_name: "linkedin.com/in/antoniomartinez17",
				},
				{
					icon: "github",
					name: "Github",
					url: "https://github.com/anthonymartz17",
					link_name: "anthonymartz17",
				},
				{
					icon: "instagram",
					name: "Instagram",
					url: "https://instagram.com/martz_code?igshid=ZDdkNTZiNTM=",
					link_name: "@martz_code",
				},
			],
		};
	},
	validations: {
		name: { required },
		email: { required, email },
		message: { required },
	},

	methods: {
		sendMsg() {
			this.submitted = true;
			this.$v.$touch();

			if (this.$v.$invalid) {
				return;
			} else {
				try {
					emailjs.sendForm(
						"service_3wcfync",
						"template_hrwt0yr",
						this.$refs.form,
						"RtBt6viltYRuy3fWG"
						// emailData
					);
					alert("message sent successfully");
				} catch (error) {
					alert(error);
				} finally {
					this.submitted = false;
					this.name = "";
					this.email = "";
					this.message = "";
				}
			}
		},
	},
};
</script>
<template>
	<div class="hireme-wrapper">
		<div class="hireme-container" :data-aos-delay="250">
			<div class="form-container">
				<h2
					data-aos="fade-up"
					data-aos-duration="800"
					class="sections-title-global hireme-title"
				>
					{{ title }}
					<MartzIcon icon="handshake" size="30" />
				</h2>
				<form
					data-aos="fade-up"
					data-aos-duration="800"
					:data-aos-delay="250"
					class="contact-form"
					ref="form"
					@submit.prevent="sendMsg"
				>
					<p class="text-small contact-text">
						For any questions, feel free to contact me through any of the
						methods bellow.
					</p>
					<div class="field">
						<label for="name">Name</label>
						<input
							v-model="name"
							type="text"
							id="name"
							name="name"
							:class="[
								'text-thin',
								'input-field',
								{ invalid: submitted && $v.name.$error },
							]"
						/>
						<p v-if="submitted && !$v.name.required" class="text-small">
							Please enter a name
						</p>
					</div>
					<div class="field">
						<label for="email">Email</label>
						<input
							v-model="email"
							name="email"
							type="email"
							id="email"
							:class="[
								'text-thin',
								'input-field',
								{ invalid: submitted && $v.email.$error },
							]"
						/>
						<div v-if="submitted && $v.email.$error">
							<p
								v-if="submitted && !$v.email.required"
								class="text-small error"
							>
								Please enter an email
							</p>
							<p
								v-else-if="submitted && !$v.email.email"
								class="text-small error"
							>
								Please enter a valid email
							</p>
						</div>
					</div>
					<div class="field">
						<label for="email">Message</label>
						<textarea
							v-model="message"
							name="message"
							id="email"
							cols="30"
							rows="7"
							:class="[
								'text-thin',
								'textarea-field',
								{ invalid: submitted && $v.message.$error },
							]"
						></textarea>
						<p
							v-if="submitted && !$v.message.required"
							class="text-small error"
						>
							Please enter a message
						</p>
					</div>
					<div class="btn-container">
						<BaseButton
							icon="sendit"
							text="Send it"
							size="30"
							class="btn-sendit"
						/>
					</div>
				</form>
			</div>
			<!-- <div class="popUp-container">
				<div class="chat-box">
					<div class="profile-img"></div>
					<div class="header">
						<p class="text-small">Antonio Martinez</p>
						<font-awesome-icon icon="fa-solid fa-xmark" class="accent" />
					</div>
					<p class="msg-body text-small">
						Hey, I'm available to chat in case of any questions
					</p>
					<input type="text" />
				</div>
			</div> -->
			<div class="other-contact">
				<h2
					data-aos="fade-up"
					data-aos-duration="800"
					class="sections-title-global"
				>
					Other
				</h2>
				<ul
					data-aos="fade-up"
					data-aos-duration="800"
					:data-aos-delay="250"
					class="contact-links"
				>
					<li v-for="media in mediaContacts" :key="media.name">
						<a :href="media.url" target="blank">
							<MartzIcon :icon="media.icon" size="20" class="icon" />
							<p>{{ media.link_name }}</p>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.hireme-wrapper {
	background: $bg-2;
	padding: 2em 1em;
	display: flex;
	justify-content: center;
	@include breakpoint(desktop) {
	}
}
.popUp-container {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	backdrop-filter: blur(5px);
	display: grid;
	place-items: center;
	padding: 1em;
}
.header {
	display: flex;
	margin-left: 3em;
	align-items: center;
	justify-content: space-between;
}
.chat-box {
	position: relative;
	background: $bg-1;
	width: 100%;
	padding: 0.5em;
	border: 1px solid rgba($white, 0.3);
	border-radius: 5px;
	min-height: 13em;
}
.profile-img {
	height: 4em;
	width: 4em;
	border: 1px solid rgba($white, 0.3);
	border-radius: 50px;
	position: absolute;
	top: -50px;
	left: -10px;
	background: white;
}
.accent {
	color: $accent;
}
.hireme-container {
	@include breakpoint(tablet) {
		width: 85%;
	}
	@include breakpoint(desktop) {
		width: 75%;
		display: flex;
		gap: 3em;
		justify-content: space-around;

		.other-contact {
			width: 30%;
			display: flex;
			flex-direction: column;
		}
	}
}
.contact-text {
	margin-bottom: 1em;
}
.hireme-title {
	display: flex;
	align-items: center;
	gap: 0.3em;
}

.title-icon {
	display: flex;
	align-items: baseline;
}
.icon {
	color: rgba($white, 0.3);
	margin-left: 0.5em;
	height: 1.5em;
}
.field {
	margin-bottom: 2em;
	font: $font-text-mb;
	label {
		display: block;
		color: $white;
		font: $font-text-mb;
	}
}
.input-field {
	// border: 1px solid rgba($white, 0.3);
	height: 2.2em;
}
.input-field,
.textarea-field {
	color: $white;
	width: 100%;
	background: none;
	padding: 0.5em;
	border: 1px solid rgba($white, 0.3);
}
.btn-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.btn-sendit {
	@include breakpoint(tablet) {
		width: 40%;
	}
}
.msg-bubble {
	color: $accent;
	&::after {
		content: "";
		color: $bg-2;
		position: absolute;
		top: 50%;
	}
}
.invalid {
	border: 2px solid $accent;
}

.contact-form {
	margin-bottom: 7em;
}
.other-contact {
	margin-bottom: 6em;
}
.contact-links {
	margin: 0;
	padding: 0;
	text-indent: 0;
	list-style-type: 0;
	//

	li {
		margin-bottom: 1.5em;
		list-style: none;
	}
	a {
		text-decoration: none;
		color: $white;
		display: flex;
		align-items: center;
		gap: 1em;
		font: $font-small-mb;
	}
}
</style>
