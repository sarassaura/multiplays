<template>
    <div class="container mx-auto flex flex-col h-full">
        <header>
            <nav class="flex w-full justify-between bg-slate-700 p-4">
                <p>MultiPlays</p>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About</NuxtLink></li>
                </ul>
            </nav>
        </header>
        <main class="flex flex-grow justify-center items-center bg-slate-900">
            <slot />
        </main>
        <footer class="flex w-full bg-slate-700 p-4 justify-center">
            <p>©sarassaura, 2023. All rights reserved.</p>
        </footer>
    </div>
</template>
  
  <script lang="ts" setup>
  
  </script>
  
  
  
  <style>
  
  </style>
  