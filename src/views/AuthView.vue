<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{'is-active': !register}">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{'is-active': register}">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <div
            v-if="formTitle === 'Register'"
            class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
                v-model="credentials.name"
                class="input"
                type="text"
                placeholder="e.g. alexsmith@gmail.com">
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
                v-model="credentials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com">
          </div>
        </div>

        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                  v-model="credentials.password"
                  class="input"
                  type="password"
                  placeholder="Enter a password">
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script
    setup
    lang="ts">

/*
  imports
*/
import {useStoreAuth} from "@/stores/storeAuth.js";
import {computed, reactive, ref} from 'vue';
import {useRouter} from "vue-router";
import {httpRequest} from "@/api";

const storeAuth = useStoreAuth();
const router = useRouter();


/*
  form data and methods
 */
const register = ref(false);

const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login';
});

type requestData = {
  email: string,
  password: string,
  name?: string,
};

const loginUser = async (url: string, data: any) => {
  try {
    const result = await httpRequest({method: 'POST', url, data});
    if (result.token) {
      storeAuth.saveAuthToken(result.token);
      await router.push('/');
    } else {
      storeAuth.removeAuthToken();
    }
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (url: string, data: any) => {
  try {
    await httpRequest({method: 'PUT', url, data});
    storeAuth.removeAuthToken();
    await router.push('/auth');
  } catch (error) {
    console.log(error);
  }
};

const onSubmit = async () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter an email and password!');
  } else {

    const data: requestData = {
      email: credentials.email,
      password: credentials.password,
    };

    if (register.value) {
      data.name = credentials.name;
      await registerUser('/auth/signup', data);
    } else {
      await loginUser('/auth/login', data);
    }
  }
};

/*
  credentials
*/

const credentials = reactive({
  email: '',
  name: '',
  password: '',
});
</script>

<style>
.auth-form {
  margin: 0 auto;
}
</style>
