<template>
  <v-app>
    <v-app-bar
        app
        flat
    >
      <v-container class="py-0 fill-height">
        <v-btn
            v-for="link in links2"
            :key="link"
            text
            rounded
            class="mr-1"
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
              flat
              hide-details
              rounded
              solo-inverted
          ></v-text-field>
        </v-responsive>
        <v-btn icon class="ml-2">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
        <v-btn icon class="ml-2">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        permanent
    >
      <div class="pa-4">
        <h1 class="text-center">APN</h1>
      </div>

      <v-list nav>
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
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <transition name="fade-transition" mode="out-in">
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer:  null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox', '/'],
      ['mdi-send', 'Send', '/about'],
      ['mdi-delete', 'Trash', '/items'],
      ['mdi-alert-octagon', 'Spam', '/dashboard'],
    ],
    links2: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
};
</script>
