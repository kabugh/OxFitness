import Vue from "vue";

import "./styles/quasar.scss";
import "quasar/dist/quasar.ie.polyfills";
import "@quasar/extras/material-icons/material-icons.css";
import {
  Quasar,
  QBtn,
  QIcon,
  QCard,
  QCardSection,
  QCardActions,
  QRating,
  QImg,
  QSeparator,
  QDialog,
  ClosePopup,
  QTabs,
  QTab,
  QRouteTab,
  QPullToRefresh,
  QSkeleton,
  QInnerLoading,
  TouchSwipe
} from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    QBtn,
    QCard,
    QCardSection,
    QCardActions,
    QRating,
    QImg,
    QSeparator,
    QDialog,
    QIcon,
    QTabs,
    QTab,
    QRouteTab,
    QPullToRefresh,
    QSkeleton,
    QInnerLoading
  },
  directives: { ClosePopup, TouchSwipe },
  plugins: {}
});
