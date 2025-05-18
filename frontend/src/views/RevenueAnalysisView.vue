<template>
  <div class="p-6">
   
    <div class="flex flex-col gap-5">
      <div class="w-full flex justify-between gap-6">
        <div class="p-10 w-full border-2 shadow-lg flex flex-col justify-center items-center rounded-lg gap-2">
          <h3>Total Orders:</h3>
          <p class="text-2xl">{{ totalOrders }}</p>
        </div>
        <div class="p-10 w-full border-2 shadow-lg flex flex-col justify-center items-center rounded-lg gap-2">
          <h3>Total Revenue:</h3>
          <p class="text-2xl">${{ totalRevenue }}</p>
        </div>
      </div>
      <div class="p-10 w-full border-2 shadow-lg  rounded-lg ">
        <h2 class="text-center text-2xl font-bold">Revenue Analysis</h2>
        <RevenueChart title="Revenue Chart" />
      </div>
    </div>
  </div>
</template>

<script>
import RevenueChart from '@/components/RevenueChart.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'RevenueAnalysis',
  components: {
    RevenueChart
  },
  setup() {
    const totalOrders = ref(0)
    const totalRevenue = ref(0)
    

    onMounted(async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/sales/summary`)
        console.log("summary", res.data)
        totalOrders.value = res.data.totalOrders
        totalRevenue.value = res.data.totalRevenue
      } catch (error) {
        console.error("Failed to load summary data", error)
      }
    })

    return {
      totalOrders,
      totalRevenue
    }
  }
}
</script>