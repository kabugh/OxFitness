<template>
  <section class="profile view">
    <div class="profile__container container">
      <div class="avatar__wrapper">
        <div class="avatar__preview">
          <v-gravatar
            class="avatar"
            hash="f3ada405ce890b6f8204094deb12d8a8"
            alt="Nobody"
            :size="80"
            default-img="retro"
          />
        </div>
      </div>
      <div class="details__container">
        <h3>Email: {{ user.email }}</h3>
        <h3>ID: {{ user.id }}</h3>
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
      h3 {
        font-weight: 400;
        text-align: center;
      }
    }
  }
}
</style>
