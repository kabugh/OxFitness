<template>
  <section class="profile bottomView">
    <div class="profile__container">
      <img
        src="@/assets/bg.jpg"
        v-show="false"
        @load="onImageLoad"
        alt="loadingImage"
      />
      <q-skeleton class="hero__skeleton" v-if="!isLoaded" />
      <section v-else class="hero shadow-box shadow-14">
        <div class="back__arrow" @click="$router.push('/dashboard')">
          <div class="arrow"></div>
        </div>
        <div class="hero__container">
          <div class="avatar__container">
            <q-avatar color="primary" text-color="white" size="4rem">{{
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
        class="tab-panels text-center easeInOutQuart"
      >
        <q-tab-panel name="validity"
          ><div class="details__container validity">
            <h3
              v-if="
                daysLeft >= 0 && user.premiumAccount.isActive && accountExpiry
              "
            >
              <span>Dostęp do treningów wygasa:</span>
              {{ user.premiumAccount.validUntil | date }}
            </h3>
            <h3 v-else-if="user.transactions">
              <span>Dostęp do treningów wygasł:</span>
              {{ user.premiumAccount.validUntil | date }}
            </h3>
            <h3 v-else><span>Brak dostępu do treningów</span></h3>
            <q-circular-progress
              v-if="
                daysLeft >= 0 && user.premiumAccount.isActive && accountExpiry
              "
              show-value
              font-size="14px"
              :value="daysLeft"
              size="5rem"
              :max="30"
              :thickness="0.22"
              color="primary"
              track-color="grey-3"
              class="q-ma-md"
              @click="notificationsPermission"
            >
              {{ daysLeft | daysFilter }}
            </q-circular-progress>
            <q-list>
              <div class="expansionItem__wrapper">
                <q-expansion-item
                  group="accordion"
                  popup
                  icon="receipt"
                  label="Szczegóły umowy"
                >
                  <q-separator />
                  <q-card>
                    <q-card-section>
                      Umowa OxFitness na czas nieokreslony
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  group="accordion"
                  popup
                  icon="account_balance_wallet"
                  label="Stan płatności"
                >
                  <q-separator />
                  <q-card>
                    <q-card-section v-if="daysLeft >= 0 && user.transactions"
                      >Płatność uregulowana</q-card-section
                    >
                    <q-card-section v-else>
                      <p>Płatność nieuregulowana</p>
                      <q-btn
                        v-if="isOnline"
                        @click="$router.push('/dashboard')"
                        class="bg-primary text-white"
                        >Wykup dostęp</q-btn
                      >
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  group="accordion"
                  popup
                  icon="card_membership"
                  label="Historia płatności"
                  v-if="
                    user.transactions &&
                      Object.values(user.transactions).length > 0
                  "
                >
                  <q-separator />
                  <q-card style="max-width: 100%">
                    <q-card-section>
                      <PaymentsTable :transactions="user.transactions" />
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </div>
            </q-list>
          </div>
        </q-tab-panel>
        <q-tab-panel name="settings">
          <div class="details__container">
            <div class="details__content">
              <q-list padding>
                <q-item-label header>Ustawienia ogólne</q-item-label>
                <q-item tag="label">
                  <q-item-section side top>
                    <q-checkbox v-model="user.settings.notifications" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Powiadomienia</q-item-label>
                    <q-item-label caption>
                      Wyświetlaj powiadomienia o nowych treningach, postach
                      trenerów.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label">
                  <q-item-section side top>
                    <q-checkbox v-model="user.settings.displayResults" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Wyświetlanie rezultatów</q-item-label>
                    <q-item-label caption>
                      Zezwalaj na wyświetlanie Twoich rezultatów z treningów w
                      tabeli wszystkich wyników.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label">
                  <q-item-section avatar>
                    <q-toggle
                      color="primary"
                      v-model="user.settings.darkMode"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-if="user.settings.darkMode"
                      >Tryb ciemny 🌒</q-item-label
                    >
                    <q-item-label v-else>Tryb jasny ☀️</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item-label header>Szczegóły konta</q-item-label>
                <q-item>
                  <q-item-section>
                    <q-item-label>ID konta</q-item-label>
                    <q-item-label caption>
                      {{ user.id }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable @click="changeUsername" v-if="isOnline">
                  <q-item-section>
                    <q-item-label>Zmień nazwę</q-item-label>
                    <q-item-label caption>
                      Kliknij, aby zmienić nazwę użytkownika.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  @click="changePassword"
                  v-if="isOnline && isVerified"
                >
                  <q-item-section>
                    <q-item-label>Zmień hasło</q-item-label>
                    <q-item-label caption>
                      Kliknij, aby zmienić hasło. Link zostanie wysłany na
                      powiązany adres email.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  @click="verifyAccount"
                  v-if="!isVerified && isOnline"
                >
                  <q-item-section>
                    <q-item-label>Zweryfikuj konto</q-item-label>
                    <q-item-label caption>
                      Otrzymasz wiadomość na powiązany adres email z linkiem
                      aktywacyjnym.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  @click="changeEmail"
                  v-if="isOnline && isVerified"
                >
                  <q-item-section>
                    <q-item-label>Zmień adres email</q-item-label>
                    <q-item-label caption>
                      Otrzymasz wiadomość informacyjną na powiązany adres email
                      - nie musisz na nią odpowiadać.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable @click="logOut">
                  <q-item-section>
                    <q-item-label>Wyloguj się</q-item-label>
                    <q-item-label caption>
                      Kliknij, aby wylogować się.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable @click="deleteAccount">
                  <q-item-section>
                    <q-item-label>Usuń konto</q-item-label>
                    <q-item-label caption>
                      Kliknij, aby bezpowrotnie usunąć swoje konto.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <ChangeEmail />
              <ChangeUsername />
              <Reauthentication :action="triggerAction" />
              <DeleteConfirmation :user="user" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ChangeEmail from "@/components/authentication/ChangeEmail.vue";
import ChangeUsername from "@/components/authentication/ChangeUsername.vue";
import Reauthentication from "@/components/authentication/Reauthentication.vue";
import DeleteConfirmation from "@/components/authentication/DeleteConfirmation.vue";

import PaymentsTable from "@/components/visuals/PaymentsTable.vue";

import { Transaction, User } from "@/store/models";
import * as firebase from "firebase";
import { VueOfflineMixin } from "vue-offline";

@Component({
  components: {
    ChangeEmail,
    ChangeUsername,
    Reauthentication,
    DeleteConfirmation,
    PaymentsTable
  },
  mixins: [VueOfflineMixin],
  filters: {
    date(value: any) {
      return new Date(value).toLocaleString();
    },
    daysFilter: (value: any) => (value != 1 ? `${value} dni` : `${value} dzień`)
  }
})
export default class Profile extends Vue {
  tabs = [
    { title: "Ważność karnetu", name: "validity" },
    { title: "Ustawienia", name: "settings" }
  ];

  currentTab = this.tabs[0].name;
  triggerAction = "";

  isLoaded = false;
  isVerified = false;
  daysLeft = 0;

  created() {
    this.accountExpiry();
    let user = firebase.auth().currentUser;
    if (user && this.user.premiumAccount.validUntil.length !== 0) {
      this.isVerified = user.emailVerified;
      this.calculateDaysLeft();
    } else if (!user) {
      this.logOut();
    }
  }

  mounted() {
    this.$store.dispatch("monitorTokenRefresh");
  }

  get transactionsType() {
    const transactions = Object.values(this.user.transactions);
    const transactionsLastItem = transactions[transactions.length - 1];
    // eslint-disable-next-line no-console
    console.log(!(typeof transactionsLastItem === "string"));
    return !(typeof transactionsLastItem === "string");
  }

  notificationsPermission() {
    this.$store.dispatch("getMessagingToken");
  }

  findDaysBetween(startDate: Date, endDate: Date) {
    // The number of milliseconds in all UTC days (no DST)
    const oneDay = 1000 * 60 * 60 * 24;
    // A day in UTC always lasts 24 hours
    const start = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );
    const end = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    // it's safe to divide by 24 hours
    return (start - end) / oneDay;
  }

  @Watch("user.premiumAccount.validUntil")
  calculateDaysLeft() {
    const currentDate = new Date();
    const validUntilDate = new Date(this.user.premiumAccount.validUntil);
    this.daysLeft = this.findDaysBetween(currentDate, validUntilDate);
  }

  onImageLoad() {
    this.isLoaded = true;
  }

  @Watch("user.settings.displayResults")
  @Watch("user.settings.notifications")
  updateSettings() {
    this.$store.dispatch("updateUserSettings", this.user.settings);
  }

  accountExpiry() {
    const currentDate = new Date();
    const validUntilDate = new Date(this.user.premiumAccount.validUntil);
    return validUntilDate > currentDate;
  }

  verifyAccount() {
    this.$store.dispatch("verifyAccount");
  }

  changeEmail() {
    this.triggerAction = "setEmailDialog";
    this.emailDialog = true;
  }

  changeUsername() {
    this.triggerAction = "setUsernameDialog";
    this.usernameDialog = true;
  }

  deleteAccount() {
    this.triggerAction = "setDeleteDialog";
    this.deleteDialog = true;
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

  get usernameDialog(): boolean {
    return this.$store.getters.usernameDialog;
  }

  set usernameDialog(value: boolean) {
    this.$store.commit("setUsernameDialog", value);
  }

  get deleteDialog(): boolean {
    return this.$store.getters.deleteDialog;
  }

  set deleteDialog(value: boolean) {
    this.$store.commit("setDeleteDialog", value);
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
    .hero__skeleton {
      width: 100%;
      height: 30vh;
      @media (min-height: 1100px) {
        height: 15vh;
      }
    }
    .hero {
      width: 100%;
      height: 40vh;
      @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
        min-height: 40vh;
      }
      @media (min-width: 360px) {
        height: 30vh;
      }
      @media (min-height: 1100px) {
        height: 15vh;
      }
      @include flex;
      flex-direction: column;
      align-items: center;
      @include backgroundDefault;
      background-image: url("../assets/bg.jpg");
      color: white;
      position: relative;
      z-index: 2;

      .back__arrow {
        position: absolute;
        top: 2vh;
        left: 2vh;
        @media (min-width: 450px) {
          top: 4vh;
          left: 4vh;
        }
        &:hover {
          cursor: pointer;
        }
        .arrow {
          background-image: url("../assets/icons/arrow.png");
          @include backgroundDefault;
          width: 36px;
          height: 36px;
          transform: rotate(180deg);
        }
      }
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
    .q-panel {
      overflow: hidden;
    }
    .tab-panels {
      transition: background 0.3s cubic-bezier(0.65, 0, 0.35, 1),
        color 0.3s cubic-bezier(0.65, 0, 0.35, 1), opacity 0s !important;
      .q-item {
        transition: none !important;
      }
    }
    .details__container {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 0.5vh;
      justify-content: center;
      align-items: center;
      &.validity {
        row-gap: 2vh;
        padding: 4vh 0;
        .q-list .q-card__section .q-btn {
          margin-top: 2vh;
        }
        @media (min-width: 768px) {
          .q-list {
            padding: 0 4vw;
          }
        }
        @media (min-width: 1024px) {
          .q-list {
            padding: 0 24vw;
          }
        }
      }
      h3,
      h4 {
        font-weight: 400;
        text-align: center;
        span {
          font-weight: bolder;
        }
      }
      h3 {
        font-size: 1rem;
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
      }
      .details__content {
        @include flex;
        flex-direction: column;
        align-items: center;
        .q-list {
          text-align: left;
        }
        button {
          margin-top: 2vh;
        }
      }
      @media (min-width: 360px) {
        h3 {
          font-size: 1.25rem;
        }
      }
    }
  }
}
</style>
