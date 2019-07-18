<template>
  <div id="app" class="text-black">
    <div class="flex h-screen">
      <div
        class="flex-1 flex justify-center items-center relative"
        style="background-color: #EAEAEA;"
      >
        <div v-if="!currentTask">
          <podomoro :size="300" class="mb-12">
            <span class="text-2xl font-light text-white tracking-widest">
              PODOMORO
            </span>
          </podomoro>

          <p class="text-sm leading-tight tracking-wider">
            You don't have any task now,<br />please add task first!
          </p>
        </div>
        <process v-else :task="currentTask"></process>

        <p
          class="absolute text-2xs font-light tracking-widest bottom-0 mb-12 mx-auto w-full"
        >
          PODOMORO
        </p>

        <div
          class="toggler z-10 cursor-pointer absolute p-3 pr-5 mb-6 bottom-0 -right-4 bg-white flex flex-row items-center text-black"
          @click="toggle"
        >
          <podomoro :size="25" class="mr-3"></podomoro>

          <icon-svg
            icon="arrow"
            class="toggler-icon"
            :class="[showSidebar ? 'close' : 'open']"
          ></icon-svg>
        </div>
      </div>

      <aside
        class="sidebar text-white bg-black flex relative"
        style="max-width: 50%"
      >
        <div
          class="min-h-full bg-black flex flex-col border-gray border-r-2 relative"
        >
          <icon-svg
            v-for="menu in menus"
            :key="`menu_${menu}`"
            :icon="menu"
            class="menu cursor-pointer"
            :class="[selectedMenu === menu ? 'text-primary' : 'text-white']"
            style="width: 80px; height: 80px;"
            @click.native="switchMenu(menu)"
          ></icon-svg>
        </div>

        <transition name="slide">
          <div v-if="showSidebar" class="h-full page-width">
            <div class="page-width text-left py-6 px-8">
              <transition name="fade" mode="out-in">
                <component :is="menuComponent"></component>
              </transition>
            </div>
          </div>
        </transition>
      </aside>
    </div>
  </div>
</template>

<script>
import Podomoro from './components/Podomoro'
import IconSvg from './components/IconSvg'
import Process from './components/Process'

import NewTask from './components/NewTask'
import TaskList from './components/TaskList'
import TaskAnalysis from './components/TaskAnalysis'
import RingtoneSetting from './components/RingtoneSetting'

import { mapGetters  } from 'vuex'

export default {
  name: 'app',

  components: {
    Podomoro,
    IconSvg,
    Process,
    NewTask,
    TaskList,
    TaskAnalysis,
    RingtoneSetting,
  },

  data() {
    return {
      menus: ['add', 'list', 'analysis', 'ringtone'],
      selectedMenu: 'add',
      showSidebar: true,
    }
  },

  computed: {
    ...mapGetters(['todoTasks']),

    currentTask() {
      return this.todoTasks.length > 0 ? this.todoTasks[0] : null
    },

    menuComponent() {
      switch (this.selectedMenu) {
        case 'add':
          return NewTask
        case 'list':
          return TaskList
        case 'analysis':
          return TaskAnalysis
        case 'ringtone':
          return RingtoneSetting
        default:
          return NewTask
      }
    },
  },

  methods: {
    toggle() {
      this.showSidebar = !this.showSidebar
    },

    switchMenu(menu) {
      this.selectedMenu = menu

      this.showSidebar = true
    },
  },
}
</script>

<style>
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

.menu {
  transition: color 0.3s ease;
}

.toggler {
  border-radius: 25px 5px 5px 25px;
}

.slide-enter-active,
.slide-leave-active {
  max-width: 100vw;
  transition: all 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  max-width: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page-width {
  width: calc(50vw - 80px);
}

.toggler-icon {
  transition: all 0.3s ease;
  width: 20px;
}

.toggler-icon.open {
  transform: rotate(180deg);
}

.toggler-icon.close {
  transform: rotate(360deg);
}
</style>
