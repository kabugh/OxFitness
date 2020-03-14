<template>
  <section class="profile bottomView">
    <div class="profile__container container">
      <div class="avatar__wrapper">
        <div class="avatar__preview">
          <v-gravatar
            class="avatar"
            :hash="user.id"
            alt="Profile image"
            :size="80"
            default-img="retro"
          />
        </div>
      </div>
      <div class="details__container">
        <h3><span>Email:</span> {{ user.email }}</h3>
        <h3><span>ID:</span> {{ user.id }}</h3>
        <div class="button__wrapper">
          <h4>
            Click the button below, if you forgot your password or you want to
            change it.
          </h4>
          <button class="dark" type="button" @click="changePassword">
            Change Password
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Profile extends Vue {
  get user() {
    return this.$store.getters.user;
  }

  changePassword() {
    this.$store.dispatch("changePassword", this.user.email);
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/global.scss";
.profile {
  .profile__container {
    @include flex;
    flex-direction: column;
    .avatar__wrapper {
      @include flex;
      align-items: center;
      .avatar__preview {
        .avatar {
          border-radius: 50%;
        }
      }
    }
    .details__container {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 2vh;
      justify-content: center;
      align-items: center;
      margin: 4vh 0;
      h3,
      h4 {
        font-weight: 400;
        text-align: center;
        span {
          font-weight: bolder;
        }
      }
      .button__wrapper {
        @include flex;
        flex-direction: column;
        padding: 2vh 0;
        button {
          margin-top: 2vh;
        }
      }
    }
  }
}
</style>
