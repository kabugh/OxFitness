<template>
  <section class="profile bottomView">
    <div class="profile__container container">
      <div class="avatar__wrapper">
        <div class="avatar__preview"></div>
      </div>
      <div class="details__container">
        <h3><span>Email:</span> {{ user.email }}</h3>
        <h3><span>ID:</span> {{ user.id }}</h3>
        <h3><span>Dostęp do treningów wygasa:</span> 25.04.2020</h3>
        <div class="button__wrapper">
          <h4>
            Kliknij w przycisk poniej, jeśli zapomniałeś swoje hasło lub
            potrzebujesz je zmienieć.
          </h4>
          <div class="wrapper">
            <button
              v-if="!isVerified"
              class="dark"
              type="button"
              @click="verifyAccount"
            >
              Zweryfikuj konto
            </button>
            <button
              class="dark"
              v-show="false"
              type="button"
              @click="changeEmail"
            >
              Zmień email
            </button>
            <button class="dark" type="button" @click="changePassword">
              Zmień hasło
            </button>
            <button class="dark" type="button" @click="logOut">
              Wyloguj
            </button>
          </div>
        </div>
        <ChangeEmailComponent />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChangeEmailComponent from "@/components/authentication/ChangeEmailComponent.vue";
import { User } from "@/store/models";
import * as firebase from "firebase";

@Component({
  components: {
    ChangeEmailComponent
  }
})
export default class Profile extends Vue {
  isVerified = false;

  created() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.isVerified = user.emailVerified;
    }
  }
  get user(): User {
    return this.$store.getters.user;
  }

  get emailDialog(): boolean {
    return this.$store.getters.emailDialog;
  }

  set emailDialog(value: boolean) {
    this.$store.commit("setEmailDialog", value);
  }

  verifyAccount() {
    this.$store.dispatch("verifyAccount");
  }

  changeEmail() {
    this.emailDialog = true;
  }

  changePassword() {
    this.$store.dispatch("changePassword", this.user.email);
  }

  logOut() {
    this.$store.dispatch("signUserOut");
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
      h3 {
        font-size: 1.25rem;
      }
      h4 {
        font-size: 1rem;
      }
      .button__wrapper {
        .wrapper {
          @include flex;
          flex-direction: column;
          align-items: center;
          padding: 2vh 0;
          button {
            margin-top: 2vh;
          }
        }
      }
    }
  }
}
</style>
