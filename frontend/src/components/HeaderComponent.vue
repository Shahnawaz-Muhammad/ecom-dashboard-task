<template>
  <header class="bg-white shadow-md px-6 py-2 flex items-center justify-between">
    <div class="flex items-center gap-4 py-3">
      <span class="text-xl font-semibold text-gray-800">Dashboard</span>
    </div>

    <nav class="flex items-center gap-6 text-gray-600 font-medium">
      <RouterLink to="/revenue-analysis" class="hover:text-blue-600 transition-colors duration-200"
        active-class="text-blue-600 font-semibold">
        Revenue Analysis
      </RouterLink>
      <RouterLink to="/inventory-management" class="hover:text-blue-600 transition-colors duration-200"
        active-class="text-blue-600 font-semibold">
        Inventory Management
      </RouterLink>
      <RouterLink to="/register-product" class="hover:text-blue-600 transition-colors duration-200"
        active-class="text-blue-600 font-semibold">
        Add Product
      </RouterLink>
    </nav>
  </header>
</template>

