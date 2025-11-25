<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a1a] to-[#0a0a0f] flex justify-center items-center p-4 sm:p-6 lg:p-8 font-plus-jakarta">
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 max-w-5xl w-full">
      <!-- Left Sidebar -->
      <div class="bg-gradient-to-b from-[#1a1a2e] to-[#16162a] rounded-2xl p-4 sm:p-6 w-full lg:w-80 border border-red-900/30 shadow-lg shadow-red-900/20">
        <!-- Header -->
        <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#f6b246] to-[#e85d04] rounded-xl flex items-center justify-center flex-shrink-0">
            <span class="text-white font-bold text-base sm:text-lg">TD</span>
          </div>
          <div class="min-w-0">
            <h1 class="text-white font-semibold text-base sm:text-lg">Todo — Studio</h1>
            <p class="text-gray-400 text-xs sm:text-sm truncate">Placeholder UI — CRUD-ready. Frontend only.</p>
          </div>
        </div>

        <!-- List Items -->
        <div class="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <!-- All Lists -->
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full flex-shrink-0"></div>
            <div>
              <p class="text-gray-400 text-xs sm:text-sm">All Lists</p>
              <p class="text-white font-semibold text-sm sm:text-base">Personal</p>
            </div>
          </div>

          <!-- Due Today -->
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#f6b246] rounded-full flex-shrink-0"></div>
            <div>
              <p class="text-gray-400 text-xs sm:text-sm">Due Today</p>
              <p class="text-white font-semibold text-sm sm:text-base">3 items</p>
            </div>
          </div>

          <!-- Completed -->
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0"></div>
            <div>
              <p class="text-gray-400 text-xs sm:text-sm">Completed</p>
              <p class="text-white font-semibold text-sm sm:text-base"><span>{{ completedItems }}</span> items</p>
            </div>
          </div>
        </div>

        <!-- Project Footer -->
        <div class="mt-auto pt-4 sm:pt-6 border-t border-gray-700/50">
          <p class="text-gray-400 text-xs sm:text-sm mb-1">Project</p>
          <p class="text-white font-semibold text-sm sm:text-base">Website Revamp • Client A</p>
        </div>
      </div>

      <!-- Right Panel - Task List -->
      <div class="bg-gradient-to-b w-auto lg:max-h-[800px] from-[#1a1a2e] to-[#16162a] rounded-2xl p-4 sm:p-6 flex-1 border border-red-900/30 shadow-lg shadow-red-900/20 overflow-y-auto hide-scrollbar">
        <div class="wrapper h-auto">
        <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div>
              <h2 class="text-white text-xl sm:text-2xl font-semibold">Today</h2>
              <p class="text-gray-400 text-xs sm:text-sm">{{ currentdate }} • <span class="ongoing-task"> {{ ongoingTask }}</span></p>
            </div>
            <div class="flex items-center gap-1 sm:gap-2 flex-wrap">
              <button class="text-gray-400 hover:text-white text-xs sm:text-sm px-2 sm:px-3 py-1 cursor-pointer transition-colors">Sort</button>
              <button class="text-gray-400 hover:text-white text-xs sm:text-sm px-2 sm:px-3 py-1 cursor-pointer transition-colors">Filter</button>
              <button
                @click="handleBatchDelete"
                class="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg cursor-pointer hover:from-red-500 hover:to-red-400 transition-all">Clear completed</button>
            </div>
          </div>

          <!-- Input -->
          <div class="flex gap-2 sm:gap-3 mb-4 sm:mb-6 ">
            <div class="flex flex-col w-full gap-y-3">
              <input
              type="text"
              class="flex-1 bg-[#0d0d14] border border-gray-700/50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="Add a new task"
              v-model="todoTitle"
            >
            <input
              type="text"
              class="flex-1 bg-[#0d0d14] border border-gray-700/50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
              placeholder="Add a new description"
              v-model="todoDescription"
            ></div>

            <button
              @click.stop
              @click="isEditing ? handleEditItem(editItemId) : handleAddTodoListItem()"
              class="bg-gradient-to-r from-[#f6b246] to-[#e85d04] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm
                            sm:text-base cursor-pointer hover:from-[#f6b246] hover:to-[#f6b246] transition-all">
                            <span v-if="isEditing == false">Add</span>
                            <span v-if="isEditing == true">Done</span>
                          </button>
          </div>

          <!-- Task List -->
          <div class="space-y-2 sm:space-y-3">
            <!-- Task 1 -->
            <div v-for="(item, index) in todoListItems" :key="index" class="bg-[#0d0d14]/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/30 hover:border-red-900/50 transition-colors ">
              <div class="flex justify-between items-center gap-2">
                <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    @click="handleCompleteItem(item._id)"
                    class="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-600 rounded cursor-pointer hover:border-[#f6b246] transition-colors flex-shrink-0">
                    <svg
                      v-if="item.isCompleted"
                      class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#f6b246] m-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="min-w-0">
                    <p
                      :class="item.isCompleted ? 'line-through text-gray-400': 'text-white'"
                      class=" font-medium text-sm sm:text-base truncate ">{{ item.title }}</p>
                    <p class="text-gray-400 text-xs sm:text-sm truncate">{{ item.description }}</p>

                  </div>
                </div>
                <div class="flex gap-2 sm:gap-3 flex-shrink-0">
                  <button
                    @click="startEdit(item)"
                    class="text-gray-500 hover:text-white text-xs sm:text-sm cursor-pointer transition-colors">Edit</button>
                  <button
                    @click="handleItemDelete(item._id)"
                    class="text-gray-500 hover:text-red-400 text-xs sm:text-sm cursor-pointer transition-colors">Del</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MainPage',

  data() {
    return {
    todoDescription : '',
    todoTitle: '',

    showError: false,
    erroMessage: '',
    ongoingTask: 0,
    isEditing: false,
    editItemId: null,

    currentdate: '',

    baseurl:import.meta.env.VITE_BASE_APP_URL,

    todoListItems: [],
    }
  },
  computed: {
    completedItems(){
      return this.todoListItems.filter(i => i.isCompleted).length
    }
  },
  methods: {
    async getTodoItems(){

      try {
        const { data }  = await axios.get(`${this.baseurl}/api/all-items`, {
          timeout: 15000
        })

        this.todoListItems = data.data || []
        this.ongoingTask = this.todoListItems.length
        // console.log('data: ', this.todoListItems)

      } catch (error) {
        this.showError = true
        this.errorMessage = 'Error on fetching todo list item'
        console.log("Error on fetching todo list item", error)
      }
    },

    async handleAddTodoListItem(){

      try {
        if(!this.todoTitle|| !this.todoTitle.trim()){
          this.showError = true
          console.log("Title is Required! ")
          return
        }

        const payload = {
          title: this.todoTitle,
          description: this?.todoDescription
        }

        await axios.post(`${this.baseurl}/api/create-item`, payload , {
          headers: {"Content-Type": "application/json"},
          timeout: 15000
        })

        this.todoTitle = ''
        this.todoDescription = ''
        this.showError = false

        this.getTodoItems();

      } catch (error) {
        this.showError = true
        this.errorMessage = 'Error on adding todo list item'
        console.log("Error on adding todo list item", error)
    }
    },

    async handleCompleteItem(userId){
      //find item
      const item = this.todoListItems.find(i => i._id === userId)
      const originalState = item.isCompleted

      item.isCompleted = !item.isCompleted

      try {
        if(!userId){
          this.showError = true
          this.errorMessage = "Item not found"
          return
        }
        await axios.patch(`${this.baseurl}/api/toggle-item/${userId}`,{
          isCompleted: item.isCompleted
        })
        this.getTodoItems()
        console.log('item updated')

      } catch (error) {
        this.showError = true
        item.isCompleted = originalState
        this.errorMessage = 'Error on updating todo list item'
        console.log("Error on updating todo list item", error)
      }
    },

    async handleItemDelete(userId){
      try {
        if(!userId){
          this.showError = true
          this.errorMessage = "Item not found"
          return
        }

        await axios.delete(`${this.baseurl}/api/delete-item/${userId}`,{
          timeout: 15000,
        })
        this.getTodoItems()
        console.log('item deleted')

      } catch (error) {
        this.showError = true
        this.errorMessage = 'Error on deleting todo list item'
        console.log("Error on deleting todo list item", error)
      }
    },

    async handleEditItem(userId){
      try {

        if(!userId){
          this.showError = true
          this.errorMessage = "Item not found"
          return
        }

        if(!this.todoTitle|| !this.todoTitle.trim()){
          this.showError = true
          console.log("Title is Required! ")
          return
        }

        const editedValue ={
          title: this.todoTitle,
          description: this?.todoDescription
        }

        await axios.patch(`${this.baseurl}/api/edit-item/${userId}`, editedValue, {
          headers: {"Content-Type" : " application/json"},
          timeout: 15000
        })

        this.todoTitle = ''
        this.todoDescription = ''
        this.showError = false
        this.isEditing = false

        this.getTodoItems()
        console.log('Item Updated ')

      } catch (error) {
        this.showError = true
        this.errorMessage = 'Error on editing todo list item'
        console.log("Error on editing todo list item", error)
      }

    },

    async handleBatchDelete(){
      const completedItems = this.todoListItems.filter(item => item.isCompleted)
      try {

        await axios.delete(`${this.baseurl}/api/batch-delete`, {
          timeout: 15000
        })

        this.getTodoItems()
        console.log('Items deleted : ', completedItems)

      } catch (error) {
        this.showError = true
        this.errorMessage = 'Error on deleting all todo list item'
        console.log("Error on Batch delete todo list item", error)
      }
    },

    startEdit(item){
      this.isEditing = true
      this.editItemId = item._id
      this.todoTitle = item.title
      this.todoDescription = item.description

    },

    getCurrentDate() {
      const today = new Date()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      const year = today.getFullYear()
      const formattedDate = `${month}/${day}/${year}`
      console.log("FORMATTED DATE: ", formattedDate)
      this.currentdate = formattedDate
      return formattedDate
  }

  },

  mounted() {
    this.getTodoItems()
    this.currentDate = this.getCurrentDate()

  }
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
