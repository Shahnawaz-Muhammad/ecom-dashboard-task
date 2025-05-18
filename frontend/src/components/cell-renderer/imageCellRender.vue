<script >

export const ImageCellRenderer = params => {
          const rawPath = params.value;
          if (!rawPath) return '';
          const imagePath = rawPath.replace(/\\/g, '/');
          const imageUrl = `${import.meta.env.VITE_API_URL}/${imagePath}`;

          return `<img src="${imageUrl}" alt="Product Image" style="height: 50px; width: auto; border-radius: 4px;" />`;
        }
        
</script>