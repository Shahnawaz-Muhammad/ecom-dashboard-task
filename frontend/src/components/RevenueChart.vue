<template>
    <div class="max-w-5xl w-full mx-auto">
        <div class="w-full flex justify-between">
            <h2 class="text-lg font-semibold">Orders & Sales Trends</h2>

            <div class="flex gap-2">
                <select class="px-5 py-1 outline" v-model="selectedPeriod" @change="fetchChartData">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                </select>

                <select class="px-5 py-1 outline" v-model="selectedCategory" @change="fetchChartData">
                    <option value="">All Categories</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
            </div>

        </div>

        <div style="height: 500px;">
            <ag-charts v-if="chartOptions.data.length" :options="chartOptions" />
        </div>
    </div>
</template>


<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { AgCharts } from 'ag-charts-vue3';

export default {
    name: 'App',
    components: {
        AgCharts
    },
    setup() {
        const selectedPeriod = ref('daily')
        const selectedCategory = ref('')
        const categories = ref([])

        const chartOptions = ref({
            data: [],
            title: { text: 'Orders & Revenue', fontSize: 18 },
            series: [
                {
                    type: 'bar',
                    direction: 'vertical',
                    xKey: 'period',
                    yKey: 'orders',
                    yName: 'Orders',
                    fill: '#42A5F5',
                    stacked: true
                },
                {
                    type: 'bar',
                    direction: 'vertical',
                    xKey: 'period',
                    yKey: 'revenue',
                    yName: 'Revenue',
                    fill: '#66BB6A',
                    stacked: true
                }
            ],
            axes: [
                { type: 'category', position: 'bottom' },
                { type: 'number', position: 'left' }
            ],
            legend: { position: 'top' }
        })

        const fetchCategories = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/categories`)
            console.log("categoryy", res.data)
            categories.value = res.data
        }

        const fetchChartData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sales`, {
                    params: {
                        period: selectedPeriod.value,
                        category: selectedCategory.value
                    }
                })
                console.log('Chart data:', response.data)

                chartOptions.value.data = response.data
            } catch (err) {
                console.error('Chart fetch error', err)
            }
        }

        onMounted(() => {
            fetchChartData();
            fetchCategories();
        });
        return {
            chartOptions,
            selectedPeriod,
            fetchChartData,
            categories,
            selectedCategory
        };
    },
};
</script>