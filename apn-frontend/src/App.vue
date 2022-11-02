<template>
  <v-app>
    <v-app-bar
        v-if="isAuth"
        app
        flat
    >
      <v-container class="py-0 fill-height">
        <transition name="fade-transition" mode="out-in">
          <h1>{{ $route.meta.title }}</h1>
        </transition>

        <v-spacer></v-spacer>

<!--        <v-btn-->
<!--            v-for="link in links2"-->
<!--            :key="link"-->
<!--            text-->
<!--            rounded-->
<!--            class="mr-2"-->
<!--            @click="onClick(link)"-->
<!--        >-->
<!--          {{ link }}-->
<!--        </v-btn>-->

<!--        <v-responsive max-width="260">-->
<!--          <v-text-field-->
<!--              flat-->
<!--              hide-details-->
<!--              rounded-->
<!--              solo-inverted-->
<!--          ></v-text-field>-->
<!--        </v-responsive>-->
        <v-btn icon class="ml-2"  @click="onClick()">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn icon class="ml-2"  @click="onClick()">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
        <v-btn icon class="ml-2" @click="signOut">
          <v-icon class="ml-1">mdi-logout</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
        v-if="isAuth"
        v-model="drawer"
        app
        permanent
    >
      <div class="pa-4">
        <Logo/>
      </div>

      <v-list nav>
        <v-list-item-group
            v-model="selectedItem"
            color="primary"
        >
          <v-list-item
              v-for="[icon, text, to] in links"
              :key="icon"
              link
              :to="to"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <transition name="fade-transition" mode="out-in">
        <router-view/>
      </transition>
    </v-main>

    <Snackbar/>
    <ConfirmDialog/>
  </v-app>
</template>

<script>

import Logo from "@/components/Logo";
import Snackbar from "@/components/Snackbar";
import ConfirmDialog from "@/components/ConfirmDialog";
export default {
  name: 'App',
  components: {ConfirmDialog, Snackbar, Logo},
  data: () => ({
    drawer:  null,
    links: [
      ['mdi-home', 'Главная', '/home'],
      ['mdi-send', 'Рекомендации', '/recommendation'],
      ['mdi-delete', 'Аналитика', '/analytics'],
      ['mdi-alert-octagon', 'ТН ВЭД', '/tnved'],
      ['mdi-account-multiple', 'Пользователи', '/users'],
    ],
    links2: [
      'Dashboard',
      // 'Messages',
      'Profile',
      // 'Updates',
    ],
    selectedItem: 0,
    isAuth: false,
  }),
  watch: {
    '$store.settings.isAuth': {
      immediate: true,
      handler() {
        this.isAuth = this.$store.settings.isAuth;
      },
    },
  },
  methods: {
    onClick() {
      this.$api.app.snackInfo('Не тыкай сюда');
    },
    signOut() {
      this.$api.app.openConfirmDialog({
        title: 'Выход из аккаунта',
        text: 'Вы уверены, что хотите выйти из аккаунта?',
        ok: () => {
          this.$api.auth.signOut();
          this.$router.push('/login').catch(() => {});
        },
      });
    },
  },
};
</script>
