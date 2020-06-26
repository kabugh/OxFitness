<template>
  <section class="profile bottomView">
    <div class="profile__container">
      <section class="hero shadow-box shadow-14">
        <div class="hero__container">
          <div class="avatar__container">
            <q-avatar color="white" text-color="black" size="4rem">{{
              user.name.charAt(0)
            }}</q-avatar>
          </div>
          <div class="user__details">
            <h3>{{ user.name }}</h3>
            <h4>{{ user.email }}</h4>
          </div>
        </div>
        <q-tabs
          v-model="currentTab"
          align="justify"
          narrow-indicator
          class="tabs"
        >
          <q-tab
            v-for="(element, index) in tabs"
            :name="element.name"
            :label="element.title"
            :key="index"
          />
        </q-tabs>
      </section>
      <q-tab-panels
        v-model="currentTab"
        animated
        swipeable
        infinite
        transition-prev="scale"
        transition-next="scale"
        class="tab-panels text-center"
      >
        <q-tab-panel name="validity"
          ><div class="details__container">
            <h3>
              <span>Dostęp do treningów wygasa:</span>
              {{ user.premiumAccount.validUntil | date }}
            </h3>
            <q-circular-progress
              show-value
              font-size="14px"
              :value="daysLeft"
              size="5rem"
              :max="30"
              :thickness="0.22"
              color="primary"
              track-color="grey-3"
              class="q-ma-md"
            >
              {{ daysLeft | daysFilter }}
            </q-circular-progress>
            <q-list>
              <div class="expansionItem__wrapper">
                <q-expansion-item
                  group="accordion"
                  dense
                  icon="receipt"
                  label="Szczegóły umowy"
                >
                  <div class="membership__details">
                    <span>Umowa OxFit na czas nieokreślony</span>
                  </div>
                  <button class="dark small-btn" type="button">
                    Przedłuz karnet
                  </button>
                </q-expansion-item>
              </div>
              <div class="expansionItem__wrapper">
                <q-expansion-item
                  dense
                  group="accordion"
                  icon="account_balance_wallet"
                  label="Stan płatności"
                >
                  {{ user.id }}
                </q-expansion-item>
              </div>
            </q-list>
          </div>
        </q-tab-panel>
        <q-tab-panel name="settings">
          <div class="details__container">
            <div class="button__wrapper">
              <div class="wrapper">
                <div class="expansionItem__wrapper">
                  <q-expansion-item
                    dense
                    icon="perm_identity"
                    label="Wyświetl ID konta"
                  >
                    {{ user.id }}
                  </q-expansion-item>
                </div>
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
                <ChangeEmailComponent />
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
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
  },
  filters: {
    date(value: any) {
      return new Date(value).toLocaleString();
    },
    daysFilter: (value: any) => (value > 1 ? `${value} dni` : `${value} dzień`)
  }
})
export default class Profile extends Vue {
  tabs = [
    { title: "Ważność karnetu", name: "validity" },
    { title: "Ustawienia", name: "settings" }
  ];
  currentTab = this.tabs[0].name;

  isVerified = false;
  daysLeft = 0;
  created() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.isVerified = user.emailVerified;
      this.calculateDaysLeft();
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

  calculateDaysLeft() {
    const currentDate = new Date().getUTCDay();
    const validUntilDate = new Date(
      this.user.premiumAccount.validUntil
    ).getUTCDay();
    this.daysLeft = Math.abs(Math.floor(validUntilDate - currentDate));
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
    .hero {
      width: 100%;
      height: 30vh;
      @include flex;
      flex-direction: column;
      align-items: center;
      @include backgroundDefault;
      background-image: url("../assets/bg.jpg");
      color: white;
      position: relative;
      z-index: 2;
      .hero__container {
        display: grid;
        column-gap: 5vw;
        grid-template-columns: repeat(2, auto);
        align-items: center;
        padding: 2rem;
        .user__details {
          h3 {
            font-size: 1.5rem;
            font-weight: bold;
          }
          h4 {
            font-size: 1rem;
            font-weight: 500;
          }
        }
      }
      .tabs {
        position: absolute;
        bottom: 0;
      }
    }
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
      grid-row-gap: 0.5vh;
      justify-content: center;
      align-items: center;
      padding: 4vh 6vw;
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
      .q-circular-progress {
        margin: 16px auto;
      }
      .expansionItem__wrapper {
        max-width: 80%;
        margin: 0 auto;
        padding: 1vh 0;
        .q-expansion-item__content {
          padding: 2vh 0;
          display: grid;
          row-gap: 2vh;
        }
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
