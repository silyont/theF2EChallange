import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: uuid.v4(),
        title: 'My First Task',
        estimatedTime: 5,
        consumedTime: 4.7,
        finished: true
      }
    ],
  },
  getters: {
    todoTasks: state => {
      return state.tasks.filter(task => !task.finished)
    },
    doneTasks: state => {
      return state.tasks.filter(task => task.finished)
    },
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push({
        id: uuid.v4(),
        ...task,
        consumedTime: 0,
        finished: false,
      })
    },

    UPDATE_CONSUMED_TIME(state, { taskId, time }) {
      const task = state.tasks.find(task => task.id === taskId)

      if (task) {
        task.consumedTime = time
      }
    },

    FINISH_TASK(state, taskId) {
      const task = state.tasks.find(task => task.id === taskId)

      task.finished = true
    },
  },
  actions: {},
})
