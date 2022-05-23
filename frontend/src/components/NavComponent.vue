<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="myOrange">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title>
          <div class="flex spaceb">
            <router-link class="decorNone Cwhite" to="/">Sable</router-link>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon>
                <img
                  alt="Quasar logo"
                  src="@/assets/logo.png"
                  style="width: 30px; height: 30px"
                />
              </q-icon>
            </q-item-section>

            <q-item-section> Sable </q-item-section>
          </q-item>

          <q-item v-if="adminAuth()" active clickable v-ripple to="/admin">
            <q-item-section avatar>
              <q-icon name="lock" />
            </q-item-section>

            <q-item-section> Admin </q-item-section>
          </q-item>
          <q-item v-if="userAuth()" active clickable v-ripple to="/projects">
            <q-item-section avatar>
              <q-icon name="cases" />
            </q-item-section>

            <q-item-section> Projects </q-item-section>
          </q-item>
          <q-item v-if="!userAuth()" clickable v-ripple to="/register">
            <q-item-section avatar>
              <q-icon name="person_add" />
            </q-item-section>

            <q-item-section> Sign Up </q-item-section>
          </q-item>
          <q-item v-if="userAuth()" active clickable v-ripple to="/logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Log Out </q-item-section>
          </q-item>
          <q-item v-else active clickable v-ripple to="/login">
            <q-item-section avatar>
              <q-icon name="login" />
            </q-item-section>

            <q-item-section> Log In </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.myOrange {
  background-color: map-get($cs, 4) !important;
}
.myOrange_color {
  color: map-get($cs, 4) !important;
}
#sign {
  font-size: 14px;
  align-items: center;
}
</style>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      leftDrawerOpen: ref(false),
      miniState: ref(true),

      userAuth() {
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
      adminAuth() {
        return localStorage.getItem("level") === "admin";
      },
    };
  },
};
</script>
