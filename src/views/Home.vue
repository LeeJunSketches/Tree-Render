<template>
  <div class="home">
    <BinarySearchTree />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BinarySearchTree from "@/components/BinarySearchTree.vue";

export default defineComponent({
  name: "Home",
  components: {
    BinarySearchTree,
  },
});
</script>
