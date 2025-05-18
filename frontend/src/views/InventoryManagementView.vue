<template>
  <div class="w-full p-5">

    <div class="w-full flex justify-between p-3">
      <div class="w-full flex gap-3 ">
        <div class="p-2 bg-gray-100 rounded-md">
          <button v-for="status in statuses" :key="status.value" @click="filterByStatus(status.value)" :class="[
            'px-4 py-2 rounded-md border text-sm cursor-pointer',
            currentFilter === status.value
              ? 'bg-gray-300 text-gray-700 border-gray-300'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          ]">
            {{ status.label }}
          </button>
        </div>
      </div>
      <input class="px-4 py-2 w-72 border border-gray-300 rounded-md shadow-sm focus:outline-none" type="text"
        placeholder="Search products..." v-model="searchText" @input="onQuickFilterChanged" />
    </div>


    <ag-grid-vue class="ag-theme-quartz h-full w-full" theme="legacy" style="height: 500px; width: 100%"
      :rowData="filteredData" :columnDefs="colDefs" :defaultColDef="defaultColDef" :quickFilterText="searchText"
      @cellClicked="onCellClicked" @cellValueChanged="onCellValueChanged" :animateRows="true" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import axios from 'axios'
import { ImageCellRenderer } from '@/components/cell-renderer/imageCellRender.vue'

// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-alpine.css'

export default {
  name: 'InventoryManagementView',
  components: {
    AgGridVue,
  },
  setup() {
    const originalData = ref([])
    const filteredData = ref([])
    const rowData = ref([])
    const searchText = ref('')
    const currentFilter = ref('all')

    const statuses = [
      { label: 'All', value: 'all' },
      { label: 'Low Stock', value: 'low' },
      { label: 'In Stock', value: 'in' },
      { label: 'Out of Stock', value: 'out' }
    ];

    const colDefs = ref([
      {
        field: 'image',
        headerName: 'Image',
        width: 100,
        sortable: false,
        filter: false,
        cellRenderer: ImageCellRenderer
      },
      { field: 'name', headerName: 'Product Name', sortable: true, filter: true },
      { field: 'description', sortable: true, filter: true },
      { field: 'price', sortable: true, filter: 'agNumberColumnFilter' },
      {
        field: 'stock',
        sortable: true,
        filter: 'agNumberColumnFilter',
        editable: true,
        cellStyle: params => (params.value < 10 ? { backgroundColor: '#ffcccc', color: 'red' } : null),
      },
      { field: 'category', sortable: true, filter: true },
      {
        headerName: 'Status',
        field: 'stock',
        cellRenderer: params => {
          const stock = params.value;
          if (stock === 0) return `<span style="color: red; font-weight: bold;">Out of Stock</span>`;
          if (stock <= 10) return `<span style="color: orange;">Low Stock</span>`;
          return `<span style="color: green;">In Stock</span>`;
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Actions',
        cellRenderer: params => {
          return `<button class="btn-delete text-red-600 cursor-pointer">Delete</button>`;
        },
        suppressHeaderMenuButton: true,
        sortable: false,
        filter: false,

      },

    ])


    const defaultColDef = {
      resizable: false,
    }

    const onQuickFilterChanged = () => {
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
        originalData.value = response.data;
        filteredData.value = response.data;
        applyFilters()
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    const filterByStatus = (status) => {
      currentFilter.value = status
      applyFilters()
    }

    const applyFilters = () => {
      let data = [...originalData.value]

      if (currentFilter.value === 'low') {
        data = data.filter(p => p.stock < 10 && p.stock > 0)
      } else if (currentFilter.value === 'in') {
        data = data.filter(p => p.stock >= 10)
      } else if (currentFilter.value === 'out') {
        data = data.filter(p => p.stock === 0)
      }

      filteredData.value = data
    }


    const onCellValueChanged = async (event) => {
      if (event.colDef.field === 'stock') {
        const newStock = event.newValue;
        try {
          await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${event.data._id}`, { stock: newStock });
          alert('Stock updated successfully');
        } catch (err) {
          alert('Failed to update stock');
          event.node.setDataValue('stock', event.oldValue); // revert on error
        }
      }
    };

    const onCellClicked = async (params) => {
      if (params.colDef.headerName === 'Actions' && params.event.target.classList.contains('btn-delete')) {
        if (confirm(`Delete product "${params.data.name}"?`)) {
          try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${params.data._id}`);
            alert('Product deleted Successfully');
            fetchProducts();
          } catch (error) {
            alert('Failed to delete product');
          }
        }
      }
    }



    onMounted(() => {
      fetchProducts()
    })

    return { rowData, colDefs, defaultColDef, searchText, onQuickFilterChanged, onCellValueChanged, onCellClicked, filterByStatus, filteredData, currentFilter, statuses }
  },
}


</script>

<style>
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-quartz.css";
</style>
