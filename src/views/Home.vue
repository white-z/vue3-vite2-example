<template>
  <div>
    {{ text }}
  </div>
</template>

<script lang='ts'>
import { ref, defineComponent, onMounted } from 'vue';
import API from '@/api';

export default defineComponent({
  name: 'Home',
  setup() {
    const text = ref('Loading...')
    const getText = async () => {
      text.value = await API.getText()
    };
    onMounted(getText())
    return {
      text
    };
  }
});
</script>
