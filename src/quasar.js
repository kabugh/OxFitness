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
  TouchSwipe,
  QList,
  QExpansionItem,
  QItem,
  QItemSection,
  QItemLabel,
  QAvatar,
  Notify,
  QOptionGroup,
  QTabPanels,
  QTabPanel,
  QAjaxBar,
  QTable,
  QTh,
  QTr,
  QTd
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
    QInnerLoading,
    QList,
    QExpansionItem,
    QItem,
    QItemSection,
    QItemLabel,
    QAvatar,
    QOptionGroup,
    QTabPanels,
    QTabPanel,
    QAjaxBar,
    QTable,
    QTh,
    QTr,
    QTd
  },
  directives: { ClosePopup, TouchSwipe },
  plugins: {
    Notify
  }
});
