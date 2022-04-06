<script setup>
import { defineAsyncComponent, onBeforeMount, ref } from 'vue';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './service/firebase'
import './App.scss'

const TitleComponent = defineAsyncComponent(() => import('./components/TitleComponent.vue'));
const AddTodoListInput = defineAsyncComponent(() => import('./components/AddTodoListInput.vue'));
const TodoList = defineAsyncComponent(() => import('./components/TodoList.vue'));
const isError = ref('')
const isLoading = ref(false);
const LoadingText = ref('')

const addValue = ref('');
const editValue = ref('');
const labelContent = ref('');

const dbConnection = 'myTodoList'

const doneChecked = async (e, id) => {
    const newUpdateValue = todoListArray.value.find(item => item.id === id)
    newUpdateValue.isChecked = e.target.checked;


    await updateTodoCheckedList(db, id, newUpdateValue.isChecked)

    return todoListArray.value
}

const deleted = (id) => {
    return new Promise((resolve) => {
        todoListArray.value.map(async (item, index) => {
            if (item.id === id) {
              async function deletedTodoItem() {
                await delTodoList(db, id);
                todoListArray.value.splice(index, 1)
              }
              resolve(await deletedTodoItem());
            }
        })
    })
}


const addTodoListButton = async (value) => await addTodoListInput(db, value);

const editButton = (item, refElement) => {
  if (item.list.isChecked) return;

  item.list.editOpts = true;
  return item.list.editOpts
}

const editSuccessButton = async (updateValue, index) => {

  const newUpdateValue = todoListArray.value.find(item => item.id === index)
  newUpdateValue.list.content = updateValue;

  newUpdateValue.list.editOpts = false
  return await updateTodoContentList(db, index, newUpdateValue.list.content, false);
}

const cancelEditButton = (id) => {
  const newUpdateValue = todoListArray.value.find(item => item.id === id)
  return newUpdateValue.list.editOpts = false
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function getTodoList(db) {
  const myTodoList = collection(db, dbConnection);
  const getDocFromMyTodoList = await getDocs(myTodoList);
  const response = getDocFromMyTodoList.docs.map(doc => {
    return { id: doc.id, list: doc.data() }
  });
  return response;
}

async function addTodoListInput (db, value) {
  try {
    if (!value) {
      isLoading.value = true;
      LoadingText.value = 'todo input fill is required!';
      return;
    }

    isLoading.value = true;
    LoadingText.value = 'Please patient, we were loading for add list to firebase...';

    const docRef = await addDoc(collection(db, "myTodoList"), {
      content: value,
      isChecked: false,
      editOpts: false
    });

    console.log("Document written with ID: ", docRef.id);
    const newTodoListArray = { id: docRef.id, list: { content: value, isChecked: false, editOpts: false }}

    addValue.value = '';
    isLoading.value = false;
    return todoListArray.value.push(newTodoListArray)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function delTodoList(db, id) {
  isLoading.value = true;
  LoadingText.value = 'was deleting from database...';
  return await deleteDoc(doc(db, "myTodoList", id)).then(() => {
    addValue.value = '';
    isLoading.value = false;
  });
}

async function updateTodoCheckedList(db, id, value) {
  return await updateDoc(doc(db, dbConnection, id), {
    isChecked: value
  });
}

async function updateTodoContentList(db, id, value, editOptsBoolean) {
  return await updateDoc(doc(db, dbConnection, id), {
    content: value,
    editOpts: editOptsBoolean
  });
}

const todoListArray = ref([])

onBeforeMount(async () => {
  try {
    const response = await getTodoList(db);
    todoListArray.value = response;
    return todoListArray.value

  } catch (e) {
    isError.value = e.message;
    todoListArray.value = 'Fails to get todoList from firebase.';
    return todoListArray.value
  }
})

</script>

<style lang="scss">
.wrapper-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: auto;

  padding-top: 134px;
  padding-bottom: 134px;
}
</style>

<template>
  <div class="wrapper-main container px-3 h-full mx-auto overflow-hidden">
    <div class="wrapper-box w-full">
      <TitleComponent />
      <AddTodoListInput v-model="addValue" @addTodoListButton="addTodoListButton" />
      <div class="mt-3" v-if="isLoading">{{ LoadingText || 'Loading...'}}</div>
      <TodoList
        v-if="todoListArray.length"
        v-model="editValue"
        :todoListArray="todoListArray" 
        :labelContent="labelContent"
        @deletedButton="deleted" 
        @checkedDone="doneChecked" 
        @editButton="editButton"
        @editSuccessButton="editSuccessButton"
        @cancelEditButton="cancelEditButton"
      />
      <div class="mt-5" v-else-if="isError">{{ todoListArray }}</div>
      <div class="mt-5" v-else>Loading...</div>
    </div>
  </div>
</template>