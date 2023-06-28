<script setup lang="ts"></script>
<template>
  <n-grid :x-gap="16" y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:16">
      <n-card :bordered="false" class="rounded-16px shadow-sm">
        <div class="flex w-full h-360">
          <div class="w-200px h-full py-12px">
            <h3 class="text-16px font-bold">Dashboard</h3>
            <p class="text-[#aaa]">Overview Of Lasted Month</p>
            <h3 class="pt-36px text-24px font-bold"></h3>
          </div>

          <div>b</div>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<style lang="scss" scoped></style>
