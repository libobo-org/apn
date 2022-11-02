<template>
  <div class="d-flex" style="align-items: center; width: 100vw; height: 100vh;">
    <v-card class="mx-auto" style="width: 400px;">
      <div class="pa-8">
        <Logo/>
        <h2 class="my-4 text-center">Авторизация</h2>
        <div class="caption">Логин</div>
        <v-text-field
            v-model="authLogin"
            outlined dense hide-details
            class="mb-4"
        />
        <div class="caption">Пароль</div>
        <v-text-field
            v-model="authPassword"
            :type="isShowPassword ? 'text' : 'password'"
            :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isShowPassword = !isShowPassword"
            class="mb-4"
            outlined
            dense
            hide-details
        />
        <v-btn
            :loading="isAuthLoading"
            @click="signIn"
            depressed
            block
            large
            color="primary"
            style="font-size: 1.1rem;"
        >
          Войти
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import Logo from '../components/Logo.vue';
export default {
  name: 'LoginView',
  components: {Logo},
  data() {
    return {
      authLogin: '',
      authPassword: '',
      isAuthLoading: false,
      isShowPassword: false,
    };
  },
  methods: {
    signIn() {
      this.isAuthLoading = true;
      setTimeout(() => {
        this.isAuthLoading = false;
        // localStorage.setItem('apn_isAuth', 'true');
        this.$store.settings.isAuth = true;
        this.$router.push('/');
      }, 1000);
    },
  },
};
</script>

<style scoped>

</style>
