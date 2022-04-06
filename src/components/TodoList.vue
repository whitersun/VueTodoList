<template>
    <div class="wrapper-border w-full mt-5 border-slate-300">
        <h2>Todo list:</h2>
        <ul class="list-group" v-if="todoListArray.length">
            <li class="list-item mb-3" :class="[item.list.isChecked ? 'bg-green-200' : '']" v-for="item in todoListArray" :key="item.id">
                <div class="wrapper-content-check w-full overflow-hidden relative transition-all"
                    :class="[item.list.isChecked ? 'line-through' : '']"
                >
                    <input type="checkbox" v-model="item.list.isChecked" :checked="item.list.isChecked" class="form-custom-checkbox absolute top-1.5 left-0 cursor-pointer" :class="[item.list.editOpts ? 'top-2.5' : '']" :id="item.id" @click="$emit('checkedDone', $event, item.id)">

                    <label :ref="labelContent" :for="item.id" class="content truncate px-5">
                        <span v-show="!item.list.editOpts">{{ item.list.content }}</span>
                        <input v-if="item.list.editOpts" type="text" :value="item.list.content" @change="$emit('update:modelValue', $event.target.value)" @keyup.enter="$emit('editSuccessButton', modelValue, item.id)" class="updated-value w-full border rounded-md border-slate-500 pl-3">
                    </label>
                </div>

                <div class="option">
                    <button v-if="!item.list.editOpts" @click.prevent="$emit('deletedButton', item.id)" class="delete border border-slate-600 hover:border-red-50 bg-slate-50 hover:bg-red-500 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                    <button v-if="item.list.editOpts" @click.prevent="$emit('editSuccessButton', modelValue, item.id)" class="delete border hover:border-red-50 bg-slate-50  p-2 rounded-md border-slate-600 hover:bg-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" :class="[item.list.isChecked ? 'text-gray-500 text-hover' : '']" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button v-if="!item.list.editOpts" @click.prevent="$emit('editButton', item)" :disabled="item.list.isChecked" class="delete border hover:border-red-50 bg-slate-50  p-2 rounded-md" :class="[item.list.isChecked ? 'border-gray-500' : 'border-slate-600 hover:bg-blue-500']">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" :class="[item.list.isChecked ? 'text-gray-500 text-hover' : '']" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button v-if="item.list.editOpts" @click.prevent="$emit('cancelEditButton', item.id)" class="delete border hover:border-red-50 bg-slate-50  p-2 rounded-md" :class="[item.list.isChecked ? 'border-gray-500' : 'border-slate-600 hover:bg-red-500']">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps(['todoListArray', 'labelContent', 'modelValue'])


defineExpose(props);
</script>

<style lang="scss" scoped>
.wrapper-border {
    max-width: 500px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .list-group {
        width: 100%;
        margin-top: 10px;

        .list-item {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px 10px 10px 12px;

            display: flex;
            flex-direction: row;
            flex-grow: 1;
            justify-content: space-between;
            align-items: center;

            transition: all 350ms ease;

            .updated-value {
                padding: 3px 12px 5px 5px;
            }


            .wrapper-content-check {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                column-gap: 10px;

                padding-right: 10px;
                .form-custom-checkbox {
                    width: 15px;
                    height: 15px;
                }
            
                .content {
                    cursor: pointer;
                }
            }

            .option {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                column-gap: 5px;

                button {
                    transition: all 350ms ease;
                    &:hover {
                        > svg { fill: #fff; }
                        > .text-hover { fill: #878787; }
                    }
                }
            }
        }
    }
}
</style>