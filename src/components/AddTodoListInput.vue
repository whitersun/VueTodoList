<template>
    <div class="wrapper-input w-full">
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @keyup.enter="$emit('addTodoListButton', modelValue)" class="form-control border border-slate-400 rounded-lg focus:bg-slate-50 w-full" placeholder="Add some todo list...">
        <button @click="$emit('addTodoListButton', modelValue)" class="add-button rounded-md border border-slate-400 hover:border-blue-600 focus:border-blue-600 p-3 hover:bg-blue-600 focus:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </button>
    </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
defineExpose(props)
</script>

<style lang="scss">
.wrapper-input {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;

    column-gap: 15px;

    max-width: 500px;

    .form-control {
        padding: 10px 10px 10px 12px;

        &:focus { outline: none; }
    }

    .add-button {
        transition: all 350ms ease;

        &:hover, &:focus {
            outline: none;
            svg {
                fill: #fff;
            }
        }
    }
}
</style>