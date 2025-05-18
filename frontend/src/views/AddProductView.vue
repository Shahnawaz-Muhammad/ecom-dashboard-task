<template>
    <div class="max-w-xl mx-auto  flex my-auto">
        <div class="h-full mt-10 bg-white shadow-md border border-black rounded-xl p-6 ">
            <h2 class="text-2xl font-bold mb-4">Add New Product</h2>
            <form @submit.prevent="submitProduct" class="grid grid-cols-4 gap-2">
                <div class=" col-span-full">
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="form.name" type="text" class="mt-1 block w-full p-2 border rounded" required />
                </div>

                <div class=" col-span-full">
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="form.description" class="mt-1 block w-full p-2 border rounded"
                        rows="3"></textarea>
                </div>

                <div class="  col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Price</label>
                    <input v-model="form.price" type="number" step="0.01" class="mt-1 block w-full p-2 border rounded"
                        required />
                </div>

                <div class="  col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Stock</label>
                    <input v-model="form.stock" type="number" class="mt-1 block w-full p-2 border rounded" required />
                </div>

                <div class="  col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <input v-model="form.category" type="text" class="mt-1 block w-full p-2 border rounded" required />
                </div>

                <div class="  col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" @change="handleImageUpload" class="mt-1 block w-full p-2 border rounded" />
                </div>

                <div>
                    <button type="submit" class="bg-blue-600 text-white py-2 px-4 w-40 rounded hover:bg-blue-700">
                        Submit Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: null, 
})

const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
        form.image = file
    }
}

const submitProduct = async () => {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('price', form.price)
    formData.append('stock', form.stock)
    formData.append('category', form.category)
    if (form.image) {
        formData.append('image', form.image)
    }

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/products/add-new`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        alert('Product added successfully!')

        form.name = ''
        form.description = ''
        form.price = ''
        form.stock = ''
        form.category = ''
        form.image = null
    } catch (err) {
        console.error(err)
        alert('Failed to add product')
    }
}
</script>
