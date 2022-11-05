import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import './style-dipp.css';
import api from './api/index.js';

Vue.config.productionTip = false;

const PREFIX = 'apn';
function _t(s) {
  if (!s) {
    throw new Error('Undefined string');
  }
  return `${PREFIX}_${s}`;
}

function getItem(s) {
  if (!s) {
    throw new Error('Undefined string');
  }
  return localStorage.getItem(_t(s));
}

function setItem(s, v) {
  if (!s) {
    throw new Error('Undefined string');
  }
  return localStorage.setItem(_t(s), v);
}

Vue.prototype.$store = {
  app: {
    common: Vue.observable({
      showBottomNavigation: false,
    }),
    snackbar: Vue.observable({
      model: false,
      color: 'info',
      timeout: 3000,
      text: 'Ok',
    }),
    confirmDialog: Vue.observable({
      model: false,
      title: 'Confirm your actions',
      text: 'Are you sure?',
      width: 400,
      cancel: null,
      ok: null,
      activator: null,
    }),
  },
  settings: Vue.observable({
    get isThemeDark() {
      const res = getItem('isThemeDark');
      if (!res) {
        return false;
      }
      return res === 'true';
    },
    set isThemeDark(value) {
      setItem('isThemeDark', value);
    },
    get isAuth() {
      const res = getItem('isAuth');
      if (!res) {
        return false;
      }
      return res === 'true';
    },
    set isAuth(value) {
      setItem('isAuth', value);
    },
  }),
};

Vue.prototype.$api = {
  app: {
    snack(text, color = 'info') {
      const show = () => {
        this.$store.app.snackbar.text = text;
        this.$store.app.snackbar.color = color;
        this.$store.app.snackbar.model = true;
      };
      if (this.$store.app.snackbar.model) {
        this.$store.app.snackbar.model = false;
        setTimeout(show, 200);
      } else {
        show();
      }
    },

    snackInfo(text) {
      this.snack(text || 'Ok');
    },

    snackError(text) {
      this.snack(text || 'Error', 'error');
    },

    snackSuccess(text) {
      this.snack(text || 'Success', 'success');
    },

    openConfirmDialog({title = null, text = null, ok = null, cancel = null, activator=null}) {
      this.$store.app.confirmDialog.title = title;
      this.$store.app.confirmDialog.text = text;
      this.$store.app.confirmDialog.activator = activator;
      this.$store.app.confirmDialog.ok = () => {
        if (ok) {
          ok();
        }
        this.$store.app.confirmDialog.model = false;
      };
      this.$store.app.confirmDialog.cancel = () => {
        if (cancel) {
          cancel();
        }
        this.$store.app.confirmDialog.model = false;
      };
      this.$store.app.confirmDialog.model = true;
    },

    openUrl(url) {
      window.open(url, '_self');
    },

    openSameOriginUrl(url = '') {
      window.open(`${window.location.origin}${url ? `/${url}` : ''}`, '_self');
    },
  },
  auth: {
    async signOut() {
      try {
        // localStorage.removeItem('apn_isAuth');
        // this.$store.main.isAuth = false;
        this.$store.settings.isAuth = false;
      } catch (e) {
        console.error(e);
        this.$api.app.snackInfo('Возникли проблемы при выходе из аккаунта');
      }
    },
  },
  main: api,
};

const app = new Vue({
  router,
  vuetify,
  watch: {
    '$store.settings.isThemeDark'(v) {
      app.$vuetify.theme.isDark = v;
    },
  },
  render: h => h(App),
}).$mount('#app');

// app.$api.auth = {
//   async signOut() {
//     try {
//       // localStorage.removeItem('apn_isAuth');
//       // this.$store.main.isAuth = false;
//       app.$store.settings = false;
//     } catch (e) {
//       console.error(e);
//       this.$api.app.snackInfo('Возникли проблемы при выходе из аккаунта');
//     }
//   },
// };

Object.keys(app.$api).forEach(k => {
  app.$api[k].$app = app;
  app.$api[k].$store = app.$store;
  app.$api[k].$api = app.$api;
  app.$api[k].$router = app.$router;
});

// eslint-disable-next-line no-underscore-dangle
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  window.__app = app;
}
