<template>
  <div class="container">
    <v-container>
      <v-row align="center" class="flex align-center">
        <div class="wrapper">
          <div class="custom-color-picker">
            <input
              type="color"
              v-model="userColor"
              ref="colorInput"
              @input="updateColor"
            />
          </div>
          <v-col cols="auto">
            <v-btn
              density="compact"
              icon="mdi-plus"
              @click="handleAddNote"
            ></v-btn>
          </v-col>
        </div>
      </v-row>

      <div class="cards">
        <div
          v-for="(note, index) in noteData"
          :key="index"
          class="note relative"
          :style="{
            backgroundColor: note.color,
            left: note.x + 'px',
            top: note.y + 'px',
          }"
        >
          <v-textarea
            class="textarea mt-3 rounded-lg"
            label="Label"
            v-model="note.text"
            name="input-7-1"
            variant="underlined"
            @mousedown="startDrag($event, index)"
          ></v-textarea>
          <v-btn
            density="compact"
            icon="mdi-delete"
            class="delete-btn absolute top-2 right-2"
            @click="removeNote(index)"
          ></v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const userColor = ref<string>("#000000"); // Установите начальное значение цвета
const colorInput = ref<HTMLInputElement | null>(null);
const noteData = ref<{ text: string; color: string; x: number; y: number }[]>(
  []
);

const addNote = () => {
  noteData.value.push({
    text: "",
    color: userColor.value,
    x: 0,
    y: 0,
  });
};

const handleAddNote = () => {
  addNote();
};

const updateColor = (event: Event) => {
  const target = event.target as HTMLInputElement;
  userColor.value = target.value;
  target.blur(); // Удалить фокус с элемента, чтобы закрыть окно выбора цвета
};

const triggerColorPicker = () => {
  colorInput.value?.click();
};

const removeNote = (index: number) => {
  noteData.value.splice(index, 1);
};

// Переменные для хранения данных о перетаскивании
let draggingIndex = ref<number | null>(null);
let startX = ref<number>(0);
let startY = ref<number>(0);
let startLeft = ref<number>(0);
let startTop = ref<number>(0);

const startDrag = (event: MouseEvent, index: number) => {
  draggingIndex.value = index;
  startX.value = event.clientX;
  startY.value = event.clientY;
  startLeft.value = noteData.value[index].x;
  startTop.value = noteData.value[index].y;
};

const onDrag = (event: MouseEvent) => {
  if (draggingIndex.value !== null) {
    const note = noteData.value[draggingIndex.value];
    note.x = startLeft.value + (event.clientX - startX.value);
    note.y = startTop.value + (event.clientY - startY.value);
  }
};

const endDrag = () => {
  draggingIndex.value = null;
};

document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", endDrag);
</script>

<style scoped>
.container {
  width: 1920px;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  background: linear-gradient(white 2px, transparent 2px),
    linear-gradient(90deg, white 2px, transparent 2px);
  background-size: 40px 40px;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cards {
  flex-grow: 1;
  width: 3000px;
  height: 3000px;
  position: relative;
  overflow: auto;
  overflow: hidden;
}

.wrapper {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 20px;
}

.delete-btn {
  position: relative;
  top: -160px;
  right: -200px;
  background: transparent;
}

.textarea {
  width: 400px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}

.note {
  border-radius: 12px;
  position: absolute;
  cursor: grab;
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
}
</style>
